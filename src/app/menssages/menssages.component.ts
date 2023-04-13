import { Component, OnInit } from '@angular/core';
import { MenssageService } from '../menssage.service';

@Component({
  selector: 'app-menssages',
  templateUrl: './menssages.component.html',
  styleUrls: ['./menssages.component.css']
})
export class MenssagesComponent implements OnInit {

  constructor(public messageService: MenssageService) { }

  ngOnInit(): void {
  }

}
