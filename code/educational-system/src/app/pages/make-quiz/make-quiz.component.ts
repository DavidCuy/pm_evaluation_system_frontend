import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonAnswerService } from '../../services/personAnswer.service';

@Component({
  selector: 'app-make-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.css']
})
export class MakeQuizComponent implements OnInit {

  questions = [];
  prevPage = false;
  nextPage = false;
  page = 1;

  IdQuiz = '';
  IdPerson = '';

  personAnswer = [];

  constructor(public questionService: QuestionService, public answerService: AnswerService,
              public personAnswerService: PersonAnswerService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.IdQuiz = this.route.snapshot.params?.IdQuizz;
    this.IdPerson = this.route.snapshot.params?.idPerson;
    this.questionService.filterByParam('quiz', this.IdQuiz).subscribe(response => {
      this.questions = response?.Data;
      this.nextPage = response?.Links?.next ? true : false;
      this.prevPage = response?.Links?.prev ? true : false;

      this.questions.forEach(question => {
        this.answerService.filterByParam('question', question?.IdQuestion, 1, 100).subscribe(ansResp => {
          question.answers = ansResp?.Data;
        });
      });
    });
  }

  getAnswer(questionAnswer): void {
    const elementIndex = this.personAnswer.findIndex(ans => ans.questionId === questionAnswer.questionId);
    if (elementIndex >= 0) {
      this.personAnswer[elementIndex] = questionAnswer;
    } else {
      this.personAnswer.push(questionAnswer);
    }

    console.log(this.personAnswer);
  }

  saveQuestionAnswer(answerId): void {
    this.personAnswerService.create({
      IdPerson: this.IdPerson,
      IdAnswer: answerId
    }).subscribe(resp => {
      console.log(resp);
    });
  }

  saveQuiz(): void {
    this.personAnswer.forEach(pans => {
      this.saveQuestionAnswer(pans?.answerId);
    });

    setTimeout(() => {
      this.router.navigate([`person/${this.IdPerson}/quiz/${this.IdQuiz}/resume`]);
    }, 2000);
  }

}
