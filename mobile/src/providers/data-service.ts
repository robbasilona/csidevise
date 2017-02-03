import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  //prod: string = 'http://localhost:3000';
  prod: string = 'https://fast-cove-98117.herokuapp.com';

  resData: any;
  evacData: any;

  constructor(public http: Http) {
    console.log('Hello DataService Provider');
  }

  loadPins(id){
    return new Promise(resolve => {
      let url = this.prod + '/pins';
      if (id) {
        url += '/' + id;
      }
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadSupplies(id){
    return new Promise(resolve => {
      let url = this.prod + '/supplies';
      if (id) {
        url += '/' + id;
      }
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadSupplyPins(sid){
    if (this.resData) {
      return Promise.resolve(this.resData);
    } else {
      return new Promise(resolve => {
        let url = this.prod + '/supplies/' + sid + '/pins';
        console.log(url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.resData = data;
            resolve(data);
          });
      });
    }
  }

  loadCenters(id){
    return new Promise(resolve => {
      let url = this.prod + '/evac_centers';
      if (id) {
        url += '/' + id;
      }
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadRankedCenters(lat, lon, limit){
    if (this.evacData) {
      return Promise.resolve(this.evacData);
    } else {
      return new Promise(resolve => {
        let url = this.prod + '/evac_centers/rank/' + lat + '/' + lon + '/' + limit;
        console.log(url);
        this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            this.evacData = data;
            resolve(data);
          });
      });
    }
  }

}
