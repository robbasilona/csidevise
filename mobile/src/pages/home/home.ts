import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { DataService } from '../../providers/data-service';

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
  s_api: DataService;

  public biscuit: Boolean;
  public water: Boolean;
  public goods: Boolean;
  public batteries: Boolean;
  lat: number;
  lon: number;
  loc: string;
  icons = ['http://maps.google.com/mapfiles/ms/icons/red-dot.png', 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'];
  pins: Array<any>;
  supplies: any;
  // windows: Array<any>;

  constructor(public navCtrl: NavController, public api1: DataService) {
    this.biscuit = true;
    this.water = false;
    this.goods = true;
    this.batteries = false;
    this.s_api = api1;
    // this.api.loadPins(0).then(data => {
    //   this.pins = data;
    // });
    this.s_api.loadSupplies(0).then(data => {
      this.supplies = data;
      for (let supply of this.supplies) {
        supply.enabled = false;
      }
    });
  }

  ionViewDidLoad(){
    this.loadMap();
    // this.displayPins();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
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

  displayPins(){
    //reset map
    // for (let marker of this.markers) {
    //   console.log(marker);
    //   marker.setMap(null);
    // }
    // for (let window of this.windows) {
    //   window.close();
    // }
    this.pins = new Array<any>();

    //get enabled supplies
    for (let supply of this.supplies) {
      if (supply.enabled) {
        console.log(supply.id + ' ' + supply.name);
        this.s_api.loadSupplyPins(supply.id).then(data => {
          this.pins = this.pins.concat(data);
        });
      }
    }
    this.loadMap();
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
