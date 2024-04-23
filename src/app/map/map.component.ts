import { CsudService } from './../services/csud.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';
// import 'mapbox-gl/dist/mapbox-gl.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  lngLat: any;
  currentM: mapboxgl.Marker | null = null;
  makerS: mapboxgl.Marker | null = null;
  popup: mapboxgl.Popup | null = null;

  constructor(private mapService: MapService, private CsudService: CsudService){
    this.lngLat = null;
  }
  
  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoic2h5bnMyMTA4MDEiLCJhIjoiY2xpbnZkNGQ4MTI5ZTNkcGtrOGc5djhlbSJ9.ZZozmfebZjywOjrcAGH0gw';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [112.28, 15.87], // starting position [lng, lat]
    zoom: 4.5 // starting zoom
  });

  map.on('click', async (e) => {

    const coordinates = e.lngLat;
    this.lngLat = [coordinates.lng, coordinates.lat];

    if (this.currentM) {
      this.currentM.remove();
      this.currentM = null;
    }

    const marker = new mapboxgl.Marker({
      color: 'yellow',
    })
      .setLngLat(this.lngLat)
      .addTo(map);
    this.currentM = marker;
    this.mapService.setLngLat(this.lngLat.toString());

  });

  map.on('click', async (e) => {
    const { lng, lat } = e.lngLat;
    this.lngLat = [lng, lat];
    // await self.reverseGeocode(
    //   lng,
    //   lat
    // );

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b4017df72831d435733939b2ff90a8a8
    `)
    .then(response => response.json())
    .then(data => {
      const temperatureCelsius = data.main.temp - 273.15;

      console.log(data);

      if (!this.popup) {
        this.popup = new mapboxgl.Popup().setHTML(
          `
          <p>Quốc gia: ${data.sys.country}</p>
          <p>Thời tiết: ${data.weather[0].main}</p>
          <p>Nhiệt độ: ${temperatureCelsius.toFixed(2)}°C</p>
          `
        );

        this.popup.setLngLat([lng, lat]).addTo(map);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

    // Xóa marker hiện tại nếu có
    if (this.currentM) {
      this.currentM.remove();
      this.currentM = null;
    }



    // Tắt popup nếu không phải marker
    const targetElement = e.originalEvent.target as HTMLElement;
    const isMarker = targetElement.closest('.mapboxgl-marker');

    if (!isMarker) {
      this.popup?.remove();
      this.popup = null;
    }
    // Tạo marker mới và gán vào currentMarker
    const marker = new mapboxgl.Marker({
      color: 'red',
    })
    
      .setLngLat(this.lngLat)
      .addTo(map);
    this.currentM = marker;


    
    const popups = document.getElementsByClassName("mapboxgl-popup");
    if (popups.length) {
      // console.log("true")
      this.currentM?.remove();
      this.currentM = null;
    }

    // Chia sẻ giá trị lngLat thông qua service
    this.mapService.setLngLat(this.lngLat.toString());
  });
  this.CsudService.getCsudList().subscribe({
    next: (data) => {
      data.forEach((location: any)=>{
        const locationObject = JSON.parse(location.diaChi);
        console.log(locationObject)
        if(location.diaChi && locationObject.coordinates){
          const coordinate = new mapboxgl.LngLat(
            locationObject.coordinates[0],
            locationObject.coordinates[1]
          );
          let popuphtml =
          `<strong>Tên cơ sở: ${location.tenCS}</strong>
          <p>Loại giống: ${location.loaiGiong}</p>
          <p>Số lượng: ${location.soLuong}</p>
          <p>Vị trí: ${coordinate}</p>`;
          // <button class='btn btn-primary p-1'>Click me!</button>`;
          const popup = new mapboxgl.Popup({ offset: 25, className: "maker-popup" })
          .setHTML(popuphtml);
          
          const maker = new mapboxgl.Marker()
          .setLngLat(coordinate)
          .setPopup(popup)
          .addTo(map);
          this.makerS = maker
          
        }
      })
    }
  })

}

}
