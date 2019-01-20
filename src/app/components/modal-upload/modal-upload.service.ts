import { Injectable, EventEmitter } from '@angular/core';
import { st } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public img: string;

  public oculto: string = 'oculto';

  public notification = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = '';
    this.tipo = null;
  }

  mostrarModal( tipo: string, id: string, imagen: any ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
    this.img = imagen;
  }
}
