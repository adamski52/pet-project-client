import {IDog} from "./dog";
import {IAttachment} from "./attachment";
export interface IUser {
    id: number,
    url: string,
    username: string,
    first_name: string,
    last_name: string,
    dob: Date,
    email: string,
    address: string,
    address2: string,
    city: string,
    state: string,
    zip_code: string,
    home_phone: string,
    cell_phone: string,
    gender: string,
    dogs: IDog[],
    attachments: [],
    is_staff: boolean,
    is_superuser: boolean,
    is_active: boolean,
    date_created: Date,
    date_modified: Date
}