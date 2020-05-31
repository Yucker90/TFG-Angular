import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoldetailsComponent } from './roldetails.component';

describe('RoldetailsComponent', () => {
  let component: RoldetailsComponent;
  let fixture: ComponentFixture<RoldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
