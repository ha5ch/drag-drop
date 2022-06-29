import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { UploadFile } from '../../helper/file/upload.file';
import { db } from '../../helper/db/db';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  private subject: Subject<UploadFile>;

  constructor() {
    this.subject = new ReplaySubject(1);
  }

  public get current$() {
    return this.subject.asObservable();
  }

  public set current(value: UploadFile) {
    value.loadContent().then(() => this.subject.next(value));
    db.saveFile(value.origin);
  }
}
