import { Participation } from "./participation";

export class Country {
    constructor (
        public id: number,
        public country: string,
        public participations: Participation[],
    )
    {

    }
}