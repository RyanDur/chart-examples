import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxBarChartComponent } from './ngx-bar-chart/ngx-bar-chart.component';

@NgModule({
  declarations: [
    NgxBarChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [
    NgxBarChartComponent
  ]
})
export class NgxExampleChartsModule {}
