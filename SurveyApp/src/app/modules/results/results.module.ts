import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { MaterialModule } from '@modules/material-module';
import { ResultsComponent } from './results/results.component';
import { ResultsTableComponent } from '@components/charts/results-table/results-table.component';
import { ResultsBarChartComponent } from '@components/charts/results-bar-chart.component';
import { ResultsPieChartComponent } from '@components/charts/results-pie-chart.component';
import { ResultsLineChartComponent } from '@components/charts/results-line-chart.component';
import { ResultsDoughnutChartComponent } from '@components/charts/results-doughnut-chart.component';
import { SurveyResultsChartComponent } from '@components/survey-results-chart/survey-results-chart.component';

@NgModule({
  declarations: [
    ResultsComponent,
    ResultsTableComponent,
    ResultsBarChartComponent,
    ResultsPieChartComponent,
    ResultsLineChartComponent,
    ResultsDoughnutChartComponent,
    SurveyResultsChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgChartsModule,
    MaterialModule
  ]
})
export class ResultsModule { }