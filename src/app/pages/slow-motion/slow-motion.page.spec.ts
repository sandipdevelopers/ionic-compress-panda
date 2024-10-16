import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlowMotionPage } from './slow-motion.page';

describe('SlowMotionPage', () => {
  let component: SlowMotionPage;
  let fixture: ComponentFixture<SlowMotionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowMotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
