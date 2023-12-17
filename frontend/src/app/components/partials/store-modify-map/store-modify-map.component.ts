import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as L from 'leaflet';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-modify-map',
  templateUrl: './store-modify-map.component.html',
  styleUrls: ['./store-modify-map.component.css'],
})
export class StoreModifyMapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement?: ElementRef;

  @Input() idStore!:string
  private map!: L.Map;
  private currentMarker: L.Marker | null = null;
  inputLat!:number;
  inputLon!:number;


  constructor(private storeService:StoreService){

  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

 

private initializeMap(): void {
  if (this.mapElement) {
    this.map = L.map(this.mapElement.nativeElement).setView([10.8006727, 106.6280273], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Event listener for map click
    this.map.on('click', (event) => {
      const clickedLatLng = event.latlng;

      const customIcon = L.icon({
        iconUrl: 'https://www.clearlyexpress.com/assets/img/front-end/pin.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Remove the current marker if it exists
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      // Create a new marker and add it to the map
      const marker = L.marker([clickedLatLng.lat, clickedLatLng.lng], { icon: customIcon }).addTo(this.map)
        .bindPopup('Đây là vị trí được chọn.')
        .openPopup();

      // Update the current marker
      this.currentMarker = marker;

      this.inputLat=clickedLatLng.lat
      this.inputLon=clickedLatLng.lng

    });
  }
}


updateDistance()
{
  if(this.inputLat || this.inputLon ){
    this.storeService.patchDistanceStore({
      _id:this.idStore,
      ToaDo:this.inputLat+","+this.inputLon
    }).subscribe((item)=>{

    })
  }else{
    alert("Bạn chưa chọn vị trí")
  }
  
}


}

