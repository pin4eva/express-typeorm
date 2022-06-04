import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { JoinBuilder } from './JoinBuilder';
import { FiltersExpression } from './types';
import WhereBuilder from './WhereBuilder';

export default class FilterQueryBuilder<Entity> {
  private readonly qb: SelectQueryBuilder<Entity>;
  constructor(entityRepository: Repository<Entity>, private filtersExpression?: FiltersExpression) {
    this.qb = entityRepository.createQueryBuilder();
  }
  build() {
    const jb = new JoinBuilder<Entity>(this.qb, this.filtersExpression);
    jb.build();
    const wb = new WhereBuilder<Entity>(this.qb, this.filtersExpression);
    wb.build();
    return this.qb;
  }
}
