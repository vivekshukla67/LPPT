export class FilterSuggestionModel {

    constructor(name?: string | object){
        if (name && typeof name === 'string'){
            this.entityName = name;
            this.entityId = name;
        }
        if (name && typeof name !== 'string'){
            this.entityName = name['entityName'];
            this.entityId = name['entityId'];
        }
    }

    private isSelected: boolean = false;
    public get IsSelected() {
        return this.isSelected;
    }
    public set IsSelected(value: boolean) {
        this.isSelected = value;
    }

    private entityName: string;
    public get DisplayName(): string {
        return this.entityName
    }

    private entityId: string;
    public get ContentId(): string {
        return this.entityId
    }
}