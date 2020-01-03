import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenDataComponent } from './sen-data.component';

describe('SenDataComponent', () => {
  let component: SenDataComponent;
  let fixture: ComponentFixture<SenDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
