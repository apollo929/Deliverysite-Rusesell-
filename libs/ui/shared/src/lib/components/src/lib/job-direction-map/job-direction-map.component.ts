import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { LocationData } from '@dfobobcat/ui/shared/model';
import { GoogleMapService } from '@dfobobcat/ui/shared/service';
declare let google: any;
@Component({
  selector: 'bc-job-direction-map',
  templateUrl: './job-direction-map.component.html',
  styleUrls: ['./job-direction-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDirectionMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapEl', { read: ElementRef }) mapEl!: ElementRef;
  map!: google.maps.Map;

  @Input() coordindates!: Partial<LocationData>;

  constructor(private googleMapService: GoogleMapService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.googleMapService.mapsLoaded.subscribe((loaded) => {
      if (loaded && this.coordindates.lat && this.coordindates.lng) {
        this.map = new google.maps.Map(this.mapEl.nativeElement, {
          zoom: 18,
          center: this.coordindates,
        });
        const marker = new google.maps.Marker({
          position: this.coordindates,
          map: this.map,
        });
      }
    });
  }
}
