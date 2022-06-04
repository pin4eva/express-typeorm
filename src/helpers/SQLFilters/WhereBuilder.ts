import { isEmpty, map } from 'lodash';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { Filter, FiltersExpression, Operation } from './types';

type ParamValue = string | number | Array<string | number>;

export default class WhereBuilder<Entity> {
  private params: Record<string, ParamValue> = {};
  private paramsCount = 0;

  constructor(
    private readonly qb: SelectQueryBuilder<Entity>,
    private filtersExpression?: FiltersExpression,
  ) {}

  build() {
    if (!this.filtersExpression) return;

    const whereSql = this.buildExpressionRec(this.filtersExpression);
    this.qb.where(whereSql, this.params);
  }

  private buildExpressionRec(fe: FiltersExpression): string {
    const filters = map(fe.filters, (f) => this.buildFilter(f));
    const children = map(fe.childExpressions, (child) => this.buildExpressionRec(child));

    const allSqlBlocks = [...filters, ...children];
    const sqLExpr = allSqlBlocks.join(` ${fe.operator} `);
    return isEmpty(sqLExpr) ? '' : `(${sqLExpr})`;
  }

  private buildFilter(filter: Filter): string {
    const paramName = `${filter.field}_${++this.paramsCount}`;

    switch (filter.op) {
      case Operation.EQ:
        this.params[paramName] = filter.values[0];
        return `${filter.field} = :${paramName}`;
      case Operation.IN:
        this.params[paramName] = filter.values;
        return `${filter.field} IN (:${paramName})`;
      case Operation.LIKE:
        this.params[paramName] = `%${filter.values[0]}%`;
        return `${filter.field} LIKE :${paramName}`;
      case Operation.GE:
        this.params[paramName] = filter.values[0];
        return `${filter.field} >= :${paramName}`;
      default:
        throw new Error(`Unknown filter operation: ${filter.op}`);
    }
  }
}
