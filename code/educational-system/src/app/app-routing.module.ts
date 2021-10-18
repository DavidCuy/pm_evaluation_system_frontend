import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './pages/quiz/quiz.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const APP_ROUTES: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: '**',  component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
