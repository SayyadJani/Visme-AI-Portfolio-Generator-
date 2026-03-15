
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model Deployment
 * 
 */
export type Deployment = $Result.DefaultSelection<Prisma.$DeploymentPayload>
/**
 * Model ProjectSnapshot
 * 
 */
export type ProjectSnapshot = $Result.DefaultSelection<Prisma.$ProjectSnapshotPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStatus: {
  CREATING: 'CREATING',
  READY: 'READY',
  SLEEPING: 'SLEEPING',
  ERROR: 'ERROR'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const SnapshotType: {
  AUTO: 'AUTO',
  MANUAL: 'MANUAL',
  PREDEPLOY: 'PREDEPLOY',
  PRERESTORE: 'PRERESTORE'
};

export type SnapshotType = (typeof SnapshotType)[keyof typeof SnapshotType]


export const DeploymentStatus: {
  QUEUED: 'QUEUED',
  BUILDING: 'BUILDING',
  LIVE: 'LIVE',
  FAILED: 'FAILED'
};

export type DeploymentStatus = (typeof DeploymentStatus)[keyof typeof DeploymentStatus]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type SnapshotType = $Enums.SnapshotType

export const SnapshotType: typeof $Enums.SnapshotType

export type DeploymentStatus = $Enums.DeploymentStatus

export const DeploymentStatus: typeof $Enums.DeploymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deployment`: Exposes CRUD operations for the **Deployment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deployments
    * const deployments = await prisma.deployment.findMany()
    * ```
    */
  get deployment(): Prisma.DeploymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectSnapshot`: Exposes CRUD operations for the **ProjectSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectSnapshots
    * const projectSnapshots = await prisma.projectSnapshot.findMany()
    * ```
    */
  get projectSnapshot(): Prisma.ProjectSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Template: 'Template',
    Project: 'Project',
    Resume: 'Resume',
    Deployment: 'Deployment',
    ProjectSnapshot: 'ProjectSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "template" | "project" | "resume" | "deployment" | "projectSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      Deployment: {
        payload: Prisma.$DeploymentPayload<ExtArgs>
        fields: Prisma.DeploymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeploymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeploymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          findFirst: {
            args: Prisma.DeploymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeploymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          findMany: {
            args: Prisma.DeploymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>[]
          }
          create: {
            args: Prisma.DeploymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          createMany: {
            args: Prisma.DeploymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeploymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>[]
          }
          delete: {
            args: Prisma.DeploymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          update: {
            args: Prisma.DeploymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          deleteMany: {
            args: Prisma.DeploymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeploymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeploymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>[]
          }
          upsert: {
            args: Prisma.DeploymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeploymentPayload>
          }
          aggregate: {
            args: Prisma.DeploymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeployment>
          }
          groupBy: {
            args: Prisma.DeploymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeploymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeploymentCountArgs<ExtArgs>
            result: $Utils.Optional<DeploymentCountAggregateOutputType> | number
          }
        }
      }
      ProjectSnapshot: {
        payload: Prisma.$ProjectSnapshotPayload<ExtArgs>
        fields: Prisma.ProjectSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          findFirst: {
            args: Prisma.ProjectSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          findMany: {
            args: Prisma.ProjectSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>[]
          }
          create: {
            args: Prisma.ProjectSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          createMany: {
            args: Prisma.ProjectSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>[]
          }
          delete: {
            args: Prisma.ProjectSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          update: {
            args: Prisma.ProjectSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.ProjectSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.ProjectSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSnapshotPayload>
          }
          aggregate: {
            args: Prisma.ProjectSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectSnapshot>
          }
          groupBy: {
            args: Prisma.ProjectSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    template?: TemplateOmit
    project?: ProjectOmit
    resume?: ResumeOmit
    deployment?: DeploymentOmit
    projectSnapshot?: ProjectSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
    resumes: number
    deployments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    resumes?: boolean | UserCountOutputTypeCountResumesArgs
    deployments?: boolean | UserCountOutputTypeCountDeploymentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDeploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeploymentWhereInput
  }


  /**
   * Count Type TemplateCountOutputType
   */

  export type TemplateCountOutputType = {
    projects: number
  }

  export type TemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | TemplateCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateCountOutputType
     */
    select?: TemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    deployments: number
    snapshots: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deployments?: boolean | ProjectCountOutputTypeCountDeploymentsArgs
    snapshots?: boolean | ProjectCountOutputTypeCountSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountDeploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeploymentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    deployments?: boolean | User$deploymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    resumes?: boolean | User$resumesArgs<ExtArgs>
    deployments?: boolean | User$deploymentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      resumes: Prisma.$ResumePayload<ExtArgs>[]
      deployments: Prisma.$DeploymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resumes<T extends User$resumesArgs<ExtArgs> = {}>(args?: Subset<T, User$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deployments<T extends User$deploymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$deploymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.resumes
   */
  export type User$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * User.deployments
   */
  export type User$deploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    where?: DeploymentWhereInput
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    cursor?: DeploymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeploymentScalarFieldEnum | DeploymentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    domain: string | null
    gitRepoUrl: string | null
    thumbUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    domain: string | null
    gitRepoUrl: string | null
    thumbUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    techStack: number
    domain: number
    gitRepoUrl: number
    thumbUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    domain?: true
    gitRepoUrl?: true
    thumbUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    domain?: true
    gitRepoUrl?: true
    thumbUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    techStack?: true
    domain?: true
    gitRepoUrl?: true
    thumbUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string
    techStack: string[]
    domain: string
    gitRepoUrl: string
    thumbUrl: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    techStack?: boolean
    domain?: boolean
    gitRepoUrl?: boolean
    thumbUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | Template$projectsArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    techStack?: boolean
    domain?: boolean
    gitRepoUrl?: boolean
    thumbUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    techStack?: boolean
    domain?: boolean
    gitRepoUrl?: boolean
    thumbUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    techStack?: boolean
    domain?: boolean
    gitRepoUrl?: boolean
    thumbUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "techStack" | "domain" | "gitRepoUrl" | "thumbUrl" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["template"]>
  export type TemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | Template$projectsArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string
      techStack: string[]
      domain: string
      gitRepoUrl: string
      thumbUrl: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {TemplateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {TemplateUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends Template$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Template$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Template model
   */
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'String'>
    readonly name: FieldRef<"Template", 'String'>
    readonly slug: FieldRef<"Template", 'String'>
    readonly description: FieldRef<"Template", 'String'>
    readonly techStack: FieldRef<"Template", 'String[]'>
    readonly domain: FieldRef<"Template", 'String'>
    readonly gitRepoUrl: FieldRef<"Template", 'String'>
    readonly thumbUrl: FieldRef<"Template", 'String'>
    readonly isActive: FieldRef<"Template", 'Boolean'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
    readonly updatedAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template createManyAndReturn
   */
  export type TemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template updateManyAndReturn
   */
  export type TemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to delete.
     */
    limit?: number
  }

  /**
   * Template.projects
   */
  export type Template$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    userId: number | null
    templateId: string | null
    name: string | null
    diskPath: string | null
    status: $Enums.ProjectStatus | null
    previewUrl: string | null
    lastSavedAt: Date | null
    lastOpenedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    templateId: string | null
    name: string | null
    diskPath: string | null
    status: $Enums.ProjectStatus | null
    previewUrl: string | null
    lastSavedAt: Date | null
    lastOpenedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    templateId: number
    name: number
    diskPath: number
    status: number
    previewUrl: number
    lastSavedAt: number
    lastOpenedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    name?: true
    diskPath?: true
    status?: true
    previewUrl?: true
    lastSavedAt?: true
    lastOpenedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    name?: true
    diskPath?: true
    status?: true
    previewUrl?: true
    lastSavedAt?: true
    lastOpenedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    name?: true
    diskPath?: true
    status?: true
    previewUrl?: true
    lastSavedAt?: true
    lastOpenedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    userId: number
    templateId: string
    name: string
    diskPath: string
    status: $Enums.ProjectStatus
    previewUrl: string | null
    lastSavedAt: Date | null
    lastOpenedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    name?: boolean
    diskPath?: boolean
    status?: boolean
    previewUrl?: boolean
    lastSavedAt?: boolean
    lastOpenedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
    deployments?: boolean | Project$deploymentsArgs<ExtArgs>
    snapshots?: boolean | Project$snapshotsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    name?: boolean
    diskPath?: boolean
    status?: boolean
    previewUrl?: boolean
    lastSavedAt?: boolean
    lastOpenedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    name?: boolean
    diskPath?: boolean
    status?: boolean
    previewUrl?: boolean
    lastSavedAt?: boolean
    lastOpenedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    templateId?: boolean
    name?: boolean
    diskPath?: boolean
    status?: boolean
    previewUrl?: boolean
    lastSavedAt?: boolean
    lastOpenedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "templateId" | "name" | "diskPath" | "status" | "previewUrl" | "lastSavedAt" | "lastOpenedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
    deployments?: boolean | Project$deploymentsArgs<ExtArgs>
    snapshots?: boolean | Project$snapshotsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | TemplateDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      template: Prisma.$TemplatePayload<ExtArgs>
      deployments: Prisma.$DeploymentPayload<ExtArgs>[]
      snapshots: Prisma.$ProjectSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      templateId: string
      name: string
      diskPath: string
      status: $Enums.ProjectStatus
      previewUrl: string | null
      lastSavedAt: Date | null
      lastOpenedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    template<T extends TemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TemplateDefaultArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deployments<T extends Project$deploymentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$deploymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    snapshots<T extends Project$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Project$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly userId: FieldRef<"Project", 'Int'>
    readonly templateId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly diskPath: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly previewUrl: FieldRef<"Project", 'String'>
    readonly lastSavedAt: FieldRef<"Project", 'DateTime'>
    readonly lastOpenedAt: FieldRef<"Project", 'DateTime'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.deployments
   */
  export type Project$deploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    where?: DeploymentWhereInput
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    cursor?: DeploymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeploymentScalarFieldEnum | DeploymentScalarFieldEnum[]
  }

  /**
   * Project.snapshots
   */
  export type Project$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    where?: ProjectSnapshotWhereInput
    orderBy?: ProjectSnapshotOrderByWithRelationInput | ProjectSnapshotOrderByWithRelationInput[]
    cursor?: ProjectSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectSnapshotScalarFieldEnum | ProjectSnapshotScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    rawPath: string | null
    createdAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    rawPath: string | null
    createdAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    userId: number
    parsedJson: number
    rawPath: number
    createdAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    userId?: true
    rawPath?: true
    createdAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    userId?: true
    rawPath?: true
    createdAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    userId?: true
    parsedJson?: true
    rawPath?: true
    createdAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: number
    userId: number
    parsedJson: JsonValue
    rawPath: string | null
    createdAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parsedJson?: boolean
    rawPath?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parsedJson?: boolean
    rawPath?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    parsedJson?: boolean
    rawPath?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    userId?: boolean
    parsedJson?: boolean
    rawPath?: boolean
    createdAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "parsedJson" | "rawPath" | "createdAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      parsedJson: Prisma.JsonValue
      rawPath: string | null
      createdAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'Int'>
    readonly userId: FieldRef<"Resume", 'Int'>
    readonly parsedJson: FieldRef<"Resume", 'Json'>
    readonly rawPath: FieldRef<"Resume", 'String'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model Deployment
   */

  export type AggregateDeployment = {
    _count: DeploymentCountAggregateOutputType | null
    _avg: DeploymentAvgAggregateOutputType | null
    _sum: DeploymentSumAggregateOutputType | null
    _min: DeploymentMinAggregateOutputType | null
    _max: DeploymentMaxAggregateOutputType | null
  }

  export type DeploymentAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
  }

  export type DeploymentSumAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
  }

  export type DeploymentMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
    status: $Enums.DeploymentStatus | null
    url: string | null
    error: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type DeploymentMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    userId: number | null
    status: $Enums.DeploymentStatus | null
    url: string | null
    error: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type DeploymentCountAggregateOutputType = {
    id: number
    projectId: number
    userId: number
    status: number
    url: number
    error: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type DeploymentAvgAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
  }

  export type DeploymentSumAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
  }

  export type DeploymentMinAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    status?: true
    url?: true
    error?: true
    createdAt?: true
    completedAt?: true
  }

  export type DeploymentMaxAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    status?: true
    url?: true
    error?: true
    createdAt?: true
    completedAt?: true
  }

  export type DeploymentCountAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    status?: true
    url?: true
    error?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type DeploymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deployment to aggregate.
     */
    where?: DeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deployments to fetch.
     */
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deployments
    **/
    _count?: true | DeploymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeploymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeploymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeploymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeploymentMaxAggregateInputType
  }

  export type GetDeploymentAggregateType<T extends DeploymentAggregateArgs> = {
        [P in keyof T & keyof AggregateDeployment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeployment[P]>
      : GetScalarType<T[P], AggregateDeployment[P]>
  }




  export type DeploymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeploymentWhereInput
    orderBy?: DeploymentOrderByWithAggregationInput | DeploymentOrderByWithAggregationInput[]
    by: DeploymentScalarFieldEnum[] | DeploymentScalarFieldEnum
    having?: DeploymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeploymentCountAggregateInputType | true
    _avg?: DeploymentAvgAggregateInputType
    _sum?: DeploymentSumAggregateInputType
    _min?: DeploymentMinAggregateInputType
    _max?: DeploymentMaxAggregateInputType
  }

  export type DeploymentGroupByOutputType = {
    id: number
    projectId: number
    userId: number
    status: $Enums.DeploymentStatus
    url: string | null
    error: string | null
    createdAt: Date
    completedAt: Date | null
    _count: DeploymentCountAggregateOutputType | null
    _avg: DeploymentAvgAggregateOutputType | null
    _sum: DeploymentSumAggregateOutputType | null
    _min: DeploymentMinAggregateOutputType | null
    _max: DeploymentMaxAggregateOutputType | null
  }

  type GetDeploymentGroupByPayload<T extends DeploymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeploymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeploymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeploymentGroupByOutputType[P]>
            : GetScalarType<T[P], DeploymentGroupByOutputType[P]>
        }
      >
    >


  export type DeploymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    status?: boolean
    url?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deployment"]>

  export type DeploymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    status?: boolean
    url?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deployment"]>

  export type DeploymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    status?: boolean
    url?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deployment"]>

  export type DeploymentSelectScalar = {
    id?: boolean
    projectId?: boolean
    userId?: boolean
    status?: boolean
    url?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type DeploymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "userId" | "status" | "url" | "error" | "createdAt" | "completedAt", ExtArgs["result"]["deployment"]>
  export type DeploymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeploymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeploymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DeploymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deployment"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      userId: number
      status: $Enums.DeploymentStatus
      url: string | null
      error: string | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["deployment"]>
    composites: {}
  }

  type DeploymentGetPayload<S extends boolean | null | undefined | DeploymentDefaultArgs> = $Result.GetResult<Prisma.$DeploymentPayload, S>

  type DeploymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeploymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeploymentCountAggregateInputType | true
    }

  export interface DeploymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deployment'], meta: { name: 'Deployment' } }
    /**
     * Find zero or one Deployment that matches the filter.
     * @param {DeploymentFindUniqueArgs} args - Arguments to find a Deployment
     * @example
     * // Get one Deployment
     * const deployment = await prisma.deployment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeploymentFindUniqueArgs>(args: SelectSubset<T, DeploymentFindUniqueArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deployment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeploymentFindUniqueOrThrowArgs} args - Arguments to find a Deployment
     * @example
     * // Get one Deployment
     * const deployment = await prisma.deployment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeploymentFindUniqueOrThrowArgs>(args: SelectSubset<T, DeploymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deployment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentFindFirstArgs} args - Arguments to find a Deployment
     * @example
     * // Get one Deployment
     * const deployment = await prisma.deployment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeploymentFindFirstArgs>(args?: SelectSubset<T, DeploymentFindFirstArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deployment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentFindFirstOrThrowArgs} args - Arguments to find a Deployment
     * @example
     * // Get one Deployment
     * const deployment = await prisma.deployment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeploymentFindFirstOrThrowArgs>(args?: SelectSubset<T, DeploymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deployments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deployments
     * const deployments = await prisma.deployment.findMany()
     * 
     * // Get first 10 Deployments
     * const deployments = await prisma.deployment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deploymentWithIdOnly = await prisma.deployment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeploymentFindManyArgs>(args?: SelectSubset<T, DeploymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deployment.
     * @param {DeploymentCreateArgs} args - Arguments to create a Deployment.
     * @example
     * // Create one Deployment
     * const Deployment = await prisma.deployment.create({
     *   data: {
     *     // ... data to create a Deployment
     *   }
     * })
     * 
     */
    create<T extends DeploymentCreateArgs>(args: SelectSubset<T, DeploymentCreateArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deployments.
     * @param {DeploymentCreateManyArgs} args - Arguments to create many Deployments.
     * @example
     * // Create many Deployments
     * const deployment = await prisma.deployment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeploymentCreateManyArgs>(args?: SelectSubset<T, DeploymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deployments and returns the data saved in the database.
     * @param {DeploymentCreateManyAndReturnArgs} args - Arguments to create many Deployments.
     * @example
     * // Create many Deployments
     * const deployment = await prisma.deployment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deployments and only return the `id`
     * const deploymentWithIdOnly = await prisma.deployment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeploymentCreateManyAndReturnArgs>(args?: SelectSubset<T, DeploymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deployment.
     * @param {DeploymentDeleteArgs} args - Arguments to delete one Deployment.
     * @example
     * // Delete one Deployment
     * const Deployment = await prisma.deployment.delete({
     *   where: {
     *     // ... filter to delete one Deployment
     *   }
     * })
     * 
     */
    delete<T extends DeploymentDeleteArgs>(args: SelectSubset<T, DeploymentDeleteArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deployment.
     * @param {DeploymentUpdateArgs} args - Arguments to update one Deployment.
     * @example
     * // Update one Deployment
     * const deployment = await prisma.deployment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeploymentUpdateArgs>(args: SelectSubset<T, DeploymentUpdateArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deployments.
     * @param {DeploymentDeleteManyArgs} args - Arguments to filter Deployments to delete.
     * @example
     * // Delete a few Deployments
     * const { count } = await prisma.deployment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeploymentDeleteManyArgs>(args?: SelectSubset<T, DeploymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deployments
     * const deployment = await prisma.deployment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeploymentUpdateManyArgs>(args: SelectSubset<T, DeploymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deployments and returns the data updated in the database.
     * @param {DeploymentUpdateManyAndReturnArgs} args - Arguments to update many Deployments.
     * @example
     * // Update many Deployments
     * const deployment = await prisma.deployment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deployments and only return the `id`
     * const deploymentWithIdOnly = await prisma.deployment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeploymentUpdateManyAndReturnArgs>(args: SelectSubset<T, DeploymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deployment.
     * @param {DeploymentUpsertArgs} args - Arguments to update or create a Deployment.
     * @example
     * // Update or create a Deployment
     * const deployment = await prisma.deployment.upsert({
     *   create: {
     *     // ... data to create a Deployment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deployment we want to update
     *   }
     * })
     */
    upsert<T extends DeploymentUpsertArgs>(args: SelectSubset<T, DeploymentUpsertArgs<ExtArgs>>): Prisma__DeploymentClient<$Result.GetResult<Prisma.$DeploymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentCountArgs} args - Arguments to filter Deployments to count.
     * @example
     * // Count the number of Deployments
     * const count = await prisma.deployment.count({
     *   where: {
     *     // ... the filter for the Deployments we want to count
     *   }
     * })
    **/
    count<T extends DeploymentCountArgs>(
      args?: Subset<T, DeploymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeploymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeploymentAggregateArgs>(args: Subset<T, DeploymentAggregateArgs>): Prisma.PrismaPromise<GetDeploymentAggregateType<T>>

    /**
     * Group by Deployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeploymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeploymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeploymentGroupByArgs['orderBy'] }
        : { orderBy?: DeploymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeploymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeploymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deployment model
   */
  readonly fields: DeploymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deployment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeploymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deployment model
   */
  interface DeploymentFieldRefs {
    readonly id: FieldRef<"Deployment", 'Int'>
    readonly projectId: FieldRef<"Deployment", 'Int'>
    readonly userId: FieldRef<"Deployment", 'Int'>
    readonly status: FieldRef<"Deployment", 'DeploymentStatus'>
    readonly url: FieldRef<"Deployment", 'String'>
    readonly error: FieldRef<"Deployment", 'String'>
    readonly createdAt: FieldRef<"Deployment", 'DateTime'>
    readonly completedAt: FieldRef<"Deployment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Deployment findUnique
   */
  export type DeploymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter, which Deployment to fetch.
     */
    where: DeploymentWhereUniqueInput
  }

  /**
   * Deployment findUniqueOrThrow
   */
  export type DeploymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter, which Deployment to fetch.
     */
    where: DeploymentWhereUniqueInput
  }

  /**
   * Deployment findFirst
   */
  export type DeploymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter, which Deployment to fetch.
     */
    where?: DeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deployments to fetch.
     */
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deployments.
     */
    cursor?: DeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deployments.
     */
    distinct?: DeploymentScalarFieldEnum | DeploymentScalarFieldEnum[]
  }

  /**
   * Deployment findFirstOrThrow
   */
  export type DeploymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter, which Deployment to fetch.
     */
    where?: DeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deployments to fetch.
     */
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deployments.
     */
    cursor?: DeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deployments.
     */
    distinct?: DeploymentScalarFieldEnum | DeploymentScalarFieldEnum[]
  }

  /**
   * Deployment findMany
   */
  export type DeploymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter, which Deployments to fetch.
     */
    where?: DeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deployments to fetch.
     */
    orderBy?: DeploymentOrderByWithRelationInput | DeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deployments.
     */
    cursor?: DeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deployments.
     */
    distinct?: DeploymentScalarFieldEnum | DeploymentScalarFieldEnum[]
  }

  /**
   * Deployment create
   */
  export type DeploymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Deployment.
     */
    data: XOR<DeploymentCreateInput, DeploymentUncheckedCreateInput>
  }

  /**
   * Deployment createMany
   */
  export type DeploymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deployments.
     */
    data: DeploymentCreateManyInput | DeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deployment createManyAndReturn
   */
  export type DeploymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * The data used to create many Deployments.
     */
    data: DeploymentCreateManyInput | DeploymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deployment update
   */
  export type DeploymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Deployment.
     */
    data: XOR<DeploymentUpdateInput, DeploymentUncheckedUpdateInput>
    /**
     * Choose, which Deployment to update.
     */
    where: DeploymentWhereUniqueInput
  }

  /**
   * Deployment updateMany
   */
  export type DeploymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deployments.
     */
    data: XOR<DeploymentUpdateManyMutationInput, DeploymentUncheckedUpdateManyInput>
    /**
     * Filter which Deployments to update
     */
    where?: DeploymentWhereInput
    /**
     * Limit how many Deployments to update.
     */
    limit?: number
  }

  /**
   * Deployment updateManyAndReturn
   */
  export type DeploymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * The data used to update Deployments.
     */
    data: XOR<DeploymentUpdateManyMutationInput, DeploymentUncheckedUpdateManyInput>
    /**
     * Filter which Deployments to update
     */
    where?: DeploymentWhereInput
    /**
     * Limit how many Deployments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deployment upsert
   */
  export type DeploymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Deployment to update in case it exists.
     */
    where: DeploymentWhereUniqueInput
    /**
     * In case the Deployment found by the `where` argument doesn't exist, create a new Deployment with this data.
     */
    create: XOR<DeploymentCreateInput, DeploymentUncheckedCreateInput>
    /**
     * In case the Deployment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeploymentUpdateInput, DeploymentUncheckedUpdateInput>
  }

  /**
   * Deployment delete
   */
  export type DeploymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
    /**
     * Filter which Deployment to delete.
     */
    where: DeploymentWhereUniqueInput
  }

  /**
   * Deployment deleteMany
   */
  export type DeploymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deployments to delete
     */
    where?: DeploymentWhereInput
    /**
     * Limit how many Deployments to delete.
     */
    limit?: number
  }

  /**
   * Deployment without action
   */
  export type DeploymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deployment
     */
    select?: DeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deployment
     */
    omit?: DeploymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeploymentInclude<ExtArgs> | null
  }


  /**
   * Model ProjectSnapshot
   */

  export type AggregateProjectSnapshot = {
    _count: ProjectSnapshotCountAggregateOutputType | null
    _avg: ProjectSnapshotAvgAggregateOutputType | null
    _sum: ProjectSnapshotSumAggregateOutputType | null
    _min: ProjectSnapshotMinAggregateOutputType | null
    _max: ProjectSnapshotMaxAggregateOutputType | null
  }

  export type ProjectSnapshotAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
    fileCount: number | null
    sizeBytes: number | null
  }

  export type ProjectSnapshotSumAggregateOutputType = {
    id: number | null
    projectId: number | null
    fileCount: number | null
    sizeBytes: number | null
  }

  export type ProjectSnapshotMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: $Enums.SnapshotType | null
    label: string | null
    fileCount: number | null
    sizeBytes: number | null
    createdAt: Date | null
  }

  export type ProjectSnapshotMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: $Enums.SnapshotType | null
    label: string | null
    fileCount: number | null
    sizeBytes: number | null
    createdAt: Date | null
  }

  export type ProjectSnapshotCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    label: number
    filesJson: number
    fileCount: number
    sizeBytes: number
    createdAt: number
    _all: number
  }


  export type ProjectSnapshotAvgAggregateInputType = {
    id?: true
    projectId?: true
    fileCount?: true
    sizeBytes?: true
  }

  export type ProjectSnapshotSumAggregateInputType = {
    id?: true
    projectId?: true
    fileCount?: true
    sizeBytes?: true
  }

  export type ProjectSnapshotMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    label?: true
    fileCount?: true
    sizeBytes?: true
    createdAt?: true
  }

  export type ProjectSnapshotMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    label?: true
    fileCount?: true
    sizeBytes?: true
    createdAt?: true
  }

  export type ProjectSnapshotCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    label?: true
    filesJson?: true
    fileCount?: true
    sizeBytes?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectSnapshot to aggregate.
     */
    where?: ProjectSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSnapshots to fetch.
     */
    orderBy?: ProjectSnapshotOrderByWithRelationInput | ProjectSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectSnapshots
    **/
    _count?: true | ProjectSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectSnapshotMaxAggregateInputType
  }

  export type GetProjectSnapshotAggregateType<T extends ProjectSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectSnapshot[P]>
      : GetScalarType<T[P], AggregateProjectSnapshot[P]>
  }




  export type ProjectSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectSnapshotWhereInput
    orderBy?: ProjectSnapshotOrderByWithAggregationInput | ProjectSnapshotOrderByWithAggregationInput[]
    by: ProjectSnapshotScalarFieldEnum[] | ProjectSnapshotScalarFieldEnum
    having?: ProjectSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectSnapshotCountAggregateInputType | true
    _avg?: ProjectSnapshotAvgAggregateInputType
    _sum?: ProjectSnapshotSumAggregateInputType
    _min?: ProjectSnapshotMinAggregateInputType
    _max?: ProjectSnapshotMaxAggregateInputType
  }

  export type ProjectSnapshotGroupByOutputType = {
    id: number
    projectId: number
    type: $Enums.SnapshotType
    label: string | null
    filesJson: JsonValue
    fileCount: number
    sizeBytes: number
    createdAt: Date
    _count: ProjectSnapshotCountAggregateOutputType | null
    _avg: ProjectSnapshotAvgAggregateOutputType | null
    _sum: ProjectSnapshotSumAggregateOutputType | null
    _min: ProjectSnapshotMinAggregateOutputType | null
    _max: ProjectSnapshotMaxAggregateOutputType | null
  }

  type GetProjectSnapshotGroupByPayload<T extends ProjectSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    label?: boolean
    filesJson?: boolean
    fileCount?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSnapshot"]>

  export type ProjectSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    label?: boolean
    filesJson?: boolean
    fileCount?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSnapshot"]>

  export type ProjectSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    label?: boolean
    filesJson?: boolean
    fileCount?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSnapshot"]>

  export type ProjectSnapshotSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    label?: boolean
    filesJson?: boolean
    fileCount?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
  }

  export type ProjectSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "label" | "filesJson" | "fileCount" | "sizeBytes" | "createdAt", ExtArgs["result"]["projectSnapshot"]>
  export type ProjectSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectSnapshot"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      type: $Enums.SnapshotType
      label: string | null
      filesJson: Prisma.JsonValue
      fileCount: number
      sizeBytes: number
      createdAt: Date
    }, ExtArgs["result"]["projectSnapshot"]>
    composites: {}
  }

  type ProjectSnapshotGetPayload<S extends boolean | null | undefined | ProjectSnapshotDefaultArgs> = $Result.GetResult<Prisma.$ProjectSnapshotPayload, S>

  type ProjectSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectSnapshotCountAggregateInputType | true
    }

  export interface ProjectSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectSnapshot'], meta: { name: 'ProjectSnapshot' } }
    /**
     * Find zero or one ProjectSnapshot that matches the filter.
     * @param {ProjectSnapshotFindUniqueArgs} args - Arguments to find a ProjectSnapshot
     * @example
     * // Get one ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectSnapshotFindUniqueArgs>(args: SelectSubset<T, ProjectSnapshotFindUniqueArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectSnapshotFindUniqueOrThrowArgs} args - Arguments to find a ProjectSnapshot
     * @example
     * // Get one ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotFindFirstArgs} args - Arguments to find a ProjectSnapshot
     * @example
     * // Get one ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectSnapshotFindFirstArgs>(args?: SelectSubset<T, ProjectSnapshotFindFirstArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotFindFirstOrThrowArgs} args - Arguments to find a ProjectSnapshot
     * @example
     * // Get one ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectSnapshots
     * const projectSnapshots = await prisma.projectSnapshot.findMany()
     * 
     * // Get first 10 ProjectSnapshots
     * const projectSnapshots = await prisma.projectSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectSnapshotWithIdOnly = await prisma.projectSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectSnapshotFindManyArgs>(args?: SelectSubset<T, ProjectSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectSnapshot.
     * @param {ProjectSnapshotCreateArgs} args - Arguments to create a ProjectSnapshot.
     * @example
     * // Create one ProjectSnapshot
     * const ProjectSnapshot = await prisma.projectSnapshot.create({
     *   data: {
     *     // ... data to create a ProjectSnapshot
     *   }
     * })
     * 
     */
    create<T extends ProjectSnapshotCreateArgs>(args: SelectSubset<T, ProjectSnapshotCreateArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectSnapshots.
     * @param {ProjectSnapshotCreateManyArgs} args - Arguments to create many ProjectSnapshots.
     * @example
     * // Create many ProjectSnapshots
     * const projectSnapshot = await prisma.projectSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectSnapshotCreateManyArgs>(args?: SelectSubset<T, ProjectSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectSnapshots and returns the data saved in the database.
     * @param {ProjectSnapshotCreateManyAndReturnArgs} args - Arguments to create many ProjectSnapshots.
     * @example
     * // Create many ProjectSnapshots
     * const projectSnapshot = await prisma.projectSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectSnapshots and only return the `id`
     * const projectSnapshotWithIdOnly = await prisma.projectSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectSnapshot.
     * @param {ProjectSnapshotDeleteArgs} args - Arguments to delete one ProjectSnapshot.
     * @example
     * // Delete one ProjectSnapshot
     * const ProjectSnapshot = await prisma.projectSnapshot.delete({
     *   where: {
     *     // ... filter to delete one ProjectSnapshot
     *   }
     * })
     * 
     */
    delete<T extends ProjectSnapshotDeleteArgs>(args: SelectSubset<T, ProjectSnapshotDeleteArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectSnapshot.
     * @param {ProjectSnapshotUpdateArgs} args - Arguments to update one ProjectSnapshot.
     * @example
     * // Update one ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectSnapshotUpdateArgs>(args: SelectSubset<T, ProjectSnapshotUpdateArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectSnapshots.
     * @param {ProjectSnapshotDeleteManyArgs} args - Arguments to filter ProjectSnapshots to delete.
     * @example
     * // Delete a few ProjectSnapshots
     * const { count } = await prisma.projectSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectSnapshotDeleteManyArgs>(args?: SelectSubset<T, ProjectSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectSnapshots
     * const projectSnapshot = await prisma.projectSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectSnapshotUpdateManyArgs>(args: SelectSubset<T, ProjectSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectSnapshots and returns the data updated in the database.
     * @param {ProjectSnapshotUpdateManyAndReturnArgs} args - Arguments to update many ProjectSnapshots.
     * @example
     * // Update many ProjectSnapshots
     * const projectSnapshot = await prisma.projectSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectSnapshots and only return the `id`
     * const projectSnapshotWithIdOnly = await prisma.projectSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectSnapshot.
     * @param {ProjectSnapshotUpsertArgs} args - Arguments to update or create a ProjectSnapshot.
     * @example
     * // Update or create a ProjectSnapshot
     * const projectSnapshot = await prisma.projectSnapshot.upsert({
     *   create: {
     *     // ... data to create a ProjectSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends ProjectSnapshotUpsertArgs>(args: SelectSubset<T, ProjectSnapshotUpsertArgs<ExtArgs>>): Prisma__ProjectSnapshotClient<$Result.GetResult<Prisma.$ProjectSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotCountArgs} args - Arguments to filter ProjectSnapshots to count.
     * @example
     * // Count the number of ProjectSnapshots
     * const count = await prisma.projectSnapshot.count({
     *   where: {
     *     // ... the filter for the ProjectSnapshots we want to count
     *   }
     * })
    **/
    count<T extends ProjectSnapshotCountArgs>(
      args?: Subset<T, ProjectSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectSnapshotAggregateArgs>(args: Subset<T, ProjectSnapshotAggregateArgs>): Prisma.PrismaPromise<GetProjectSnapshotAggregateType<T>>

    /**
     * Group by ProjectSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: ProjectSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectSnapshot model
   */
  readonly fields: ProjectSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectSnapshot model
   */
  interface ProjectSnapshotFieldRefs {
    readonly id: FieldRef<"ProjectSnapshot", 'Int'>
    readonly projectId: FieldRef<"ProjectSnapshot", 'Int'>
    readonly type: FieldRef<"ProjectSnapshot", 'SnapshotType'>
    readonly label: FieldRef<"ProjectSnapshot", 'String'>
    readonly filesJson: FieldRef<"ProjectSnapshot", 'Json'>
    readonly fileCount: FieldRef<"ProjectSnapshot", 'Int'>
    readonly sizeBytes: FieldRef<"ProjectSnapshot", 'Int'>
    readonly createdAt: FieldRef<"ProjectSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectSnapshot findUnique
   */
  export type ProjectSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSnapshot to fetch.
     */
    where: ProjectSnapshotWhereUniqueInput
  }

  /**
   * ProjectSnapshot findUniqueOrThrow
   */
  export type ProjectSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSnapshot to fetch.
     */
    where: ProjectSnapshotWhereUniqueInput
  }

  /**
   * ProjectSnapshot findFirst
   */
  export type ProjectSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSnapshot to fetch.
     */
    where?: ProjectSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSnapshots to fetch.
     */
    orderBy?: ProjectSnapshotOrderByWithRelationInput | ProjectSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectSnapshots.
     */
    cursor?: ProjectSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectSnapshots.
     */
    distinct?: ProjectSnapshotScalarFieldEnum | ProjectSnapshotScalarFieldEnum[]
  }

  /**
   * ProjectSnapshot findFirstOrThrow
   */
  export type ProjectSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSnapshot to fetch.
     */
    where?: ProjectSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSnapshots to fetch.
     */
    orderBy?: ProjectSnapshotOrderByWithRelationInput | ProjectSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectSnapshots.
     */
    cursor?: ProjectSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectSnapshots.
     */
    distinct?: ProjectSnapshotScalarFieldEnum | ProjectSnapshotScalarFieldEnum[]
  }

  /**
   * ProjectSnapshot findMany
   */
  export type ProjectSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSnapshots to fetch.
     */
    where?: ProjectSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSnapshots to fetch.
     */
    orderBy?: ProjectSnapshotOrderByWithRelationInput | ProjectSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectSnapshots.
     */
    cursor?: ProjectSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectSnapshots.
     */
    distinct?: ProjectSnapshotScalarFieldEnum | ProjectSnapshotScalarFieldEnum[]
  }

  /**
   * ProjectSnapshot create
   */
  export type ProjectSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectSnapshot.
     */
    data: XOR<ProjectSnapshotCreateInput, ProjectSnapshotUncheckedCreateInput>
  }

  /**
   * ProjectSnapshot createMany
   */
  export type ProjectSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectSnapshots.
     */
    data: ProjectSnapshotCreateManyInput | ProjectSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectSnapshot createManyAndReturn
   */
  export type ProjectSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectSnapshots.
     */
    data: ProjectSnapshotCreateManyInput | ProjectSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectSnapshot update
   */
  export type ProjectSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectSnapshot.
     */
    data: XOR<ProjectSnapshotUpdateInput, ProjectSnapshotUncheckedUpdateInput>
    /**
     * Choose, which ProjectSnapshot to update.
     */
    where: ProjectSnapshotWhereUniqueInput
  }

  /**
   * ProjectSnapshot updateMany
   */
  export type ProjectSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectSnapshots.
     */
    data: XOR<ProjectSnapshotUpdateManyMutationInput, ProjectSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ProjectSnapshots to update
     */
    where?: ProjectSnapshotWhereInput
    /**
     * Limit how many ProjectSnapshots to update.
     */
    limit?: number
  }

  /**
   * ProjectSnapshot updateManyAndReturn
   */
  export type ProjectSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update ProjectSnapshots.
     */
    data: XOR<ProjectSnapshotUpdateManyMutationInput, ProjectSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ProjectSnapshots to update
     */
    where?: ProjectSnapshotWhereInput
    /**
     * Limit how many ProjectSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectSnapshot upsert
   */
  export type ProjectSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectSnapshot to update in case it exists.
     */
    where: ProjectSnapshotWhereUniqueInput
    /**
     * In case the ProjectSnapshot found by the `where` argument doesn't exist, create a new ProjectSnapshot with this data.
     */
    create: XOR<ProjectSnapshotCreateInput, ProjectSnapshotUncheckedCreateInput>
    /**
     * In case the ProjectSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectSnapshotUpdateInput, ProjectSnapshotUncheckedUpdateInput>
  }

  /**
   * ProjectSnapshot delete
   */
  export type ProjectSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
    /**
     * Filter which ProjectSnapshot to delete.
     */
    where: ProjectSnapshotWhereUniqueInput
  }

  /**
   * ProjectSnapshot deleteMany
   */
  export type ProjectSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectSnapshots to delete
     */
    where?: ProjectSnapshotWhereInput
    /**
     * Limit how many ProjectSnapshots to delete.
     */
    limit?: number
  }

  /**
   * ProjectSnapshot without action
   */
  export type ProjectSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSnapshot
     */
    select?: ProjectSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSnapshot
     */
    omit?: ProjectSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    techStack: 'techStack',
    domain: 'domain',
    gitRepoUrl: 'gitRepoUrl',
    thumbUrl: 'thumbUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    templateId: 'templateId',
    name: 'name',
    diskPath: 'diskPath',
    status: 'status',
    previewUrl: 'previewUrl',
    lastSavedAt: 'lastSavedAt',
    lastOpenedAt: 'lastOpenedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    parsedJson: 'parsedJson',
    rawPath: 'rawPath',
    createdAt: 'createdAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const DeploymentScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    userId: 'userId',
    status: 'status',
    url: 'url',
    error: 'error',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type DeploymentScalarFieldEnum = (typeof DeploymentScalarFieldEnum)[keyof typeof DeploymentScalarFieldEnum]


  export const ProjectSnapshotScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    label: 'label',
    filesJson: 'filesJson',
    fileCount: 'fileCount',
    sizeBytes: 'sizeBytes',
    createdAt: 'createdAt'
  };

  export type ProjectSnapshotScalarFieldEnum = (typeof ProjectSnapshotScalarFieldEnum)[keyof typeof ProjectSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DeploymentStatus'
   */
  export type EnumDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeploymentStatus'>
    


  /**
   * Reference to a field of type 'DeploymentStatus[]'
   */
  export type ListEnumDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeploymentStatus[]'>
    


  /**
   * Reference to a field of type 'SnapshotType'
   */
  export type EnumSnapshotTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SnapshotType'>
    


  /**
   * Reference to a field of type 'SnapshotType[]'
   */
  export type ListEnumSnapshotTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SnapshotType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    resumes?: ResumeListRelationFilter
    deployments?: DeploymentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    resumes?: ResumeOrderByRelationAggregateInput
    deployments?: DeploymentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    resumes?: ResumeListRelationFilter
    deployments?: DeploymentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: StringFilter<"Template"> | string
    name?: StringFilter<"Template"> | string
    slug?: StringFilter<"Template"> | string
    description?: StringFilter<"Template"> | string
    techStack?: StringNullableListFilter<"Template">
    domain?: StringFilter<"Template"> | string
    gitRepoUrl?: StringFilter<"Template"> | string
    thumbUrl?: StringNullableFilter<"Template"> | string | null
    isActive?: BoolFilter<"Template"> | boolean
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    projects?: ProjectListRelationFilter
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    domain?: SortOrder
    gitRepoUrl?: SortOrder
    thumbUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    name?: StringFilter<"Template"> | string
    description?: StringFilter<"Template"> | string
    techStack?: StringNullableListFilter<"Template">
    domain?: StringFilter<"Template"> | string
    gitRepoUrl?: StringFilter<"Template"> | string
    thumbUrl?: StringNullableFilter<"Template"> | string | null
    isActive?: BoolFilter<"Template"> | boolean
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    projects?: ProjectListRelationFilter
  }, "id" | "slug">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    domain?: SortOrder
    gitRepoUrl?: SortOrder
    thumbUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Template"> | string
    name?: StringWithAggregatesFilter<"Template"> | string
    slug?: StringWithAggregatesFilter<"Template"> | string
    description?: StringWithAggregatesFilter<"Template"> | string
    techStack?: StringNullableListFilter<"Template">
    domain?: StringWithAggregatesFilter<"Template"> | string
    gitRepoUrl?: StringWithAggregatesFilter<"Template"> | string
    thumbUrl?: StringNullableWithAggregatesFilter<"Template"> | string | null
    isActive?: BoolWithAggregatesFilter<"Template"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    userId?: IntFilter<"Project"> | number
    templateId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    diskPath?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    previewUrl?: StringNullableFilter<"Project"> | string | null
    lastSavedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    lastOpenedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
    deployments?: DeploymentListRelationFilter
    snapshots?: ProjectSnapshotListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    diskPath?: SortOrder
    status?: SortOrder
    previewUrl?: SortOrderInput | SortOrder
    lastSavedAt?: SortOrderInput | SortOrder
    lastOpenedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    template?: TemplateOrderByWithRelationInput
    deployments?: DeploymentOrderByRelationAggregateInput
    snapshots?: ProjectSnapshotOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: IntFilter<"Project"> | number
    templateId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    diskPath?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    previewUrl?: StringNullableFilter<"Project"> | string | null
    lastSavedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    lastOpenedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    template?: XOR<TemplateScalarRelationFilter, TemplateWhereInput>
    deployments?: DeploymentListRelationFilter
    snapshots?: ProjectSnapshotListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    diskPath?: SortOrder
    status?: SortOrder
    previewUrl?: SortOrderInput | SortOrder
    lastSavedAt?: SortOrderInput | SortOrder
    lastOpenedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    userId?: IntWithAggregatesFilter<"Project"> | number
    templateId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    diskPath?: StringWithAggregatesFilter<"Project"> | string
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    previewUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    lastSavedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    lastOpenedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: IntFilter<"Resume"> | number
    userId?: IntFilter<"Resume"> | number
    parsedJson?: JsonFilter<"Resume">
    rawPath?: StringNullableFilter<"Resume"> | string | null
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    parsedJson?: SortOrder
    rawPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    userId?: IntFilter<"Resume"> | number
    parsedJson?: JsonFilter<"Resume">
    rawPath?: StringNullableFilter<"Resume"> | string | null
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    parsedJson?: SortOrder
    rawPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Resume"> | number
    userId?: IntWithAggregatesFilter<"Resume"> | number
    parsedJson?: JsonWithAggregatesFilter<"Resume">
    rawPath?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type DeploymentWhereInput = {
    AND?: DeploymentWhereInput | DeploymentWhereInput[]
    OR?: DeploymentWhereInput[]
    NOT?: DeploymentWhereInput | DeploymentWhereInput[]
    id?: IntFilter<"Deployment"> | number
    projectId?: IntFilter<"Deployment"> | number
    userId?: IntFilter<"Deployment"> | number
    status?: EnumDeploymentStatusFilter<"Deployment"> | $Enums.DeploymentStatus
    url?: StringNullableFilter<"Deployment"> | string | null
    error?: StringNullableFilter<"Deployment"> | string | null
    createdAt?: DateTimeFilter<"Deployment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Deployment"> | Date | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DeploymentOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    url?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DeploymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DeploymentWhereInput | DeploymentWhereInput[]
    OR?: DeploymentWhereInput[]
    NOT?: DeploymentWhereInput | DeploymentWhereInput[]
    projectId?: IntFilter<"Deployment"> | number
    userId?: IntFilter<"Deployment"> | number
    status?: EnumDeploymentStatusFilter<"Deployment"> | $Enums.DeploymentStatus
    url?: StringNullableFilter<"Deployment"> | string | null
    error?: StringNullableFilter<"Deployment"> | string | null
    createdAt?: DateTimeFilter<"Deployment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Deployment"> | Date | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DeploymentOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    url?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: DeploymentCountOrderByAggregateInput
    _avg?: DeploymentAvgOrderByAggregateInput
    _max?: DeploymentMaxOrderByAggregateInput
    _min?: DeploymentMinOrderByAggregateInput
    _sum?: DeploymentSumOrderByAggregateInput
  }

  export type DeploymentScalarWhereWithAggregatesInput = {
    AND?: DeploymentScalarWhereWithAggregatesInput | DeploymentScalarWhereWithAggregatesInput[]
    OR?: DeploymentScalarWhereWithAggregatesInput[]
    NOT?: DeploymentScalarWhereWithAggregatesInput | DeploymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Deployment"> | number
    projectId?: IntWithAggregatesFilter<"Deployment"> | number
    userId?: IntWithAggregatesFilter<"Deployment"> | number
    status?: EnumDeploymentStatusWithAggregatesFilter<"Deployment"> | $Enums.DeploymentStatus
    url?: StringNullableWithAggregatesFilter<"Deployment"> | string | null
    error?: StringNullableWithAggregatesFilter<"Deployment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Deployment"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Deployment"> | Date | string | null
  }

  export type ProjectSnapshotWhereInput = {
    AND?: ProjectSnapshotWhereInput | ProjectSnapshotWhereInput[]
    OR?: ProjectSnapshotWhereInput[]
    NOT?: ProjectSnapshotWhereInput | ProjectSnapshotWhereInput[]
    id?: IntFilter<"ProjectSnapshot"> | number
    projectId?: IntFilter<"ProjectSnapshot"> | number
    type?: EnumSnapshotTypeFilter<"ProjectSnapshot"> | $Enums.SnapshotType
    label?: StringNullableFilter<"ProjectSnapshot"> | string | null
    filesJson?: JsonFilter<"ProjectSnapshot">
    fileCount?: IntFilter<"ProjectSnapshot"> | number
    sizeBytes?: IntFilter<"ProjectSnapshot"> | number
    createdAt?: DateTimeFilter<"ProjectSnapshot"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    label?: SortOrderInput | SortOrder
    filesJson?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectSnapshotWhereInput | ProjectSnapshotWhereInput[]
    OR?: ProjectSnapshotWhereInput[]
    NOT?: ProjectSnapshotWhereInput | ProjectSnapshotWhereInput[]
    projectId?: IntFilter<"ProjectSnapshot"> | number
    type?: EnumSnapshotTypeFilter<"ProjectSnapshot"> | $Enums.SnapshotType
    label?: StringNullableFilter<"ProjectSnapshot"> | string | null
    filesJson?: JsonFilter<"ProjectSnapshot">
    fileCount?: IntFilter<"ProjectSnapshot"> | number
    sizeBytes?: IntFilter<"ProjectSnapshot"> | number
    createdAt?: DateTimeFilter<"ProjectSnapshot"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    label?: SortOrderInput | SortOrder
    filesJson?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectSnapshotCountOrderByAggregateInput
    _avg?: ProjectSnapshotAvgOrderByAggregateInput
    _max?: ProjectSnapshotMaxOrderByAggregateInput
    _min?: ProjectSnapshotMinOrderByAggregateInput
    _sum?: ProjectSnapshotSumOrderByAggregateInput
  }

  export type ProjectSnapshotScalarWhereWithAggregatesInput = {
    AND?: ProjectSnapshotScalarWhereWithAggregatesInput | ProjectSnapshotScalarWhereWithAggregatesInput[]
    OR?: ProjectSnapshotScalarWhereWithAggregatesInput[]
    NOT?: ProjectSnapshotScalarWhereWithAggregatesInput | ProjectSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectSnapshot"> | number
    projectId?: IntWithAggregatesFilter<"ProjectSnapshot"> | number
    type?: EnumSnapshotTypeWithAggregatesFilter<"ProjectSnapshot"> | $Enums.SnapshotType
    label?: StringNullableWithAggregatesFilter<"ProjectSnapshot"> | string | null
    filesJson?: JsonWithAggregatesFilter<"ProjectSnapshot">
    fileCount?: IntWithAggregatesFilter<"ProjectSnapshot"> | number
    sizeBytes?: IntWithAggregatesFilter<"ProjectSnapshot"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectSnapshot"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
    deployments?: DeploymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    deployments?: DeploymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    techStack?: TemplateCreatetechStackInput | string[]
    domain: string
    gitRepoUrl: string
    thumbUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    techStack?: TemplateCreatetechStackInput | string[]
    domain: string
    gitRepoUrl: string
    thumbUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateCreateManyInput = {
    id?: string
    name: string
    slug: string
    description: string
    techStack?: TemplateCreatetechStackInput | string[]
    domain: string
    gitRepoUrl: string
    thumbUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    template: TemplateCreateNestedOneWithoutProjectsInput
    deployments?: DeploymentCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    userId: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: DeploymentUncheckedCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    template?: TemplateUpdateOneRequiredWithoutProjectsNestedInput
    deployments?: DeploymentUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: DeploymentUncheckedUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: number
    userId: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: number
    userId: number
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
  }

  export type ResumeUpdateInput = {
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateManyInput = {
    id?: number
    userId: number
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeploymentCreateInput = {
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutDeploymentsInput
    user: UserCreateNestedOneWithoutDeploymentsInput
  }

  export type DeploymentUncheckedCreateInput = {
    id?: number
    projectId: number
    userId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DeploymentUpdateInput = {
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutDeploymentsNestedInput
    user?: UserUpdateOneRequiredWithoutDeploymentsNestedInput
  }

  export type DeploymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeploymentCreateManyInput = {
    id?: number
    projectId: number
    userId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DeploymentUpdateManyMutationInput = {
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeploymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectSnapshotCreateInput = {
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutSnapshotsInput
  }

  export type ProjectSnapshotUncheckedCreateInput = {
    id?: number
    projectId: number
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
  }

  export type ProjectSnapshotUpdateInput = {
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type ProjectSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSnapshotCreateManyInput = {
    id?: number
    projectId: number
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
  }

  export type ProjectSnapshotUpdateManyMutationInput = {
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type DeploymentListRelationFilter = {
    every?: DeploymentWhereInput
    some?: DeploymentWhereInput
    none?: DeploymentWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeploymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    techStack?: SortOrder
    domain?: SortOrder
    gitRepoUrl?: SortOrder
    thumbUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    domain?: SortOrder
    gitRepoUrl?: SortOrder
    thumbUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    domain?: SortOrder
    gitRepoUrl?: SortOrder
    thumbUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TemplateScalarRelationFilter = {
    is?: TemplateWhereInput
    isNot?: TemplateWhereInput
  }

  export type ProjectSnapshotListRelationFilter = {
    every?: ProjectSnapshotWhereInput
    some?: ProjectSnapshotWhereInput
    none?: ProjectSnapshotWhereInput
  }

  export type ProjectSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    diskPath?: SortOrder
    status?: SortOrder
    previewUrl?: SortOrder
    lastSavedAt?: SortOrder
    lastOpenedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    diskPath?: SortOrder
    status?: SortOrder
    previewUrl?: SortOrder
    lastSavedAt?: SortOrder
    lastOpenedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    name?: SortOrder
    diskPath?: SortOrder
    status?: SortOrder
    previewUrl?: SortOrder
    lastSavedAt?: SortOrder
    lastOpenedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    parsedJson?: SortOrder
    rawPath?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawPath?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawPath?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusFilter<$PrismaModel> | $Enums.DeploymentStatus
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type DeploymentCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    url?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DeploymentAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type DeploymentMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    url?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DeploymentMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    url?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DeploymentSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type EnumDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumDeploymentStatusFilter<$PrismaModel>
  }

  export type EnumSnapshotTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SnapshotType | EnumSnapshotTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSnapshotTypeFilter<$PrismaModel> | $Enums.SnapshotType
  }

  export type ProjectSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    filesJson?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
  }

  export type ProjectSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileCount?: SortOrder
    sizeBytes?: SortOrder
  }

  export type EnumSnapshotTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SnapshotType | EnumSnapshotTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSnapshotTypeWithAggregatesFilter<$PrismaModel> | $Enums.SnapshotType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSnapshotTypeFilter<$PrismaModel>
    _max?: NestedEnumSnapshotTypeFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ResumeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type DeploymentCreateNestedManyWithoutUserInput = {
    create?: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput> | DeploymentCreateWithoutUserInput[] | DeploymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutUserInput | DeploymentCreateOrConnectWithoutUserInput[]
    createMany?: DeploymentCreateManyUserInputEnvelope
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type DeploymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput> | DeploymentCreateWithoutUserInput[] | DeploymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutUserInput | DeploymentCreateOrConnectWithoutUserInput[]
    createMany?: DeploymentCreateManyUserInputEnvelope
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ResumeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type DeploymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput> | DeploymentCreateWithoutUserInput[] | DeploymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutUserInput | DeploymentCreateOrConnectWithoutUserInput[]
    upsert?: DeploymentUpsertWithWhereUniqueWithoutUserInput | DeploymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeploymentCreateManyUserInputEnvelope
    set?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    disconnect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    delete?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    update?: DeploymentUpdateWithWhereUniqueWithoutUserInput | DeploymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeploymentUpdateManyWithWhereWithoutUserInput | DeploymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type DeploymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput> | DeploymentCreateWithoutUserInput[] | DeploymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutUserInput | DeploymentCreateOrConnectWithoutUserInput[]
    upsert?: DeploymentUpsertWithWhereUniqueWithoutUserInput | DeploymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeploymentCreateManyUserInputEnvelope
    set?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    disconnect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    delete?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    update?: DeploymentUpdateWithWhereUniqueWithoutUserInput | DeploymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeploymentUpdateManyWithWhereWithoutUserInput | DeploymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
  }

  export type TemplateCreatetechStackInput = {
    set: string[]
  }

  export type ProjectCreateNestedManyWithoutTemplateInput = {
    create?: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput> | ProjectCreateWithoutTemplateInput[] | ProjectUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTemplateInput | ProjectCreateOrConnectWithoutTemplateInput[]
    createMany?: ProjectCreateManyTemplateInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput> | ProjectCreateWithoutTemplateInput[] | ProjectUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTemplateInput | ProjectCreateOrConnectWithoutTemplateInput[]
    createMany?: ProjectCreateManyTemplateInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TemplateUpdatetechStackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProjectUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput> | ProjectCreateWithoutTemplateInput[] | ProjectUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTemplateInput | ProjectCreateOrConnectWithoutTemplateInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTemplateInput | ProjectUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: ProjectCreateManyTemplateInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTemplateInput | ProjectUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTemplateInput | ProjectUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput> | ProjectCreateWithoutTemplateInput[] | ProjectUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTemplateInput | ProjectCreateOrConnectWithoutTemplateInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTemplateInput | ProjectUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: ProjectCreateManyTemplateInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTemplateInput | ProjectUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTemplateInput | ProjectUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type TemplateCreateNestedOneWithoutProjectsInput = {
    create?: XOR<TemplateCreateWithoutProjectsInput, TemplateUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutProjectsInput
    connect?: TemplateWhereUniqueInput
  }

  export type DeploymentCreateNestedManyWithoutProjectInput = {
    create?: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput> | DeploymentCreateWithoutProjectInput[] | DeploymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutProjectInput | DeploymentCreateOrConnectWithoutProjectInput[]
    createMany?: DeploymentCreateManyProjectInputEnvelope
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
  }

  export type ProjectSnapshotCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput> | ProjectSnapshotCreateWithoutProjectInput[] | ProjectSnapshotUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSnapshotCreateOrConnectWithoutProjectInput | ProjectSnapshotCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectSnapshotCreateManyProjectInputEnvelope
    connect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
  }

  export type DeploymentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput> | DeploymentCreateWithoutProjectInput[] | DeploymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutProjectInput | DeploymentCreateOrConnectWithoutProjectInput[]
    createMany?: DeploymentCreateManyProjectInputEnvelope
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
  }

  export type ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput> | ProjectSnapshotCreateWithoutProjectInput[] | ProjectSnapshotUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSnapshotCreateOrConnectWithoutProjectInput | ProjectSnapshotCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectSnapshotCreateManyProjectInputEnvelope
    connect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type TemplateUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<TemplateCreateWithoutProjectsInput, TemplateUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutProjectsInput
    upsert?: TemplateUpsertWithoutProjectsInput
    connect?: TemplateWhereUniqueInput
    update?: XOR<XOR<TemplateUpdateToOneWithWhereWithoutProjectsInput, TemplateUpdateWithoutProjectsInput>, TemplateUncheckedUpdateWithoutProjectsInput>
  }

  export type DeploymentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput> | DeploymentCreateWithoutProjectInput[] | DeploymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutProjectInput | DeploymentCreateOrConnectWithoutProjectInput[]
    upsert?: DeploymentUpsertWithWhereUniqueWithoutProjectInput | DeploymentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DeploymentCreateManyProjectInputEnvelope
    set?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    disconnect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    delete?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    update?: DeploymentUpdateWithWhereUniqueWithoutProjectInput | DeploymentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DeploymentUpdateManyWithWhereWithoutProjectInput | DeploymentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
  }

  export type ProjectSnapshotUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput> | ProjectSnapshotCreateWithoutProjectInput[] | ProjectSnapshotUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSnapshotCreateOrConnectWithoutProjectInput | ProjectSnapshotCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput | ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectSnapshotCreateManyProjectInputEnvelope
    set?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    disconnect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    delete?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    connect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    update?: ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput | ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectSnapshotUpdateManyWithWhereWithoutProjectInput | ProjectSnapshotUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectSnapshotScalarWhereInput | ProjectSnapshotScalarWhereInput[]
  }

  export type DeploymentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput> | DeploymentCreateWithoutProjectInput[] | DeploymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DeploymentCreateOrConnectWithoutProjectInput | DeploymentCreateOrConnectWithoutProjectInput[]
    upsert?: DeploymentUpsertWithWhereUniqueWithoutProjectInput | DeploymentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DeploymentCreateManyProjectInputEnvelope
    set?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    disconnect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    delete?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    connect?: DeploymentWhereUniqueInput | DeploymentWhereUniqueInput[]
    update?: DeploymentUpdateWithWhereUniqueWithoutProjectInput | DeploymentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DeploymentUpdateManyWithWhereWithoutProjectInput | DeploymentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
  }

  export type ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput> | ProjectSnapshotCreateWithoutProjectInput[] | ProjectSnapshotUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSnapshotCreateOrConnectWithoutProjectInput | ProjectSnapshotCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput | ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectSnapshotCreateManyProjectInputEnvelope
    set?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    disconnect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    delete?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    connect?: ProjectSnapshotWhereUniqueInput | ProjectSnapshotWhereUniqueInput[]
    update?: ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput | ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectSnapshotUpdateManyWithWhereWithoutProjectInput | ProjectSnapshotUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectSnapshotScalarWhereInput | ProjectSnapshotScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResumesInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    upsert?: UserUpsertWithoutResumesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResumesInput, UserUpdateWithoutResumesInput>, UserUncheckedUpdateWithoutResumesInput>
  }

  export type ProjectCreateNestedOneWithoutDeploymentsInput = {
    create?: XOR<ProjectCreateWithoutDeploymentsInput, ProjectUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDeploymentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDeploymentsInput = {
    create?: XOR<UserCreateWithoutDeploymentsInput, UserUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeploymentsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDeploymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DeploymentStatus
  }

  export type ProjectUpdateOneRequiredWithoutDeploymentsNestedInput = {
    create?: XOR<ProjectCreateWithoutDeploymentsInput, ProjectUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDeploymentsInput
    upsert?: ProjectUpsertWithoutDeploymentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDeploymentsInput, ProjectUpdateWithoutDeploymentsInput>, ProjectUncheckedUpdateWithoutDeploymentsInput>
  }

  export type UserUpdateOneRequiredWithoutDeploymentsNestedInput = {
    create?: XOR<UserCreateWithoutDeploymentsInput, UserUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeploymentsInput
    upsert?: UserUpsertWithoutDeploymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDeploymentsInput, UserUpdateWithoutDeploymentsInput>, UserUncheckedUpdateWithoutDeploymentsInput>
  }

  export type ProjectCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<ProjectCreateWithoutSnapshotsInput, ProjectUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSnapshotsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumSnapshotTypeFieldUpdateOperationsInput = {
    set?: $Enums.SnapshotType
  }

  export type ProjectUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<ProjectCreateWithoutSnapshotsInput, ProjectUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSnapshotsInput
    upsert?: ProjectUpsertWithoutSnapshotsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSnapshotsInput, ProjectUpdateWithoutSnapshotsInput>, ProjectUncheckedUpdateWithoutSnapshotsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusFilter<$PrismaModel> | $Enums.DeploymentStatus
  }

  export type NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumDeploymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumSnapshotTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SnapshotType | EnumSnapshotTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSnapshotTypeFilter<$PrismaModel> | $Enums.SnapshotType
  }

  export type NestedEnumSnapshotTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SnapshotType | EnumSnapshotTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SnapshotType[] | ListEnumSnapshotTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSnapshotTypeWithAggregatesFilter<$PrismaModel> | $Enums.SnapshotType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSnapshotTypeFilter<$PrismaModel>
    _max?: NestedEnumSnapshotTypeFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutUserInput = {
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: TemplateCreateNestedOneWithoutProjectsInput
    deployments?: DeploymentCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: DeploymentUncheckedCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResumeCreateWithoutUserInput = {
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: number
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateManyUserInputEnvelope = {
    data: ResumeCreateManyUserInput | ResumeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeploymentCreateWithoutUserInput = {
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutDeploymentsInput
  }

  export type DeploymentUncheckedCreateWithoutUserInput = {
    id?: number
    projectId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DeploymentCreateOrConnectWithoutUserInput = {
    where: DeploymentWhereUniqueInput
    create: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput>
  }

  export type DeploymentCreateManyUserInputEnvelope = {
    data: DeploymentCreateManyUserInput | DeploymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    userId?: IntFilter<"Project"> | number
    templateId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    diskPath?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    previewUrl?: StringNullableFilter<"Project"> | string | null
    lastSavedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    lastOpenedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ResumeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithWhereWithoutUserInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: IntFilter<"Resume"> | number
    userId?: IntFilter<"Resume"> | number
    parsedJson?: JsonFilter<"Resume">
    rawPath?: StringNullableFilter<"Resume"> | string | null
    createdAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type DeploymentUpsertWithWhereUniqueWithoutUserInput = {
    where: DeploymentWhereUniqueInput
    update: XOR<DeploymentUpdateWithoutUserInput, DeploymentUncheckedUpdateWithoutUserInput>
    create: XOR<DeploymentCreateWithoutUserInput, DeploymentUncheckedCreateWithoutUserInput>
  }

  export type DeploymentUpdateWithWhereUniqueWithoutUserInput = {
    where: DeploymentWhereUniqueInput
    data: XOR<DeploymentUpdateWithoutUserInput, DeploymentUncheckedUpdateWithoutUserInput>
  }

  export type DeploymentUpdateManyWithWhereWithoutUserInput = {
    where: DeploymentScalarWhereInput
    data: XOR<DeploymentUpdateManyMutationInput, DeploymentUncheckedUpdateManyWithoutUserInput>
  }

  export type DeploymentScalarWhereInput = {
    AND?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
    OR?: DeploymentScalarWhereInput[]
    NOT?: DeploymentScalarWhereInput | DeploymentScalarWhereInput[]
    id?: IntFilter<"Deployment"> | number
    projectId?: IntFilter<"Deployment"> | number
    userId?: IntFilter<"Deployment"> | number
    status?: EnumDeploymentStatusFilter<"Deployment"> | $Enums.DeploymentStatus
    url?: StringNullableFilter<"Deployment"> | string | null
    error?: StringNullableFilter<"Deployment"> | string | null
    createdAt?: DateTimeFilter<"Deployment"> | Date | string
    completedAt?: DateTimeNullableFilter<"Deployment"> | Date | string | null
  }

  export type ProjectCreateWithoutTemplateInput = {
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    deployments?: DeploymentCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTemplateInput = {
    id?: number
    userId: number
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: DeploymentUncheckedCreateNestedManyWithoutProjectInput
    snapshots?: ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTemplateInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput>
  }

  export type ProjectCreateManyTemplateInputEnvelope = {
    data: ProjectCreateManyTemplateInput | ProjectCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutTemplateInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutTemplateInput, ProjectUncheckedUpdateWithoutTemplateInput>
    create: XOR<ProjectCreateWithoutTemplateInput, ProjectUncheckedCreateWithoutTemplateInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutTemplateInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutTemplateInput, ProjectUncheckedUpdateWithoutTemplateInput>
  }

  export type ProjectUpdateManyWithWhereWithoutTemplateInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutTemplateInput>
  }

  export type UserCreateWithoutProjectsInput = {
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeCreateNestedManyWithoutUserInput
    deployments?: DeploymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
    deployments?: DeploymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type TemplateCreateWithoutProjectsInput = {
    id?: string
    name: string
    slug: string
    description: string
    techStack?: TemplateCreatetechStackInput | string[]
    domain: string
    gitRepoUrl: string
    thumbUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    slug: string
    description: string
    techStack?: TemplateCreatetechStackInput | string[]
    domain: string
    gitRepoUrl: string
    thumbUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateCreateOrConnectWithoutProjectsInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutProjectsInput, TemplateUncheckedCreateWithoutProjectsInput>
  }

  export type DeploymentCreateWithoutProjectInput = {
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDeploymentsInput
  }

  export type DeploymentUncheckedCreateWithoutProjectInput = {
    id?: number
    userId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DeploymentCreateOrConnectWithoutProjectInput = {
    where: DeploymentWhereUniqueInput
    create: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput>
  }

  export type DeploymentCreateManyProjectInputEnvelope = {
    data: DeploymentCreateManyProjectInput | DeploymentCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectSnapshotCreateWithoutProjectInput = {
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
  }

  export type ProjectSnapshotUncheckedCreateWithoutProjectInput = {
    id?: number
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
  }

  export type ProjectSnapshotCreateOrConnectWithoutProjectInput = {
    where: ProjectSnapshotWhereUniqueInput
    create: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput>
  }

  export type ProjectSnapshotCreateManyProjectInputEnvelope = {
    data: ProjectSnapshotCreateManyProjectInput | ProjectSnapshotCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TemplateUpsertWithoutProjectsInput = {
    update: XOR<TemplateUpdateWithoutProjectsInput, TemplateUncheckedUpdateWithoutProjectsInput>
    create: XOR<TemplateCreateWithoutProjectsInput, TemplateUncheckedCreateWithoutProjectsInput>
    where?: TemplateWhereInput
  }

  export type TemplateUpdateToOneWithWhereWithoutProjectsInput = {
    where?: TemplateWhereInput
    data: XOR<TemplateUpdateWithoutProjectsInput, TemplateUncheckedUpdateWithoutProjectsInput>
  }

  export type TemplateUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    techStack?: TemplateUpdatetechStackInput | string[]
    domain?: StringFieldUpdateOperationsInput | string
    gitRepoUrl?: StringFieldUpdateOperationsInput | string
    thumbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeploymentUpsertWithWhereUniqueWithoutProjectInput = {
    where: DeploymentWhereUniqueInput
    update: XOR<DeploymentUpdateWithoutProjectInput, DeploymentUncheckedUpdateWithoutProjectInput>
    create: XOR<DeploymentCreateWithoutProjectInput, DeploymentUncheckedCreateWithoutProjectInput>
  }

  export type DeploymentUpdateWithWhereUniqueWithoutProjectInput = {
    where: DeploymentWhereUniqueInput
    data: XOR<DeploymentUpdateWithoutProjectInput, DeploymentUncheckedUpdateWithoutProjectInput>
  }

  export type DeploymentUpdateManyWithWhereWithoutProjectInput = {
    where: DeploymentScalarWhereInput
    data: XOR<DeploymentUpdateManyMutationInput, DeploymentUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectSnapshotUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectSnapshotWhereUniqueInput
    update: XOR<ProjectSnapshotUpdateWithoutProjectInput, ProjectSnapshotUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectSnapshotCreateWithoutProjectInput, ProjectSnapshotUncheckedCreateWithoutProjectInput>
  }

  export type ProjectSnapshotUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectSnapshotWhereUniqueInput
    data: XOR<ProjectSnapshotUpdateWithoutProjectInput, ProjectSnapshotUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectSnapshotUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectSnapshotScalarWhereInput
    data: XOR<ProjectSnapshotUpdateManyMutationInput, ProjectSnapshotUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectSnapshotScalarWhereInput = {
    AND?: ProjectSnapshotScalarWhereInput | ProjectSnapshotScalarWhereInput[]
    OR?: ProjectSnapshotScalarWhereInput[]
    NOT?: ProjectSnapshotScalarWhereInput | ProjectSnapshotScalarWhereInput[]
    id?: IntFilter<"ProjectSnapshot"> | number
    projectId?: IntFilter<"ProjectSnapshot"> | number
    type?: EnumSnapshotTypeFilter<"ProjectSnapshot"> | $Enums.SnapshotType
    label?: StringNullableFilter<"ProjectSnapshot"> | string | null
    filesJson?: JsonFilter<"ProjectSnapshot">
    fileCount?: IntFilter<"ProjectSnapshot"> | number
    sizeBytes?: IntFilter<"ProjectSnapshot"> | number
    createdAt?: DateTimeFilter<"ProjectSnapshot"> | Date | string
  }

  export type UserCreateWithoutResumesInput = {
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    deployments?: DeploymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResumesInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    deployments?: DeploymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResumesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type UserUpsertWithoutResumesInput = {
    update: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResumesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
  }

  export type UserUpdateWithoutResumesInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResumesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    deployments?: DeploymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutDeploymentsInput = {
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    template: TemplateCreateNestedOneWithoutProjectsInput
    snapshots?: ProjectSnapshotCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDeploymentsInput = {
    id?: number
    userId: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: ProjectSnapshotUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDeploymentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDeploymentsInput, ProjectUncheckedCreateWithoutDeploymentsInput>
  }

  export type UserCreateWithoutDeploymentsInput = {
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDeploymentsInput = {
    id?: number
    email: string
    passwordHash: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDeploymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDeploymentsInput, UserUncheckedCreateWithoutDeploymentsInput>
  }

  export type ProjectUpsertWithoutDeploymentsInput = {
    update: XOR<ProjectUpdateWithoutDeploymentsInput, ProjectUncheckedUpdateWithoutDeploymentsInput>
    create: XOR<ProjectCreateWithoutDeploymentsInput, ProjectUncheckedCreateWithoutDeploymentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDeploymentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDeploymentsInput, ProjectUncheckedUpdateWithoutDeploymentsInput>
  }

  export type ProjectUpdateWithoutDeploymentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    template?: TemplateUpdateOneRequiredWithoutProjectsNestedInput
    snapshots?: ProjectSnapshotUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDeploymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutDeploymentsInput = {
    update: XOR<UserUpdateWithoutDeploymentsInput, UserUncheckedUpdateWithoutDeploymentsInput>
    create: XOR<UserCreateWithoutDeploymentsInput, UserUncheckedCreateWithoutDeploymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDeploymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDeploymentsInput, UserUncheckedUpdateWithoutDeploymentsInput>
  }

  export type UserUpdateWithoutDeploymentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDeploymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutSnapshotsInput = {
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    template: TemplateCreateNestedOneWithoutProjectsInput
    deployments?: DeploymentCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutSnapshotsInput = {
    id?: number
    userId: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: DeploymentUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutSnapshotsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSnapshotsInput, ProjectUncheckedCreateWithoutSnapshotsInput>
  }

  export type ProjectUpsertWithoutSnapshotsInput = {
    update: XOR<ProjectUpdateWithoutSnapshotsInput, ProjectUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<ProjectCreateWithoutSnapshotsInput, ProjectUncheckedCreateWithoutSnapshotsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSnapshotsInput, ProjectUncheckedUpdateWithoutSnapshotsInput>
  }

  export type ProjectUpdateWithoutSnapshotsInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    template?: TemplateUpdateOneRequiredWithoutProjectsNestedInput
    deployments?: DeploymentUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSnapshotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: DeploymentUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: number
    templateId: string
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateManyUserInput = {
    id?: number
    parsedJson: JsonNullValueInput | InputJsonValue
    rawPath?: string | null
    createdAt?: Date | string
  }

  export type DeploymentCreateManyUserInput = {
    id?: number
    projectId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProjectUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: TemplateUpdateOneRequiredWithoutProjectsNestedInput
    deployments?: DeploymentUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: DeploymentUncheckedUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    templateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpdateWithoutUserInput = {
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    parsedJson?: JsonNullValueInput | InputJsonValue
    rawPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeploymentUpdateWithoutUserInput = {
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutDeploymentsNestedInput
  }

  export type DeploymentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeploymentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCreateManyTemplateInput = {
    id?: number
    userId: number
    name: string
    diskPath: string
    status?: $Enums.ProjectStatus
    previewUrl?: string | null
    lastSavedAt?: Date | string | null
    lastOpenedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutTemplateInput = {
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    deployments?: DeploymentUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: DeploymentUncheckedUpdateManyWithoutProjectNestedInput
    snapshots?: ProjectSnapshotUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    diskPath?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastSavedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastOpenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeploymentCreateManyProjectInput = {
    id?: number
    userId: number
    status?: $Enums.DeploymentStatus
    url?: string | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ProjectSnapshotCreateManyProjectInput = {
    id?: number
    type?: $Enums.SnapshotType
    label?: string | null
    filesJson: JsonNullValueInput | InputJsonValue
    fileCount: number
    sizeBytes: number
    createdAt?: Date | string
  }

  export type DeploymentUpdateWithoutProjectInput = {
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDeploymentsNestedInput
  }

  export type DeploymentUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeploymentUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectSnapshotUpdateWithoutProjectInput = {
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSnapshotUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSnapshotUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumSnapshotTypeFieldUpdateOperationsInput | $Enums.SnapshotType
    label?: NullableStringFieldUpdateOperationsInput | string | null
    filesJson?: JsonNullValueInput | InputJsonValue
    fileCount?: IntFieldUpdateOperationsInput | number
    sizeBytes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}