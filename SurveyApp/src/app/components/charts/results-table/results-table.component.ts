import { Component, Input } from '@angular/core';
import { Survey } from '@models/survey.model';
import { TEXTS } from '@core/constants';

@Component({
  selector: 'results-table',
  templateUrl: './results-table.component.html',
  standalone: false
})
export class ResultsTableComponent {
  @Input() survey!: Survey;
  @Input() aggregatedResults!: { [questionIndex: number]: { [option: string]: number } | undefined };

  texts = TEXTS.resultsTable;
  displayedColumns = ['option', 'count'];
}
