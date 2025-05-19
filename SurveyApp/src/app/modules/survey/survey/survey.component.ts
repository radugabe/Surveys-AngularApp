import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Survey } from '@models/survey.model';
import { Response } from '@models/response.model';
import { DialogService } from '@core/services/dialog.service';
import { API_ENDPOINTS, API_PATTERNS, MESSAGES, LOCAL_STORAGE_KEYS, TEXTS } from '@core/constants';
import { replaceTokensWithValues } from '@core/utils';

@Component({
  selector: 'survey-page',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  standalone: false
})
export class SurveyComponent implements OnInit {
  survey = signal<Survey | null>(null);
  answers = signal<string[]>([]);
  texts = TEXTS.survey;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    const currentUser = this.getCurrentUser();

    if (!this.validateInitialData(surveyId, currentUser)) {
      this.router.navigate(['/surveys']);
      return;
    }

    this.checkForExistingResponses(surveyId!, currentUser!);
  }

  private validateInitialData(surveyId: string | null, currentUser: any): boolean {
    if (!surveyId) {
      this.dialog.show(MESSAGES.SURVEY_LOAD_ERROR, 'error');
      this.router.navigate(['/surveys']);
      return false;
    }
    
    if (!currentUser) {
      this.dialog.show(MESSAGES.SESSION_EXPIRED, 'error');
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }

  private getCurrentUser(): any {
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (!storedUserJson) {
      this.dialog.show('Your session has expired. Please log in again.', 'error');
      this.router.navigate(['/login']);
      return null;
    }
    return JSON.parse(storedUserJson);
  }

  private checkForExistingResponses(surveyId: string, currentUser: any): void {
    this.httpClient.get<Response[]>(API_ENDPOINTS.RESPONSES)
      .subscribe(responses => {
        if (this.hasAlreadyCompletedSurvey(responses, surveyId, currentUser.id)) {
          this.dialog.show(MESSAGES.ALREADY_COMPLETED_SURVEY, 'info');
          this.router.navigate(['/surveys']);
        } else {
          this.loadSurvey(surveyId);
        }
      });
  }

  private hasAlreadyCompletedSurvey(
    responses: Response[], 
    surveyId: string, 
    userId: string
  ): boolean {
    return responses.some(response => 
      response.surveyId === surveyId && response.userId === userId
    );
  }

  private loadSurvey(surveyId: string): void {
    const url = replaceTokensWithValues(
      API_PATTERNS.SURVEY_DETAIL,
      { surveyId }
    );

    this.httpClient.get<Survey>(url).subscribe(surveyData => {
      this.survey.set(surveyData);
      const emptyAnswers = new Array(surveyData.questions.length).fill('');
      this.answers.set(emptyAnswers);
    });
  }

  submitAnswers() {
    if (!this.survey()) {
      this.dialog.show(MESSAGES.ANSWERS_SUBMIT_ERROR, 'error');
      this.router.navigate(['/surveys']);
      return;
    }

    if (!this.validateAllQuestionsAnswered()) {
      return;
    }

    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    this.saveResponse(currentUser);
  }

  private validateAllQuestionsAnswered(): boolean {
    const unansweredIndex = this.answers().findIndex(answer => !answer || answer.trim() === '');
    
    if (unansweredIndex !== -1) {
      this.dialog.show(`Please answer question ${unansweredIndex + 1}.`, 'error');
      return false;
    }
    
    return true;
  }

  private saveResponse(currentUser: any): void {
    this.httpClient.get<Response[]>(API_ENDPOINTS.RESPONSES)
      .subscribe(existingResponses => {
        const newResponse = this.createResponseObject(existingResponses, currentUser);
        this.saveResponseToServer(newResponse);
      });
  }

  private createResponseObject(existingResponses: Response[], currentUser: any): Response {
    const lastId = existingResponses.length
      ? Math.max(...existingResponses.map(response => parseInt(response.id)))
      : 0;
    
    return {
      id: (lastId + 1).toString(),
      surveyId: this.survey()!.id,
      userId: currentUser.id,
      answers: this.answers(),
      submittedAt: new Date().toISOString()
    };
  }

  private saveResponseToServer(newResponse: Response): void {
    this.httpClient.post(API_ENDPOINTS.RESPONSES, newResponse)
      .subscribe(() => {
        this.dialog.show(MESSAGES.RESPONSE_SUBMITTED, 'success');
        this.router.navigate(['/surveys']);
      });
  }

  onAnswerChange(index: number, value: string): void {
    const updated = [...this.answers()];
    updated[index] = value;
    this.answers.set(updated);
  }  

  cancel() {
    this.dialog.confirm(MESSAGES.RESPONDENT_CONFIRM_SURVEY_CANCEL, true)
      .then(confirmed => {
        if (confirmed) {
          this.router.navigate(['/surveys']);
        }
      });
  }
}