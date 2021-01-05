import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterControlComponent } from './date-filter-control.component';

describe('DateFilterControlComponent', () => {
  let component: DateFilterControlComponent;
  let fixture: ComponentFixture<DateFilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
