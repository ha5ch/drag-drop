import { blob2string } from '../file-handler/blob2string';
import { BaseFile } from './file';

export class UploadFile extends BaseFile {
  constructor(private _origin: File) {
    super(_origin.name, _origin.size, _origin.type, _origin.lastModified, '');
  }

  public get origin(): File {
    return this._origin;
  }

  public async loadContent(): Promise<string> {
    if (!this.content) {
      console.log(this.name, 'is loading');
      const type = this.origin.type.match(/text/) ? 'Text' : 'DataURL';
      await blob2string(this.origin, type)
        .then(value => {
          this._content = value;
        });
    }
    return this._content;
  }
}
