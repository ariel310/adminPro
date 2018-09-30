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

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ServiceModule } from '../services/service.module';


@NgModule({
        declarations: [
            DashboardComponent,
            ProgressComponent,
            PagesComponent,
            Graficas1Component,
            TableComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent],
        exports: [
            DashboardComponent,
            ProgressComponent,
            PagesComponent,
            Graficas1Component
        ],
        imports: [
            SharedModule,
            PAGES_ROUTES,
            FormsModule,
            ChartsModule,
            BrowserModule,
            ServiceModule
        ]
})

export class PagesModule {}

