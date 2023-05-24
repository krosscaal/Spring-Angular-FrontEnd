import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MenssageService } from "./menssage.service";
import {Observable, of} from "rxjs";
import {Power} from "./Power";
import {catchError, tap} from "rxjs/operators";
import {Hero} from "./hero";

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private powerUrl = 'http://localhost:8080/heroes/power';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(
    private http:HttpClient,
    private messageService: MenssageService) { }

  getPowers():Observable<Power[]>{
    return this.http.get<Power[]>(this.powerUrl+'/list')
      .pipe(
        tap( _=> this.log('fetched powers')),
        catchError(this.handleError<Power[]>('getPowers',[]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message com MessageService */
  private log(message: string){
    this.messageService.add(`PowerService: ${message}`);
  }


}
