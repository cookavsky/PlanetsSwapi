import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'population'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private searchUrl: string;
  private searchUrlComplete: string;
  CountPlanets: number;
  AllPage: number;

  PlanetName = localStorage.getItem('PlanetsSearch');
  PlanetsSearch: string = (localStorage.getItem('PlanetsSearch') !== null) ? this.PlanetName : "";

  constructor(private router: Router, private _http: HttpClient) {
    this.SearchName(this.PlanetsSearch);
  }

  SearchName(string: string) {
    let Planets = [];
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
                this.PlanetsID(Plat, y);
                Planets.push(Plat.results[y]);
                this.MatSortPagin(Planets);
                this.applyFilter();
                localStorage.removeItem('PlanetsSearch');
              }
        })
      }
    })
  }

  PlanetsID(Plat, y) {
    if (Plat.results[y].url.length === 31) {
      Plat.results[y].id = Plat.results[y].url.substr(29, 1);
    } else if (Plat.results[y].url.length === 32) {
      Plat.results[y].id = Plat.results[y].url.substr(29, 2);
    }
  }

  GoToDetail(parametr: string, id: any) {
    localStorage.setItem('PlanetsSearch', this.PlanetsSearch);
    localStorage.setItem('PlanetID', id);
    this.router.navigate([parametr, id]);
  }

  GoToHome(parametr: string) {
    this.router.navigate([parametr]);
  }

  MatSortPagin(Planets) {
    this.listData = new MatTableDataSource(Planets);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return data[ele].toLowerCase().indexOf(filter) != -1;
      })
    }
  }

  applyFilter() {
    this.listData.filter = this.PlanetsSearch.trim().toLowerCase();
  }

  ngOnInit() {
  }
}
