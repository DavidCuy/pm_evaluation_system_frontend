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

  constructor(public resumeService: ResumeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.IdQuiz = this.route.snapshot.params?.IdQuizz;
    this.IdPerson = this.route.snapshot.params?.idPerson;
    this.resumeService.getResume(parseInt(this.IdPerson, 10), parseInt(this.IdQuiz, 10)).subscribe(resp => {
      console.log(resp);
    });
  }

}
