import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ObservableDataService } from 'src/app/services/observable-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pieChartId: string = 'home-pie-chart';
  public countries$!: Observable<string[]>;
  public sumOfAllMedalsYears$!: Observable<number[]>;
  public totalCountries: number = 0;
  public totalJOs$!: Observable<number>;
  public message: string = 'data loading';

  constructor(
    private router: Router, 
    private dataService: ObservableDataService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.message = 'An error occured, please try again later', 2000);

    this.totalJOs$ = this.dataService.getTotalJos();

    this.countries$ = this.dataService.getAllCountries().pipe(
      tap((countryList: string[]) => {
        if (countryList) {
          this.totalCountries = countryList.length;
        }
      })
    );

    this.sumOfAllMedalsYears$ = this.dataService.getAllMedalsYears();
  }

}

