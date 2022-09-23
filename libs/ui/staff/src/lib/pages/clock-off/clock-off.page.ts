import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClockOffGQL } from '@dfobobcat/graphql-types';
import { AlertController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { LoadingService, StateService } from '@dfobobcat/ui/shared/service';

@Component({
  selector: 'dfobobcat-clock-off',
  templateUrl: './clock-off.page.html',
  styleUrls: ['./clock-off.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockOffPage implements OnInit {
  @ViewChild('imageList', { read: ElementRef }) imageList!: ElementRef;

  jobId!: number;

  fileControl = new FormControl();
  noteControl = new FormControl('');

  images: File[] = [];
  imagesRequired$!: Observable<boolean>;
  error = false;
  errorMessage = 'Allowed file formats: *.pdf';
  constructor(
    public renderer: Renderer2,
    private addClockOffGql: AddClockOffGQL,
    private state: StateService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.jobId = +params.id;
    });
    this.imagesRequired$ = this.state
      .select((state) => state.user)
      .pipe(map((user) => !!(user?.role === 'operator')));
  }

  onUpload(event: any) {
    const uploadFile = (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          reject();
          return;
        }

        this.images.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = this.renderer.createElement('img');
          img.src = e.target.result;
          this.imageList.nativeElement.appendChild(img);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    };

    if (event.target.files.length > 0) {
      const fileUploads: Promise<void>[] = [];
      for (const upload of event.target.files) {
        fileUploads.push(uploadFile(upload));
      }

      this.loadingService
        .show()
        .pipe(
          concatMap(() => from(Promise.all(fileUploads))),
          concatMap(() => from(this.loadingService.dismiss())),
        )
        .subscribe();
    }
  }

  validateImages(){
    if (this.images.length === 0){
      alert("Adding photos is now required for clocking!");
    } else {
      this.submit();
    }
  }

  submit() {
    this.addClockOffGql
      .mutate(
        {
          input: {
            jobId: this.jobId,
            notes: this.noteControl.value,
            files: this.images,
          },
        },
        {
          context: {
            useMultipart: true,
          },
        },
      )
      .subscribe(async () => {
        const alert = await this.alertController.create({
          cssClass: 'bc-success-popup',
          header: 'Success',
          message: 'Clocked off successfully!',
          buttons: ['Dismiss'],
        });

        await alert.present();
        this.router.navigate(['/staff', 'jobs']);
      });
  }
}
