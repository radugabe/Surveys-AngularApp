import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Survey } from '@models/survey.model';
import { Response } from '@models/response.model';
import { Router } from '@angular/router';
import { API_ENDPOINTS, API_PATTERNS } from '@core/constants';
import { DialogService } from '@core/services/dialog.service';
import { replaceTokensWithValues } from '@core/utils';
import { MESSAGES, TEXTS } from '@core/constants';

@Component({
  selector: 'results-page',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  standalone: false
})
export class ResultsComponent implements OnInit {
  survey = signal<Survey | null>(null);
  aggregatedResults = signal<{ [questionIndex: number]: { [option: string]: number } }>({});
  options: string[] = ['table', 'bar', 'line', 'pie', 'doughnut'];
  selectedView = signal<'table' | 'bar' | 'line' | 'pie' | 'doughnut'>('table');
  texts = TEXTS.results;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private dialog: DialogService
  ) {}

  goToHome() {
    this.router.navigate(['/surveys']);
  }

  ngOnInit(): void {
    this.loadSurveyWithResponses();
  }

  private getSurveyIdFromRoute(): number {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.dialog.show(MESSAGES.SURVEY_LOAD_ERROR, 'error');
      this.router.navigate(['/surveys']);
      throw new Error('Survey ID missing');
    }
    return +id;
  }

  private loadSurveyWithResponses(): void {
    const surveyId = this.getSurveyIdFromRoute();
    const url = replaceTokensWithValues(
      API_PATTERNS.SURVEY_DETAIL, 
      { surveyId }
    );

    this.httpClient.get<Survey>(url).subscribe(survey => {
      this.survey.set(survey);
      this.loadResponses(surveyId);
    });
  }

  private loadResponses(surveyId: number): void {
    this.httpClient.get<Response[]>(API_ENDPOINTS.RESPONSES).subscribe(responses => {
      const filteredResponses = responses.filter(r => +r.surveyId === surveyId);
      this.initializeAggregatedResults();
      filteredResponses.forEach(response => {
        this.countResponseAnswers(response);
      });
    });
  }

  private initializeAggregatedResults(): void {
    const survey = this.survey();
    if (!survey) {
      this.dialog.show(MESSAGES.SURVEY_LOAD_ERROR, 'error');
      this.router.navigate(['/surveys']);
      return;
    }
    const results: { [questionIndex: number]: { [option: string]: number } } = {};
    survey.questions.forEach((question, questionIndex) => {
      results[questionIndex] = {};
      question.options.forEach(option => {
        results[questionIndex][option] = 0;
      });
    });
    this.aggregatedResults.set(results);
  }

  private countResponseAnswers(response: Response): void {
    const results = this.aggregatedResults();
  
    response.answers.forEach((answerIndex, index) => {
      if (this.isValidAnswer(results, index, answerIndex)) {
        results[index][answerIndex]++;
      }
    });
  
    this.aggregatedResults.set(results);
  }
  

  private isValidAnswer (
    results: { [questionIndex: number]: { [option: string]: number } },
    questionIndex: number,
    answer: string
  ): boolean {
    return (
      results[questionIndex] !== undefined &&
      results[questionIndex][answer] !== undefined
    );
  }
  
}