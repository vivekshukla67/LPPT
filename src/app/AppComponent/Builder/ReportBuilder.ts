import { BaseURLBuilder } from "src/lib/APIService/Builder/BaseURLBuilder";

export class reportsConcreteBuilder extends BaseURLBuilder {

    setBase(): void {
        this.finalizedURL.push('anchor.mapmyindia.com/api/v4');
    }

    generateResource(): void {
        this.finalizedURL.push('reports');
    }

    generateSubResource(): void {
        return;
    }

}

export class reportsRegionsConcreteBuilder extends BaseURLBuilder {

    setBase(): void {
        this.finalizedURL.push('anchor.mapmyindia.com/api/v4');
    }

    generateResource(): void {
        this.finalizedURL.push('reports');
    }

    generateSubResource(): void {
        this.finalizedURL.push('records');
    }

}