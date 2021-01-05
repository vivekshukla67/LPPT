import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandBarFilterComponent } from './command-bar-filter.component';

describe('CommandBarFilterComponent', () => {
  let component: CommandBarFilterComponent;
  let fixture: ComponentFixture<CommandBarFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandBarFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandBarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
