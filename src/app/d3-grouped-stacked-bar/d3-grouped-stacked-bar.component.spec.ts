import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3GroupedStackedBarComponent } from './d3-grouped-stacked-bar.component';

describe('D3GroupedStackedBarComponent', () => {
  let component: D3GroupedStackedBarComponent;
  let fixture: ComponentFixture<D3GroupedStackedBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3GroupedStackedBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GroupedStackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
