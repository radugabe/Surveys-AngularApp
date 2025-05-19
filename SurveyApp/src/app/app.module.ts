import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core.module';
import { SharedModule } from './modules/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ResultsModule } from './modules/results/results.module';
import { MaterialModule } from './modules/material-module';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule,
    AuthModule,
    SurveyModule,
    ResultsModule,
    MaterialModule
  ],
  providers: [
    { provide: 'ZoneChangeDetection', useValue: { eventCoalescing: true } },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }