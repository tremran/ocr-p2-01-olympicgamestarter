import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { InformationComponent } from './components/information/information.component';
import { ChartComponent } from "src/app/components/chart/chart.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryComponent, InformationComponent],
  imports: [BrowserModule, AppRoutingModule, ChartComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
