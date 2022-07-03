import { db, DbDirectory } from '../db/db';
import { IBinaryFile } from '../file/file';

export interface IDirectory {
  name: string;
  files: IBinaryFile[];
  subDirectories: IDirectory[];
}

export class Directory implements IDirectory {
  constructor(
    private _name: string,
    private _files: IBinaryFile[] = [],
    private _subDirectories: IDirectory[] = [],
    parent?: IDirectory,
  ) {
    this._parent = parent || this;
    this._subDirectories = this._subDirectories.map<Directory>(sub => new Directory(sub.name, sub.files, sub.subDirectories, this));
  }

  private _parent: IDirectory;

  public get parent(): IDirectory {
    return this._parent;
  }

  public set parent(parent: IDirectory) {
    this._parent = parent;
  }

  public get name(): string {
    return this._name;
  }

  public get files(): IBinaryFile[] {
    return this._files;
  }

  public get subDirectories(): IDirectory[] {
    return this._subDirectories;
  }

  public toJson(): IDirectory {
    return {
      name: this.name,
      files: this.files,
      subDirectories: (this.subDirectories as Directory[]).map<IDirectory>((sub: Directory) => sub.toJson()),
    };
  }

  public addFile(file: IBinaryFile): void {
    if (this.files.find(f => f.name === file.name) === undefined) {
      this.files.push(file);
      this.files.sort((a: IBinaryFile, b: IBinaryFile) => {
        if (a.name > b.name) { return -1; }
        if (b.name < a.name) { return 1; }
        return 0;
      });
      this.save();
    }
  }

  public save() {
    db.saveDirectory(this.toDb());
  }

  private toDb(): DbDirectory {
    return {
      name: this.name,
      files: this.files.map<File>(f => f.binary),
      subDirectories: (this.subDirectories as Directory[]).map<DbDirectory>((sub: Directory) => sub.toDb()),
    };
  }
}
