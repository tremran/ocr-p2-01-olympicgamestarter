import { Participation } from "./participation";

export class Country {
    constructor (
        public id: number,
        public country: string,
        public participations: Participation[],
    )
    {

    }
    static fromCountry(country: Country)
    {
        return new Country(country.id, country.country,country.participations)
    }

    get medals() : number[] {
        return this.participations.map((p: Participation) => p.medalsCount) ?? [];
    }
    get medalsCount(): number {
        return this.medals.reduce((accumulator: number, item: number) => accumulator + item, 0);
    }

    get athletes() : number[] {
        return this.participations.map((p: Participation) => p.athleteCount) ?? [];
    }
    get athletesCount(): number {
        return this.athletes.reduce((accumulator: number, item: number) => accumulator + item, 0);
    }
    get participationYears(): string[]
    {
        return this.participations.map((p: Participation) => p.year.toString()) ?? [];
    }
}