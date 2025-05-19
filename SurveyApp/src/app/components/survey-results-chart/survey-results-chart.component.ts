import { Component, Input } from '@angular/core';
import { Survey } from '@models/survey.model';

@Component({
  selector: 'survey-results-chart',
  templateUrl: './survey-results-chart.component.html',
  standalone: false
})
export class SurveyResultsChartComponent {
  @Input() selectedView!: 'table' | 'bar' | 'pie' | 'line' | 'doughnut';
  @Input() survey!: Survey;
  @Input() aggregatedResults!: { [questionIndex: number]: { [option: string]: number } };
}
