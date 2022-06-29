import { blob2string } from '../file-handler/blob2string';

export interface IFile {
  get name(): string;
  get size(): number;
  get type(): string;
  get lastModified(): number;
  get content(): Promise<string>;
}

export class UploadFile implements IFile {
  constructor(private origin: File) { }

  public get name() {
    return this.origin.name;
  }

  public get size() {
    return this.origin.size;
  }

  public get lastModified() {
    return this.origin.lastModified;
  }

  public get type() {
    return this.origin.type;
  }

  public get content() {
    return blob2string(this.origin);
  }
}
