export class DateFilter {
    
    private filterId: string;
    public get FilterId(): string { return this.filterId; }
    public set FilterId(value: string) { this.filterId = value; }

    private filterName: string;
    public get FilterName(): string { return this.filterName; }
    public set FilterName(value: string) { this.filterName = value; }
    
    private filterType: string;
    public get FilterType(): string { return this.filterType; }
    public set FilterType(value: string) { this.filterType = value; }

    private maxDuration: number;
    public get MaxDuration(): number { return this.maxDuration; }
    public set MaxDuration(value: number) { this.maxDuration = value; }

    private paramName: string;
    public get ParamName(): string { return this.paramName; }
    public set ParamName(value: string) { this.paramName = value; }

    private selectMany: boolean;
    public get SelectMany(): boolean { return this.selectMany; }
    public set SelectMany(value: boolean) { this.selectMany = value; }

    private status: string;
    public get Status(): string { return this.status; }
    public set Status(value: string) { this.status = value; }
}