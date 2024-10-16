import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem('onboardingComplete');

    if (onboardingComplete) {
      // Onboarding is complete, proceed to the requested page
      return true;
    } else {
      // Onboarding not complete, redirect to onboarding page
      this.router.navigate(['/onboarding']);
      return false;
    }
  }
}
