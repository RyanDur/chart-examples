import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStackedBarComponent } from './ngx-stacked-bar.component';

describe('NgxStackedBarComponent', () => {
  let component: NgxStackedBarComponent;
  let fixture: ComponentFixture<NgxStackedBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxStackedBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxStackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
