import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses, Address, Location } from '../../interfaces/maps.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  info: Address[];

  constructor( private http: HttpClient ) {

    console.log('Servicio de maps listo');
   }

   cargarDirecciones() {
    return new Promise( (resolve, reject) => {
        this.http.get('assets/data/direcciones.json')
        .subscribe( (resp: Addresses) => {
          this.info = resp.Direcciones;
          resolve();
        });
    });

   }
}
