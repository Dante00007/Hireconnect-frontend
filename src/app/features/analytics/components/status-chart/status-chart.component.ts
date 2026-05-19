import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-status-chart',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './status-chart.component.html',

  styleUrls:
    ['./status-chart.component.css']
})
export class StatusChartComponent {

  @Input()
  data:
    Record<string, number> = {};

  get entries() {

    return Object.entries(
      this.data
    );

  }

  get maxValue(): number {

    const values =
      Object.values(this.data);

    return values.length
      ? Math.max(...values)
      : 1;

  }

  getBarWidth(
    value: number
  ): number {

    return (
      value / this.maxValue
    ) * 100;

  }

}