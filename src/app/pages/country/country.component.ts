import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, tap} from 'rxjs';
import { AppInformation } from 'src/app/components/information/information.type';
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
  public headerInfo!:AppInformation[];
  public message: string = 'Loading data';
  private errorTimeout!: number;

  constructor(
    private route: ActivatedRoute, 
    private dataService: ObservableDataService, 
  ) {
  }

  ngOnInit() {

    let countryName: string | null = "";
    
    this.errorTimeout = setTimeout(() => this.message = 'An error occured, please try again later', 2000);
    
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        countryName = param.get('countryName');
        this.country$ = this.dataService.getCountryByName(countryName).pipe(
          tap((country: Country|undefined) => { 
            clearTimeout(this.errorTimeout);
            if (!country) this.message = 'country not found'}
          )
        );
      }
    );
  }

}
