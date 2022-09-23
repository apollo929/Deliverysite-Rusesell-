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
import {
  AddClockInGQL,
  AddClockOffGQL,
  HasClockedIntoJobGQL,
} from '@dfobobcat/graphql-types';
import { AlertController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import {
  ConfigService,
  AlertService,
  LoadingService,
  StateService,
} from '@dfobobcat/ui/shared/service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'bc-clock-in',
  templateUrl: './clock-in.page.html',
  styleUrls: ['./clock-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockInPage implements OnInit {
  @ViewChild('imageList', { read: ElementRef }) imageList!: ElementRef;

  jobId!: number;

  fileControl = new FormControl();
  noteControl = new FormControl('');

  images: File[] = [];
  error = false;
  errorMessage = 'Allowed file formats: *.pdf';
  constructor(
    public renderer: Renderer2,
    private addClockInGQL: AddClockInGQL,
    private state: StateService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private configService: ConfigService,
    private geolocation: Geolocation,
    private alertService: AlertService,
    private hasClockedIntoJobIdGQL: HasClockedIntoJobGQL,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.jobId = +params.id;
    });
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

  validateImages() {
    if (this.images.length === 0) {
      alert('Adding photos is now required for clocking!');
    } else {
      this.submit();
    }
  }

  submit() {
    let location: Observable<any>;
    if (!this.configService.get('production')) {
      location = of({
        coords: {
          latitude: 123,
          longitude: 123,
        },
      });
    } else {
      location = from(this.geolocation.getCurrentPosition());
    }

    const locationData: Record<any, any> = {};

    location
      .pipe(
        concatMap((location) => {
          const lat = location?.coords?.latitude;
          const lng = location?.coords?.longitude;
          locationData.lat = lat;
          locationData.lng = lng;
          if (!lat || !lng) {
            return this.alertService.show({
              message: 'Could not get your location. Clock In failed.',
              type: 'error',
            });
          }
          return this.hasClockedIntoJobIdGQL.fetch({
            id: this.jobId,
          });
        }),
        concatMap((hasClockedIn) => {
          if (
            hasClockedIn &&
            'hasClockedIntoJob' in hasClockedIn.data.me &&
            hasClockedIn.data.me.hasClockedIntoJob
          ) {
            // redirect to clock off screen
            this.router.navigate(['/staff', 'clock-off', this.jobId]);

            return of(undefined);
          }

          return this.addClockInGQL.mutate(
            {
              input: {
                jobId: this.jobId,
                lat: locationData.lat,
                lng: locationData.lng,
                files: this.images,
              },
            },
            {
              context: {
                useMultipart: true,
              },
            },
          );
        }),
      )
      .subscribe((result) => {
        this.alertService
          .show({
            message: 'Clock in success!',
          })
          .subscribe();
        this.router.navigate(['/staff', 'jobs']);

        return;
        /*   if (result && result?.data?.addClockIn) {
          const clockIn = result?.data?.addClockIn;

          const equipment = clockIn.equipment
            .map((item) => item.name)
            .join(', ');
          this.todaysJob$.next({
            id: clockIn.id,
            address: clockIn.address,
            equipment,
          });
          this.alertService
            .show({
              message: 'Clock in success!',
            })
            .subscribe();
        } */
      });
  }
}
