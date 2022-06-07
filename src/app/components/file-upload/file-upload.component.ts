import {Component} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent
  },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  file: File | null = null;
  onChange: any;
  onTouched = () => {};

  touched = false;

  disabled = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.markAsTouched();
    if (!this.disabled) {
      this.file = file;
      this.onChange(this.file);
    }
  }

  writeValue(value: File) {
    this.file = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const file = control.value;
      return this.validateFile(file) ? null : {fileType: true};
    }
    return {
      required: true
    };
  }

  PDFFileTypes = [
    'application/pdf'
  ];

  validateFile(file: any): boolean {
    if (file)
      return this.PDFFileTypes.includes(file.type);
    return false;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
