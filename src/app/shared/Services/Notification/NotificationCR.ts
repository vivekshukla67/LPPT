import { Type } from "@angular/core";

export class NotificationCR {


    private static _instance = new NotificationCR();
    private static componentRef: Map<string, Type<any>>;

    constructor() {

        NotificationCR._instance = this;

        NotificationCR.componentRef = new Map<string, Type<any>>([
            ['success', null],
            ['info', null],
            ['warning', null],
            ['error', null]
        ]);
    }

    public static GetInstance() {
        return this._instance;
    }

    /**
     * return component reference.
     * 
     * @param key contain the component name. 
     */
    public GetComponentRef(key: string): Type<any> {
        let ref: Type<any> = null;

        if (NotificationCR.componentRef.has(key))
            ref = NotificationCR.componentRef.get(key);

        return ref;

    }
}