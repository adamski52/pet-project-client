export class ValidationService {
    static isRequired(control) {
        let errors = ValidationService.getErrors(control);
        for(let i = 0; i < errors.length; i++) {
            if(errors[i] == "required") {
                return true;
            }
        }

        return false;
    }

    static getErrors(control) {
        let errors = [];
        if(!control.errors) {
            return errors;
        }

        for(let i = 0; i < Object.keys(control.errors).length; i++) {
            errors.push(Object.keys(control.errors)[i]);
        }
        return errors;
    }

    static getMessage(control) {
        let errors = ValidationService.getErrors(control),
            reqd = ValidationService.isRequired(control),
            parentMessage = "";

        if(control.pristine) {
            if(errors.length > 0) {
                if(reqd) {
                    return "Required";
                }
                console.log(control);
                return errors[0];
            }

            return "Optional";
        }


        if(errors.length == 1) {
            if(reqd) {
                return "Required";
            }

            if(control.value == "") {
                return "yyOptional";
            }

            return errors[0];
        }


        if(errors.length > 1) {
            if(reqd) {
                if(control.value == "") {
                    return "Required";
                }

                for(let i = 0; i < errors.length; i++) {
                    if(errors[i] != "required") {
                        return errors[i];
                    }
                }
            }

            return errors[0];
        }

        return "OK";
    }

    static getStatus(control) {
        let numErrors = control.errors ? Object.keys(control.errors).length : 0;

        if(control.pristine) {
            return "";
        }

        if(control.valid) {
            if(control.value == "") {
                return "";
            }

            return "success";
        }

        if(control._parent && control._parent.errors) {
            return "warning";
        }

        if(numErrors > 0) {
            return "danger";
        }

        return "success";
    }

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

    static allRequired(controlGroup) {
        if(Object.keys(controlGroup.controls).length <= 0) {
            return null;
        }

        let control;
        for(let c in controlGroup.controls) {
            control = controlGroup.controls[c];
            if(!control.valid) {
                return {
                    incomplete: true
                }
            }
        }

        return null;
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
        if(control.value.match(/^\d{3}-\d{3}-\d{4}$/)) {
            return null;
        }

        return {
            format: true
        };
    }
}