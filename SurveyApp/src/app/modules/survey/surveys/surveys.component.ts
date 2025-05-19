import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Survey } from '@models/survey.model';
import { Response } from '@models/response.model';
import { DialogService } from '@core/services/dialog.service';
import { API_ENDPOINTS, API_PATTERNS, MESSAGES, LOCAL_STORAGE_KEYS, CONFIG_VALUES, TEXTS } from '@core/constants';
import { replaceTokensWithValues } from '@core/utils';

@Component({
  selector: 'surveys-page',
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.css',
  standalone: false
})
export class SurveysComponent implements OnInit {
  surveys: Survey[] = [];
  currentUser = signal<User | null>(null);
  responses = signal<Response[]>([]);
  openSurveys = signal<Survey[]>([]);
  closedSurveys = signal<Survey[]>([]);
  texts = TEXTS.surveys;

  constructor(
    private auth: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.currentUser.set(this.auth.getCurrentUser());
    if (!this.currentUser()) {
      this.dialog.show(MESSAGES.SESSION_EXPIRED, 'error');
      this.router.navigate(['/login']);
      return;
    }

    this.loadSurveys();
    this.loadResponses();
  }

  private loadSurveys(): void {
    this.httpClient.get<Survey[]>(API_ENDPOINTS.SURVEYS)
      .subscribe(surveyList => {
        this.autoCloseSurveys(surveyList);
        this.openSurveys.set(surveyList.filter(s => s.isOpen === true));
        this.closedSurveys.set(surveyList.filter(s => s.isOpen === false));
    });
  }

  private loadResponses(): void {
    this.httpClient.get<Response[]>(API_ENDPOINTS.RESPONSES)
      .subscribe(responseList => {
        this.responses.set(responseList);
    });
  }

  goToCreateSurvey() {
    this.router.navigate(['/create-survey']);
  }  

  hasCompleted(surveyId: string): boolean {
    const user = this.getCurrentUserFromLocalStorage();
    if (!user) {
      this.dialog.show(MESSAGES.INFORMATION_RETRIEVE_ERROR, 'error');
      return false;
    }
    
    return this.responses().some(r => 
      r.surveyId === surveyId && r.userId === user.id
    );
  }  

  private getCurrentUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (!userJson) {
      this.dialog.show(MESSAGES.SESSION_EXPIRED, 'error');
      this.router.navigate(['/login']);
      return null;
    }
    return JSON.parse(userJson);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  completeSurvey(surveyId: string) {
    this.router.navigate(['/survey', surveyId]);
  }
  
  openSurvey(surveyId: string) {
    this.dialog.show(`Open survey with ID: ${surveyId}`, 'info');
  }
  
  deleteSurvey(surveyId: string) {
    this.dialog.confirm(MESSAGES.CONFIRM_DELETE, true).then(confirmed => {
      if (confirmed) {
        this.performSurveyDeletion(surveyId);
      }
    });
  }
  
  private performSurveyDeletion(surveyId: string): void {
    const surveyDeleteUrl = replaceTokensWithValues(
      API_PATTERNS.SURVEY_DETAIL,
      { surveyId }
    );

    this.httpClient.delete(surveyDeleteUrl).subscribe({
      next: () => this.handleSuccessfulDeletion(surveyId),
      error: () => this.handleDeletionError()
    });
  }
  
  private handleSuccessfulDeletion(surveyId: string): void {
    this.dialog.show(MESSAGES.SURVEY_DELETED, 'success');
    this.surveys = this.surveys.filter(s => s.id !== surveyId);
    
    this.deleteRelatedResponses(surveyId);
    this.refreshSurveys();
    this.reloadResponses();
  }
  
  private deleteRelatedResponses(surveyId: string): void {
    const relatedResponses = this.responses().filter(r => r.surveyId === surveyId);
    
    relatedResponses.forEach(r => {
      const responseDeleteUrl = replaceTokensWithValues(
        API_PATTERNS.RESPONSE_DETAIL, 
        { responseId: r.id }
      );
      this.httpClient.delete(responseDeleteUrl).subscribe();
    });
  }
  
  private reloadResponses(): void {
    this.httpClient.get<Response[]>(API_ENDPOINTS.RESPONSES)
      .subscribe(responseList => {
        this.responses.set(responseList);
      });
  }
  
  private handleDeletionError(): void {
    this.dialog.show(MESSAGES.DELETE_ERROR, 'error');
  }
  
  viewResults(surveyId: string) {
    this.router.navigate(['/results', surveyId]);
  } 
  
  closeSurvey(id: string) {
    const url = replaceTokensWithValues(API_PATTERNS.SURVEY_DETAIL, { surveyId: id });

    this.httpClient.patch(url, { isOpen: false })
      .subscribe(() => {
        this.refreshSurveys();
        this.dialog.show(MESSAGES.SURVEY_CLOSED, 'success');
      });
  }
  
  reopenSurvey(id: string) {
    const now = new Date().toISOString();
    const url =replaceTokensWithValues(API_PATTERNS.SURVEY_DETAIL, { surveyId: id });
  
    this.httpClient.patch(url, {
      isOpen: true,
      autoCloseStartAt: now
    }).subscribe(() => {
      this.refreshSurveys();
      this.dialog.show(MESSAGES.SURVEY_REOPENED, 'success');
    });
  }
  
  refreshSurveys() {
    this.httpClient.get<Survey[]>(API_ENDPOINTS.SURVEYS)
      .subscribe(surveyList => {
        this.openSurveys.set(surveyList.filter(s => s.isOpen));
        this.closedSurveys.set(surveyList.filter(s => !s.isOpen));
      });
  }

  autoCloseSurveys(surveys: Survey[]) {
    const now = new Date();
  
    surveys.forEach(survey => {
      if (this.shouldAutoCloseSurvey(survey, now)) {
        this.autoCloseSurvey(survey);
      }
    });
  }
  
  private shouldAutoCloseSurvey(survey: Survey, now: Date): boolean {
    if (!survey.isOpen) return false;
    
    const start = new Date(survey.autoCloseStartAt || survey.createdAt);
    const secondsPassed = (now.getTime() - start.getTime()) / 1000;
    
    return secondsPassed > CONFIG_VALUES.SURVEY_AUTOCLOSE_TIME_SECONDS;
  }
  
  private autoCloseSurvey(survey: Survey): void {
    const url = replaceTokensWithValues(API_PATTERNS.SURVEY_DETAIL, { surveyId: survey.id });
    
    this.httpClient.patch(url, { isOpen: false }).subscribe(() => {
      console.log(`The survey ${survey.title} has been closed automatically.`);
      this.refreshSurveys();
    });
  }
}