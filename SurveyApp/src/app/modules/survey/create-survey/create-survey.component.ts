import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '@core/services/dialog.service';
import { API_ENDPOINTS, MESSAGES, LOCAL_STORAGE_KEYS, TEXTS } from '@core/constants';

@Component({
  selector: 'create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css',
  standalone: false
})
export class CreateSurveyComponent {
  title = signal<string>('');
  questions = signal<{ text: string, options: string[] }[]>([
    { text: '', options: [''] }
  ]);
  texts = TEXTS.createSurvey;
  
  constructor(
    private router: Router, 
    private httpClient: HttpClient, 
    private dialog: DialogService
  ) {}

  addQuestion() {
    if (this.questions().length < 10) {
      this.questions().push({ text: '', options: [''] });
    }
  }

  addOption(questionIndex: number) {
    this.questions()[questionIndex].options.push('');
  }  

  removeQuestion(index: number) {
    this.questions().splice(index, 1);
  }

  removeOption(payload: { qIndex: number; oIndex: number }): void {
    const { qIndex, oIndex } = payload;
    this.questions()[qIndex].options.splice(oIndex, 1);
  }
  
  trackByIndex(index: number, item: any): number {
    return index;
  }
  
  cancel() {
    this.router.navigate(['/surveys']);
  }

  saveSurvey() {
    if (!this.validateTitle()) return;
    if (!this.validateQuestions()) return;
    
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;
    
    this.loadExistingSurveysAndCreateNew(currentUser);
  }
  
  private validateTitle(): boolean {
    if (!this.title().trim()) {
      this.dialog.show(MESSAGES.TITLE_REQUIRED, 'error');
      return false;
    }
    return true;
  }
  
  private validateQuestions(): boolean {
    for (let question of this.questions()) {
      if (!this.isQuestionTextValid(question)) {
        this.dialog.show(MESSAGES.REQUIRED_QUESTIONS, 'error');
        return false;
      }
  
      if (!this.hasEnoughValidOptions(question)) {
        this.dialog.show(MESSAGES.REQUIRED_ANSWER_OPTIONS, 'error');
        return false;
      }
    }
    return true;
  }
  
  private isQuestionTextValid(question: { text: string, options: string[] }): boolean {
    return question.text.trim() !== '';
  }
  
  private hasEnoughValidOptions(question: { text: string, options: string[] }): boolean {
    const validOptions = question.options.filter(opt => opt.trim() !== '');
    return validOptions.length >= 2;
  }
  
  private getCurrentUser(): any {
    const storedUserJson = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (!storedUserJson) {
      this.dialog.show(MESSAGES.SESSION_EXPIRED, 'error');
      this.router.navigate(['/login']);
      return null;
    }
    return JSON.parse(storedUserJson);
  }
  
  private loadExistingSurveysAndCreateNew(currentUser: any): void {
    this.httpClient.get<any[]>(API_ENDPOINTS.SURVEYS).subscribe(existingSurveys => {
      const newSurvey = this.createNewSurveyObject(existingSurveys, currentUser);
      this.saveSurveyToServer(newSurvey);
    });
  }
  
  private createNewSurveyObject(existingSurveys: any[], currentUser: any): any {
    const lastId = this.getLastSurveyId(existingSurveys);
    const currentTime = new Date().toISOString();
    
    return {
      id: (lastId + 1).toString(),
      title: this.title(),
      questions: this.getCleanQuestions(),
      createdBy: currentUser.id,
      isOpen: true,
      createdAt: currentTime,
      autoCloseStartAt: currentTime
    };
  }
  
  private getLastSurveyId(surveys: any[]): number {
    return surveys.length > 0
      ? Math.max(...surveys.map(s => parseInt(s.id)))
      : 0;
  }
  
  private getCleanQuestions(): any[] {
    return this.questions().map(q => ({
      text: q.text,
      options: q.options.filter(opt => opt.trim() !== '')
    }));
  }
  
  private saveSurveyToServer(newSurvey: any): void {
    this.httpClient.post(API_ENDPOINTS.SURVEYS, newSurvey).subscribe(() => {
      this.dialog.show(MESSAGES.SURVEY_SAVED, 'success');
      this.router.navigate(['/surveys']);
    });
  }

  get titleValue() {
    return this.title();
  }
  
  set titleValue(val: string) {
    this.title.set(val);
  }
}