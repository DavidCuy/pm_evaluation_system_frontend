import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export abstract class BaseService {

  readonly endpointPrefix: string;
  readonly URL_API: string = environment.endpoint;

  protected constructor(protected httpClient: HttpClient, protected endpointService: string) {
    this.endpointPrefix = endpointService;
  }


  public index(page: number = 1, perPage: number = 5): Observable<any> {
    const url = `${this.URL_API}/${this.endpointPrefix}`;

    const requestData = new Map<string, any>();
    requestData.set('page', page);
    requestData.set('per_page', perPage);

    return this.httpClient.get(url, { headers: this.common_headers(), params: this.parse_query_params(requestData) })
      .pipe(map((resolve: any) => {
        if (!environment.production) {
          console.log(resolve);
        }
        return resolve;
      }), map((resolve: any) => resolve
    ));
  }

  public find(id: number): Observable<any> {
    const url = `${this.URL_API}/${this.endpointPrefix}/${id}`;
    return this.httpClient.get(url, { headers: this.common_headers() })
        .pipe(map((resolve: any) => {
          if (!environment.production) {
            console.log(resolve);
          }
          return resolve;
        }), map((resolve: any) => resolve));
  }

  public create(data: any): Observable<any> {
    const url = `${this.URL_API}/${this.endpointPrefix}`;
    if (data.id !== undefined && data.id !== null) {
      delete (data.id);
      if (!environment.production) {
        console.log(data);
      }
    }
    return this.httpClient.post(url, data, { headers: this.common_headers() })
      .pipe(map((resolve: any) => resolve));
  }

  public update(data: any, id: number | string): Observable<any> {
    const url = `${this.URL_API}/${this.endpointPrefix}/${id}`;
    return this.httpClient.put(url, data, { headers: this.common_headers() })
      .pipe(map((resolve: any) => resolve));
  }

  public delete(id: number): Observable<string> {
    const url = `${this.URL_API}/${this.endpointPrefix}/${id}`;

    return this.httpClient.delete(url, { headers: this.common_headers() })
      .pipe(map((resolve: string, reject) => {
        return resolve;
      }));
  }

  protected paginable_params(page: number = 1, perPage: number = 50): Map<string, any> {
    const requestData = new Map<string, any>();
    requestData.set('page', page);
    requestData.set('per_page', perPage);
    return requestData;
  }

  parse_query_params(paramsQuery: Map<string, any>): HttpParams {
    const paramObject = Array.from(paramsQuery.entries()).reduce((obj, [key, value]) => {
      obj[key] = String(value);
      return obj;
    }, {});

    const params = new HttpParams({
      fromObject: paramObject
    });

    return params;
  }

  protected common_headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
