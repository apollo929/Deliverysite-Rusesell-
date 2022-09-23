import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
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
  UsersGQL
} from '@dfobobcat/graphql-types';
import {
  concatMap,
  take,
  tap,
  takeUntil,
  switchMap
} from 'rxjs/operators';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, ReplaySubject, Subject, from, combineLatest, BehaviorSubject } from 'rxjs';
import {
  AddressInputComponent,
  SelectComponent,
} from '@dfobobcat/ui/shared/component';
import { ORDER_DIRECTION } from '@dfobobcat/ui/shared/model';

import { LocationData } from '@dfobobcat/ui/shared/model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bc-create-jobs-dialog-dialog',
  templateUrl: './create-jobs-dialog.component.html',
  styleUrls: ['./create-jobs-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateJobsDialogComponent implements ViewWillEnter, ViewWillLeave {
  @ViewChild(AddressInputComponent) addressComponent!: AddressInputComponent;
  @ViewChild(SelectComponent) selectComponent!: SelectComponent;
  form!: FormGroup;
  perfectScrollbarConfig = {};
  jobId!: number;
  @Input() modal!: HTMLIonModalElement;
  equipment$ = new Subject<Record<number, string>>();
  builder$ = new Subject<Record<number, string>>();
  destroy$ = new Subject();

  ORDER_DIRECTION = ORDER_DIRECTION;

  minDate$ = new ReplaySubject<moment.Moment>(1);
  selectedDate = '';
  selectedEquipment: Array<number> = [];
  selectedBuilder: Array<number> = [];
  selectedCoordinates: Partial<LocationData> = {
    lat: undefined,
    lng: undefined,
  };
  uploadedPo!: File;
  finish = new Subject<boolean>();

  job$ = new Subject<JobQuery['job']>();
  uploadedPO$ = new Subject<string>();
  orderKeys = {
    'user.name': 'Name',
    'user.email': 'Email',
  };
  orderBy$ = new BehaviorSubject<string>('user.name');
  orderDirection$ = new BehaviorSubject<ORDER_DIRECTION>(ORDER_DIRECTION.DESC);

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
    private usersGQL: UsersGQL,
  ) {
    this.form = fb.group({
      datetime: ['', [Validators.required]],
      selectedEquipmentInput: ['', [Validators.required]],
      selectedBuilderInput: ['', [Validators.required]],
      address: ['', [Validators.required]],
      notes: [''],
      priority: [''],
    });
  }
  ngOnInit(): void {
    combineLatest(
      this.orderBy$,
      this.orderDirection$,
    )
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.getUsers()),
      )
      .subscribe();
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
  get selectedBuilderInput() {
    return this.form.get('selectedBuilderInput') as FormControl;
  }

  get stage() {
    return this.form.get('stage') as FormControl;
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
  builderSelected(builder: Array<number>) {
    this.selectedBuilder = builder;
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


  getUsers() {
    return combineLatest(
      this.orderBy$,
      this.orderDirection$,
    ).pipe(
      take(1),
      concatMap(([orderBy, orderDirection]) => {
        return this.usersGQL.fetch({
          role: 'builder',
          orderBy: `${orderDirection}${orderBy}`,
        });
      }),
      map((result) => result.data.users),
      tap((result) => {
        const builder = result.items.reduce(
          (prev: Record<number, string>, curr: any) => {
            prev[curr.id] = curr.name;
            return prev;
          },
          {},
        );
        this.builder$.next(builder);
      }),
    );
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
    this.selectedBuilder = [];
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
      priority: '',
      type: 'created',
      time: new Date().toISOString(),
      adminSelectedBuilder: this.selectedBuilder[0]
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
          window.location.reload()
          this.finish.next(true)
          this.close();
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
          this.finish.next(true)
          window.location.reload()
          this.close();
        });
    }
  }

  poUpload(file: File) {
    this.uploadedPo = file;
  }

  ionViewWillLeave() {
    this.resetForm();
  }
  close() {
    this.dismissModal().subscribe();
  }

  private dismissModal(): Observable<boolean> {
    return from(this.modal.dismiss());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
