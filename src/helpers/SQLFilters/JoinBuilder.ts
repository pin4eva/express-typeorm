import forEach from 'lodash.foreach';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { FiltersExpression } from './types';

export class JoinBuilder<Entity> {
  private joinedEntities = new Set<string>();

  constructor(
    private readonly qb: SelectQueryBuilder<Entity>,
    private filtersExpression?: FiltersExpression,
  ) {}

  build() {
    if (this.filtersExpression) this.buildJoinEntitiesRec(this.filtersExpression);
  }

  private buildJoinEntitiesRec(fe: FiltersExpression) {
    forEach(fe.filters, (f) => this.addJoinEntity(f.field, f.relationField));
    forEach(fe.childExpressions, (child) => this.buildJoinEntitiesRec(child));
  }

  private addJoinEntity(field: string, relationField?: string) {
    const entityName = field.split('.')[0];

    if (relationField && !this.joinedEntities.has(entityName)) {
      this.qb.leftJoinAndSelect(relationField, entityName);
      this.joinedEntities.add(entityName);
    }
  }
}
