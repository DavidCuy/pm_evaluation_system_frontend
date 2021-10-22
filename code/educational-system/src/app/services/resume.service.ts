import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ResumeService extends BaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'resume');
  }

  public getResume(personId: number, quizId: number): Observable<any> {
    const url = `${this.URL_API}/${this.endpointPrefix}/${personId}/person/${quizId}/quiz`;
    return this.httpClient.get(url, { headers: this.common_headers() })
        .pipe(map((resolve: any) => {
          if (!environment.production) {
            console.log(resolve);
          }
          return resolve;
        }), map((resolve: any) => resolve));
  }
}
