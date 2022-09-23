import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef,
  Optional,
  Self,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { LocationData } from '@dfobobcat/ui/shared/model';
import { GoogleMapService } from '../../../../service/src';

declare let google: any;
@Component({
  selector: 'bc-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInputComponent implements OnDestroy, AfterViewInit {
  @ViewChild(InputComponent) addressInput!: InputComponent;
  _addressValue = '';
  destroy$ = new Subject();
  googleAutocomplete: any;
  @Output()
  selected = new EventEmitter<Partial<LocationData>>();

  suggestions$ = new BehaviorSubject<
    {
      address: string;
      placeId: string;
    }[]
  >([]);
  googleAutocompleteConfig = {
    fields: ['geometry', 'formatted_address'],
    componentRestrictions: { country: 'au' },
    types: ['address'],
  };

  @Input()
  locData!: LocationData;

  constructor(
    public cdRef: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    private googleMapService: GoogleMapService,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  async ngAfterViewInit() {
    this.googleMapService.mapsLoaded.subscribe(async (loaded) => {
      if (loaded) {
        const input = await this.addressInput.ionInput.getInputElement();
        input.style.paddingLeft = '16px';
        input.style.paddingRight = '36px';
        this.googleAutocomplete = new google.maps.places.Autocomplete(
          input,
          this.googleAutocompleteConfig,
        );

        this.googleAutocomplete.addListener(
          'place_changed',
          this.setAddress.bind(this),
        );
      }
    });
  }

  setAddress(data: any) {
    const place = this.googleAutocomplete.getPlace();
    this.selected.emit({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    this.writeValue(place.formatted_address);
  }

  clearAddress() {
    this.writeValue('');
    this.ngControl &&
      this.ngControl.control &&
      this.ngControl.control.setValue('', { emitEvent: false });

    this.selected.emit({
      lng: undefined,
      lat: undefined,
    });
  }

  writeValue(value: any) {
    this._addressValue = value;
    this.ngControl &&
      this.ngControl.control &&
      this.ngControl.control.setValue(value, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      });
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: any = () => {};
  onTouched: any = () => {};
  ngOnDestroy() {
    this.destroy$.next();
  }
}
