import { Component, Input } from '@angular/core';
import { DataModel } from '../../data/data.model';

@Component({
  selector: 'app-ngx-bar-chart',
  templateUrl: './ngx-bar-chart.component.html',
  styleUrls: ['./ngx-bar-chart.component.css']
})
export class NgxBarChartComponent {

  @Input()
  set results(results: DataModel[]) {
    console.log(results);
    if (!!results) {
      this._results = [...results];
      this._xAxisTicks = results.map(it => it.name);
    }
  }

  get results(): DataModel[] {
    return this._results;
  }

  get xAxisTicks(): string[] {
    return this._xAxisTicks;
  }

  gradient = false;

  private _results: DataModel[] = [];
  private _xAxisTicks: string[] = [];
}
