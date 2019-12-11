import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBarChartComponent } from './ngx-bar-chart.component';

describe('NgxBarChartComponent', () => {
  let component: NgxBarChartComponent;
  let fixture: ComponentFixture<NgxBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxBarChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
