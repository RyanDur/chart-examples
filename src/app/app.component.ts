import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data$: Observable<DataModel[]>;

  constructor(private _http: HttpClient) {
    this.data$ = this._http.get<DataModel[]>('assets/data.json');
  }
}
