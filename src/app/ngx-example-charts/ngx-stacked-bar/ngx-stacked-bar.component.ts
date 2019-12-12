import { Component, Input } from '@angular/core';
import { MultiDatModel } from '../../data/data.model';

@Component({
  selector: 'app-ngx-stacked-bar',
  templateUrl: './ngx-stacked-bar.component.html',
  styleUrls: ['./ngx-stacked-bar.component.css']
})
export class NgxStackedBarComponent {

  @Input()
  set results(results: MultiDatModel[]) {
    if (!!results) {
      this._results = [...results];
      this._xAxisTicks = results.map(it => it.name);
    }
  }

  get results(): MultiDatModel[] {
    return this._results;
  }

  get xAxisTicks(): string[] {
    return this._xAxisTicks;
  }

  private _results: MultiDatModel[] = [];
  private _xAxisTicks: string[] = [];
}
