import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { DataService } from '../../providers/data-service';

import { SplashPage } from '../../pages/splash/splash';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataService]
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder: any;
  api: DataService;

  public biscuit: Boolean;
  public water: Boolean;
  public goods: Boolean;
  public batteries: Boolean;
  lat: number;
  lon: number;
  loc: string;
  icons = ['http://maps.google.com/mapfiles/ms/icons/red-dot.png', 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'];
  pins: Array<any>;
  supplies: any;
  // windows: Array<any>;

  constructor(public navCtrl: NavController, public ds_api: DataService) {
    this.biscuit = true;
    this.water = false;
    this.goods = true;
    this.batteries = false;
    this.api = ds_api;
    this.api.loadSupplies(0).then(data => {
      this.supplies = data;
      for (let supply of this.supplies) {
        supply.enabled = false;
      }
      this.supplies[0].enabled = true;
      this.displayPins();
    });
  }

  back(){
    this.navCtrl.push(SplashPage);
  }

  displayPins(){
    this.pins = new Array<any>();
    //get enabled supplies
    for (let supply of this.supplies) {
      if (supply.enabled) {
        console.log(supply.id + ' ' + supply.name);
        this.api.loadSupplyPins(supply.id).then(data => {
          this.pins = this.pins.concat(data);
        });
      }
    }
    this.loadMap();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.geocoder = new google.maps.Geocoder;
      this.reverseGeo();
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addHomeInfo();
      if (this.pins) {
        for (let pin of this.pins) {
          this.addMarkerInfo(pin);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  goToCenter(){
    console.log('clicked center');
    this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
  }

  addHomeInfo(){
    let icon = {
      url: this.icons[2], // url
      scaledSize: new google.maps.Size(20, 24), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: icon
    });
    let content = "Current Location";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  reverseGeo(){
    let latlng = {lat: this.lat, lng: this.lon};
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        this.loc = results[0].formatted_address;
      } else {
        console.log('Geocoder failed due to ', status);
      }
    });
  }

  addMarkerInfo(pin){
    let icon = {
      url: this.icons[0], // url
      scaledSize: new google.maps.Size(20, 24), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.FADE,
      position: new google.maps.LatLng(pin.latitude, pin.longitude),
      icon: icon
    });
    let content = pin.name + "<br><i>" + pin.classification + "</i>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
