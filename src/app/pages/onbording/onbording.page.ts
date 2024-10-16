import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onbording',
  templateUrl: './onbording.page.html',
  styleUrls: ['./onbording.page.scss'],
})
export class OnbordingPage implements OnInit {

  @ViewChild('swiper') swiperRef: ElementRef | any;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  sliderChanges() {
    this.swiperRef?.nativeElement.swiper.slideNext()
  }
  ngAfterViewInit() {
    console.log(this.swiperRef)
  }


  getStarted() {
    localStorage.setItem('onboardingComplete', 'true');
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  
}
