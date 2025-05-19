import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TEXTS } from '@core/constants';

@Component({
  selector: 'question-form',
  templateUrl: './question-form-component.html',
  styleUrl: './question-form-component.css',
  standalone: false
})
export class QuestionFormComponent {
  @Input() questionIndex!: number;
  @Input() question!: { text: string; options: string[] };
  @Input() totalQuestions!: number;

  @Output() remove = new EventEmitter<number>();
  @Output() addOption = new EventEmitter<number>();
  @Output() removeOption = new EventEmitter<{ qIndex: number; oIndex: number }>();

  texts = TEXTS.questionForm;

  onRemoveQuestion() {
    this.remove.emit(this.questionIndex);
  }

  onAddOption() {
    this.addOption.emit(this.questionIndex);
  }

  onRemoveOption(oIndex: number) {
    this.removeOption.emit({ qIndex: this.questionIndex, oIndex });
  }
}
