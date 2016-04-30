export class ValidationService {
    static email(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }

        return {
            format: true
        };
    }

    static allMatch(controlGroup) {
        if(Object.keys(controlGroup.controls).length <= 0) {
            return null;
        }

        let props = 0;
        let val = "";
        let control;

        for(let c in controlGroup.controls) {
            control = controlGroup.controls[c];

            if(props++ == 0) {
                val = control.value;
            }
            else if(val != control.value) {
                return {
                    mismatch: true
                }
            }
        }

        return null;
    }

    static atLeastOne(controlGroup) {
        if(Object.keys(controlGroup.controls).length <= 0) {
            return null;
        }

        let control;
        let blanks = 0;
        for(let c in controlGroup.controls) {
            control = controlGroup.controls[c];
            switch(control.value) {
                case "":
                case undefined:
                case null:
                    break;
                default:
                    return null;
                    break;    
            }
        }

        return {
            either: true
        };
    }

    static zipCode(control) {
        if(control.value.match(/^\d{5}(-\d{4})?$/)) {
            return null;
        }

        return {
            format: true
        };
    }

    static phoneNumber(control) {
        let match = control.value.match(/^\d{3}-\d{3}-\d{4}$/);
    }
}