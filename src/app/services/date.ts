export class DateService {

    // TODO:  Care about month and year
    static getDates(month?:number, year?:number) {
        let dates = [],
            max = 31;

        for(let i = 1; i <= max; i++) {
            dates.push(i);
        }

        return dates;
    }

    static getMonths() {
        return [
            {
                name: "January",
                value: 1
            },
            {
                name: "February",
                value: 2
            },
            {
                name: "March",
                value: 3
            }
        ];
    }

    static getYears(min?:number, max?:number) {
        if(!max) {
            max = new Date().getFullYear();
        }

        if(!min) {
            min = max - 100;
        }

        let years = [];
        for(let i = max; i >= min; i--) {
            years.push(i);
        }

        return years;
    }
}