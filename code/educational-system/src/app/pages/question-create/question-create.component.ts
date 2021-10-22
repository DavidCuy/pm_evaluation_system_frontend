import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  IdQuiz = '';
  description = '';
  showAddAnswer = false;
  createdQuestion = null;

  answers = [];

  constructor(public questionService: QuestionService, public answerService: AnswerService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.IdQuiz = this.route.snapshot.params?.IdQuizz;
  }

  anotherQuestion(): void {
    this.IdQuiz = '';
    this.description = '';
    this.showAddAnswer = false;
    this.createdQuestion = null;
    this.answers = [];
  }

  saveQuestion(): void {
    if (this.description === null) {
      alert('Toos los campos deben estar llenados');
      return;
    }

    this.questionService.create({
      IdQuiz: parseInt(this.IdQuiz, 10),
      Description: this.description
    }).subscribe(resp => {
      if (resp?.IdQuestion) {
        this.createdQuestion = resp;
        this.showAddAnswer = true;
      }
    });

  }

  addAnswer(): void {
    this.answers.push({
      disabled: false,
      Description: null,
      Correct: false
    });
  }

  saveAnswer(answer, index): void {
    const data = {
      IdQuestion: this.createdQuestion?.IdQuestion,
      Description: answer.Description,
      Correct: answer.Correct
    };
    this.answerService.create(data).subscribe(resp => {
      if (resp) {
        this.answers[index].disabled = true;
        this.addAnswer();
      }
    }, error => {
      console.error(error);
      alert(error.error.message);
    });
  }

}
