import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoToMp3Page } from './video-to-mp3.page';

describe('VideoToMp3Page', () => {
  let component: VideoToMp3Page;
  let fixture: ComponentFixture<VideoToMp3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoToMp3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
