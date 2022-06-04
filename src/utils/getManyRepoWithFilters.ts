import { EntityTarget, getRepository } from 'typeorm';

interface IProps {
  Repo: EntityTarget<any>;
  limit: number;
  skip: number;
  searchTerm: string;
  singularName: string;
}

export default async ({ Repo, limit, skip, searchTerm, singularName }: IProps) => {
  return await getRepository(Repo)
    .createQueryBuilder(singularName)
    .where('name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    .limit(limit)
    .offset(skip)
    .getMany();
};
