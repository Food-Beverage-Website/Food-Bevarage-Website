import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as L from 'leaflet';
import { DistanceService } from 'src/app/services/distance.service';
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
  newAddress!:string;
  newad!:string

  constructor(
    private storeService:StoreService,
    private distanceService:DistanceService
    ){

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

      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      const marker = L.marker([clickedLatLng.lat, clickedLatLng.lng], { icon: customIcon }).addTo(this.map)
        .bindPopup('Đây là vị trí được chọn.')
        .openPopup();

      
      this.currentMarker = marker;

      this.inputLat=clickedLatLng.lat
      this.inputLon=clickedLatLng.lng
      this.loadAdress(clickedLatLng.lat,clickedLatLng.lng)


    });
  }
}

loadAdress(Lat:number, Lon:number)
{
  this.distanceService.getAddress(Lat.toString(),Lon.toString()).subscribe((item)=>{
    this.newAddress=item.display_name
   
  })
}


updateDistance()
{
  if(!this.newad || !this.newAddress)
  {
    alert("Hãy chọn marker và số nhà nhé ")
  }
  else{
  if(this.inputLat || this.inputLon ){
    this.storeService.patchDistanceStore({
      _id:this.idStore,
      ToaDo:this.inputLat+","+this.inputLon,
      DiaChi:this.newad+","+this.newAddress

    }).subscribe((item)=>{

    })
  }else{
    alert("Bạn chưa chọn vị trí")
  }
}
  
}


}

