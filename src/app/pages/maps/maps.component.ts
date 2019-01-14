import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Location, Address } from '../../interfaces/maps.interface';
import { MapService } from '../../services/maps/map.service';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  title: string = 'My first AGM project';
  geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
              public _mapas: MapService,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
                this.mapsApiLoader = mapsApiLoader;
                this.zone = zone;
                this.wrapper = wrapper;
                  this.mapsApiLoader.load().then( () => {
                    this.geocoder = new google.maps.Geocoder();
                });
               }

  ngOnInit() {
    this._mapas.cargarDirecciones().then( () => {
      console.log(this._mapas.info);
      this._mapas.info.forEach( element => {
        console.log('Element', element);
        console.log('Ret', this.updateOnMap(element));
      });
    });
  }

  markerDragEnd(event) {
    console.log(event);
  }


  updateOnMap(addressItem: Address) {
    let full_address: string = addressItem.Direccion || '';
    if (addressItem.Ciudad) { full_address = full_address + ' '  + addressItem.Ciudad; }
    if (addressItem.Provincia) { full_address = full_address +  ' '  + addressItem.Provincia; }
    if (addressItem.Pais) { full_address = full_address +  ' '  + addressItem.Pais; }

    return this.findLocation(full_address);
}

findLocation(address) {
  // tslint:disable-next-line:prefer-const
  let Item: Location;

  if (!this.geocoder) {
    this.geocoder = new google.maps.Geocoder();
  }

  this.geocoder.geocode({
    'address': address
  }, (results, status) => {
    console.log('Resultados', results);
    if (status === google.maps.GeocoderStatus.OK) {
      for (let i = 0; i < results[0].address_components.length; i++) {
        const types = results[0].address_components[i].types;

        if (types.indexOf('locality') !== -1) {
          Item.address_level_2 = results[0].address_components[i].long_name;
        }
        if (types.indexOf('country') !== -1) {
          Item.address_country = results[0].address_components[i].long_name;
        }
        if (types.indexOf('postal_code') !== -1) {
          Item.address_zip = results[0].address_components[i].long_name;
        }
        if (types.indexOf('administrative_area_level_1') !== -1) {
          Item.address_state = results[0].address_components[i].long_name;
        }
      }

      if (results[0].geometry.location) {
        Item.lat = results[0].geometry.location.lat();
        Item.lng = results[0].geometry.location.lng();
        Item.marker.lat = results[0].geometry.location.lat();
        Item.marker.lng = results[0].geometry.location.lng();
        Item.marker.draggable = true;
        Item.viewport = results[0].geometry.viewport;
      }

      return Item;

    } else {
      alert('Sorry, this search produced no results.');
      return Item;
    }
  });
}

}
