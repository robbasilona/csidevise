import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { DataService } from '../../providers/data-service';

import { SplashPage } from '../../pages/splash/splash';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [DataService]
})
export class AboutPage {
  @ViewChild('map1') mapElement: ElementRef;
  map: any;
  api: any;

  geocoder: any;
  loc: string;
  lat: number;
  lon: number;
  pins: any;
  icons = ['http://maps.google.com/mapfiles/ms/icons/red-dot.png', 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'];

  constructor(public navCtrl: NavController, public ds_api: DataService) {
    this.api = ds_api;
  }

  ionViewDidLoad(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      console.log('Detected location at ' + this.lat + ',' + this.lon);
      this.api.loadRankedCenters(this.lat, this.lon, 10).then(data => {
        this.pins = data;
        this.loadMap();
      });
    }, (err) => {
      console.log(err);
    });
  }

  back(){
    this.navCtrl.push(SplashPage);
  }

  loadMap(){
    let latLng = new google.maps.LatLng(this.lat, this.lon);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder;
    this.addHomeInfo();
    this.reverseGeo();
    for (let pin of this.pins) {
      this.addMarkerInfo(pin);
    }
  }

  addHomeInfo(){
    let icon = {
      url: this.icons[2], // url
      scaledSize: new google.maps.Size(22, 24), // scaled size
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

  goToCenter(){
    console.log('clicked center');
    this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
  }

  addMarkerInfo(pin){
    let icon = {
      url: this.icons[0], // url
      scaledSize: new google.maps.Size(22, 24), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.FADE,
      position: new google.maps.LatLng(pin.latitude, pin.longitude),
      icon: icon
    });
    let content = pin.name + "<br><i>" + pin.quantity + '/' + pin.capacity +  " slots</i>";
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

  navigate(pin){
    console.log('Navigating to ' + pin.name);
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {disableDefaultUI: true});
    directionsDisplay.setMap(this.map);
    directionsService.route({
      origin: new google.maps.LatLng(this.lat, this.lon),
      destination: new google.maps.LatLng(pin.latitude, pin.longitude),
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }
}
