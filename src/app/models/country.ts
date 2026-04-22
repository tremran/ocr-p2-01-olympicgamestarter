import { Participation } from "./participation";

export class Country {
    constructor (
        public id: number,
        public name: string,
        public participations: Participation[],
    )
    {

    }
}