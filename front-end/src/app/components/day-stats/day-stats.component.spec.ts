import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayStatsComponent } from './day-stats.component';

describe('DayStatsComponent', () => {
  let component: DayStatsComponent;
  let fixture: ComponentFixture<DayStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayStatsComponent]
    });
    fixture = TestBed.createComponent(DayStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
