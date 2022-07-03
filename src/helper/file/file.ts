import { string2file } from "../file-handler/string2.blob";

export interface IFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
}

export interface IBinaryFile extends IFile {
  binary: File;
  isBinary: boolean;
  isImage: boolean;
  isText: boolean;
}

export abstract class BaseFile implements IBinaryFile {
  private static TYPE_TEXT_REGEX = /text|json|xml/;
  private static TYPE_IMAGE_REGEX = /image/;

  protected constructor(
    protected _name: string,
    protected _size: number,
    protected _type: string,
    protected _lastModified: number,
    protected _content: string,
  ) { }

  get content(): string {
    return this._content;
  }

  get lastModified(): number {
    return this._lastModified;
  }

  get name(): string {
    return this._name;
  }

  get size(): number {
    return this._size;
  }

  get type(): string {
    return this._type;
  }

  get binary(): File {
    const content = this.isText ? this.content : this.content.split(',')[1];
    return string2file(content, this.name, this.type);
  }

  get isBinary(): boolean {
    return !this.isText && !this.isImage;
  }

  get isImage(): boolean {
    return BaseFile.TYPE_IMAGE_REGEX.test(this.type);
  }

  get isText(): boolean {
    return BaseFile.TYPE_TEXT_REGEX.test(this.type);
  }

  public toJson(): IFile {
    return {
      name: this.name,
      size: this.size,
      type: this.type,
      lastModified: this.lastModified,
      content: this.content,
    };
  }
}
