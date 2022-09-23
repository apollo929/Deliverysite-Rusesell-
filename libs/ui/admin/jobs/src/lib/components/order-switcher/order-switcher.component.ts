import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dfobobcat-order-switcher',
  templateUrl: './order-switcher.component.html',
  styleUrls: ['./order-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSwitcherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
