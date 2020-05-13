import { LeafletMap } from '../services/leaflet-map';
import { DonationService } from '../services/donation-service';
import { inject } from 'aurelia-framework';

@inject(DonationService)
export class Map {
  mapId = 'main-map';
  mapHeight = 600;
  map: LeafletMap;

  constructor(private ds: DonationService) {}

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203 },
      zoom: 8,
      minZoom: 1
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
  }
}
