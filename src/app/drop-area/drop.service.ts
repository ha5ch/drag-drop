import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { UploadFile } from '../../helper/file/file';

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
    this.subject.next(value);
  }
}
