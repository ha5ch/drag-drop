import Dexie, { Table } from 'dexie';
import { UploadFile } from '../file/upload.file';
import { IFile } from '../file/file';

export interface DbFile extends File {}

export class AppDB extends Dexie {
  files!: Table<DbFile, string>;

  constructor() {
    super('drag-drop');
    this.version(1).stores({
      files: 'name',
    });
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

  public async deleteFile(file: IFile): Promise<void> {
    const deleted = await this.files.where('name').equals(file.name).delete();
    console.log(deleted);
  }
}

export const db = new AppDB();
