import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxBarChartComponent } from './ngx-bar-chart/ngx-bar-chart.component';
import { NgxStackedBarComponent } from './ngx-stacked-bar/ngx-stacked-bar.component';

@NgModule({
  declarations: [
    NgxBarChartComponent,
    NgxStackedBarComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [
    NgxBarChartComponent,
    NgxStackedBarComponent
  ]
})
export class NgxExampleChartsModule {}
