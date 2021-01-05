import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class RoutingUtils {
    constructor() { }

    public static get LOGIN(): string { return "login"; };

    public static get CREATEPASSWORD(): string { return "create-password" }
}
