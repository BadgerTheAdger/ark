import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerdInfoComponent } from './herd-info.component';

describe('HerdInfoComponent', () => {
  let component: HerdInfoComponent;
  let fixture: ComponentFixture<HerdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
