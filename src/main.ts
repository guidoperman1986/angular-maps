import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpZG9wZXJtYW4iLCJhIjoiY2s0YW13dHRoMDNycjNlcGFuMmhubGJjNSJ9.Z92hBclh4KkowqgEPBmXZg';

if (!navigator.geolocation) {
  console.log('Navegador no soporta la geolocalizacion');
  throw new Error('Navegador no soporta la geolocalizacion');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
