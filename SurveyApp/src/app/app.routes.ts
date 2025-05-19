import { Routes } from '@angular/router';
import { SurveysComponent } from '@modules/survey/surveys/surveys.component';
import { LoginComponent } from '@modules/auth/login/login.component';
import { RegisterComponent } from '@modules/auth/register/register.component';
import { CreateSurveyComponent } from '@modules/survey/create-survey/create-survey.component';
import { SurveyComponent } from '@modules/survey/survey/survey.component';
import { ResultsComponent } from './modules/results/results/results.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { GuestGuard } from '@core/guards/guest.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'surveys', component: SurveysComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'create-survey', component: CreateSurveyComponent, canActivate: [AuthGuard] },
    { path: 'survey/:id', component: SurveyComponent, canActivate: [AuthGuard] },
    { path: 'results/:id', component: ResultsComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];
