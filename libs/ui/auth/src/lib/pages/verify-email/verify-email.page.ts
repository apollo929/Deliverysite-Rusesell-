import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { VerifyEmailGQL } from '@dfobobcat/graphql-types';

@Component({
  selector: 'bc-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  message$ = new BehaviorSubject<string>('');
  constructor(
    private route: ActivatedRoute,
    private verifyEmailGQL: VerifyEmailGQL,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        concatMap((params) => {
          if (!params.token) {
            return of(undefined);
          }
          const token = params.token;
          return this.verifyEmailGQL.mutate({
            token,
          });
        }),
        tap((result: any) => {
          if (result) {
            this.message$.next(
              'Email verified! Please log in using your credentials.',
            );
          } else {
            this.message$.next('There was an error verifying your email.');
          }
        }),
      )
      .subscribe(() => {});
  }
}
