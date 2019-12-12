import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel, DayModel, MultiDatModel } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  singleData$: Observable<DataModel[]>;
  multiData$: Observable<MultiDatModel[]>;
  d3StackData$: Observable<DayModel[]>;

  constructor(private _http: HttpClient) {
    this.singleData$ = this._http.get<DataModel[]>('assets/data.json');
    this.multiData$ = this._http.get<MultiDatModel[]>('assets/multi.json');
    this.d3StackData$ = this._http.get<DayModel[]>('assets/d3-stack.json');
  }
}
