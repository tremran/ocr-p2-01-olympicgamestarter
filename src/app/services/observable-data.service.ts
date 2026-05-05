import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Participation } from '../models/participation';
import { Country } from '../models/country';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObservableDataService {
  private url:string = './assets/mock/olympic.json';
  private delay: number = 300;
  
  constructor(private http: HttpClient ) { }

  getCountryByName(countryName: string|null): Observable<Country|undefined>
  {
    return this.http.get<Country[]>(this.url).pipe(
      // delay(this.delay),
      map((countryList) => countryList.find((country) => country.country === countryName)),
      map((country) => country ? Country.fromCountry(country) : undefined)
    );
    
  }

  getAllCountries(): Observable<string[]>
  {
    return this.http.get<Country[]>(this.url).pipe(
      delay(this.delay), // todo comment this
      map((countryList) => {
        return countryList.map((c: Country) => c.country)}
      )
    );
  }

  getTotalJos(): Observable<number>
  {
    return this.http.get<Country[]>(this.url).pipe(
      map((countryList) => Array.from(new Set(countryList.map((c: Country) => c.participations.map((p: Participation) => p.year)).flat())).length)
    );
  }

  getAllMedalsYears(): Observable<number[]>
  {
    return this.http.get<Country[]>(this.url).pipe(
      map((countryList) => 
        countryList.map(
          (c: Country) => c.participations.map(
            (p: Participation) => (p.medalsCount)
          )
        )
      ),
      map((medalList) => medalList.map((i) => i.reduce((acc: number, i: number) => acc + i, 0)))
    );
  }

}
