import { BaseURLBuilder } from "src/lib/APIService/Builder/BaseURLBuilder";

export class OAuthURLBuilder extends BaseURLBuilder {
    
    constructor() { super(); }
    
    setBase(): void {
        this.finalizedURL.push('outpost.mapmyindia.com/api/security');
    }
    
    generateResource(): void {
        this.finalizedURL.push('oauth');
    }
    
    generateSubResource(): void {
        this.finalizedURL.push('token');
    }
}