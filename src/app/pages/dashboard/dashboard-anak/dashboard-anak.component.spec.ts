import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnakComponent } from './dashboard-anak.component';

describe('DashboardAnakComponent', () => {
  let component: DashboardAnakComponent;
  let fixture: ComponentFixture<DashboardAnakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAnakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAnakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
