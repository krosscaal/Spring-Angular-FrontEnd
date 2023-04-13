import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MenssageService } from './menssage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero1 } from './hero1';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/heroes';

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(
    private http:HttpClient,
    private messageService: MenssageService) { }

    /**método sem uso http original com dados ficticios */
  getHeroes1(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  /** método requisição servidor lista de todos */
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl+'/list')
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
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


  /** método para dados ficticios */
  getHero1(id: number): Observable<Hero>{
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  /** método http get id */
  getHero(id:number): Observable<Hero> {
    const url = `${this.heroesUrl+'/hero'}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl+'/update-hero'}/${hero.id}`;
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

/** POST add a new Hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    hero.power='força total';
    hero.email=hero.name+'@heroes.gmail.com.br';
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** POST add new Hero of class Hero1.ts */
  addHeroFull(hero: Hero1): Observable<Hero1>{
    return this.http.post<Hero1>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero1) => this.log(`add hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero1>(`addHero`))
    );

  }




/** DELETE erase the hero from the server  */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl+'/delete-hero'}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_=> this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
  /** Log a HeroService message com MessageService */
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
