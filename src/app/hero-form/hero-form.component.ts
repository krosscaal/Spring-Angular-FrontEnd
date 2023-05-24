
import { Component, OnInit } from '@angular/core';

import { Hero1 } from '../hero1';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location} from "@angular/common";
import { Power } from "../Power";
import { PowerService } from "../power.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  powers = ['Muito Experto', 'Super Flexible','Controla o Fogo','Controla o tempo'];

  pwrs: Power[] = [];

  model = new Hero1('', 0,'');
/* se for usar a interface Hero descomente as linhas abaixo e comente a linha acima
* tambem comente o método newHero()*/
  // model: Hero = {
  //   id:'',
  //   name:'',
  //   power:'',
  //   email:''
  // }

  submitted= false;

  onSubmit(){this.submitted = true}

  constructor(
    private heroserv: HeroService,
    private location: Location,
    private powerService: PowerService,
    ) { }

  ngOnInit(): void {
    this.getPowers();
  }

  newHero(){
    /*comente está linha se for usar a interface Hero*/
    this.model = new Hero1('',0,'')
  }

  goBack():void{
    this.location.back();
  }

  /* se for usar a interface Hero
  * no método save reemplace Hero1 por Hero*/
  save(hero: Hero1):void{
    console.log(this.model.name+" "+this.model.power+" "+this.model.email);
    console.log(hero.name+" "+hero.power+" "+hero.email);

    this.heroserv.addHeroFull(hero).subscribe(()=> this.goBack());
  }

  getPowers():void {
    this.powerService.getPowers()
      .subscribe(pwrs => this.pwrs = pwrs);
  }

}
