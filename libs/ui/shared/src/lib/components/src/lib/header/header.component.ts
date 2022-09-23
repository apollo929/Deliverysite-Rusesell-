import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { StateService } from '@dfobobcat/ui/shared/service';
import { User } from '@dfobobcat/ui/shared/model';
import { ModalController } from '@ionic/angular';
import { ProfileDialogComponent } from '@dfobobcat/ui/shared/dialog';

@Component({
  selector: 'bc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  userName$ = new Observable<string>();
  modal!: HTMLIonModalElement;
  constructor(
    private state: StateService,
    public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.userName$ = this.state
      .select((state) => state.user)
      .pipe(
        filter((user) => !!user),
        map((user: User | undefined) => (user ? user.name : 'Guest')),
      );
  }

  presentModal() {
    this.showModal().subscribe();
  }

  private showModal(): Observable<void> {
    return from(
      this.modalController.create({
        component: ProfileDialogComponent,
        cssClass: 'bc-modal',
      }),
    ).pipe(
      tap((modal) => (this.modal = modal)),
      concatMap((modal) => from(modal.present())),
    );
  }
}
