export enum Operator {
  AND,
  OR,
}

export enum Operation {
  EQ,
  IN,
  LIKE,
  GE,
}

export interface Filter {
  op: Operation;
  values: string[];
  field: string;
  relationField: string;
}

export interface FiltersExpression {
  operator: Operator;
  filters: Filter[];
  childExpressions: FiltersExpression[];
}
