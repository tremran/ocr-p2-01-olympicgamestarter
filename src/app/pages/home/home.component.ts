import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  titlePage: string = "Medals per Country";

  constructor(
    private router: Router, 
    private dataService: DataService,
    private chartService: ChartService,
  ) { }

  async ngOnInit() {
    try {
      console.log('try');
      await this.dataService.loadData();
    }
    catch(e)
    {
      // todo gérer l'affichage en cas de non chargement des données
      this.error = String(e);
    }
    this.totalJOs = await this.dataService.getTotalJos();
    console.log('totalJOs ', this.totalJOs);

    const countries: string[] = this.dataService.getAllCountries();
    console.log('countries ', countries);
    this.totalCountries = countries.length;

    const sumOfAllMedalsYears: number[] = this.dataService.getAllMedalsYears();
    console.log('sumOfAllMedalsYears ', sumOfAllMedalsYears);

    console.log(countries);
    this.pieChart = this.chartService.buildPieChart(countries, sumOfAllMedalsYears);
  }

}

