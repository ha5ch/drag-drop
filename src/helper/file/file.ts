export interface IFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
}

export abstract class BaseFile implements IFile {
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
