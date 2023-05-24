import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Power } from "../Power";
import { PowerService } from "../power.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  powers = ['Muito Experto', 'Super Flexible','Controla o Fogo','Controla o tempo'];

  pwrs: Power[] = [];

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powerService: PowerService
    ) { }

  ngOnInit(): void {
    this.getHero();
    this.getPowers();
  }

  getHero():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  goBack():void{
    this.location.back();
  }

  save():void {
    if (this.hero) {
      this.heroService.updateHeroDto(this.hero).subscribe(() => this.goBack());
    }
  }

  getPowers():void {
    this.powerService.getPowers()
      .subscribe(pwrs => this.pwrs = pwrs);
  }

}
