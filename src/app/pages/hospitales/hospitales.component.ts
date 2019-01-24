import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospitales/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;
  termino: string = '';

  date = new Date();

  constructor(
    public _hospital: HospitalService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUpload.notification.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  escriboBusqueda(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      this.termino = '';
      return;
    }

    this.desde = 0;
    this.termino = termino;
    this.buscarHospital( termino, this.desde );
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospital.cargarHospitales( this.desde )
    .subscribe( (resp: any) => {
      console.log(resp);

      this.total = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital( termino: string, desde: number ) {
    this._hospital.buscarHospital( termino, desde )
    .subscribe( resp => this.hospitales = resp);
  }


  abrirModal( id: string, imagen: any ) {
    this._modalUpload.mostrarModal( 'hospitales', id, imagen );
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.total ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarHospitales();

  }

  nuevoHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      content: {
        element: 'input'
      },
      buttons: [true, 'Confirmar'],
      dangerMode: true
    })
    .then(name => {

      if (name === '') {
        swal('Error', 'Debe escribir algo', 'error')
        .then( () => this.nuevoHospital());
      }

      if (!name) {
        return;
      }

      const hospi = new Hospital( name );

      this._hospital.crearHospital(hospi)
      .subscribe( resp => {
        console.log( resp );
        this.cargarHospitales();
      });

    });
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: 'Esta seguro?',
      text: 'Usted esta a punto de borrar el hospital: ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {

        this._hospital.borrarHospital( hospital._id )
        .subscribe( borrado => {
          console.log( borrado );
          this.desde = 0;
          this.cargarHospitales();
        });
      }
    });
  }


  guardarHospital( hospital: Hospital ) {
    this._hospital.actualizarHospital( hospital )
    .subscribe();
  }

}
