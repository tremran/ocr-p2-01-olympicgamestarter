import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public lineChartId = 'countryChart';
  public lineChart!: Chart<"line", number[], string>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  constructor(
    private route: ActivatedRoute, 
    private chartService: ChartService,
    private dataService: DataService, 
    private router: Router, 
  ) {
  }

  async ngOnInit() {
    await this.dataService.loadData();
    let countryName: string | null = "";
    
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
    if (! this.dataService.checkCountryName(countryName))
    {
        // todo 404
        throw 'Country not found';
    }
    this.titlePage = countryName;
    this.totalEntries = this.dataService.getParticipationCountForCountry(countryName);
    const years = this.dataService.getParticipationYearsForCountry(countryName);
    const medals = this.dataService.getMedalsForCountry(countryName);
    this.totalMedals = medals.reduce((accumulator: number, item: number) => accumulator + item, 0);

    this.lineChart = this.chartService.buildLineChart(years, medals, this.lineChartId);

  }

}
