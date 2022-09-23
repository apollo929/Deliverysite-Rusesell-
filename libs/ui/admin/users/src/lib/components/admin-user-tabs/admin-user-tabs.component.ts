import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'dfobobcat-admin-user-tabs',
  templateUrl: './admin-user-tabs.component.html',
  styleUrls: ['./admin-user-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserTabsComponent implements OnDestroy, OnInit {
  searchForm: FormGroup;
  searchSubmit$ = new Subject();
  destroy$ = new Subject();
  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }
  ngOnInit() {
    /* this.router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => event as RoutesRecognized),
        takeUntil(this.destroy$),
      )
      .subscribe((route) => {
        const url = route.urlAfterRedirects;
        if (url.match(/builder/)) {

        }
      }); */
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }
}
