import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocationData } from '@dfobobcat/ui/shared/model';
import { JobLocationGQL } from '@dfobobcat/graphql-types';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dfobobcat-job-directions',
  templateUrl: './job-directions.page.html',
  styleUrls: ['./job-directions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDirectionsPage implements OnInit {
  jobId!: number;
  coordinates$ = new Subject<Partial<LocationData>>();
  addressControl = new FormControl('');
  address:string = "";
  constructor(
    private jobLocationGQL: JobLocationGQL,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.jobId = +params.id;
      this.jobLocationGQL
        .fetch({
          id: this.jobId,
        })
        .subscribe((data) => {
          const { address, ...direction } = data.data.job;
          this.addressControl.setValue(address);
          this.address = address;
          this.coordinates$.next(direction as LocationData);
        });
    });
  }
}
