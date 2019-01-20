import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './table/table.component';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ServiceModule } from '../services/service.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
        declarations: [
            ModalUploadComponent,
            DashboardComponent,
            ProgressComponent,
            PagesComponent,
            Graficas1Component,
            TableComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent],
        exports: [
            DashboardComponent,
            ProgressComponent,
            PagesComponent,
            Graficas1Component
        ],
        imports: [
            CommonModule,
            SharedModule,
            PAGES_ROUTES,
            FormsModule,
            ChartsModule,
            BrowserModule,
            ServiceModule,
            PipesModule
        ]
})

export class PagesModule {}

