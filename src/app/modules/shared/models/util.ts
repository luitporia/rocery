import { Headers, RequestOptions } from '@angular/http';

export class Util {

    static getTokenOptions(token: string) {
        let tokenStr = token.split('\'');
        let headers = new Headers({ 'Authorization': 'bearer ' + tokenStr[1] })
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    static stringIsNullOrEmpty(str: string) {
        if (str != null && str != "") {
            return false;
        }
        return true;
    }

    static stringIsNullEmptyOrUndefined(str: string) {
        if (str != null && str != "" && str != "null" && str != "undefined") {
            return false;
        }
        return true;
    }

    static validateBool(str: any) {
        if (str == "true" || str == "false") {
            return true;
        }
        return false;
    }

    omitSpecialChar(event) {
        var k;
        k = event.charCode;  // k = event.keyCode; (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
}
