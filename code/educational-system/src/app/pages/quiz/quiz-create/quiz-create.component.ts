import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  name: string = null;
  description: string = null;

  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
  }

  saveQuiz(): void {
    if (this.name === null || this.description === null) {
      alert('Toos los campos deben estar llenados');
      return;
    }

    this.quizService.create({
      Name: this.name,
      Description: this.description
    }).subscribe(resp => {
      if (resp?.IdQuiz) {
        this.router.navigate([`quiz/${resp?.IdQuiz}/question/create`]);
      }
    });

  }

}
