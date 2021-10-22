import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'questions');
  }
}
