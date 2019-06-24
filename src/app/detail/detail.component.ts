import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private PlanetUrl: string;
  Planet: any;
  PlanetID = localStorage.getItem('PlanetID');

  constructor(private router: Router, private _http: HttpClient) { }

  GoToPage(parametr: string) {
    localStorage.removeItem('PlanetID');
    this.router.navigate([parametr]);
  }

  ngOnInit() {
    this.PlanetUrl = 'https://swapi.co/api/planets/' + this.PlanetID;
    return this._http.get(this.PlanetUrl)
      .subscribe((Data: any) => {
        this.PlanetsImg(Data);
        this.Planet = Data;
      });
  }

  PlanetsImg(Data: any) {
    if (Data.terrain.indexOf("rock") > -1) {
      Data.img = 'assets/img/planets/Rock-640px.png';
    } else if (Data.terrain.indexOf("desert") > -1) {
      Data.img = 'assets/img/planets/Deserts-Desert-640px.png';
    } else if (Data.terrain.indexOf("gas giant") > -1) {
      Data.img = 'assets/img/planets/Deserts-Desert-640px.png';
    } else if (Data.terrain.indexOf("acid pools") > -1) {
      Data.img = 'assets/img/planets/Acid-Pools-640px.png';
    } else if (Data.terrain.indexOf("volcanoes") > -1) {
      Data.img = 'assets/img/planets/Volcanoes-640px.png';
    } else if (Data.terrain.indexOf("ocean") > -1) {
      Data.img = 'assets/img/planets/Ocean-Oceans-640px.png';
    } else if (Data.terrain.indexOf("airless asteroid") > -1) {
      Data.img = 'assets/img/planets/Airless-Asteroid-640px.png';
    } else if (Data.terrain.indexOf("fungus forests") > -1) {
      Data.img = 'assets/img/planets/Fungus-Forests-640px.png';
    } else if ((Data.terrain.indexOf("jungle") > -1) || (Data.terrain.indexOf("rainforests") > -1) || (Data.terrain.indexOf("cityscape") > -1) || (Data.terrain.indexOf("forests") > -1)) {
      Data.img = 'assets/img/planets/Jungle-Jungles-Rainforests-Cityscape-Forests-640px.png';
    } else if (Data.terrain.indexOf("grass") > -1) {
      Data.img = 'assets/img/planets/Grass-Grasslands-640px.png';
    } else if (Data.terrain.indexOf("verdant") > -1) {
      Data.img = 'assets/img/planets/Verdant-640px.png';
    } else if ((Data.terrain.indexOf("ice caves") > -1) || (Data.terrain.indexOf("glaciers") > -1)) {
      Data.img = 'assets/img/planets/Ice-Caves-Glaciers-640px.png';
    } else if (Data.terrain.indexOf("savanna") > -1) {
      Data.img = 'assets/img/planets/Savanna-Savannahs-640px.png';
    } else if (Data.terrain.indexOf("seas") > -1) {
      Data.img = 'assets/img/planets/Seas-640px.png';
    } else if (Data.terrain.indexOf("barren") > -1) {
      Data.img = 'assets/img/planets/Barren-640px.png';
    } else if (Data.terrain.indexOf("swamps") > -1) {
      Data.img = 'assets/img/planets/Swamps-640px.png';
    } else if (Data.terrain.indexOf("urban") > -1) {
      Data.img = 'assets/img/planets/Urban-640px.png';
    } else {
      Data.img = 'assets/img/planets/Default-640px.png';
    }
  }
}
