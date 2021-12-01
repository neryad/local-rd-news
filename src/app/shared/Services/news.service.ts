import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

import { catchError, pluck, take } from 'rxjs/operators';
import { Articles } from '../interface/news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Get news! Array<Articles>
   */
  getNews(mediaName: string): Observable<Articles[]> {
    return this.http
      .get<{ data: Articles[] }>(`${this.apiUrl}${mediaName}`)
      .pipe(
        take(1),
        pluck('data'),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
