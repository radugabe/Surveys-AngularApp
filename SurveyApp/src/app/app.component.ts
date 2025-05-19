import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogService } from './core/services/dialog.service';
import { DialogSnackbarComponent } from './components/dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements AfterViewInit {
  title = 'survey-app';
  showHeader = true;

  @ViewChild(DialogSnackbarComponent) dialogSnackbar!: DialogSnackbarComponent;

  constructor(private dialogService: DialogService, private router: Router) {
    const allowedRoutes = [
      '/surveys',
      '/results',
      '/create-survey',
      '/survey'
    ];
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const path = (event as NavigationEnd).urlAfterRedirects.split('?')[0];
      this.showHeader = allowedRoutes.some(route => path.startsWith(route));
    });
  }
  
  

  ngAfterViewInit() {
    this.dialogService.register(this.dialogSnackbar);
  }
}