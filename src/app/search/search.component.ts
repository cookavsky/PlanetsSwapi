import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Planet } from '../planet';
import { HttpClient } from '@angular/common/http';
import { callbackify } from 'util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchUrl: string;
  private searchUrlComplete: string;
  CountPlanets: number;
  AllPage: number;
  PlanetName = localStorage.getItem('PlanetsSearch');
  PlanetsSearch = (localStorage.getItem('PlanetsSearch') !== null) ? this.PlanetName : "";

  constructor(private router: Router, private _http: HttpClient) {
  }

  public Planets: Observable<any>;

  SearchName(string: string) {
    this.searchUrl = 'https://swapi.co/api/planets/?search=' + string;
    this._http.get(this.searchUrl)
      .subscribe((str: any) => {
        this.CountPlanets = str.count;
        this.AllPage = (this.CountPlanets / 10);
        for (let i = 0; i < this.AllPage; i++) {
          this.searchUrlComplete = 'https://swapi.co/api/planets/?page=' + (i + 1) + '&search=' + string;
          this._http.get(this.searchUrlComplete)
            .subscribe((Plat: any) => {
              for(let y = 0; y < Plat.results.length; y++) {
                this.Planets = Plat.results[y];
                console.log(this.Planets);
              }
            })
        }
      })
  }

  ngOnInit() {
    //// This code help to refresh Home Page.
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else {
        localStorage.removeItem('firstLoad');
      }
    }
  }
}
