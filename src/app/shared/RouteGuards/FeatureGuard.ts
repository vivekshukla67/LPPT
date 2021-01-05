import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { FeatureAccessService, IFeatureAccessService } from "../Services/FeatureAccessService";
import { APPShellFeatureSet } from "../Enums/Enums";
@Injectable({
    providedIn: 'root'
})
export class FeatureGuard implements CanActivate {

    private readonly featureAccessService: IFeatureAccessService;

    constructor() { this.featureAccessService = new FeatureAccessService(); }

    canActivate(route: ActivatedRouteSnapshot) {
        return this.featureAccessService.ValidateFeatureSet(APPShellFeatureSet[route.routeConfig.path]);
    }
}