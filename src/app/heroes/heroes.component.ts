import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Hero1 } from '../hero1';
//import { HEROES } from '../mock-heroes'; //modo antigo
import { HeroService } from '../hero.service'; //modo novo delegando a Heroservice fazer o trabalho
import { MenssageService } from '../menssage.service';
import { Hero2 } from '../hero2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //heroes = HEROES;
  //selectedHero?: Hero;

  heroes: Hero[] = []
  h: Hero[] =[]
  listOfHeroes: Hero2[] = []

/* two way binding básico */
 /*
  hero1: Hero = {
    id: 1,
    name: 'WindStorm'
  }
*/
  constructor(private heroservice: HeroService) { }

  ngOnInit(): void {
    this.getHeroes2();
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add('HeroesComponent: Selected hero id=${hero.id}');
//  }

  getHeroes():void{
    this.heroservice.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  getHeroes2():void {
    this.heroservice.getHeroes2()
      .subscribe(listOfHeroes => this.listOfHeroes = listOfHeroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.heroservice.addHero({name}  as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroservice.deleteHero(hero.id).subscribe();
  }
  delete2(hero: Hero2): void {
    this.listOfHeroes = this.listOfHeroes.filter(h => h !== hero);
    this.heroservice.deleteHero(hero.id).subscribe();
  }

}
