import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { AllComponent } from './components/all/all.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { NgChartsModule } from 'ng2-charts';
import { PricechartComponent } from './components/charts/pricechart/pricechart.component';
import { TradingviewComponent } from './components/charts/tradingview/tradingview.component';
import { EarningchartComponent } from './components/charts/earningchart/earningchart.component';
import { BalancechartComponent } from './components/charts/balancechart/balancechart.component';
import { EpsdpschartComponent } from './components/charts/epsdpschart/epsdpschart.component';
import { CashflowchartComponent } from './components/charts/cashflowchart/cashflowchart.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetComponent } from './components/reset/reset.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    LoginComponent,
    AboutComponent,
    AllComponent,
    AddComponent,
    WatchlistComponent,
    PortfolioComponent,
    EditComponent,
    PricechartComponent,
    TradingviewComponent,
    EarningchartComponent,
    BalancechartComponent,
    EpsdpschartComponent,
    CashflowchartComponent,
    SignupComponent,
    ResetComponent,
    NotificationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
