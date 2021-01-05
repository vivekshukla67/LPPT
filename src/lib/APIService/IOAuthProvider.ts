export interface IFetchToken { 
    
    (avoidCache?: boolean): Promise<string>;
}