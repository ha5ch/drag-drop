import { Component, Input } from '@angular/core';
import { IFile } from '../../helper/file/file';

@Component({ template: '' })
export abstract class FileComponent {
  @Input() file!: IFile;
}
