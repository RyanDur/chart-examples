import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { MultiDatModel } from '../data/data.model';

@Component({
  selector: 'app-d3-grouped-stacked-bar',
  templateUrl: './d3-grouped-stacked-bar.component.html',
  styleUrls: ['./d3-grouped-stacked-bar.component.css'],
  encapsulation: ViewEncapsulation.None
  // needed to not include Angular's default styling
})
export class D3GroupedStackedBarComponent implements OnChanges {

  @Input() data: MultiDatModel[];

  @ViewChild('charStacked', { static: false })
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

  _createChart() {
    d3.select('svg').remove();

    const element = this._chartContainer.nativeElement;
    const data = [];

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

// d3.select('svg').remove();

// const element = this._chartContainer.nativeElement;

// const svg = d3.select(element).append('svg')
//   .attr('width', element.offsetWidth)
//   .attr('height', element.offsetHeight);

// const margin = { top: 40, right: 100, bottom: 60, left: 60 };
// const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
// const width = element.offsetWidth - margin.left - margin.right;
// const height = element.offsetHeight - margin.top - margin.bottom;

// const x0 = d3
//   .scaleBand()
//   .rangeRound([0, width])
//   .paddingInner(0.1)
//   .domain(this.data.map(it => it.name));

// const x1 = d3.scaleBand()
//   .padding(0.05);

// const y = d3.scaleLinear()
//   .rangeRound([height, 0]);

// const y1 = d3.scaleBand();

// const z = d3.scaleOrdinal()
//   .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

// const stack = d3.stack()
//   .offset(d3.stackOffsetExpand);

// // d3.csv('data.csv', function (error, data) {
// //   if (error) throw error;

    //   data.forEach(function (d) {
    //     d.Value = +d.Value;
    //   })
    //
    //   console.log('data', data);
    //
    //   x0.domain(data.map(function (d) { return d.State; }));
    //   x1.domain(data.map(function (d) { return d.Year; }))
    //     .rangeRound([0, x0.bandwidth()])
    //     .padding(0.2);
    //
    //   z.domain(data.map(function (d) { return d.AgeGroup; }))
    //   let keys = z.domain()
    //
    //   let groupData = d3.nest()
    //     .key(function (d) { return d.Year + d.State; })
    //     .rollup(function (d, i) {
    //
    //       let d2 = { Year: d[0].Year, State: d[0].State }
    //       d.forEach(function (d) {
    //         d2[d.AgeGroup] = d.Value
    //       })
    //       console.log('rollup d', d, d2);
    //       return d2;
    //     })
    //     .entries(data)
    //     .map(function (d) { return d.value; });
    //
    //   console.log('groupData', groupData)
    //
    //   let stackData = stack
    //     .keys(keys)(groupData)
    //
    //   console.log('stackData', stackData)
    //
    //   //y.domain([0, d3.max(data, function(d) { return d.Value; })]).nice();
    //
    //   console.log('keys', keys)
    //
    //   let serie = g.selectAll('.serie')
    //     .data(stackData)
    //     .enter().append('g')
    //     .attr('class', 'serie')
    //     .attr('fill', function (d) { return z(d.key); });
    //
    //   serie.selectAll('rect')
    //     .data(function (d) { return d; })
    //     .enter().append('rect')
    //     .attr('class', 'serie-rect')
    //     .attr('transform', function (d) { return 'translate(' + x0(d.data.State) + ',0)'; })
    //     .attr('x', function (d) { return x1(d.data.Year); })
    //     .attr('y', function (d) { return y(d[1]); })
    //     .attr('height', function (d) { return y(d[0]) - y(d[1]); })
    //     .attr('width', x1.bandwidth())
    //     .on('click', function (d, i) { console.log('serie-rect click d', i, d); });
    //
//    g.append('g')
    //    .attr('class', 'axis')
    //  .attr('transform', 'translate(0,' + height + ')')
    //.call(d3.axisBottom(x0));
    //
    //   g.append('g')
    //     .attr('class', 'axis')
    //     .call(d3.axisLeft(y).ticks(null, 's'))
    //     .append('text')
    //     .attr('x', 2)
    //     .attr('y', y(y.ticks().pop()) + 0.5)
    //     .attr('dy', '0.32em')
    //     .attr('fill', '#000')
    //     .attr('font-weight', 'bold')
    //     .attr('text-anchor', 'start')
    //     .text('Population');
    //   /*
    //     let legend = g.append("g")
    //         .attr("font-family", "sans-serif")
    //         .attr("font-size", 10)
    //         .attr("text-anchor", "end")
    //       .selectAll("g")
    //       .data(keys.slice().reverse())
    //       .enter().append("g")
    //         .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    //
    //     legend.append("rect")
    //         .attr("x", width - 19)
    //         .attr("width", 19)
    //         .attr("height", 19)
    //         .attr("fill", z);
    //
    //     legend.append("text")
    //         .attr("x", width - 24)
    //         .attr("y", 9.5)
    //         .attr("dy", "0.32em")
    //         .text(function(d) { return d; });
    //         */
    //
    //   let legend = serie.append('g')
    //     .attr('class', 'legend')
    //     .attr('transform', function (d) {
    //       let d = d[d.length - 1];
    //       return 'translate(' + (x0(d.data.State) + x1(d.data.Year) + x1.bandwidth()) + ',' + ((y(d[0]) + y(d[1])) /
    // 2) + ')'; });  legend.append('line') .attr('x1', -6) .attr('x2', 6) .attr('stroke', '#000');
    // legend.append('text') .attr('x', 9) .attr('dy', '0.35em') .attr('fill', '#000') .style('font', '10px
    // sans-serif') .text(function (d) { return d.key; }); }
  }

}
