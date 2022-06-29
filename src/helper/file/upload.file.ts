import { blob2string } from '../file-handler/blob2string';
import { BaseFile } from './file';

export class UploadFile extends BaseFile {
  constructor(private origin: File) {
    super(origin.name, origin.size, origin.type, origin.lastModified, '');
  }

  public async loadContent(): Promise<string> {
    if (!this.content) {
      console.log(this.name, 'is loading');
      await blob2string(this.origin)
        .then(value => {
          this._content = value;
        });
    }
    return this._content;
  }
}
