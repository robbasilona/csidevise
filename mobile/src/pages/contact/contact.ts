import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { DataService } from '../../providers/data-service';

import { SplashPage } from '../../pages/splash/splash';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [DataService]
})
export class ContactPage {
  trend: string;
  api: DataService;
  options: any;
  width: number;
  height: number;

  geocoder: any;
  loc: string;
  lat: number;
  lon: number;

  constructor(
    public navCtrl: NavController,
    public ds_api: DataService,
    public platform: Platform
  ) {
    this.api = ds_api;
    platform.ready().then((readySource) => {
      this.width = platform.width();
      this.height = platform.height();
    });
  }

  ionViewDidLoad(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      console.log('Detected location at ' + this.lat + ',' + this.lon);
      this.trend = 'occupancy';
      this.trendChange();
    }, (err) => {
      console.log(err);
    });
  }

  back(){
    this.navCtrl.push(SplashPage);
  }


  trendChange(){
    if (this.trend === 'occupancy') {
      this.api.loadRankedCenters(this.lat, this.lon).then(data => {
        let names = [];
        let perc = [];
        for (let i=0; i<5; i++) {
          names[i] = data[i].name;
          perc[i] = data[i].quantity / data[i].capacity * 100;
        }
        this.options = {
          chart: {
            type: 'column',
            width: this.width - 32,
            height: this.height - 204,
            backgroundColor: '#FFFFFF'
          },
          // title: { text: 'Occupancy of Evac Centers' },
          title: { text: '' },
          xAxis: {
            categories: names,
            crosshair: true
          },
          series: [{
            name: 'Percentage Occupancy',
            color: 'rgb(140, 36, 29)',
            data: perc
          }],
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              formatter: function () {
                return this.value + '%';
              }
            },
            max: 100
          }
        };
      });
    }
    else if(this.trend == 'evacuation'){
      this.api.loadRankedCenters(this.lat, this.lon).then(data => {
        let names = [];
        let cvalues = [];
        let tvalues = [];
        for (let i=0; i<3; i++) {
          names[i] = data[i].name;
          cvalues[i] = data[i].quantity;
          tvalues[i] = data[i].capacity;
        }
        this.options = {
          chart: {
            type: 'spline',
            width: this.width - 32,
            height: this.height - 204,
            backgroundColor: '#FFFFFF'
          },
          title: {
            text: ''
          },
          // subtitle: {
          //   text: 'Source: WorldClimate.com'
          // },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              formatter: function () {
                return this.value + '%';
              }
            }
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [
          {
            name: names[0],
            marker: {
              symbol: 'circle'
            },
            data: [0, 20, 0, 14, 20, 95, 55, 88, 73, 20, 90, 0]
          }, {
            name: names[1],
            marker: {
              symbol: 'circle'
            },
            data: [10, 0, 10, 24, 10, 45, 75, 58, 93, 10, 60, 0]
          },{
            name: names[2],
            marker: {
              symbol: 'circle'
            },
            data: [0, 10, 20, 37, 45, 100, 86, 70, 86, 28, 100, 0]
          }]
        }
      });
    }
  }

}
