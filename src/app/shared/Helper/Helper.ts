import { FormGroup } from "@angular/forms";

/**
* The Helper class defines the `getInstance` method that lets clients access
* the unique singleton instance.
*/
export class Helper {

    private static instance: Helper;

    /**
    * The Singleton's constructor should always be private to prevent direct
    * construction calls with the `new` operator.
    */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Helper {
        if (!Helper.instance) { Helper.instance = new Helper(); }

        return Helper.instance;
    }

    /**
     * Validated the respective form based on the formGroup passed to it.
     *
     * @param formGroup holds the values of each child `FormControl` into one object,
     * with each control name as the key. It calculates its status by reducing the status values
     * of its children. For example, if one of the controls in a group is invalid, the entire
     * group becomes invalid.
     */
    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control.invalid) {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }

    /**
     * Converts Map<string, string> to json object
     *
     * @param map key & value pair
     */
    public toJson(map: Map<string, string>) {

        const returnable = Array.from(map.entries()).reduce((o, [key, value]) => { o[key] = value; return o; }, {});

        return returnable;
    }

    /**
     * validates input context if it is array of object or not.
     *
     * @param inputContext holds context that has to validated.
     * @returns true if validated else false.
     */
    public isArrayOfObject(inputContext: any) {
        return Object.prototype.toString.call(inputContext) === '[object Array]';
    }

    /**
    * validates input context if it is object or not.
    *
    * @param inputContext holds context that has to validated.
    * @returns true if validated else false.
    */
    public isObjectType(inputContext: any) {
        return Object.prototype.toString.call(inputContext) === '[object Object]';
    }

    /**
     * converts array of objects to map.
     * converts nested array objects to nested map object.
     *
     * @param arr Array of object that has to be converted.
     * @returns map objects or nested map objects.
     *
     * TODO:-- This function has to be generalized, now its working specific to
     * pipeline process in pipeline-creator.component.ts.
     */
    public arrayOfObjectToMap(arr: Array<Object>) {
        const hash = Object.assign({}, ...arr.map(s => ({
            [s['paramName']]: Helper.getInstance().isArrayOfObject(s['value']) ?
                Object.assign({}, ...s['value'].map(k => ({ [k['key']]: k['value'] }))) : s['value']

        })));

        return hash;
    }

    public removeAllClass(className: string) {
        const links = document.querySelectorAll('.' + className);
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove(className);
        }
    }

}
