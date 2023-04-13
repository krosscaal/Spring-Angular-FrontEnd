import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenssagesComponent } from './menssages.component';

describe('MenssagesComponent', () => {
  let component: MenssagesComponent;
  let fixture: ComponentFixture<MenssagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenssagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenssagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
