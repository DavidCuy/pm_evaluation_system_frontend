import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionCardComponent } from './shared/question-card/question-card.component';
import { MakeQuizComponent } from './pages/make-quiz/make-quiz.component';
import { FormsModule } from '@angular/forms';
import { ResumeComponent } from './pages/resume/resume.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    BannerComponent,
    FooterComponent,
    NotFoundComponent,
    QuestionCardComponent,
    MakeQuizComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
