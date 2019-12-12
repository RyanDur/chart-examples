import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { DayModel, MultiDatModel } from '../data/data.model';

export enum BarColor {
  APG = '#009EE2',
  COMNAV = '#002560',
  ELEN = '#FBB033',
  HYDRO = '#F87200',
  IFCS = '#704AA6',
  JETS = '#7FBE00',
  UNAVAILABLE = '#E6E6E6'
}

@Component({
  selector: 'app-bar-chart-stack',
  templateUrl: './bar-chart-stack.component.html',
  styleUrls: ['./bar-chart-stack.component.css'],
  encapsulation: ViewEncapsulation.None
  // needed to not include Angular's default styling
})
export class BarChartStackComponent implements OnChanges {

  @Input() data: DayModel[];

  @ViewChild('chartStack', { static: false })
  private _chartContainer: ElementRef;

  private _margin = { top: 20, right: 20, bottom: 0, left: 20 };

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
    d3.select('#chart-stack svg').remove();

    const element = this._chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const width = element.offsetWidth - this._margin.left - this._margin.right;
    const height = element.offsetHeight - this._margin.top - this._margin.bottom;
    const sum = (arr: number[]): number => arr.reduce((prev, next) => prev + next, 0);
    const maxPeople = Math.max(...data.map(it => Math.max(sum(Object.values(it.nightShift)), sum(Object.values(it.dayShift)))));
    const xAxis = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.5)
      .domain(data.map(d => d.day));

    const yAxis = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, maxPeople]).nice();

    const z = d3.scaleOrdinal()
      .range([
        BarColor.UNAVAILABLE,
        BarColor.APG,
        BarColor.COMNAV,
        BarColor.ELEN,
        BarColor.HYDRO,
        BarColor.IFCS,
        BarColor.JETS
      ]);
    z.domain([
      'UNAVAILABLE',
      'APG',
      'COMNAV',
      'ELEN',
      'HYDRO',
      'IFCS',
      'JETS'
    ]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');

    const keys = [
      'JETS',
      'IFCS',
      'HYDRO',
      'ELEN',
      'COMNAV',
      'APG',
      'UNAVAILABLE'
    ];

    const groupedData = this.data.map(it => {
      return [{
        shift: 'DayModel Shift',
        day: it.day,
        UNAVAILABLE: it.dayShift.LEAVE,
        APG: it.dayShift.APG,
        COMNAV: it.dayShift.COMNAV,
        ELEN: it.dayShift.ELEN,
        HYDRO: it.dayShift.HYDRO,
        IFCS: it.dayShift.IFCS,
        JETS: it.dayShift.JETS
      }, {
        shift: 'Night Shift',
        day: it.day,
        UNAVAILABLE: it.nightShift.LEAVE,
        APG: it.nightShift.APG,
        COMNAV: it.nightShift.COMNAV,
        ELEN: it.nightShift.ELEN,
        HYDRO: it.nightShift.HYDRO,
        IFCS: it.nightShift.IFCS,
        JETS: it.nightShift.JETS
      }];
    }).reduce((cummulative, current) => [...cummulative, ...current], []);
    console.log('groupData', groupedData);

    const stack = d3.stack()
      .offset(d3.stackOffsetNone);

    const stackData = stack
      .keys(keys)(groupedData as any);

    console.log('stackData', stackData);

    const serie = g.selectAll('.serie')
      .data(stackData)
      .enter().append('g')
      .attr('class', 'serie')
      .attr('fill', d => z(d.key) as any);

    const x1 = d3.scaleBand()
      .domain(['DayModel Shift', 'Night Shift'])
      .rangeRound([0, xAxis.bandwidth()])
      .padding(0.3);

    serie.selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('class', 'serie-rect')
      .attr('transform', d => 'translate(' + xAxis(d.data.day as any) + ',0)')
      .attr('x', d => x1(d.data.shift as any))
      .attr('y', d => yAxis(d[1]))
      .attr('height', d => yAxis(d[0]) - yAxis(d[1]))
      .attr('width', x1.bandwidth())
      .on('click', (d, i) => { console.log('serie-rect click d', i, d); });


  }
}
