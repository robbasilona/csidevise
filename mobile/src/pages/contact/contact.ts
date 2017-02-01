import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { DataService } from '../../providers/data-service';

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
    this.trend = 'occupancy';
    this.trendChange();
  }

  trendChange(){
    if (this.trend === 'occupancy') {
      this.api.loadCenters(0).then(data => {
        let names = [];
        let cvalues = [];
        let tvalues = [];
        for (let i in data) {
          names[i] = data[i].name;
          cvalues[i] = data[i].quantity;
          tvalues[i] = data[i].capacity;
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
            name: 'Total capacity',
            color: 'rgba(248,161,63,0.6)',
            data: tvalues,
            pointPlacement: 0.15
          }, {
            name: 'Current evacuees',
            color: 'rgba(186,60,61,1)',
            data: cvalues,
            pointPlacement: -0.15
          }],
          yAxis: {
            title: { text: '' }
          }
        };
      });
    }
    else if(this.trend == 'evacuation'){
      this.api.loadCenters(0).then(data => {
        let names = [];
        let cvalues = [];
        let tvalues = [];
        for (let i in data) {
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
            }
            // ,
            // labels: {
            //   formatter: function () {
            //     return this.value + '°';
            //   }
            // }
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
            // marker: {
            //   symbol: 'square'
            // },
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: names[1],
            // marker: {
            //   symbol: 'diamond'
            // },
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }]
        }
      });
    }
  }

}
