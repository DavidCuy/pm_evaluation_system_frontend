import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  IdQuiz = '';
  IdPerson = '';
  responses = [];

  constructor(public resumeService: ResumeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.IdQuiz = this.route.snapshot.params?.IdQuizz;
    this.IdPerson = this.route.snapshot.params?.idPerson;
    this.resumeService.getResume(parseInt(this.IdPerson, 10), parseInt(this.IdQuiz, 10)).subscribe(resp => {
      this.responses = resp;

      this.responses.forEach(r => {
        if (!r.answers) {
          return;
        }
        const correctIndex = r.answers.findIndex(ans => ans.Correct === true);

        if (correctIndex >= 0) {
          r.answers[correctIndex].personCorrect = true;
        }

        const pCorrectAnswerIndex = r.answers.findIndex(ans => (ans.IdAnswer === r.person_answer.IdAnswer) && (ans.Correct === true));

        if (pCorrectAnswerIndex < 0) {
          const pAnswerIndex = r.answers.findIndex(ans => ans.IdAnswer === r.person_answer.IdAnswer);

          if (pAnswerIndex >= 0) {
            r.answers[pAnswerIndex].personCorrect = false;
          }
        }
      });
    });
  }

}
