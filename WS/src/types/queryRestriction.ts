export interface IQueryRestrictions {
    element1: string;
    element1Type: string;
    operand: string;
    element2: IQueryRestrictions;
}

export interface IQueryRestriction_Element {
    element2: string;
    element2Type: string;
    
}

export module QUERYRESTRICTION_OPERAND {
    export const EQUALS = "EQUALS";
    export const NOT_EQUALS = "NOT_EQUALS";
    export const MATCHES = "MATCHES";
    export const NOTMATCHES = "NOTMATCHES";
}

export module QUERYELEMENT_TYPE {
    export const FIELD = "FIELD";
    export const CONSTANT = "CONSTANT";
}