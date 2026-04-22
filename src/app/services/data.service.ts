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
    console.log('data constructor');
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

  getAllCountries(): string[]
  {
    return this.data.map((c: Country) => c.name);
  }

  getAllMedalsYears(): number[]
  {
    const medals = this.data.map(
      (c: Country) => c.participations.map(
        (p: Participation) => (p.medalsCount)
      )
    );
    return medals.map((i) => i.reduce((acc: any, i: any) => acc + i, 0));
  }

  getError(): string{
    return this.error;
  }

  async getTotalJos(): Promise<number>
  {
    return Array.from(new Set(this.data.map((c: Country) => c.participations.map((p: Participation) => p.year)).flat())).length
  }
}
