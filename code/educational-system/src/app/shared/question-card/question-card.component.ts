import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  @Input() IdQuestion = -1;
  @Input() Description = '';
  @Input() answers = [];

  @Output() answerEmitter = new EventEmitter<any>();

  selectedAnswer = -1;
  disabledBtn = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeAnswer(answerId: number): void {
    this.answerEmitter.emit({
      questionId: this.IdQuestion,
      answerId
    });
  }

}
