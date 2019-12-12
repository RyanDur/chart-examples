import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BarChartStackComponent } from './bar-chart-stack/bar-chart-stack.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxExampleChartsModule } from './ngx-example-charts/ngx-example-charts.module';
import { D3GroupedStackedBarComponent } from './d3-grouped-stacked-bar/d3-grouped-stacked-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    D3GroupedStackedBarComponent,
    BarChartStackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxExampleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
