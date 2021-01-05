import { StorageHighLevelService } from "src/app-lib/WebStorage/StorageHighLevelService";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IFeatureAccessService {

    /**
     * validate and grant access.
     * 
     * @param fId for the feature.
     */
    ValidateFeatureSet(fId: string, isProtected?: boolean): boolean;

}

@Injectable({
    providedIn: 'root'
})
export class FeatureAccessService implements IFeatureAccessService {
    private featureSet: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
    constructor() {

    }

    public ValidateFeatureSet(fId: string, isProtected?: boolean): boolean {

        if (isProtected)
            return false;
            // StorageHighLevelService.GetInstance().UserInfo.FeatureSet
        this.featureSet.next(["anchor.all"]);

        if (this.featureSet.getValue().length === 0)
            return false;

        if (this.featureSet.getValue().includes('anchor.all') || this.featureSet.getValue().includes(fId))
            return true;

        return false;
    }

}

