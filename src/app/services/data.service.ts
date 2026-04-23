import {HttpClient} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Participation } from '../models/participation';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {
  private url:string = './assets/mock/olympic.json';
  private data: Country[];
  private error: string;
  
  constructor(private http: HttpClient ) { 
    this.data = [];
    this.error = '';
  }

  async ngOnInit(): Promise<any> {

  }

  async loadData(): Promise<any> {
    const response = await fetch(this.url);

    if (! response.ok)
    {
      console.log(response.statusText);
      throw 'Impossible d accéder aux données';
    }
    const jsonData = await response.json();
    this.data = jsonData;
  }

  checkCountryName(countryName: string): boolean 
  {
    const countryInfo: Country|null = this.getCountryInfo(countryName);

    return countryInfo !== null;
  }

  getAllCountries(): string[]
  {
    return this.data.map((c: Country) => c.country);
  }

  getMedalsForCountry(countryName: string): number[] {
    const selectedCountry: Country|null = this.getCountryInfo(countryName);
    if (selectedCountry === null) return [];

    return selectedCountry.participations.map((p: Participation) => p.medalsCount) ?? [];
  }

  getAllMedalsYears(): number[]
  {
    const medals = this.data.map(
      (c: Country) => c.participations.map(
        (p: Participation) => (p.medalsCount)
      )
    );
    return medals.map((i) => i.reduce((acc: number, i: number) => acc + i, 0));
  }

  getAthleteCountForCountry(countryName: string): number
  {

    const selectedCountry: Country|null = this.getCountryInfo(countryName);
    if (selectedCountry === null) return 0;
    const nbAthletes = selectedCountry?.participations.map((p: Participation) => p.athleteCount.toString()) ?? []
    return nbAthletes.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0);
  }

  getParticipationCountForCountry(countryName: string): number
  {
    const selectedCountry: Country|null = this.getCountryInfo(countryName);
    if (selectedCountry === null) return 0;
    return selectedCountry.participations.length;
  }

  getParticipationYearsForCountry(countryName: string): string[]
  {
    const selectedCountry: Country|null = this.getCountryInfo(countryName);
    if (selectedCountry === null) return [];
    return selectedCountry.participations.map((p: Participation) => p.year.toString()) ?? [];
  }

  async getTotalJos(): Promise<number>
  {
    return Array.from(new Set(this.data.map((c: Country) => c.participations.map((p: Participation) => p.year)).flat())).length
  }

  private getCountryInfo(countryName: string): Country|null
  {
    let info = this.data.find((c: Country) => c.country === countryName);
    if (info === undefined) return null;
    return info;
  }

  getError(): string{
    return this.error;
  }
}
