import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { PersonService } from '../../services/person.service';

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
  personName: string = null;
  selecteQuiz: any = null;
  modalShow = false;

  constructor(public quizService: QuizService, public personService: PersonService, private router: Router) {
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

  responseQuiz(): void {
    if (this.personName === null) {
      alert('Debe ingresar un nombre');
      return;
    }

    if (this.selecteQuiz === null) {
      alert('Debe ingresar seleccionar una encuesta');
      return;
    }

    this.personService.create({
      Name: this.personName
    }).subscribe(resp => {
      this.modalShow = false;
      console.log(resp);
      this.router.navigate([`person/${resp?.IdPerson}/quiz/${this.selecteQuiz?.IdQuiz}`]);
    });
  }

  showModal(quiz: any): void {
    this.selecteQuiz = quiz;
    this.modalShow = true;
    console.log(this.selecteQuiz);
  }
}
