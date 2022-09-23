import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProfileDialogComponent } from '@dfobobcat/ui/shared/dialog';
import { tap, concatMap } from 'rxjs/operators';
import { SearchService } from '@dfobobcat/ui/admin/shared/service';

@Component({
  selector: 'bc-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  searchForm: FormGroup;
  modal!: HTMLIonModalElement;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('searchText')
  searchSubmit$ = new EventEmitter<string>();
  get searchCtrl(): FormControl {
    return this.searchForm.get('searchCtrl') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private searchService: SearchService,
  ) {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }

  presentModal() {
    this.showModal().subscribe();
  }

  search() {
    this.searchSubmit$.next(this.searchCtrl.value);
    this.searchService.search$.next(this.searchCtrl.value);
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
