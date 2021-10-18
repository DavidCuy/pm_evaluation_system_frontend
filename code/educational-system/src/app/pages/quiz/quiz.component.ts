import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes = [];
  prevPage = false;
  nextPage = false;
  page = 1;

  constructor(public quizService: QuizService) {
    this.quizService.index().subscribe(response => {
      this.quizzes = response?.Data;
      this.nextPage = response?.Links?.next ? true : false;
      this.prevPage = response?.Links?.prev ? true : false;
    });
  }

  ngOnInit(): void {
  }

  change_page(pageDiff: number): void {
    this.page += pageDiff;
    this.quizService.index(this.page).subscribe(response => {
      this.quizzes = response?.Data;
      this.nextPage = response?.Links?.next ? true : false;
      this.prevPage = response?.Links?.prev ? true : false;
    });
  }

}
