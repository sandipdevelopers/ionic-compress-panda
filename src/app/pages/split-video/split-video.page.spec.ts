import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitVideoPage } from './split-video.page';

describe('SplitVideoPage', () => {
  let component: SplitVideoPage;
  let fixture: ComponentFixture<SplitVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
