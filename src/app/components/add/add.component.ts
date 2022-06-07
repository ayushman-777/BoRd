import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, EMPTY, Observable, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  destroy$: Subject<null> = new Subject();
  pictureForm!: FormGroup;
  submitted = false;
  uploadProgress$!: Observable<number | undefined>;
  user: any;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.pictureForm = this.formBuilder.group({
      photo: [null],
      description: [null, Validators.required],
    });

    this.pictureForm.get('photo')?.valueChanges.subscribe((value: any) => {
      if (!this.pictureForm.controls['description']?.touched)
        this.pictureForm.patchValue({
          description: value.name.split('.')[0]
        });
    });
  }

  addBook() {
    this.submitted = true;
    this.pictureForm.disable();
    const mediaFolderPath = `books/${this.user.email}/${this.pictureForm.get('description')?.value}`;

    const {downloadUrl$, uploadProgress$} = this.storageService
      .uploadFileAndGetMetadata(mediaFolderPath, this.pictureForm.get('photo')?.value);

    this.uploadProgress$ = uploadProgress$;
    uploadProgress$.subscribe((percentage: number) => {
      if (percentage >= 100) {
        this.submitted = false;
        this.router.navigate([``]);
      }
    });

    downloadUrl$.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log(error);
        if (error == 'unknown' || error == 'quota-exceeded' || error == 'unauthenticated' ||
          error == 'retry-limit-exceeded' || error == 'server-file-wrong-size') {
          this.submitted = false;
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
        }
        return EMPTY;
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}

