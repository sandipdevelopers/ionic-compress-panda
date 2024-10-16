import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCompressPage } from './video-compress.page';

describe('VideoCompressPage', () => {
  let component: VideoCompressPage;
  let fixture: ComponentFixture<VideoCompressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCompressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
