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

  constructor(
    private router: Router, 
    private dataService: ObservableDataService,
  ) { }

  ngOnInit() {

    this.totalJOs$ = this.dataService.getTotalJos();

    this.countries$ = this.dataService.getAllCountries().pipe(
      tap((countryList: string[]) => {
        this.totalCountries = countryList.length;
      })
    );

    this.sumOfAllMedalsYears$ = this.dataService.getAllMedalsYears();
  }

}

