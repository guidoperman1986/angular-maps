import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
  }



  onQueryChanged(query = '') {
    if (this.directionSelected) {
      this.placesService.directionSelected = false;
    }

    if (this.debounceTimer) clearTimeout(this.debounceTimer); 

    this.debounceTimer = setTimeout(()=>{
      this.placesService.getPlacesByQuery(query)
    }, 500)
  }

  get directionSelected() {
    return this.placesService.directionSelected;
  }

}
