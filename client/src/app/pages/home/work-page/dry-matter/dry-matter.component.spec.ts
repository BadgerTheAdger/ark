import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DryMatterComponent } from './dry-matter.component';

describe('DryMatterComponent', () => {
  let component: DryMatterComponent;
  let fixture: ComponentFixture<DryMatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DryMatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DryMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
