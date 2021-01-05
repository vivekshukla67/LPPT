export class Filters {

    private filterName: string;
    public get FilterName(): string {
        return this.filterName
    }

    private filterDescription: string;
    public get FilterDescription(): string {
        return this.filterDescription;
    }

    private filterType: string;
    public get FilterType(): string {
        return this.filterType;
    }

    private possibleValue: Array<string | object>;
    public get PossibleValues(): Array<string | object> {
        return this.possibleValue;
    }

    private maxDuration: number;
    public get MaxDuration(): number {
        return this.maxDuration;
    }

    private searchSource: string;
    public get SearchSource(): string {
        return this.searchSource;
    }

    private paramName: string;
    public get ParamName(): string {
        return this.paramName;
    }

    private selectMany: boolean;
    public get SelectMany(): boolean {
        return this.selectMany;
    }

    private filterOrder: number;
    public get FilterOrder(): number {
        return this.filterOrder;
    }

    private filters: Filters;
    public get Filters(): Filters {
        return this.filters;
    }

    private action: string;
    public get Action(): string {
        return this.action;
    }

    private trigger: string;
    public get Trigger(): string {
        return this.trigger;
    }
}