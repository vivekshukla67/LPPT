import { BaseURLBuilder } from "src/lib/APIService/Builder/BaseURLBuilder";

export class ConcreteUserProfileBuilder extends BaseURLBuilder {
    generateSubResource(): void {
        return null;
    }

    setBase(): void {
        this.finalizedURL.push('anchor.mapmyindia.com/api');
    }
    generateResource(): void {
        this.finalizedURL.push('users');
    }
}

export class ConcreteUserAccountBuilder extends BaseURLBuilder {
    generateSubResource(): void {
        return null;
    }

    setBase(): void {
        this.finalizedURL.push('anchor.mapmyindia.com/api');
    }
    generateResource(): void {
        this.finalizedURL.push('accounts');
    }
}