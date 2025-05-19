import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material-module';

import { SurveysComponent } from './surveys/surveys.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveysCardComponent } from './surveys-card/surveys-card.component';
import { QuestionFormComponent } from '@components/question-form/question-form-component';

@NgModule({
  declarations: [
    SurveysComponent,
    CreateSurveyComponent,
    SurveyComponent,
    SurveysCardComponent,
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class SurveyModule { }