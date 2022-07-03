import Dexie, { Table } from 'dexie';
import { UploadFile } from '../file/upload.file';
import { IFile } from '../file/file';
import { Directory } from '../directory/directory';

export interface DbFile extends File { }
export interface DbDirectory {
  name: string;
  files: DbFile[];
  subDirectories: DbDirectory[];
}

export class AppDB extends Dexie {
  files!: Table<DbFile, string>;
  directories!: Table<DbDirectory, string>;

  constructor() {
    super('drag-drop');
    this.version(2).stores({
      files: 'name',
      directories: 'name',
    });
  }

  public saveDirectory(directory: DbDirectory): void {
    this.directories.put(directory);
  }

  public async getDirectories(): Promise<Directory[]> {
    const convertFile = async (file: File): Promise<UploadFile> => {
      const f = new UploadFile(file);
      await f.loadContent();
      return f;
    }

    const dbDirs: DbDirectory[] = await this.directories.toArray();
    const dirs = await Promise.all(dbDirs.map(async function convertDir(dbDir): Promise<Directory> {
      return new Directory(
        dbDir.name,
        await Promise.all(dbDir.files.map(convertFile)),
        await Promise.all(dbDir.subDirectories.map(convertDir)),
      );
    }));

    return dirs;
  }

  public saveFile(file: File): void {
    this.files.put(file);
  }

  public saveFiles(files: File[]): void {
    files.forEach(file => this.saveFile(file));
  }

  public async getFiles(): Promise<UploadFile[]> {
    const files = await this.files.toArray();

    return files.map(file => new UploadFile(file));
  }

  public async deleteFile(file: IFile): Promise<boolean> {
    const deleted = await this.files.where('name').equals(file.name).delete();
    return deleted > 0;
  }

  public async deleteDirectory(dir: Directory): Promise<boolean> {
    const deleted = await this.directories.where('name').equals(dir.name).delete();
    return deleted > 0;
  }
}

export const db = new AppDB();
