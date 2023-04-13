
import { Component, OnInit } from '@angular/core';

import { Hero1 } from '../hero1';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Muito Experto', 'Super Flexible','Controla o Fogo','Controla o tempo'];

  model = new Hero1(1,'', this.powers[0],'');

  heroAux:  Hero[] = [];

 

  submitted= false;

  onSubmit(){this.submitted = true}

  constructor(private heroserv: HeroService) { }

  ngOnInit(): void {
  }

  newHero(){
    this.model = new Hero1(-1,'','','')
  }
  

  save(hero: Hero1):void{
    console.log(this.model.name+" "+this.model.power+" "+this.model.email);
    console.log(hero.name+" "+hero.power+" "+hero.email);
    
    this.heroserv.addHeroFull(hero).subscribe();
  }

}
