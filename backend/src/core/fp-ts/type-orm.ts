import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

export class TypeOrmError extends Error {
  public originalError?: any;

  constructor(message: string, error?: any) {
    super(message);

    this.originalError = error;
  }
}

TypeOrmError.prototype.toString = function () {
  return `Typeorm Error: ${this.message}`;
};

const errorHandler = (reason: unknown): TypeOrmError => {
  if (reason instanceof Error) {
    return new TypeOrmError(reason.toString(), reason);
  } else {
    return new TypeOrmError('Unknown error', reason);
  }
};

import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

export interface RepositoryEither<StructureToCreate, Entity> {
  /**
   * Creates a new entity instance and copies all entity properties from this object into a new entity.
   * Note that it copies only properties that present in entity schema.
   */
  create(entityLike: StructureToCreate): E.Either<TypeOrmError, Entity>;
  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   */
  // tslint:disable-next-line:max-line-length
  insert(entity: StructureToCreate | StructureToCreate[]): TE.TaskEither<TypeOrmError, InsertResult>;
  /**
   * Counts entities that match given options.
   */
  count(options?: FindManyOptions<Entity> | FindConditions<Entity>): TE.TaskEither<TypeOrmError, number>;
  /**
   * Finds entities that match given options.
   */
  findByManyOptions(options?: FindManyOptions<Entity>): TE.TaskEither<TypeOrmError, ReadonlyArray<Entity>>;
}

export const eitherifyTypeormRepository = <StructureToCreate, Entity>(
  repository: Repository<Entity>,
): RepositoryEither<StructureToCreate, Entity> => {
  return {
    findByManyOptions: (conditions) => TE.tryCatch(() => repository.find(conditions), errorHandler),
    create: (entity) => E.tryCatch(() => repository.create(entity), errorHandler),
    insert: (entity) => TE.tryCatch(() => repository.insert(entity), errorHandler),
    count: (options) => TE.tryCatch(() => repository.count(options), errorHandler),
  };
};
