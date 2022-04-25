import { Component, OnInit } from '@angular/core';
import { AnySourceData } from 'mapbox-gl';
import { Feature } from '../../interfaces/places';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId = ''

  constructor(private placesService: PlacesService, private mapService: MapsService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places() {
    return this.placesService.places;
  }

  get directionSelected() {
    return this.placesService.directionSelected;
  }

  flyTo(place: Feature){
    this.selectedId = place.id

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature){
    const start = this.placesService.userLocation!;
    const end = place.center as [number,number]

    this.mapService.getRouteBewtweenTwoPoints(start, end);

    this.placesService.directionSelected = !this.placesService.directionSelected;

    
  }

}
