import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bc-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit {
  fileControl = new FormControl();
  @Output()
  upload = new EventEmitter();

  @Input()
  fileName = '';

  error = false;
  errorMessage = 'Allowed file formats: *.pdf';
  constructor() {}

  ngOnInit(): void {}

  onDragOver(event:any) {
    event.preventDefault();
  }

onDropSuccess(event:any) {
  event.preventDefault();
  if (event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      this.error = true;
      return;
    } else {
      this.error = false;
    }
    this.upload.emit(file);
    this.fileName = file.name;
    this.fileControl.reset();
  }
}

  onUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        this.error = true;
        return;
      } else {
        this.error = false;
      }
      this.upload.emit(file);
      this.fileName = file.name;
      this.fileControl.reset();
    }
  }
}
