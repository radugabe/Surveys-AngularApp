import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Survey } from '@models/survey.model';
import { TEXTS } from '@core/constants';

@Component({
  selector: 'surveys-card',
  templateUrl: './surveys-card.component.html',
  styleUrl: './surveys-card.component.css',
  standalone: false
})
export class SurveysCardComponent {
  @Input() survey!: Survey;
  @Input() role!: 'coordinator' | 'respondent';
  @Input() isCompleted: boolean = false;

  @Output() complete = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() reopen = new EventEmitter<string>();
  @Output() viewResults = new EventEmitter<string>();
  @Output() close = new EventEmitter<string>();

  texts = TEXTS.surveysCard;

  onComplete() {
    this.emitAction(this.complete);
  }

  onDelete() {
    this.emitAction(this.delete);
  }

  onReopen() {
    this.emitAction(this.reopen);
  }

  onViewResults() {
    this.emitAction(this.viewResults);
  }

  onClose() {
    this.emitAction(this.close);
  }

  private emitAction(emitter: EventEmitter<string>) {
    emitter.emit(this.survey.id);
  }
}