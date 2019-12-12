import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { DataModel } from '../data/data.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
  // needed to not include Angular's default styling
})
export class BarChartComponent implements OnChanges {

  @Input() data: DataModel[];

  @ViewChild('chart', { static: false })
  private _chartContainer: ElementRef;

  private _margin = { top: 20, right: 20, bottom: 30, left: 40 };

  ngOnChanges(changes: SimpleChanges) {
    if (!this.data) {
      return;
    }

    this._createChart();
  }

  onResize() {
    this._createChart();
  }

  private _createChart() {
    d3.select('#chart svg').remove();

    const element = this._chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this._margin.left - this._margin.right;
    const contentHeight = element.offsetHeight - this._margin.top - this._margin.bottom;

    const xAxis = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.name));

    const yAxis = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(xAxis));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yAxis).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xAxis(d.name))
      .attr('y', d => yAxis(d.value))
      .attr('width', xAxis.bandwidth())
      .attr('height', d => contentHeight - yAxis(d.value));
  }
}
