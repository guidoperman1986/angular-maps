import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // public userLocation: [number,number] | undefined;
  public userLocation?: [number, number];
  public isLoadingPlaces = false;
  public places: Feature[] = [];
  directionSelected = false;

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapsService
  ) {
    this.getUserLocation();
    console.log('user location ', this.userLocation);
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
          console.log(this.userLocation);
        },
        (error) => {
          console.log(error);
          alert('No se pudo obtener la geolocalizacion');
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(',')!,
        },
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkerFromPlaces(this.places, this.userLocation!);
      });
  }
}
