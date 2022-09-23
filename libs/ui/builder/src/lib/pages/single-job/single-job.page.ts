import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateJobGQL,
  CreateJobInput,
  EquipmentGQL,
  JobGQL,
  JobQuery,
  SettingsGQL,
  UpdateJobGQL,
} from '@dfobobcat/graphql-types';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {
  AddressInputComponent,
  SelectComponent,
} from '@dfobobcat/ui/shared/component';
import { LocationData } from '@dfobobcat/ui/shared/model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bc-single-job',
  templateUrl: './single-job.page.html',
  styleUrls: ['./single-job.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleJobPage implements ViewWillEnter, ViewWillLeave {
  @ViewChild(AddressInputComponent) addressComponent!: AddressInputComponent;
  @ViewChild(SelectComponent) selectComponent!: SelectComponent;
  form!: FormGroup;
  perfectScrollbarConfig = {};
  jobId!: number;

  equipment$ = new Subject<Record<number, string>>();

  minDate$ = new ReplaySubject<moment.Moment>(1);
  selectedDate = '';
  selectedEquipment: Array<number> = [];
  selectedCoordinates: Partial<LocationData> = {
    lat: undefined,
    lng: undefined,
  };
  uploadedPo!: File;

  job$ = new Subject<JobQuery['job']>();
  uploadedPO$ = new Subject<string>();

  triggerCDChildren = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public cdRef: ChangeDetectorRef,
    private createJobGQL: CreateJobGQL,
    private updateJobGQL: UpdateJobGQL,
    private jobGQL: JobGQL,
    private settingsGQL: SettingsGQL,
    private equipmentGQL: EquipmentGQL,
    private router: Router,
  ) {
    this.form = fb.group({
      datetime: ['', [Validators.required]],
      selectedEquipmentInput: ['', [Validators.required]],
      address: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      priority: [''],
    });
  }

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.jobId = +params.id;
      }

      if (this.jobId) {
        this.getJob();
      }
      this.settingsGQL.fetch().subscribe((settings) => {
        this.minDate$.next(moment(settings.data.settings.minJobRequestDate));
      });
      this.equipmentGQL.fetch().subscribe((result) => {
        const equipment = result.data.equipment.reduce(
          (prev: Record<number, string>, curr: any) => {
            prev[curr.id] = curr.name;
            return prev;
          },
          {},
        );
        this.equipment$.next(equipment);
      });
    });
  }

  get datetime() {
    return this.form.get('datetime') as FormControl;
  }
  get selectedEquipmentInput() {
    return this.form.get('selectedEquipmentInput') as FormControl;
  }
  get address() {
    return this.form.get('address') as FormControl;
  }
  getEquipment(): Observable<string> {
    return this.job$.pipe(
      map((job) =>
        job.equipment ? job.equipment.map((item) => item.name).join(', ') : '',
      ),
    );
  }

  dateSelected(date: string = '') {
    this.selectedDate = date;
    return;
  }
  equpmentSelected(items: Array<number>) {
    this.selectedEquipment = items;
  }
  addressSelected(location: Partial<LocationData>) {
    this.selectedCoordinates = location;
  }

  getJob() {
    this.jobGQL.fetch({ id: this.jobId }).subscribe((result) => {
      const job = result.data.job;
      this.job$.next(job);
      this.uploadedPO$.next(job.poFile ? job.poFile : '');
      this.equpmentSelected(
        Array.isArray(job.equipment)
          ? job.equipment.filter((item) => !!item.id).map((item) => item.id)
          : [],
      );

      this.dateSelected(job.requestDate);
      this.addressSelected({
        lat: job.lat,
        lng: job.lng,
      } as Partial<LocationData>);
      this.form.setValue({
        address: job.address,
        datetime: moment(job.requestDate).utc().format('MMM D, dddd'),
        selectedEquipmentInput:
          job.equipment && Array.isArray(job.equipment)
            ? job.equipment.map((item) => item.name).join(', ')
            : '',
      });
    });
  }

  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) =>
      this.form.controls[key].reset(),
    );
    this.selectedCoordinates = {
      lat: undefined,
      lng: undefined,
    };
    this.selectedEquipment = [];
    this.selectedDate = '';
    

    this.addressComponent.cdRef.markForCheck();

    for (const control of this.selectComponent.optionsControls) {
      control[2].setValue(false);
    }
    this.triggerCDChildren.next();
  }

  submit() {
    if (this.form.invalid) {
      for (const key of Object.keys(this.form.controls)) {
        this.form.controls[key].markAsDirty();
      }
      this.addressComponent.cdRef.markForCheck();
      return;
    }

    const input: CreateJobInput = {
      address: this.form.controls.address.value,
      equipment: this.selectedEquipment,
      lng: this.selectedCoordinates.lng,
      lat: this.selectedCoordinates.lat,
      requestDate: this.selectedDate,
      notes: this.form.controls.notes.value,
      priority: ''
    };
    if (this.uploadedPo) {
      input.poFile = this.uploadedPo;
    }
    if (this.jobId) {
      this.updateJobGQL
        .mutate(
          {
            input: { ...input, id: this.jobId },
          },
          {
            context: {
              useMultipart: true,
            },
          },
        )
        .subscribe(() => {
          this.router.navigate(['/builder', 'jobs']);
        });
    } else {
      this.createJobGQL
        .mutate(
          {
            input,
          },
          {
            context: {
              useMultipart: true,
            },
          },
        )
        .subscribe(() => {
          this.router.navigate(['/builder', 'jobs']);
        });
    }
  }

  poUpload(file: File) {
    this.uploadedPo = file;
  }

  ionViewWillLeave() {
    this.resetForm();
  }
}
