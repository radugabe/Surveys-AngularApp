import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TEXTS } from '@core/constants';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  standalone: false
})
export class NotFoundComponent {
  texts = TEXTS.notFound;

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/surveys']);
  }
}
