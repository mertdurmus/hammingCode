import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Data } from '../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http: HttpClient) { }

  path = 'http://127.0.0.1:5000/api';

  getHam(): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<string[]>(this.path + '/gett', httpOptions).pipe(
       tap(data => console.log(JSON.stringify(data))),
       catchError(this.handleError)
     );
   }
   getNormal(): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<string[]>(this.path + '/gett1', httpOptions).pipe(
       tap(data => console.log(JSON.stringify(data))),
       catchError(this.handleError)
     );
   }
   getIndex(): Observable<number[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<number[]>(this.path + '/gett2', httpOptions).pipe(
       tap(data => console.log(JSON.stringify(data))),
       catchError(this.handleError)
     );
   }

   getText(): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<string>(this.path + '/metin', httpOptions).pipe(
       tap(data => console.log(JSON.stringify(data))),
       catchError(this.handleError)
     );
   }


   addText(dataa: string ): Observable<string> {
    // this.basicauthenticationService.loadToken();

    const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json'
    })
   };
    return this.http.post<string>(this.path + '/sett', dataa, httpOptions).pipe(
         tap(data => console.log(JSON.stringify(data))),
         catchError(this.handleError)
       );
     }

   handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'bir hata oluştu' + err.error.message;
    } else {
      errorMessage = 'sistemsel bir hata';
    }

    return throwError(errorMessage);
  }

}
