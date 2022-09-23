import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
} from '@angular/core';
import { ClockOffsQuery } from '@dfobobcat/graphql-types';
import { ConfigService } from '@dfobobcat/ui/shared/service';
@Component({
  selector: 'bc-clockoff-card',
  templateUrl: './clockoff-card.component.html',
  styleUrls: ['./clockoff-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockoffCardComponent implements OnInit {
  constructor(private config: ConfigService) {}

  @HostBinding('class.hidden')
  hidden = false;
  @Input()
  clockOff: any = {};

  @Input()
  type = 'clockOff';
  clockOffImageBase!: string;
  ngOnInit() {
    const typeDir = this.type === 'clockIn' ? 'clock-in' : 'clock-off';
    this.clockOffImageBase = `${this.config.get('beUrl')}/${typeDir}/${
      this.clockOff.id
    }`;
  }
  openImage(event: MouseEvent) {
    const image: HTMLElement = event.target as HTMLElement;
    image.style.display = 'block';
    image.style.width = 200 + 'px';
    image.style.height = 200 + 'px';
    const url: string = image.getAttribute('src') as string;
    window.open(
      url,
      'Image',
      'width=image.stylewidth,height=image.style.height,resizable=1',
    );
  }
}
