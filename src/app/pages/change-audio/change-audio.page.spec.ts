import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeAudioPage } from './change-audio.page';

describe('ChangeAudioPage', () => {
  let component: ChangeAudioPage;
  let fixture: ComponentFixture<ChangeAudioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
