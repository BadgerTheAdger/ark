import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalWeightStatsComponent } from './animal-weight-stats.component';

describe('AnimalWeightStatsComponent', () => {
  let component: AnimalWeightStatsComponent;
  let fixture: ComponentFixture<AnimalWeightStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalWeightStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalWeightStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
