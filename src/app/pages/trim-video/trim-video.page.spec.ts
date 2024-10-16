import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrimVideoPage } from './trim-video.page';

describe('TrimVideoPage', () => {
  let component: TrimVideoPage;
  let fixture: ComponentFixture<TrimVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
