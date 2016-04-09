import {IUser} from "./user";

export interface IDog {
    id: number,
    url: string,
    owner: string,
    name: string,
    dob: Date,
    breed: string,
    weight: number,
    color: string,
    gender: string,
    humans: IUser[]
}