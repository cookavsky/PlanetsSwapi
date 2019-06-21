import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Planet } from '../planet';
import { HttpClient } from '@angular/common/http';

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
  Planets: Planet[];
  PlanetName = localStorage.getItem('PlanetsSearch');
  PlanetsSearch = (localStorage.getItem('PlanetsSearch') !== null) ? this.PlanetName : "";

  constructor(private router: Router, private _http: HttpClient) {
    this.SearchName(this.PlanetsSearch);
  }

  SearchName(string: string) {
    let Planets = [];
    let id = [];
    this.searchUrl = 'https://swapi.co/api/planets/?search=' + string;
    this._http.get(this.searchUrl)
      .subscribe((str: any) => {
        this.CountPlanets = str.count;
        this.AllPage = Math.ceil(this.CountPlanets / 10);
        for (let i = 0; i < this.AllPage; i++) {
          this.searchUrlComplete = 'https://swapi.co/api/planets/?page=' + (i + 1) + '&search=' + string;
          this._http.get(this.searchUrlComplete)
            .subscribe((Plat: any) => {
              for (let y = 0; y < Plat.results.length; y++) {
                Plat.results[y].id = 0;
                this.PlanetsID(id, Plat, y);
                Planets.push(Plat.results[y]);
                this.Planets = Planets;
                localStorage.removeItem('PlanetsSearch');
              }
        })
      }
      })
    if (Planets.length === 0) {
      this.Planets = null;
    }
  }

  PlanetsID(id, Plat, y) {
    if (Plat.results[y].url.length === 31) {
      Plat.results[y].id = Plat.results[y].url.substr(29, 1);
    } else if (Plat.results[y].url.length === 32) {
      Plat.results[y].id = Plat.results[y].url.substr(29, 2);
    }
  }

  Home(parametr: string) {
    this.router.navigate([parametr]);
  }

  ngOnInit() {
  }
}
