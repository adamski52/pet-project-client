export class ValidationService {
    static errors = {
        email: "Invalid email address.",
        allMatch: "Values do not match.",
        atLeastOne: "At least one value is required.",
        required: "Field is required."
    }

    static getControlErrors(control) {
        console.log("ERRORS FOR", control);
        var results = [],
            childResults,
            errs,
            obj;

        for(var c in control.controls) {
            childResults = ValidationService.getControlErrors(control.controls[c]);
            if(childResults) {
                results.push(childResults);
            }


            errs = control.controls[c]._errors;
            if(errs) {
                obj = {
                    name: c,
                    errors: []
                };

                for(var e in control.controls[c]._errors) {
                    obj.errors.push(ValidationService.getErrorMsg(e));
                }

                results.push(obj);
            }
        }

        return [].concat(...results);
    }

    static getErrorMsg(type) {
        return ValidationService.errors[type] || "Invalid value.";
    }

    static email(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }

        return {
            email: true
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
                    mismatched: true
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
            allBlank: true
        };
    }

    static zipCode(control) {
        if(control.value.match(/^\d{5}(-\d{4})?$/)) {
            return null;
        }

        return {
            zipCode: true
        };
    }

    static phoneNumber(control) {
        let match = control.value.match(/^\d{3}-\d{3}-\d{4}$/);
    }
}