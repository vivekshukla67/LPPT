import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowFilterControlComponent } from './overflow-filter-control.component';

describe('OverflowFilterControlComponent', () => {
  let component: OverflowFilterControlComponent;
  let fixture: ComponentFixture<OverflowFilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverflowFilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverflowFilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
