import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Country } from 'src/app/models/country';
import { ObservableDataService } from 'src/app/services/observable-data.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public lineChartId = 'country-line-chart';
  public error!: string;
  public country$!: Observable<Country|undefined>;
  public country!:Country;

  constructor(
    private route: ActivatedRoute, 
    private dataService: ObservableDataService, 
    private router: Router, 
  ) {
  }

  ngOnInit() {
    let countryName: string | null = "";
    
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        countryName = param.get('countryName');
        this.country$ = this.dataService.getCountryByName(countryName).pipe(
          tap((country) => {if (country) this.country = Country.fromCountry(country) })
        );
      }
    );
  }

}
