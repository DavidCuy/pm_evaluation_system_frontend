import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MakeQuizComponent } from './pages/make-quiz/make-quiz.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { QuizCreateComponent } from './pages/quiz/quiz-create/quiz-create.component';
import { QuestionCreateComponent } from './pages/question-create/question-create.component';

const APP_ROUTES: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/create', component: QuizCreateComponent },
  { path: 'quiz/:IdQuizz/question/create', component: QuestionCreateComponent },
  { path: 'person/:idPerson/quiz/:IdQuizz', component: MakeQuizComponent },
  { path: 'person/:idPerson/quiz/:IdQuizz/resume', component: ResumeComponent },
  { path: '',   redirectTo: '/quiz', pathMatch: 'full' },
  { path: '**',  component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
