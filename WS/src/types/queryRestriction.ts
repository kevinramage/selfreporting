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