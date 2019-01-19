import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img ) {
      return url + '/usuarios/unknown';
    }

    if ( img.indexOf('https') >= 0 ) {
        // Es una imagen de google
        return img;
    }



    switch ( tipo ) {
      case 'usuario':
          url += '/usuarios/' + img;
          break;

      case 'medico':
          url += '/usuarios/' + img;
          break;

      case 'hospital':
          url += '/usuarios/' + img;
          break;

      default:
          console.log('Tipo de imagen no existe');
          url += '/usuarios/unknown';
    }
    return url;
  }

}
