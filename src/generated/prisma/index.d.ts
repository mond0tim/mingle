
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
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Track
 * 
 */
export type Track = $Result.DefaultSelection<Prisma.$TrackPayload>
/**
 * Model Playlist
 * 
 */
export type Playlist = $Result.DefaultSelection<Prisma.$PlaylistPayload>
/**
 * Model PlaylistTrack
 * 
 */
export type PlaylistTrack = $Result.DefaultSelection<Prisma.$PlaylistTrackPayload>
/**
 * Model FavoriteTrack
 * 
 */
export type FavoriteTrack = $Result.DefaultSelection<Prisma.$FavoriteTrackPayload>
/**
 * Model FavoritePlaylist
 * 
 */
export type FavoritePlaylist = $Result.DefaultSelection<Prisma.$FavoritePlaylistPayload>
/**
 * Model FavoriteArtist
 * 
 */
export type FavoriteArtist = $Result.DefaultSelection<Prisma.$FavoriteArtistPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlaylistCategory: {
  OTHER: 'OTHER',
  SINGLE: 'SINGLE',
  ALBUM: 'ALBUM',
  VIBE: 'VIBE',
  PLAYLIST: 'PLAYLIST',
  MIX: 'MIX'
};

export type PlaylistCategory = (typeof PlaylistCategory)[keyof typeof PlaylistCategory]

}

export type PlaylistCategory = $Enums.PlaylistCategory

export const PlaylistCategory: typeof $Enums.PlaylistCategory

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
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.track`: Exposes CRUD operations for the **Track** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tracks
    * const tracks = await prisma.track.findMany()
    * ```
    */
  get track(): Prisma.TrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlist`: Exposes CRUD operations for the **Playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.PlaylistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlistTrack`: Exposes CRUD operations for the **PlaylistTrack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaylistTracks
    * const playlistTracks = await prisma.playlistTrack.findMany()
    * ```
    */
  get playlistTrack(): Prisma.PlaylistTrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favoriteTrack`: Exposes CRUD operations for the **FavoriteTrack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FavoriteTracks
    * const favoriteTracks = await prisma.favoriteTrack.findMany()
    * ```
    */
  get favoriteTrack(): Prisma.FavoriteTrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favoritePlaylist`: Exposes CRUD operations for the **FavoritePlaylist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FavoritePlaylists
    * const favoritePlaylists = await prisma.favoritePlaylist.findMany()
    * ```
    */
  get favoritePlaylist(): Prisma.FavoritePlaylistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favoriteArtist`: Exposes CRUD operations for the **FavoriteArtist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FavoriteArtists
    * const favoriteArtists = await prisma.favoriteArtist.findMany()
    * ```
    */
  get favoriteArtist(): Prisma.FavoriteArtistDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
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
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Track: 'Track',
    Playlist: 'Playlist',
    PlaylistTrack: 'PlaylistTrack',
    FavoriteTrack: 'FavoriteTrack',
    FavoritePlaylist: 'FavoritePlaylist',
    FavoriteArtist: 'FavoriteArtist'
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
      modelProps: "user" | "session" | "account" | "verification" | "track" | "playlist" | "playlistTrack" | "favoriteTrack" | "favoritePlaylist" | "favoriteArtist"
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
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Track: {
        payload: Prisma.$TrackPayload<ExtArgs>
        fields: Prisma.TrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          findFirst: {
            args: Prisma.TrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          findMany: {
            args: Prisma.TrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>[]
          }
          create: {
            args: Prisma.TrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          createMany: {
            args: Prisma.TrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          update: {
            args: Prisma.TrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          deleteMany: {
            args: Prisma.TrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          aggregate: {
            args: Prisma.TrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrack>
          }
          groupBy: {
            args: Prisma.TrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackCountArgs<ExtArgs>
            result: $Utils.Optional<TrackCountAggregateOutputType> | number
          }
        }
      }
      Playlist: {
        payload: Prisma.$PlaylistPayload<ExtArgs>
        fields: Prisma.PlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findFirst: {
            args: Prisma.PlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findMany: {
            args: Prisma.PlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          create: {
            args: Prisma.PlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          createMany: {
            args: Prisma.PlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          update: {
            args: Prisma.PlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.PlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      PlaylistTrack: {
        payload: Prisma.$PlaylistTrackPayload<ExtArgs>
        fields: Prisma.PlaylistTrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistTrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistTrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          findFirst: {
            args: Prisma.PlaylistTrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistTrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          findMany: {
            args: Prisma.PlaylistTrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>[]
          }
          create: {
            args: Prisma.PlaylistTrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          createMany: {
            args: Prisma.PlaylistTrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlaylistTrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          update: {
            args: Prisma.PlaylistTrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistTrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistTrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlaylistTrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistTrackPayload>
          }
          aggregate: {
            args: Prisma.PlaylistTrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylistTrack>
          }
          groupBy: {
            args: Prisma.PlaylistTrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistTrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistTrackCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistTrackCountAggregateOutputType> | number
          }
        }
      }
      FavoriteTrack: {
        payload: Prisma.$FavoriteTrackPayload<ExtArgs>
        fields: Prisma.FavoriteTrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteTrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteTrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          findFirst: {
            args: Prisma.FavoriteTrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteTrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          findMany: {
            args: Prisma.FavoriteTrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>[]
          }
          create: {
            args: Prisma.FavoriteTrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          createMany: {
            args: Prisma.FavoriteTrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FavoriteTrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          update: {
            args: Prisma.FavoriteTrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          deleteMany: {
            args: Prisma.FavoriteTrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteTrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FavoriteTrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteTrackPayload>
          }
          aggregate: {
            args: Prisma.FavoriteTrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavoriteTrack>
          }
          groupBy: {
            args: Prisma.FavoriteTrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteTrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteTrackCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteTrackCountAggregateOutputType> | number
          }
        }
      }
      FavoritePlaylist: {
        payload: Prisma.$FavoritePlaylistPayload<ExtArgs>
        fields: Prisma.FavoritePlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoritePlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoritePlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          findFirst: {
            args: Prisma.FavoritePlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoritePlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          findMany: {
            args: Prisma.FavoritePlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>[]
          }
          create: {
            args: Prisma.FavoritePlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          createMany: {
            args: Prisma.FavoritePlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FavoritePlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          update: {
            args: Prisma.FavoritePlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          deleteMany: {
            args: Prisma.FavoritePlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoritePlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FavoritePlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePlaylistPayload>
          }
          aggregate: {
            args: Prisma.FavoritePlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavoritePlaylist>
          }
          groupBy: {
            args: Prisma.FavoritePlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoritePlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoritePlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<FavoritePlaylistCountAggregateOutputType> | number
          }
        }
      }
      FavoriteArtist: {
        payload: Prisma.$FavoriteArtistPayload<ExtArgs>
        fields: Prisma.FavoriteArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteArtistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteArtistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          findFirst: {
            args: Prisma.FavoriteArtistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteArtistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          findMany: {
            args: Prisma.FavoriteArtistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>[]
          }
          create: {
            args: Prisma.FavoriteArtistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          createMany: {
            args: Prisma.FavoriteArtistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FavoriteArtistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          update: {
            args: Prisma.FavoriteArtistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          deleteMany: {
            args: Prisma.FavoriteArtistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteArtistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FavoriteArtistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoriteArtistPayload>
          }
          aggregate: {
            args: Prisma.FavoriteArtistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavoriteArtist>
          }
          groupBy: {
            args: Prisma.FavoriteArtistGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteArtistGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteArtistCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteArtistCountAggregateOutputType> | number
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
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    track?: TrackOmit
    playlist?: PlaylistOmit
    playlistTrack?: PlaylistTrackOmit
    favoriteTrack?: FavoriteTrackOmit
    favoritePlaylist?: FavoritePlaylistOmit
    favoriteArtist?: FavoriteArtistOmit
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
    sessions: number
    accounts: number
    playlists: number
    favoriteTracks: number
    favoritePlaylists: number
    favoriteArtists: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    playlists?: boolean | UserCountOutputTypeCountPlaylistsArgs
    favoriteTracks?: boolean | UserCountOutputTypeCountFavoriteTracksArgs
    favoritePlaylists?: boolean | UserCountOutputTypeCountFavoritePlaylistsArgs
    favoriteArtists?: boolean | UserCountOutputTypeCountFavoriteArtistsArgs
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
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoriteTracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteTrackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritePlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritePlaylistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoriteArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteArtistWhereInput
  }


  /**
   * Count Type TrackCountOutputType
   */

  export type TrackCountOutputType = {
    playlists: number
    favoritedBy: number
  }

  export type TrackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlists?: boolean | TrackCountOutputTypeCountPlaylistsArgs
    favoritedBy?: boolean | TrackCountOutputTypeCountFavoritedByArgs
  }

  // Custom InputTypes
  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackCountOutputType
     */
    select?: TrackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeCountPlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistTrackWhereInput
  }

  /**
   * TrackCountOutputType without action
   */
  export type TrackCountOutputTypeCountFavoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteTrackWhereInput
  }


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    tracks: number
    favoritedBy: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tracks?: boolean | PlaylistCountOutputTypeCountTracksArgs
    favoritedBy?: boolean | PlaylistCountOutputTypeCountFavoritedByArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountTracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistTrackWhereInput
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountFavoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritePlaylistWhereInput
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
    loginCount: number | null
  }

  export type UserSumAggregateOutputType = {
    loginCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    emailVerified: boolean | null
    role: string | null
    canMakePlaylistsPublic: boolean | null
    isReadOnly: boolean | null
    banned: boolean | null
    loginCount: number | null
    lastLoginAt: Date | null
    lastPlayedTrackId: string | null
    lastPlayedPlaylistId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    emailVerified: boolean | null
    role: string | null
    canMakePlaylistsPublic: boolean | null
    isReadOnly: boolean | null
    banned: boolean | null
    loginCount: number | null
    lastLoginAt: Date | null
    lastPlayedTrackId: string | null
    lastPlayedPlaylistId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    emailVerified: number
    role: number
    canMakePlaylistsPublic: number
    isReadOnly: number
    banned: number
    loginCount: number
    lastLoginAt: number
    lastPlayedTrackId: number
    lastPlayedPlaylistId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    loginCount?: true
  }

  export type UserSumAggregateInputType = {
    loginCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    emailVerified?: true
    role?: true
    canMakePlaylistsPublic?: true
    isReadOnly?: true
    banned?: true
    loginCount?: true
    lastLoginAt?: true
    lastPlayedTrackId?: true
    lastPlayedPlaylistId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    emailVerified?: true
    role?: true
    canMakePlaylistsPublic?: true
    isReadOnly?: true
    banned?: true
    loginCount?: true
    lastLoginAt?: true
    lastPlayedTrackId?: true
    lastPlayedPlaylistId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    emailVerified?: true
    role?: true
    canMakePlaylistsPublic?: true
    isReadOnly?: true
    banned?: true
    loginCount?: true
    lastLoginAt?: true
    lastPlayedTrackId?: true
    lastPlayedPlaylistId?: true
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
    id: string
    email: string
    name: string | null
    image: string | null
    emailVerified: boolean
    role: string
    canMakePlaylistsPublic: boolean
    isReadOnly: boolean
    banned: boolean
    loginCount: number
    lastLoginAt: Date | null
    lastPlayedTrackId: string | null
    lastPlayedPlaylistId: string | null
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
    name?: boolean
    image?: boolean
    emailVerified?: boolean
    role?: boolean
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: boolean
    lastLoginAt?: boolean
    lastPlayedTrackId?: boolean
    lastPlayedPlaylistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    playlists?: boolean | User$playlistsArgs<ExtArgs>
    favoriteTracks?: boolean | User$favoriteTracksArgs<ExtArgs>
    favoritePlaylists?: boolean | User$favoritePlaylistsArgs<ExtArgs>
    favoriteArtists?: boolean | User$favoriteArtistsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    emailVerified?: boolean
    role?: boolean
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: boolean
    lastLoginAt?: boolean
    lastPlayedTrackId?: boolean
    lastPlayedPlaylistId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "emailVerified" | "role" | "canMakePlaylistsPublic" | "isReadOnly" | "banned" | "loginCount" | "lastLoginAt" | "lastPlayedTrackId" | "lastPlayedPlaylistId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    playlists?: boolean | User$playlistsArgs<ExtArgs>
    favoriteTracks?: boolean | User$favoriteTracksArgs<ExtArgs>
    favoritePlaylists?: boolean | User$favoritePlaylistsArgs<ExtArgs>
    favoriteArtists?: boolean | User$favoriteArtistsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      playlists: Prisma.$PlaylistPayload<ExtArgs>[]
      favoriteTracks: Prisma.$FavoriteTrackPayload<ExtArgs>[]
      favoritePlaylists: Prisma.$FavoritePlaylistPayload<ExtArgs>[]
      favoriteArtists: Prisma.$FavoriteArtistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      emailVerified: boolean
      role: string
      canMakePlaylistsPublic: boolean
      isReadOnly: boolean
      banned: boolean
      loginCount: number
      lastLoginAt: Date | null
      lastPlayedTrackId: string | null
      lastPlayedPlaylistId: string | null
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
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playlists<T extends User$playlistsArgs<ExtArgs> = {}>(args?: Subset<T, User$playlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoriteTracks<T extends User$favoriteTracksArgs<ExtArgs> = {}>(args?: Subset<T, User$favoriteTracksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoritePlaylists<T extends User$favoritePlaylistsArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritePlaylistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoriteArtists<T extends User$favoriteArtistsArgs<ExtArgs> = {}>(args?: Subset<T, User$favoriteArtistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'String'>
    readonly canMakePlaylistsPublic: FieldRef<"User", 'Boolean'>
    readonly isReadOnly: FieldRef<"User", 'Boolean'>
    readonly banned: FieldRef<"User", 'Boolean'>
    readonly loginCount: FieldRef<"User", 'Int'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly lastPlayedTrackId: FieldRef<"User", 'String'>
    readonly lastPlayedPlaylistId: FieldRef<"User", 'String'>
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
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.playlists
   */
  export type User$playlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    cursor?: PlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * User.favoriteTracks
   */
  export type User$favoriteTracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    where?: FavoriteTrackWhereInput
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    cursor?: FavoriteTrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteTrackScalarFieldEnum | FavoriteTrackScalarFieldEnum[]
  }

  /**
   * User.favoritePlaylists
   */
  export type User$favoritePlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    where?: FavoritePlaylistWhereInput
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    cursor?: FavoritePlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritePlaylistScalarFieldEnum | FavoritePlaylistScalarFieldEnum[]
  }

  /**
   * User.favoriteArtists
   */
  export type User$favoriteArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    where?: FavoriteArtistWhereInput
    orderBy?: FavoriteArtistOrderByWithRelationInput | FavoriteArtistOrderByWithRelationInput[]
    cursor?: FavoriteArtistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteArtistScalarFieldEnum | FavoriteArtistScalarFieldEnum[]
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
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    expiresAt: number
    ipAddress: number
    userAgent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "expiresAt" | "ipAddress" | "userAgent" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresAt: Date
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    providerId: number
    accessToken: number
    refreshToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    idToken: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountId" | "providerId" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "idToken" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      providerId: string
      accessToken: string | null
      refreshToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      idToken: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>



  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Track
   */

  export type AggregateTrack = {
    _count: TrackCountAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  export type TrackMinAggregateOutputType = {
    id: string | null
    title: string | null
    artist: string | null
    src: string | null
    fullSrc: string | null
    cover: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackMaxAggregateOutputType = {
    id: string | null
    title: string | null
    artist: string | null
    src: string | null
    fullSrc: string | null
    cover: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackCountAggregateOutputType = {
    id: number
    title: number
    artist: number
    src: number
    fullSrc: number
    cover: number
    colors: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackMinAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    src?: true
    fullSrc?: true
    cover?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackMaxAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    src?: true
    fullSrc?: true
    cover?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackCountAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    src?: true
    fullSrc?: true
    cover?: true
    colors?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Track to aggregate.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tracks
    **/
    _count?: true | TrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackMaxAggregateInputType
  }

  export type GetTrackAggregateType<T extends TrackAggregateArgs> = {
        [P in keyof T & keyof AggregateTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrack[P]>
      : GetScalarType<T[P], AggregateTrack[P]>
  }




  export type TrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackWhereInput
    orderBy?: TrackOrderByWithAggregationInput | TrackOrderByWithAggregationInput[]
    by: TrackScalarFieldEnum[] | TrackScalarFieldEnum
    having?: TrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackCountAggregateInputType | true
    _min?: TrackMinAggregateInputType
    _max?: TrackMaxAggregateInputType
  }

  export type TrackGroupByOutputType = {
    id: string
    title: string
    artist: string
    src: string
    fullSrc: string | null
    cover: string
    colors: JsonValue | null
    type: string
    createdAt: Date
    updatedAt: Date
    _count: TrackCountAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  type GetTrackGroupByPayload<T extends TrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackGroupByOutputType[P]>
            : GetScalarType<T[P], TrackGroupByOutputType[P]>
        }
      >
    >


  export type TrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    src?: boolean
    fullSrc?: boolean
    cover?: boolean
    colors?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playlists?: boolean | Track$playlistsArgs<ExtArgs>
    favoritedBy?: boolean | Track$favoritedByArgs<ExtArgs>
    _count?: boolean | TrackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>



  export type TrackSelectScalar = {
    id?: boolean
    title?: boolean
    artist?: boolean
    src?: boolean
    fullSrc?: boolean
    cover?: boolean
    colors?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "artist" | "src" | "fullSrc" | "cover" | "colors" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["track"]>
  export type TrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlists?: boolean | Track$playlistsArgs<ExtArgs>
    favoritedBy?: boolean | Track$favoritedByArgs<ExtArgs>
    _count?: boolean | TrackCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Track"
    objects: {
      playlists: Prisma.$PlaylistTrackPayload<ExtArgs>[]
      favoritedBy: Prisma.$FavoriteTrackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      artist: string
      src: string
      fullSrc: string | null
      cover: string
      colors: Prisma.JsonValue | null
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["track"]>
    composites: {}
  }

  type TrackGetPayload<S extends boolean | null | undefined | TrackDefaultArgs> = $Result.GetResult<Prisma.$TrackPayload, S>

  type TrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackCountAggregateInputType | true
    }

  export interface TrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Track'], meta: { name: 'Track' } }
    /**
     * Find zero or one Track that matches the filter.
     * @param {TrackFindUniqueArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackFindUniqueArgs>(args: SelectSubset<T, TrackFindUniqueArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Track that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackFindUniqueOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindFirstArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackFindFirstArgs>(args?: SelectSubset<T, TrackFindFirstArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindFirstOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tracks
     * const tracks = await prisma.track.findMany()
     * 
     * // Get first 10 Tracks
     * const tracks = await prisma.track.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackWithIdOnly = await prisma.track.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackFindManyArgs>(args?: SelectSubset<T, TrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Track.
     * @param {TrackCreateArgs} args - Arguments to create a Track.
     * @example
     * // Create one Track
     * const Track = await prisma.track.create({
     *   data: {
     *     // ... data to create a Track
     *   }
     * })
     * 
     */
    create<T extends TrackCreateArgs>(args: SelectSubset<T, TrackCreateArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tracks.
     * @param {TrackCreateManyArgs} args - Arguments to create many Tracks.
     * @example
     * // Create many Tracks
     * const track = await prisma.track.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackCreateManyArgs>(args?: SelectSubset<T, TrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Track.
     * @param {TrackDeleteArgs} args - Arguments to delete one Track.
     * @example
     * // Delete one Track
     * const Track = await prisma.track.delete({
     *   where: {
     *     // ... filter to delete one Track
     *   }
     * })
     * 
     */
    delete<T extends TrackDeleteArgs>(args: SelectSubset<T, TrackDeleteArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Track.
     * @param {TrackUpdateArgs} args - Arguments to update one Track.
     * @example
     * // Update one Track
     * const track = await prisma.track.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackUpdateArgs>(args: SelectSubset<T, TrackUpdateArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tracks.
     * @param {TrackDeleteManyArgs} args - Arguments to filter Tracks to delete.
     * @example
     * // Delete a few Tracks
     * const { count } = await prisma.track.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackDeleteManyArgs>(args?: SelectSubset<T, TrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tracks
     * const track = await prisma.track.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackUpdateManyArgs>(args: SelectSubset<T, TrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Track.
     * @param {TrackUpsertArgs} args - Arguments to update or create a Track.
     * @example
     * // Update or create a Track
     * const track = await prisma.track.upsert({
     *   create: {
     *     // ... data to create a Track
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Track we want to update
     *   }
     * })
     */
    upsert<T extends TrackUpsertArgs>(args: SelectSubset<T, TrackUpsertArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackCountArgs} args - Arguments to filter Tracks to count.
     * @example
     * // Count the number of Tracks
     * const count = await prisma.track.count({
     *   where: {
     *     // ... the filter for the Tracks we want to count
     *   }
     * })
    **/
    count<T extends TrackCountArgs>(
      args?: Subset<T, TrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackAggregateArgs>(args: Subset<T, TrackAggregateArgs>): Prisma.PrismaPromise<GetTrackAggregateType<T>>

    /**
     * Group by Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackGroupByArgs} args - Group by arguments.
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
      T extends TrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackGroupByArgs['orderBy'] }
        : { orderBy?: TrackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Track model
   */
  readonly fields: TrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Track.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlists<T extends Track$playlistsArgs<ExtArgs> = {}>(args?: Subset<T, Track$playlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoritedBy<T extends Track$favoritedByArgs<ExtArgs> = {}>(args?: Subset<T, Track$favoritedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Track model
   */
  interface TrackFieldRefs {
    readonly id: FieldRef<"Track", 'String'>
    readonly title: FieldRef<"Track", 'String'>
    readonly artist: FieldRef<"Track", 'String'>
    readonly src: FieldRef<"Track", 'String'>
    readonly fullSrc: FieldRef<"Track", 'String'>
    readonly cover: FieldRef<"Track", 'String'>
    readonly colors: FieldRef<"Track", 'Json'>
    readonly type: FieldRef<"Track", 'String'>
    readonly createdAt: FieldRef<"Track", 'DateTime'>
    readonly updatedAt: FieldRef<"Track", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Track findUnique
   */
  export type TrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where: TrackWhereUniqueInput
  }

  /**
   * Track findUniqueOrThrow
   */
  export type TrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where: TrackWhereUniqueInput
  }

  /**
   * Track findFirst
   */
  export type TrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * Track findFirstOrThrow
   */
  export type TrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * Track findMany
   */
  export type TrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Tracks to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * Track create
   */
  export type TrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The data needed to create a Track.
     */
    data: XOR<TrackCreateInput, TrackUncheckedCreateInput>
  }

  /**
   * Track createMany
   */
  export type TrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tracks.
     */
    data: TrackCreateManyInput | TrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Track update
   */
  export type TrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The data needed to update a Track.
     */
    data: XOR<TrackUpdateInput, TrackUncheckedUpdateInput>
    /**
     * Choose, which Track to update.
     */
    where: TrackWhereUniqueInput
  }

  /**
   * Track updateMany
   */
  export type TrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tracks.
     */
    data: XOR<TrackUpdateManyMutationInput, TrackUncheckedUpdateManyInput>
    /**
     * Filter which Tracks to update
     */
    where?: TrackWhereInput
    /**
     * Limit how many Tracks to update.
     */
    limit?: number
  }

  /**
   * Track upsert
   */
  export type TrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The filter to search for the Track to update in case it exists.
     */
    where: TrackWhereUniqueInput
    /**
     * In case the Track found by the `where` argument doesn't exist, create a new Track with this data.
     */
    create: XOR<TrackCreateInput, TrackUncheckedCreateInput>
    /**
     * In case the Track was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackUpdateInput, TrackUncheckedUpdateInput>
  }

  /**
   * Track delete
   */
  export type TrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter which Track to delete.
     */
    where: TrackWhereUniqueInput
  }

  /**
   * Track deleteMany
   */
  export type TrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracks to delete
     */
    where?: TrackWhereInput
    /**
     * Limit how many Tracks to delete.
     */
    limit?: number
  }

  /**
   * Track.playlists
   */
  export type Track$playlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    where?: PlaylistTrackWhereInput
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    cursor?: PlaylistTrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistTrackScalarFieldEnum | PlaylistTrackScalarFieldEnum[]
  }

  /**
   * Track.favoritedBy
   */
  export type Track$favoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    where?: FavoriteTrackWhereInput
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    cursor?: FavoriteTrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteTrackScalarFieldEnum | FavoriteTrackScalarFieldEnum[]
  }

  /**
   * Track without action
   */
  export type TrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
  }


  /**
   * Model Playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistMinAggregateOutputType = {
    id: string | null
    title: string | null
    cover: string | null
    type: string | null
    category: $Enums.PlaylistCategory | null
    isPublic: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlaylistMaxAggregateOutputType = {
    id: string | null
    title: string | null
    cover: string | null
    type: string | null
    category: $Enums.PlaylistCategory | null
    isPublic: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlaylistCountAggregateOutputType = {
    id: number
    title: number
    cover: number
    type: number
    category: number
    isPublic: number
    colors: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlaylistMinAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    type?: true
    category?: true
    isPublic?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlaylistMaxAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    type?: true
    category?: true
    isPublic?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlaylistCountAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    type?: true
    category?: true
    isPublic?: true
    colors?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlist to aggregate.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type PlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithAggregationInput | PlaylistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: PlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    id: string
    title: string
    cover: string | null
    type: string
    category: $Enums.PlaylistCategory
    isPublic: boolean
    colors: JsonValue | null
    authorId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends PlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    cover?: boolean
    type?: boolean
    category?: boolean
    isPublic?: boolean
    colors?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | Playlist$authorArgs<ExtArgs>
    tracks?: boolean | Playlist$tracksArgs<ExtArgs>
    favoritedBy?: boolean | Playlist$favoritedByArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>



  export type PlaylistSelectScalar = {
    id?: boolean
    title?: boolean
    cover?: boolean
    type?: boolean
    category?: boolean
    isPublic?: boolean
    colors?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlaylistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "cover" | "type" | "category" | "isPublic" | "colors" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["playlist"]>
  export type PlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | Playlist$authorArgs<ExtArgs>
    tracks?: boolean | Playlist$tracksArgs<ExtArgs>
    favoritedBy?: boolean | Playlist$favoritedByArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Playlist"
    objects: {
      author: Prisma.$UserPayload<ExtArgs> | null
      tracks: Prisma.$PlaylistTrackPayload<ExtArgs>[]
      favoritedBy: Prisma.$FavoritePlaylistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      cover: string | null
      type: string
      category: $Enums.PlaylistCategory
      isPublic: boolean
      colors: Prisma.JsonValue | null
      authorId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  type PlaylistGetPayload<S extends boolean | null | undefined | PlaylistDefaultArgs> = $Result.GetResult<Prisma.$PlaylistPayload, S>

  type PlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaylistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface PlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Playlist'], meta: { name: 'Playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {PlaylistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistFindUniqueArgs>(args: SelectSubset<T, PlaylistFindUniqueArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaylistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistFindFirstArgs>(args?: SelectSubset<T, PlaylistFindFirstArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistWithIdOnly = await prisma.playlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistFindManyArgs>(args?: SelectSubset<T, PlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist.
     * @param {PlaylistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends PlaylistCreateArgs>(args: SelectSubset<T, PlaylistCreateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlists.
     * @param {PlaylistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistCreateManyArgs>(args?: SelectSubset<T, PlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Playlist.
     * @param {PlaylistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends PlaylistDeleteArgs>(args: SelectSubset<T, PlaylistDeleteArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist.
     * @param {PlaylistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistUpdateArgs>(args: SelectSubset<T, PlaylistUpdateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlists.
     * @param {PlaylistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistDeleteManyArgs>(args?: SelectSubset<T, PlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistUpdateManyArgs>(args: SelectSubset<T, PlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Playlist.
     * @param {PlaylistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistUpsertArgs>(args: SelectSubset<T, PlaylistUpsertArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends PlaylistCountArgs>(
      args?: Subset<T, PlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistGroupByArgs} args - Group by arguments.
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
      T extends PlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Playlist model
   */
  readonly fields: PlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends Playlist$authorArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$authorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tracks<T extends Playlist$tracksArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$tracksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoritedBy<T extends Playlist$favoritedByArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$favoritedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Playlist model
   */
  interface PlaylistFieldRefs {
    readonly id: FieldRef<"Playlist", 'String'>
    readonly title: FieldRef<"Playlist", 'String'>
    readonly cover: FieldRef<"Playlist", 'String'>
    readonly type: FieldRef<"Playlist", 'String'>
    readonly category: FieldRef<"Playlist", 'PlaylistCategory'>
    readonly isPublic: FieldRef<"Playlist", 'Boolean'>
    readonly colors: FieldRef<"Playlist", 'Json'>
    readonly authorId: FieldRef<"Playlist", 'String'>
    readonly createdAt: FieldRef<"Playlist", 'DateTime'>
    readonly updatedAt: FieldRef<"Playlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Playlist findUnique
   */
  export type PlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findUniqueOrThrow
   */
  export type PlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findFirst
   */
  export type PlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findFirstOrThrow
   */
  export type PlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findMany
   */
  export type PlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlists to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist create
   */
  export type PlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a Playlist.
     */
    data: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
  }

  /**
   * Playlist createMany
   */
  export type PlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playlist update
   */
  export type PlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a Playlist.
     */
    data: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
    /**
     * Choose, which Playlist to update.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist updateMany
   */
  export type PlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to update.
     */
    limit?: number
  }

  /**
   * Playlist upsert
   */
  export type PlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the Playlist to update in case it exists.
     */
    where: PlaylistWhereUniqueInput
    /**
     * In case the Playlist found by the `where` argument doesn't exist, create a new Playlist with this data.
     */
    create: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
    /**
     * In case the Playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
  }

  /**
   * Playlist delete
   */
  export type PlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter which Playlist to delete.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist deleteMany
   */
  export type PlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlists to delete
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to delete.
     */
    limit?: number
  }

  /**
   * Playlist.author
   */
  export type Playlist$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * Playlist.tracks
   */
  export type Playlist$tracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    where?: PlaylistTrackWhereInput
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    cursor?: PlaylistTrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistTrackScalarFieldEnum | PlaylistTrackScalarFieldEnum[]
  }

  /**
   * Playlist.favoritedBy
   */
  export type Playlist$favoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    where?: FavoritePlaylistWhereInput
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    cursor?: FavoritePlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritePlaylistScalarFieldEnum | FavoritePlaylistScalarFieldEnum[]
  }

  /**
   * Playlist without action
   */
  export type PlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
  }


  /**
   * Model PlaylistTrack
   */

  export type AggregatePlaylistTrack = {
    _count: PlaylistTrackCountAggregateOutputType | null
    _avg: PlaylistTrackAvgAggregateOutputType | null
    _sum: PlaylistTrackSumAggregateOutputType | null
    _min: PlaylistTrackMinAggregateOutputType | null
    _max: PlaylistTrackMaxAggregateOutputType | null
  }

  export type PlaylistTrackAvgAggregateOutputType = {
    order: number | null
  }

  export type PlaylistTrackSumAggregateOutputType = {
    order: number | null
  }

  export type PlaylistTrackMinAggregateOutputType = {
    id: string | null
    playlistId: string | null
    trackId: string | null
    order: number | null
  }

  export type PlaylistTrackMaxAggregateOutputType = {
    id: string | null
    playlistId: string | null
    trackId: string | null
    order: number | null
  }

  export type PlaylistTrackCountAggregateOutputType = {
    id: number
    playlistId: number
    trackId: number
    order: number
    _all: number
  }


  export type PlaylistTrackAvgAggregateInputType = {
    order?: true
  }

  export type PlaylistTrackSumAggregateInputType = {
    order?: true
  }

  export type PlaylistTrackMinAggregateInputType = {
    id?: true
    playlistId?: true
    trackId?: true
    order?: true
  }

  export type PlaylistTrackMaxAggregateInputType = {
    id?: true
    playlistId?: true
    trackId?: true
    order?: true
  }

  export type PlaylistTrackCountAggregateInputType = {
    id?: true
    playlistId?: true
    trackId?: true
    order?: true
    _all?: true
  }

  export type PlaylistTrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistTrack to aggregate.
     */
    where?: PlaylistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistTracks to fetch.
     */
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaylistTracks
    **/
    _count?: true | PlaylistTrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistTrackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistTrackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistTrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistTrackMaxAggregateInputType
  }

  export type GetPlaylistTrackAggregateType<T extends PlaylistTrackAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylistTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylistTrack[P]>
      : GetScalarType<T[P], AggregatePlaylistTrack[P]>
  }




  export type PlaylistTrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistTrackWhereInput
    orderBy?: PlaylistTrackOrderByWithAggregationInput | PlaylistTrackOrderByWithAggregationInput[]
    by: PlaylistTrackScalarFieldEnum[] | PlaylistTrackScalarFieldEnum
    having?: PlaylistTrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistTrackCountAggregateInputType | true
    _avg?: PlaylistTrackAvgAggregateInputType
    _sum?: PlaylistTrackSumAggregateInputType
    _min?: PlaylistTrackMinAggregateInputType
    _max?: PlaylistTrackMaxAggregateInputType
  }

  export type PlaylistTrackGroupByOutputType = {
    id: string
    playlistId: string
    trackId: string
    order: number
    _count: PlaylistTrackCountAggregateOutputType | null
    _avg: PlaylistTrackAvgAggregateOutputType | null
    _sum: PlaylistTrackSumAggregateOutputType | null
    _min: PlaylistTrackMinAggregateOutputType | null
    _max: PlaylistTrackMaxAggregateOutputType | null
  }

  type GetPlaylistTrackGroupByPayload<T extends PlaylistTrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistTrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistTrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistTrackGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistTrackGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistTrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playlistId?: boolean
    trackId?: boolean
    order?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    track?: boolean | TrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlistTrack"]>



  export type PlaylistTrackSelectScalar = {
    id?: boolean
    playlistId?: boolean
    trackId?: boolean
    order?: boolean
  }

  export type PlaylistTrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playlistId" | "trackId" | "order", ExtArgs["result"]["playlistTrack"]>
  export type PlaylistTrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
    track?: boolean | TrackDefaultArgs<ExtArgs>
  }

  export type $PlaylistTrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaylistTrack"
    objects: {
      playlist: Prisma.$PlaylistPayload<ExtArgs>
      track: Prisma.$TrackPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playlistId: string
      trackId: string
      order: number
    }, ExtArgs["result"]["playlistTrack"]>
    composites: {}
  }

  type PlaylistTrackGetPayload<S extends boolean | null | undefined | PlaylistTrackDefaultArgs> = $Result.GetResult<Prisma.$PlaylistTrackPayload, S>

  type PlaylistTrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaylistTrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistTrackCountAggregateInputType | true
    }

  export interface PlaylistTrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaylistTrack'], meta: { name: 'PlaylistTrack' } }
    /**
     * Find zero or one PlaylistTrack that matches the filter.
     * @param {PlaylistTrackFindUniqueArgs} args - Arguments to find a PlaylistTrack
     * @example
     * // Get one PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistTrackFindUniqueArgs>(args: SelectSubset<T, PlaylistTrackFindUniqueArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlaylistTrack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaylistTrackFindUniqueOrThrowArgs} args - Arguments to find a PlaylistTrack
     * @example
     * // Get one PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistTrackFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistTrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaylistTrack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackFindFirstArgs} args - Arguments to find a PlaylistTrack
     * @example
     * // Get one PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistTrackFindFirstArgs>(args?: SelectSubset<T, PlaylistTrackFindFirstArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaylistTrack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackFindFirstOrThrowArgs} args - Arguments to find a PlaylistTrack
     * @example
     * // Get one PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistTrackFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistTrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlaylistTracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaylistTracks
     * const playlistTracks = await prisma.playlistTrack.findMany()
     * 
     * // Get first 10 PlaylistTracks
     * const playlistTracks = await prisma.playlistTrack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistTrackWithIdOnly = await prisma.playlistTrack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistTrackFindManyArgs>(args?: SelectSubset<T, PlaylistTrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlaylistTrack.
     * @param {PlaylistTrackCreateArgs} args - Arguments to create a PlaylistTrack.
     * @example
     * // Create one PlaylistTrack
     * const PlaylistTrack = await prisma.playlistTrack.create({
     *   data: {
     *     // ... data to create a PlaylistTrack
     *   }
     * })
     * 
     */
    create<T extends PlaylistTrackCreateArgs>(args: SelectSubset<T, PlaylistTrackCreateArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlaylistTracks.
     * @param {PlaylistTrackCreateManyArgs} args - Arguments to create many PlaylistTracks.
     * @example
     * // Create many PlaylistTracks
     * const playlistTrack = await prisma.playlistTrack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistTrackCreateManyArgs>(args?: SelectSubset<T, PlaylistTrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PlaylistTrack.
     * @param {PlaylistTrackDeleteArgs} args - Arguments to delete one PlaylistTrack.
     * @example
     * // Delete one PlaylistTrack
     * const PlaylistTrack = await prisma.playlistTrack.delete({
     *   where: {
     *     // ... filter to delete one PlaylistTrack
     *   }
     * })
     * 
     */
    delete<T extends PlaylistTrackDeleteArgs>(args: SelectSubset<T, PlaylistTrackDeleteArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlaylistTrack.
     * @param {PlaylistTrackUpdateArgs} args - Arguments to update one PlaylistTrack.
     * @example
     * // Update one PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistTrackUpdateArgs>(args: SelectSubset<T, PlaylistTrackUpdateArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlaylistTracks.
     * @param {PlaylistTrackDeleteManyArgs} args - Arguments to filter PlaylistTracks to delete.
     * @example
     * // Delete a few PlaylistTracks
     * const { count } = await prisma.playlistTrack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistTrackDeleteManyArgs>(args?: SelectSubset<T, PlaylistTrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaylistTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaylistTracks
     * const playlistTrack = await prisma.playlistTrack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistTrackUpdateManyArgs>(args: SelectSubset<T, PlaylistTrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlaylistTrack.
     * @param {PlaylistTrackUpsertArgs} args - Arguments to update or create a PlaylistTrack.
     * @example
     * // Update or create a PlaylistTrack
     * const playlistTrack = await prisma.playlistTrack.upsert({
     *   create: {
     *     // ... data to create a PlaylistTrack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaylistTrack we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistTrackUpsertArgs>(args: SelectSubset<T, PlaylistTrackUpsertArgs<ExtArgs>>): Prisma__PlaylistTrackClient<$Result.GetResult<Prisma.$PlaylistTrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlaylistTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackCountArgs} args - Arguments to filter PlaylistTracks to count.
     * @example
     * // Count the number of PlaylistTracks
     * const count = await prisma.playlistTrack.count({
     *   where: {
     *     // ... the filter for the PlaylistTracks we want to count
     *   }
     * })
    **/
    count<T extends PlaylistTrackCountArgs>(
      args?: Subset<T, PlaylistTrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistTrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaylistTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlaylistTrackAggregateArgs>(args: Subset<T, PlaylistTrackAggregateArgs>): Prisma.PrismaPromise<GetPlaylistTrackAggregateType<T>>

    /**
     * Group by PlaylistTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistTrackGroupByArgs} args - Group by arguments.
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
      T extends PlaylistTrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistTrackGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistTrackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlaylistTrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaylistTrack model
   */
  readonly fields: PlaylistTrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaylistTrack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistTrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends PlaylistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaylistDefaultArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    track<T extends TrackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrackDefaultArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PlaylistTrack model
   */
  interface PlaylistTrackFieldRefs {
    readonly id: FieldRef<"PlaylistTrack", 'String'>
    readonly playlistId: FieldRef<"PlaylistTrack", 'String'>
    readonly trackId: FieldRef<"PlaylistTrack", 'String'>
    readonly order: FieldRef<"PlaylistTrack", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlaylistTrack findUnique
   */
  export type PlaylistTrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistTrack to fetch.
     */
    where: PlaylistTrackWhereUniqueInput
  }

  /**
   * PlaylistTrack findUniqueOrThrow
   */
  export type PlaylistTrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistTrack to fetch.
     */
    where: PlaylistTrackWhereUniqueInput
  }

  /**
   * PlaylistTrack findFirst
   */
  export type PlaylistTrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistTrack to fetch.
     */
    where?: PlaylistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistTracks to fetch.
     */
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistTracks.
     */
    cursor?: PlaylistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistTracks.
     */
    distinct?: PlaylistTrackScalarFieldEnum | PlaylistTrackScalarFieldEnum[]
  }

  /**
   * PlaylistTrack findFirstOrThrow
   */
  export type PlaylistTrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistTrack to fetch.
     */
    where?: PlaylistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistTracks to fetch.
     */
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistTracks.
     */
    cursor?: PlaylistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistTracks.
     */
    distinct?: PlaylistTrackScalarFieldEnum | PlaylistTrackScalarFieldEnum[]
  }

  /**
   * PlaylistTrack findMany
   */
  export type PlaylistTrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistTracks to fetch.
     */
    where?: PlaylistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistTracks to fetch.
     */
    orderBy?: PlaylistTrackOrderByWithRelationInput | PlaylistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaylistTracks.
     */
    cursor?: PlaylistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistTracks.
     */
    distinct?: PlaylistTrackScalarFieldEnum | PlaylistTrackScalarFieldEnum[]
  }

  /**
   * PlaylistTrack create
   */
  export type PlaylistTrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * The data needed to create a PlaylistTrack.
     */
    data: XOR<PlaylistTrackCreateInput, PlaylistTrackUncheckedCreateInput>
  }

  /**
   * PlaylistTrack createMany
   */
  export type PlaylistTrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaylistTracks.
     */
    data: PlaylistTrackCreateManyInput | PlaylistTrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaylistTrack update
   */
  export type PlaylistTrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * The data needed to update a PlaylistTrack.
     */
    data: XOR<PlaylistTrackUpdateInput, PlaylistTrackUncheckedUpdateInput>
    /**
     * Choose, which PlaylistTrack to update.
     */
    where: PlaylistTrackWhereUniqueInput
  }

  /**
   * PlaylistTrack updateMany
   */
  export type PlaylistTrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaylistTracks.
     */
    data: XOR<PlaylistTrackUpdateManyMutationInput, PlaylistTrackUncheckedUpdateManyInput>
    /**
     * Filter which PlaylistTracks to update
     */
    where?: PlaylistTrackWhereInput
    /**
     * Limit how many PlaylistTracks to update.
     */
    limit?: number
  }

  /**
   * PlaylistTrack upsert
   */
  export type PlaylistTrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * The filter to search for the PlaylistTrack to update in case it exists.
     */
    where: PlaylistTrackWhereUniqueInput
    /**
     * In case the PlaylistTrack found by the `where` argument doesn't exist, create a new PlaylistTrack with this data.
     */
    create: XOR<PlaylistTrackCreateInput, PlaylistTrackUncheckedCreateInput>
    /**
     * In case the PlaylistTrack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistTrackUpdateInput, PlaylistTrackUncheckedUpdateInput>
  }

  /**
   * PlaylistTrack delete
   */
  export type PlaylistTrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
    /**
     * Filter which PlaylistTrack to delete.
     */
    where: PlaylistTrackWhereUniqueInput
  }

  /**
   * PlaylistTrack deleteMany
   */
  export type PlaylistTrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistTracks to delete
     */
    where?: PlaylistTrackWhereInput
    /**
     * Limit how many PlaylistTracks to delete.
     */
    limit?: number
  }

  /**
   * PlaylistTrack without action
   */
  export type PlaylistTrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistTrack
     */
    select?: PlaylistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistTrack
     */
    omit?: PlaylistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistTrackInclude<ExtArgs> | null
  }


  /**
   * Model FavoriteTrack
   */

  export type AggregateFavoriteTrack = {
    _count: FavoriteTrackCountAggregateOutputType | null
    _min: FavoriteTrackMinAggregateOutputType | null
    _max: FavoriteTrackMaxAggregateOutputType | null
  }

  export type FavoriteTrackMinAggregateOutputType = {
    id: string | null
    userId: string | null
    trackId: string | null
    createdAt: Date | null
  }

  export type FavoriteTrackMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    trackId: string | null
    createdAt: Date | null
  }

  export type FavoriteTrackCountAggregateOutputType = {
    id: number
    userId: number
    trackId: number
    createdAt: number
    _all: number
  }


  export type FavoriteTrackMinAggregateInputType = {
    id?: true
    userId?: true
    trackId?: true
    createdAt?: true
  }

  export type FavoriteTrackMaxAggregateInputType = {
    id?: true
    userId?: true
    trackId?: true
    createdAt?: true
  }

  export type FavoriteTrackCountAggregateInputType = {
    id?: true
    userId?: true
    trackId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteTrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteTrack to aggregate.
     */
    where?: FavoriteTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteTracks to fetch.
     */
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FavoriteTracks
    **/
    _count?: true | FavoriteTrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteTrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteTrackMaxAggregateInputType
  }

  export type GetFavoriteTrackAggregateType<T extends FavoriteTrackAggregateArgs> = {
        [P in keyof T & keyof AggregateFavoriteTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavoriteTrack[P]>
      : GetScalarType<T[P], AggregateFavoriteTrack[P]>
  }




  export type FavoriteTrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteTrackWhereInput
    orderBy?: FavoriteTrackOrderByWithAggregationInput | FavoriteTrackOrderByWithAggregationInput[]
    by: FavoriteTrackScalarFieldEnum[] | FavoriteTrackScalarFieldEnum
    having?: FavoriteTrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteTrackCountAggregateInputType | true
    _min?: FavoriteTrackMinAggregateInputType
    _max?: FavoriteTrackMaxAggregateInputType
  }

  export type FavoriteTrackGroupByOutputType = {
    id: string
    userId: string
    trackId: string
    createdAt: Date
    _count: FavoriteTrackCountAggregateOutputType | null
    _min: FavoriteTrackMinAggregateOutputType | null
    _max: FavoriteTrackMaxAggregateOutputType | null
  }

  type GetFavoriteTrackGroupByPayload<T extends FavoriteTrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteTrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteTrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteTrackGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteTrackGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteTrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    trackId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    track?: boolean | TrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoriteTrack"]>



  export type FavoriteTrackSelectScalar = {
    id?: boolean
    userId?: boolean
    trackId?: boolean
    createdAt?: boolean
  }

  export type FavoriteTrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "trackId" | "createdAt", ExtArgs["result"]["favoriteTrack"]>
  export type FavoriteTrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    track?: boolean | TrackDefaultArgs<ExtArgs>
  }

  export type $FavoriteTrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FavoriteTrack"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      track: Prisma.$TrackPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      trackId: string
      createdAt: Date
    }, ExtArgs["result"]["favoriteTrack"]>
    composites: {}
  }

  type FavoriteTrackGetPayload<S extends boolean | null | undefined | FavoriteTrackDefaultArgs> = $Result.GetResult<Prisma.$FavoriteTrackPayload, S>

  type FavoriteTrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteTrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteTrackCountAggregateInputType | true
    }

  export interface FavoriteTrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FavoriteTrack'], meta: { name: 'FavoriteTrack' } }
    /**
     * Find zero or one FavoriteTrack that matches the filter.
     * @param {FavoriteTrackFindUniqueArgs} args - Arguments to find a FavoriteTrack
     * @example
     * // Get one FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteTrackFindUniqueArgs>(args: SelectSubset<T, FavoriteTrackFindUniqueArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FavoriteTrack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteTrackFindUniqueOrThrowArgs} args - Arguments to find a FavoriteTrack
     * @example
     * // Get one FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteTrackFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteTrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteTrack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackFindFirstArgs} args - Arguments to find a FavoriteTrack
     * @example
     * // Get one FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteTrackFindFirstArgs>(args?: SelectSubset<T, FavoriteTrackFindFirstArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteTrack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackFindFirstOrThrowArgs} args - Arguments to find a FavoriteTrack
     * @example
     * // Get one FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteTrackFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteTrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FavoriteTracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FavoriteTracks
     * const favoriteTracks = await prisma.favoriteTrack.findMany()
     * 
     * // Get first 10 FavoriteTracks
     * const favoriteTracks = await prisma.favoriteTrack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteTrackWithIdOnly = await prisma.favoriteTrack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteTrackFindManyArgs>(args?: SelectSubset<T, FavoriteTrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FavoriteTrack.
     * @param {FavoriteTrackCreateArgs} args - Arguments to create a FavoriteTrack.
     * @example
     * // Create one FavoriteTrack
     * const FavoriteTrack = await prisma.favoriteTrack.create({
     *   data: {
     *     // ... data to create a FavoriteTrack
     *   }
     * })
     * 
     */
    create<T extends FavoriteTrackCreateArgs>(args: SelectSubset<T, FavoriteTrackCreateArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FavoriteTracks.
     * @param {FavoriteTrackCreateManyArgs} args - Arguments to create many FavoriteTracks.
     * @example
     * // Create many FavoriteTracks
     * const favoriteTrack = await prisma.favoriteTrack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteTrackCreateManyArgs>(args?: SelectSubset<T, FavoriteTrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FavoriteTrack.
     * @param {FavoriteTrackDeleteArgs} args - Arguments to delete one FavoriteTrack.
     * @example
     * // Delete one FavoriteTrack
     * const FavoriteTrack = await prisma.favoriteTrack.delete({
     *   where: {
     *     // ... filter to delete one FavoriteTrack
     *   }
     * })
     * 
     */
    delete<T extends FavoriteTrackDeleteArgs>(args: SelectSubset<T, FavoriteTrackDeleteArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FavoriteTrack.
     * @param {FavoriteTrackUpdateArgs} args - Arguments to update one FavoriteTrack.
     * @example
     * // Update one FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteTrackUpdateArgs>(args: SelectSubset<T, FavoriteTrackUpdateArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FavoriteTracks.
     * @param {FavoriteTrackDeleteManyArgs} args - Arguments to filter FavoriteTracks to delete.
     * @example
     * // Delete a few FavoriteTracks
     * const { count } = await prisma.favoriteTrack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteTrackDeleteManyArgs>(args?: SelectSubset<T, FavoriteTrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FavoriteTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FavoriteTracks
     * const favoriteTrack = await prisma.favoriteTrack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteTrackUpdateManyArgs>(args: SelectSubset<T, FavoriteTrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FavoriteTrack.
     * @param {FavoriteTrackUpsertArgs} args - Arguments to update or create a FavoriteTrack.
     * @example
     * // Update or create a FavoriteTrack
     * const favoriteTrack = await prisma.favoriteTrack.upsert({
     *   create: {
     *     // ... data to create a FavoriteTrack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FavoriteTrack we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteTrackUpsertArgs>(args: SelectSubset<T, FavoriteTrackUpsertArgs<ExtArgs>>): Prisma__FavoriteTrackClient<$Result.GetResult<Prisma.$FavoriteTrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FavoriteTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackCountArgs} args - Arguments to filter FavoriteTracks to count.
     * @example
     * // Count the number of FavoriteTracks
     * const count = await prisma.favoriteTrack.count({
     *   where: {
     *     // ... the filter for the FavoriteTracks we want to count
     *   }
     * })
    **/
    count<T extends FavoriteTrackCountArgs>(
      args?: Subset<T, FavoriteTrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteTrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FavoriteTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FavoriteTrackAggregateArgs>(args: Subset<T, FavoriteTrackAggregateArgs>): Prisma.PrismaPromise<GetFavoriteTrackAggregateType<T>>

    /**
     * Group by FavoriteTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteTrackGroupByArgs} args - Group by arguments.
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
      T extends FavoriteTrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteTrackGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteTrackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FavoriteTrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FavoriteTrack model
   */
  readonly fields: FavoriteTrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FavoriteTrack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteTrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    track<T extends TrackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrackDefaultArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FavoriteTrack model
   */
  interface FavoriteTrackFieldRefs {
    readonly id: FieldRef<"FavoriteTrack", 'String'>
    readonly userId: FieldRef<"FavoriteTrack", 'String'>
    readonly trackId: FieldRef<"FavoriteTrack", 'String'>
    readonly createdAt: FieldRef<"FavoriteTrack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FavoriteTrack findUnique
   */
  export type FavoriteTrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteTrack to fetch.
     */
    where: FavoriteTrackWhereUniqueInput
  }

  /**
   * FavoriteTrack findUniqueOrThrow
   */
  export type FavoriteTrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteTrack to fetch.
     */
    where: FavoriteTrackWhereUniqueInput
  }

  /**
   * FavoriteTrack findFirst
   */
  export type FavoriteTrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteTrack to fetch.
     */
    where?: FavoriteTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteTracks to fetch.
     */
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteTracks.
     */
    cursor?: FavoriteTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteTracks.
     */
    distinct?: FavoriteTrackScalarFieldEnum | FavoriteTrackScalarFieldEnum[]
  }

  /**
   * FavoriteTrack findFirstOrThrow
   */
  export type FavoriteTrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteTrack to fetch.
     */
    where?: FavoriteTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteTracks to fetch.
     */
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteTracks.
     */
    cursor?: FavoriteTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteTracks.
     */
    distinct?: FavoriteTrackScalarFieldEnum | FavoriteTrackScalarFieldEnum[]
  }

  /**
   * FavoriteTrack findMany
   */
  export type FavoriteTrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteTracks to fetch.
     */
    where?: FavoriteTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteTracks to fetch.
     */
    orderBy?: FavoriteTrackOrderByWithRelationInput | FavoriteTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FavoriteTracks.
     */
    cursor?: FavoriteTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteTracks.
     */
    distinct?: FavoriteTrackScalarFieldEnum | FavoriteTrackScalarFieldEnum[]
  }

  /**
   * FavoriteTrack create
   */
  export type FavoriteTrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * The data needed to create a FavoriteTrack.
     */
    data: XOR<FavoriteTrackCreateInput, FavoriteTrackUncheckedCreateInput>
  }

  /**
   * FavoriteTrack createMany
   */
  export type FavoriteTrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FavoriteTracks.
     */
    data: FavoriteTrackCreateManyInput | FavoriteTrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FavoriteTrack update
   */
  export type FavoriteTrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * The data needed to update a FavoriteTrack.
     */
    data: XOR<FavoriteTrackUpdateInput, FavoriteTrackUncheckedUpdateInput>
    /**
     * Choose, which FavoriteTrack to update.
     */
    where: FavoriteTrackWhereUniqueInput
  }

  /**
   * FavoriteTrack updateMany
   */
  export type FavoriteTrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FavoriteTracks.
     */
    data: XOR<FavoriteTrackUpdateManyMutationInput, FavoriteTrackUncheckedUpdateManyInput>
    /**
     * Filter which FavoriteTracks to update
     */
    where?: FavoriteTrackWhereInput
    /**
     * Limit how many FavoriteTracks to update.
     */
    limit?: number
  }

  /**
   * FavoriteTrack upsert
   */
  export type FavoriteTrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * The filter to search for the FavoriteTrack to update in case it exists.
     */
    where: FavoriteTrackWhereUniqueInput
    /**
     * In case the FavoriteTrack found by the `where` argument doesn't exist, create a new FavoriteTrack with this data.
     */
    create: XOR<FavoriteTrackCreateInput, FavoriteTrackUncheckedCreateInput>
    /**
     * In case the FavoriteTrack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteTrackUpdateInput, FavoriteTrackUncheckedUpdateInput>
  }

  /**
   * FavoriteTrack delete
   */
  export type FavoriteTrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
    /**
     * Filter which FavoriteTrack to delete.
     */
    where: FavoriteTrackWhereUniqueInput
  }

  /**
   * FavoriteTrack deleteMany
   */
  export type FavoriteTrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteTracks to delete
     */
    where?: FavoriteTrackWhereInput
    /**
     * Limit how many FavoriteTracks to delete.
     */
    limit?: number
  }

  /**
   * FavoriteTrack without action
   */
  export type FavoriteTrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteTrack
     */
    select?: FavoriteTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteTrack
     */
    omit?: FavoriteTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteTrackInclude<ExtArgs> | null
  }


  /**
   * Model FavoritePlaylist
   */

  export type AggregateFavoritePlaylist = {
    _count: FavoritePlaylistCountAggregateOutputType | null
    _min: FavoritePlaylistMinAggregateOutputType | null
    _max: FavoritePlaylistMaxAggregateOutputType | null
  }

  export type FavoritePlaylistMinAggregateOutputType = {
    id: string | null
    userId: string | null
    playlistId: string | null
    createdAt: Date | null
  }

  export type FavoritePlaylistMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    playlistId: string | null
    createdAt: Date | null
  }

  export type FavoritePlaylistCountAggregateOutputType = {
    id: number
    userId: number
    playlistId: number
    createdAt: number
    _all: number
  }


  export type FavoritePlaylistMinAggregateInputType = {
    id?: true
    userId?: true
    playlistId?: true
    createdAt?: true
  }

  export type FavoritePlaylistMaxAggregateInputType = {
    id?: true
    userId?: true
    playlistId?: true
    createdAt?: true
  }

  export type FavoritePlaylistCountAggregateInputType = {
    id?: true
    userId?: true
    playlistId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoritePlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoritePlaylist to aggregate.
     */
    where?: FavoritePlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoritePlaylists to fetch.
     */
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoritePlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoritePlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoritePlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FavoritePlaylists
    **/
    _count?: true | FavoritePlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoritePlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoritePlaylistMaxAggregateInputType
  }

  export type GetFavoritePlaylistAggregateType<T extends FavoritePlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregateFavoritePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavoritePlaylist[P]>
      : GetScalarType<T[P], AggregateFavoritePlaylist[P]>
  }




  export type FavoritePlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoritePlaylistWhereInput
    orderBy?: FavoritePlaylistOrderByWithAggregationInput | FavoritePlaylistOrderByWithAggregationInput[]
    by: FavoritePlaylistScalarFieldEnum[] | FavoritePlaylistScalarFieldEnum
    having?: FavoritePlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoritePlaylistCountAggregateInputType | true
    _min?: FavoritePlaylistMinAggregateInputType
    _max?: FavoritePlaylistMaxAggregateInputType
  }

  export type FavoritePlaylistGroupByOutputType = {
    id: string
    userId: string
    playlistId: string
    createdAt: Date
    _count: FavoritePlaylistCountAggregateOutputType | null
    _min: FavoritePlaylistMinAggregateOutputType | null
    _max: FavoritePlaylistMaxAggregateOutputType | null
  }

  type GetFavoritePlaylistGroupByPayload<T extends FavoritePlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoritePlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoritePlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoritePlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], FavoritePlaylistGroupByOutputType[P]>
        }
      >
    >


  export type FavoritePlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    playlistId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoritePlaylist"]>



  export type FavoritePlaylistSelectScalar = {
    id?: boolean
    userId?: boolean
    playlistId?: boolean
    createdAt?: boolean
  }

  export type FavoritePlaylistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "playlistId" | "createdAt", ExtArgs["result"]["favoritePlaylist"]>
  export type FavoritePlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }

  export type $FavoritePlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FavoritePlaylist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      playlist: Prisma.$PlaylistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      playlistId: string
      createdAt: Date
    }, ExtArgs["result"]["favoritePlaylist"]>
    composites: {}
  }

  type FavoritePlaylistGetPayload<S extends boolean | null | undefined | FavoritePlaylistDefaultArgs> = $Result.GetResult<Prisma.$FavoritePlaylistPayload, S>

  type FavoritePlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoritePlaylistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoritePlaylistCountAggregateInputType | true
    }

  export interface FavoritePlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FavoritePlaylist'], meta: { name: 'FavoritePlaylist' } }
    /**
     * Find zero or one FavoritePlaylist that matches the filter.
     * @param {FavoritePlaylistFindUniqueArgs} args - Arguments to find a FavoritePlaylist
     * @example
     * // Get one FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoritePlaylistFindUniqueArgs>(args: SelectSubset<T, FavoritePlaylistFindUniqueArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FavoritePlaylist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoritePlaylistFindUniqueOrThrowArgs} args - Arguments to find a FavoritePlaylist
     * @example
     * // Get one FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoritePlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoritePlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoritePlaylist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistFindFirstArgs} args - Arguments to find a FavoritePlaylist
     * @example
     * // Get one FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoritePlaylistFindFirstArgs>(args?: SelectSubset<T, FavoritePlaylistFindFirstArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoritePlaylist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistFindFirstOrThrowArgs} args - Arguments to find a FavoritePlaylist
     * @example
     * // Get one FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoritePlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoritePlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FavoritePlaylists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FavoritePlaylists
     * const favoritePlaylists = await prisma.favoritePlaylist.findMany()
     * 
     * // Get first 10 FavoritePlaylists
     * const favoritePlaylists = await prisma.favoritePlaylist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoritePlaylistWithIdOnly = await prisma.favoritePlaylist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoritePlaylistFindManyArgs>(args?: SelectSubset<T, FavoritePlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FavoritePlaylist.
     * @param {FavoritePlaylistCreateArgs} args - Arguments to create a FavoritePlaylist.
     * @example
     * // Create one FavoritePlaylist
     * const FavoritePlaylist = await prisma.favoritePlaylist.create({
     *   data: {
     *     // ... data to create a FavoritePlaylist
     *   }
     * })
     * 
     */
    create<T extends FavoritePlaylistCreateArgs>(args: SelectSubset<T, FavoritePlaylistCreateArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FavoritePlaylists.
     * @param {FavoritePlaylistCreateManyArgs} args - Arguments to create many FavoritePlaylists.
     * @example
     * // Create many FavoritePlaylists
     * const favoritePlaylist = await prisma.favoritePlaylist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoritePlaylistCreateManyArgs>(args?: SelectSubset<T, FavoritePlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FavoritePlaylist.
     * @param {FavoritePlaylistDeleteArgs} args - Arguments to delete one FavoritePlaylist.
     * @example
     * // Delete one FavoritePlaylist
     * const FavoritePlaylist = await prisma.favoritePlaylist.delete({
     *   where: {
     *     // ... filter to delete one FavoritePlaylist
     *   }
     * })
     * 
     */
    delete<T extends FavoritePlaylistDeleteArgs>(args: SelectSubset<T, FavoritePlaylistDeleteArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FavoritePlaylist.
     * @param {FavoritePlaylistUpdateArgs} args - Arguments to update one FavoritePlaylist.
     * @example
     * // Update one FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoritePlaylistUpdateArgs>(args: SelectSubset<T, FavoritePlaylistUpdateArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FavoritePlaylists.
     * @param {FavoritePlaylistDeleteManyArgs} args - Arguments to filter FavoritePlaylists to delete.
     * @example
     * // Delete a few FavoritePlaylists
     * const { count } = await prisma.favoritePlaylist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoritePlaylistDeleteManyArgs>(args?: SelectSubset<T, FavoritePlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FavoritePlaylists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FavoritePlaylists
     * const favoritePlaylist = await prisma.favoritePlaylist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoritePlaylistUpdateManyArgs>(args: SelectSubset<T, FavoritePlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FavoritePlaylist.
     * @param {FavoritePlaylistUpsertArgs} args - Arguments to update or create a FavoritePlaylist.
     * @example
     * // Update or create a FavoritePlaylist
     * const favoritePlaylist = await prisma.favoritePlaylist.upsert({
     *   create: {
     *     // ... data to create a FavoritePlaylist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FavoritePlaylist we want to update
     *   }
     * })
     */
    upsert<T extends FavoritePlaylistUpsertArgs>(args: SelectSubset<T, FavoritePlaylistUpsertArgs<ExtArgs>>): Prisma__FavoritePlaylistClient<$Result.GetResult<Prisma.$FavoritePlaylistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FavoritePlaylists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistCountArgs} args - Arguments to filter FavoritePlaylists to count.
     * @example
     * // Count the number of FavoritePlaylists
     * const count = await prisma.favoritePlaylist.count({
     *   where: {
     *     // ... the filter for the FavoritePlaylists we want to count
     *   }
     * })
    **/
    count<T extends FavoritePlaylistCountArgs>(
      args?: Subset<T, FavoritePlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoritePlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FavoritePlaylist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FavoritePlaylistAggregateArgs>(args: Subset<T, FavoritePlaylistAggregateArgs>): Prisma.PrismaPromise<GetFavoritePlaylistAggregateType<T>>

    /**
     * Group by FavoritePlaylist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritePlaylistGroupByArgs} args - Group by arguments.
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
      T extends FavoritePlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoritePlaylistGroupByArgs['orderBy'] }
        : { orderBy?: FavoritePlaylistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FavoritePlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoritePlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FavoritePlaylist model
   */
  readonly fields: FavoritePlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FavoritePlaylist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoritePlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playlist<T extends PlaylistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaylistDefaultArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FavoritePlaylist model
   */
  interface FavoritePlaylistFieldRefs {
    readonly id: FieldRef<"FavoritePlaylist", 'String'>
    readonly userId: FieldRef<"FavoritePlaylist", 'String'>
    readonly playlistId: FieldRef<"FavoritePlaylist", 'String'>
    readonly createdAt: FieldRef<"FavoritePlaylist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FavoritePlaylist findUnique
   */
  export type FavoritePlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter, which FavoritePlaylist to fetch.
     */
    where: FavoritePlaylistWhereUniqueInput
  }

  /**
   * FavoritePlaylist findUniqueOrThrow
   */
  export type FavoritePlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter, which FavoritePlaylist to fetch.
     */
    where: FavoritePlaylistWhereUniqueInput
  }

  /**
   * FavoritePlaylist findFirst
   */
  export type FavoritePlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter, which FavoritePlaylist to fetch.
     */
    where?: FavoritePlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoritePlaylists to fetch.
     */
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoritePlaylists.
     */
    cursor?: FavoritePlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoritePlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoritePlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoritePlaylists.
     */
    distinct?: FavoritePlaylistScalarFieldEnum | FavoritePlaylistScalarFieldEnum[]
  }

  /**
   * FavoritePlaylist findFirstOrThrow
   */
  export type FavoritePlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter, which FavoritePlaylist to fetch.
     */
    where?: FavoritePlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoritePlaylists to fetch.
     */
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoritePlaylists.
     */
    cursor?: FavoritePlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoritePlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoritePlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoritePlaylists.
     */
    distinct?: FavoritePlaylistScalarFieldEnum | FavoritePlaylistScalarFieldEnum[]
  }

  /**
   * FavoritePlaylist findMany
   */
  export type FavoritePlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter, which FavoritePlaylists to fetch.
     */
    where?: FavoritePlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoritePlaylists to fetch.
     */
    orderBy?: FavoritePlaylistOrderByWithRelationInput | FavoritePlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FavoritePlaylists.
     */
    cursor?: FavoritePlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoritePlaylists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoritePlaylists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoritePlaylists.
     */
    distinct?: FavoritePlaylistScalarFieldEnum | FavoritePlaylistScalarFieldEnum[]
  }

  /**
   * FavoritePlaylist create
   */
  export type FavoritePlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a FavoritePlaylist.
     */
    data: XOR<FavoritePlaylistCreateInput, FavoritePlaylistUncheckedCreateInput>
  }

  /**
   * FavoritePlaylist createMany
   */
  export type FavoritePlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FavoritePlaylists.
     */
    data: FavoritePlaylistCreateManyInput | FavoritePlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FavoritePlaylist update
   */
  export type FavoritePlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a FavoritePlaylist.
     */
    data: XOR<FavoritePlaylistUpdateInput, FavoritePlaylistUncheckedUpdateInput>
    /**
     * Choose, which FavoritePlaylist to update.
     */
    where: FavoritePlaylistWhereUniqueInput
  }

  /**
   * FavoritePlaylist updateMany
   */
  export type FavoritePlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FavoritePlaylists.
     */
    data: XOR<FavoritePlaylistUpdateManyMutationInput, FavoritePlaylistUncheckedUpdateManyInput>
    /**
     * Filter which FavoritePlaylists to update
     */
    where?: FavoritePlaylistWhereInput
    /**
     * Limit how many FavoritePlaylists to update.
     */
    limit?: number
  }

  /**
   * FavoritePlaylist upsert
   */
  export type FavoritePlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the FavoritePlaylist to update in case it exists.
     */
    where: FavoritePlaylistWhereUniqueInput
    /**
     * In case the FavoritePlaylist found by the `where` argument doesn't exist, create a new FavoritePlaylist with this data.
     */
    create: XOR<FavoritePlaylistCreateInput, FavoritePlaylistUncheckedCreateInput>
    /**
     * In case the FavoritePlaylist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoritePlaylistUpdateInput, FavoritePlaylistUncheckedUpdateInput>
  }

  /**
   * FavoritePlaylist delete
   */
  export type FavoritePlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
    /**
     * Filter which FavoritePlaylist to delete.
     */
    where: FavoritePlaylistWhereUniqueInput
  }

  /**
   * FavoritePlaylist deleteMany
   */
  export type FavoritePlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoritePlaylists to delete
     */
    where?: FavoritePlaylistWhereInput
    /**
     * Limit how many FavoritePlaylists to delete.
     */
    limit?: number
  }

  /**
   * FavoritePlaylist without action
   */
  export type FavoritePlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoritePlaylist
     */
    select?: FavoritePlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoritePlaylist
     */
    omit?: FavoritePlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoritePlaylistInclude<ExtArgs> | null
  }


  /**
   * Model FavoriteArtist
   */

  export type AggregateFavoriteArtist = {
    _count: FavoriteArtistCountAggregateOutputType | null
    _min: FavoriteArtistMinAggregateOutputType | null
    _max: FavoriteArtistMaxAggregateOutputType | null
  }

  export type FavoriteArtistMinAggregateOutputType = {
    id: string | null
    userId: string | null
    artistName: string | null
    createdAt: Date | null
  }

  export type FavoriteArtistMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    artistName: string | null
    createdAt: Date | null
  }

  export type FavoriteArtistCountAggregateOutputType = {
    id: number
    userId: number
    artistName: number
    createdAt: number
    _all: number
  }


  export type FavoriteArtistMinAggregateInputType = {
    id?: true
    userId?: true
    artistName?: true
    createdAt?: true
  }

  export type FavoriteArtistMaxAggregateInputType = {
    id?: true
    userId?: true
    artistName?: true
    createdAt?: true
  }

  export type FavoriteArtistCountAggregateInputType = {
    id?: true
    userId?: true
    artistName?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteArtist to aggregate.
     */
    where?: FavoriteArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteArtists to fetch.
     */
    orderBy?: FavoriteArtistOrderByWithRelationInput | FavoriteArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FavoriteArtists
    **/
    _count?: true | FavoriteArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteArtistMaxAggregateInputType
  }

  export type GetFavoriteArtistAggregateType<T extends FavoriteArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateFavoriteArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavoriteArtist[P]>
      : GetScalarType<T[P], AggregateFavoriteArtist[P]>
  }




  export type FavoriteArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteArtistWhereInput
    orderBy?: FavoriteArtistOrderByWithAggregationInput | FavoriteArtistOrderByWithAggregationInput[]
    by: FavoriteArtistScalarFieldEnum[] | FavoriteArtistScalarFieldEnum
    having?: FavoriteArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteArtistCountAggregateInputType | true
    _min?: FavoriteArtistMinAggregateInputType
    _max?: FavoriteArtistMaxAggregateInputType
  }

  export type FavoriteArtistGroupByOutputType = {
    id: string
    userId: string
    artistName: string
    createdAt: Date
    _count: FavoriteArtistCountAggregateOutputType | null
    _min: FavoriteArtistMinAggregateOutputType | null
    _max: FavoriteArtistMaxAggregateOutputType | null
  }

  type GetFavoriteArtistGroupByPayload<T extends FavoriteArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteArtistGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteArtistGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    artistName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favoriteArtist"]>



  export type FavoriteArtistSelectScalar = {
    id?: boolean
    userId?: boolean
    artistName?: boolean
    createdAt?: boolean
  }

  export type FavoriteArtistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "artistName" | "createdAt", ExtArgs["result"]["favoriteArtist"]>
  export type FavoriteArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FavoriteArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FavoriteArtist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      artistName: string
      createdAt: Date
    }, ExtArgs["result"]["favoriteArtist"]>
    composites: {}
  }

  type FavoriteArtistGetPayload<S extends boolean | null | undefined | FavoriteArtistDefaultArgs> = $Result.GetResult<Prisma.$FavoriteArtistPayload, S>

  type FavoriteArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteArtistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteArtistCountAggregateInputType | true
    }

  export interface FavoriteArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FavoriteArtist'], meta: { name: 'FavoriteArtist' } }
    /**
     * Find zero or one FavoriteArtist that matches the filter.
     * @param {FavoriteArtistFindUniqueArgs} args - Arguments to find a FavoriteArtist
     * @example
     * // Get one FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteArtistFindUniqueArgs>(args: SelectSubset<T, FavoriteArtistFindUniqueArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FavoriteArtist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteArtistFindUniqueOrThrowArgs} args - Arguments to find a FavoriteArtist
     * @example
     * // Get one FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteArtistFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteArtistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteArtist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistFindFirstArgs} args - Arguments to find a FavoriteArtist
     * @example
     * // Get one FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteArtistFindFirstArgs>(args?: SelectSubset<T, FavoriteArtistFindFirstArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FavoriteArtist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistFindFirstOrThrowArgs} args - Arguments to find a FavoriteArtist
     * @example
     * // Get one FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteArtistFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteArtistFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FavoriteArtists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FavoriteArtists
     * const favoriteArtists = await prisma.favoriteArtist.findMany()
     * 
     * // Get first 10 FavoriteArtists
     * const favoriteArtists = await prisma.favoriteArtist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteArtistWithIdOnly = await prisma.favoriteArtist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteArtistFindManyArgs>(args?: SelectSubset<T, FavoriteArtistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FavoriteArtist.
     * @param {FavoriteArtistCreateArgs} args - Arguments to create a FavoriteArtist.
     * @example
     * // Create one FavoriteArtist
     * const FavoriteArtist = await prisma.favoriteArtist.create({
     *   data: {
     *     // ... data to create a FavoriteArtist
     *   }
     * })
     * 
     */
    create<T extends FavoriteArtistCreateArgs>(args: SelectSubset<T, FavoriteArtistCreateArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FavoriteArtists.
     * @param {FavoriteArtistCreateManyArgs} args - Arguments to create many FavoriteArtists.
     * @example
     * // Create many FavoriteArtists
     * const favoriteArtist = await prisma.favoriteArtist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteArtistCreateManyArgs>(args?: SelectSubset<T, FavoriteArtistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FavoriteArtist.
     * @param {FavoriteArtistDeleteArgs} args - Arguments to delete one FavoriteArtist.
     * @example
     * // Delete one FavoriteArtist
     * const FavoriteArtist = await prisma.favoriteArtist.delete({
     *   where: {
     *     // ... filter to delete one FavoriteArtist
     *   }
     * })
     * 
     */
    delete<T extends FavoriteArtistDeleteArgs>(args: SelectSubset<T, FavoriteArtistDeleteArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FavoriteArtist.
     * @param {FavoriteArtistUpdateArgs} args - Arguments to update one FavoriteArtist.
     * @example
     * // Update one FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteArtistUpdateArgs>(args: SelectSubset<T, FavoriteArtistUpdateArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FavoriteArtists.
     * @param {FavoriteArtistDeleteManyArgs} args - Arguments to filter FavoriteArtists to delete.
     * @example
     * // Delete a few FavoriteArtists
     * const { count } = await prisma.favoriteArtist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteArtistDeleteManyArgs>(args?: SelectSubset<T, FavoriteArtistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FavoriteArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FavoriteArtists
     * const favoriteArtist = await prisma.favoriteArtist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteArtistUpdateManyArgs>(args: SelectSubset<T, FavoriteArtistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FavoriteArtist.
     * @param {FavoriteArtistUpsertArgs} args - Arguments to update or create a FavoriteArtist.
     * @example
     * // Update or create a FavoriteArtist
     * const favoriteArtist = await prisma.favoriteArtist.upsert({
     *   create: {
     *     // ... data to create a FavoriteArtist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FavoriteArtist we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteArtistUpsertArgs>(args: SelectSubset<T, FavoriteArtistUpsertArgs<ExtArgs>>): Prisma__FavoriteArtistClient<$Result.GetResult<Prisma.$FavoriteArtistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FavoriteArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistCountArgs} args - Arguments to filter FavoriteArtists to count.
     * @example
     * // Count the number of FavoriteArtists
     * const count = await prisma.favoriteArtist.count({
     *   where: {
     *     // ... the filter for the FavoriteArtists we want to count
     *   }
     * })
    **/
    count<T extends FavoriteArtistCountArgs>(
      args?: Subset<T, FavoriteArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FavoriteArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FavoriteArtistAggregateArgs>(args: Subset<T, FavoriteArtistAggregateArgs>): Prisma.PrismaPromise<GetFavoriteArtistAggregateType<T>>

    /**
     * Group by FavoriteArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteArtistGroupByArgs} args - Group by arguments.
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
      T extends FavoriteArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteArtistGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteArtistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FavoriteArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FavoriteArtist model
   */
  readonly fields: FavoriteArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FavoriteArtist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FavoriteArtist model
   */
  interface FavoriteArtistFieldRefs {
    readonly id: FieldRef<"FavoriteArtist", 'String'>
    readonly userId: FieldRef<"FavoriteArtist", 'String'>
    readonly artistName: FieldRef<"FavoriteArtist", 'String'>
    readonly createdAt: FieldRef<"FavoriteArtist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FavoriteArtist findUnique
   */
  export type FavoriteArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteArtist to fetch.
     */
    where: FavoriteArtistWhereUniqueInput
  }

  /**
   * FavoriteArtist findUniqueOrThrow
   */
  export type FavoriteArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteArtist to fetch.
     */
    where: FavoriteArtistWhereUniqueInput
  }

  /**
   * FavoriteArtist findFirst
   */
  export type FavoriteArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteArtist to fetch.
     */
    where?: FavoriteArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteArtists to fetch.
     */
    orderBy?: FavoriteArtistOrderByWithRelationInput | FavoriteArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteArtists.
     */
    cursor?: FavoriteArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteArtists.
     */
    distinct?: FavoriteArtistScalarFieldEnum | FavoriteArtistScalarFieldEnum[]
  }

  /**
   * FavoriteArtist findFirstOrThrow
   */
  export type FavoriteArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteArtist to fetch.
     */
    where?: FavoriteArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteArtists to fetch.
     */
    orderBy?: FavoriteArtistOrderByWithRelationInput | FavoriteArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FavoriteArtists.
     */
    cursor?: FavoriteArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteArtists.
     */
    distinct?: FavoriteArtistScalarFieldEnum | FavoriteArtistScalarFieldEnum[]
  }

  /**
   * FavoriteArtist findMany
   */
  export type FavoriteArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter, which FavoriteArtists to fetch.
     */
    where?: FavoriteArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FavoriteArtists to fetch.
     */
    orderBy?: FavoriteArtistOrderByWithRelationInput | FavoriteArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FavoriteArtists.
     */
    cursor?: FavoriteArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FavoriteArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FavoriteArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FavoriteArtists.
     */
    distinct?: FavoriteArtistScalarFieldEnum | FavoriteArtistScalarFieldEnum[]
  }

  /**
   * FavoriteArtist create
   */
  export type FavoriteArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a FavoriteArtist.
     */
    data: XOR<FavoriteArtistCreateInput, FavoriteArtistUncheckedCreateInput>
  }

  /**
   * FavoriteArtist createMany
   */
  export type FavoriteArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FavoriteArtists.
     */
    data: FavoriteArtistCreateManyInput | FavoriteArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FavoriteArtist update
   */
  export type FavoriteArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a FavoriteArtist.
     */
    data: XOR<FavoriteArtistUpdateInput, FavoriteArtistUncheckedUpdateInput>
    /**
     * Choose, which FavoriteArtist to update.
     */
    where: FavoriteArtistWhereUniqueInput
  }

  /**
   * FavoriteArtist updateMany
   */
  export type FavoriteArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FavoriteArtists.
     */
    data: XOR<FavoriteArtistUpdateManyMutationInput, FavoriteArtistUncheckedUpdateManyInput>
    /**
     * Filter which FavoriteArtists to update
     */
    where?: FavoriteArtistWhereInput
    /**
     * Limit how many FavoriteArtists to update.
     */
    limit?: number
  }

  /**
   * FavoriteArtist upsert
   */
  export type FavoriteArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the FavoriteArtist to update in case it exists.
     */
    where: FavoriteArtistWhereUniqueInput
    /**
     * In case the FavoriteArtist found by the `where` argument doesn't exist, create a new FavoriteArtist with this data.
     */
    create: XOR<FavoriteArtistCreateInput, FavoriteArtistUncheckedCreateInput>
    /**
     * In case the FavoriteArtist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteArtistUpdateInput, FavoriteArtistUncheckedUpdateInput>
  }

  /**
   * FavoriteArtist delete
   */
  export type FavoriteArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
    /**
     * Filter which FavoriteArtist to delete.
     */
    where: FavoriteArtistWhereUniqueInput
  }

  /**
   * FavoriteArtist deleteMany
   */
  export type FavoriteArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FavoriteArtists to delete
     */
    where?: FavoriteArtistWhereInput
    /**
     * Limit how many FavoriteArtists to delete.
     */
    limit?: number
  }

  /**
   * FavoriteArtist without action
   */
  export type FavoriteArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FavoriteArtist
     */
    select?: FavoriteArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FavoriteArtist
     */
    omit?: FavoriteArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteArtistInclude<ExtArgs> | null
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
    name: 'name',
    image: 'image',
    emailVerified: 'emailVerified',
    role: 'role',
    canMakePlaylistsPublic: 'canMakePlaylistsPublic',
    isReadOnly: 'isReadOnly',
    banned: 'banned',
    loginCount: 'loginCount',
    lastLoginAt: 'lastLoginAt',
    lastPlayedTrackId: 'lastPlayedTrackId',
    lastPlayedPlaylistId: 'lastPlayedPlaylistId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const TrackScalarFieldEnum: {
    id: 'id',
    title: 'title',
    artist: 'artist',
    src: 'src',
    fullSrc: 'fullSrc',
    cover: 'cover',
    colors: 'colors',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackScalarFieldEnum = (typeof TrackScalarFieldEnum)[keyof typeof TrackScalarFieldEnum]


  export const PlaylistScalarFieldEnum: {
    id: 'id',
    title: 'title',
    cover: 'cover',
    type: 'type',
    category: 'category',
    isPublic: 'isPublic',
    colors: 'colors',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const PlaylistTrackScalarFieldEnum: {
    id: 'id',
    playlistId: 'playlistId',
    trackId: 'trackId',
    order: 'order'
  };

  export type PlaylistTrackScalarFieldEnum = (typeof PlaylistTrackScalarFieldEnum)[keyof typeof PlaylistTrackScalarFieldEnum]


  export const FavoriteTrackScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    trackId: 'trackId',
    createdAt: 'createdAt'
  };

  export type FavoriteTrackScalarFieldEnum = (typeof FavoriteTrackScalarFieldEnum)[keyof typeof FavoriteTrackScalarFieldEnum]


  export const FavoritePlaylistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    playlistId: 'playlistId',
    createdAt: 'createdAt'
  };

  export type FavoritePlaylistScalarFieldEnum = (typeof FavoritePlaylistScalarFieldEnum)[keyof typeof FavoritePlaylistScalarFieldEnum]


  export const FavoriteArtistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    artistName: 'artistName',
    createdAt: 'createdAt'
  };

  export type FavoriteArtistScalarFieldEnum = (typeof FavoriteArtistScalarFieldEnum)[keyof typeof FavoriteArtistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    role: 'role',
    lastPlayedTrackId: 'lastPlayedTrackId',
    lastPlayedPlaylistId: 'lastPlayedPlaylistId'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const SessionOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  export const AccountOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password'
  };

  export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum]


  export const VerificationOrderByRelevanceFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value'
  };

  export type VerificationOrderByRelevanceFieldEnum = (typeof VerificationOrderByRelevanceFieldEnum)[keyof typeof VerificationOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const TrackOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    artist: 'artist',
    src: 'src',
    fullSrc: 'fullSrc',
    cover: 'cover',
    type: 'type'
  };

  export type TrackOrderByRelevanceFieldEnum = (typeof TrackOrderByRelevanceFieldEnum)[keyof typeof TrackOrderByRelevanceFieldEnum]


  export const PlaylistOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    cover: 'cover',
    type: 'type',
    authorId: 'authorId'
  };

  export type PlaylistOrderByRelevanceFieldEnum = (typeof PlaylistOrderByRelevanceFieldEnum)[keyof typeof PlaylistOrderByRelevanceFieldEnum]


  export const PlaylistTrackOrderByRelevanceFieldEnum: {
    id: 'id',
    playlistId: 'playlistId',
    trackId: 'trackId'
  };

  export type PlaylistTrackOrderByRelevanceFieldEnum = (typeof PlaylistTrackOrderByRelevanceFieldEnum)[keyof typeof PlaylistTrackOrderByRelevanceFieldEnum]


  export const FavoriteTrackOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    trackId: 'trackId'
  };

  export type FavoriteTrackOrderByRelevanceFieldEnum = (typeof FavoriteTrackOrderByRelevanceFieldEnum)[keyof typeof FavoriteTrackOrderByRelevanceFieldEnum]


  export const FavoritePlaylistOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    playlistId: 'playlistId'
  };

  export type FavoritePlaylistOrderByRelevanceFieldEnum = (typeof FavoritePlaylistOrderByRelevanceFieldEnum)[keyof typeof FavoritePlaylistOrderByRelevanceFieldEnum]


  export const FavoriteArtistOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    artistName: 'artistName'
  };

  export type FavoriteArtistOrderByRelevanceFieldEnum = (typeof FavoriteArtistOrderByRelevanceFieldEnum)[keyof typeof FavoriteArtistOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'PlaylistCategory'
   */
  export type EnumPlaylistCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlaylistCategory'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    canMakePlaylistsPublic?: BoolFilter<"User"> | boolean
    isReadOnly?: BoolFilter<"User"> | boolean
    banned?: BoolFilter<"User"> | boolean
    loginCount?: IntFilter<"User"> | number
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastPlayedTrackId?: StringNullableFilter<"User"> | string | null
    lastPlayedPlaylistId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    playlists?: PlaylistListRelationFilter
    favoriteTracks?: FavoriteTrackListRelationFilter
    favoritePlaylists?: FavoritePlaylistListRelationFilter
    favoriteArtists?: FavoriteArtistListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    canMakePlaylistsPublic?: SortOrder
    isReadOnly?: SortOrder
    banned?: SortOrder
    loginCount?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastPlayedTrackId?: SortOrderInput | SortOrder
    lastPlayedPlaylistId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    playlists?: PlaylistOrderByRelationAggregateInput
    favoriteTracks?: FavoriteTrackOrderByRelationAggregateInput
    favoritePlaylists?: FavoritePlaylistOrderByRelationAggregateInput
    favoriteArtists?: FavoriteArtistOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    canMakePlaylistsPublic?: BoolFilter<"User"> | boolean
    isReadOnly?: BoolFilter<"User"> | boolean
    banned?: BoolFilter<"User"> | boolean
    loginCount?: IntFilter<"User"> | number
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastPlayedTrackId?: StringNullableFilter<"User"> | string | null
    lastPlayedPlaylistId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    playlists?: PlaylistListRelationFilter
    favoriteTracks?: FavoriteTrackListRelationFilter
    favoritePlaylists?: FavoritePlaylistListRelationFilter
    favoriteArtists?: FavoriteArtistListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    canMakePlaylistsPublic?: SortOrder
    isReadOnly?: SortOrder
    banned?: SortOrder
    loginCount?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastPlayedTrackId?: SortOrderInput | SortOrder
    lastPlayedPlaylistId?: SortOrderInput | SortOrder
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
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    role?: StringWithAggregatesFilter<"User"> | string
    canMakePlaylistsPublic?: BoolWithAggregatesFilter<"User"> | boolean
    isReadOnly?: BoolWithAggregatesFilter<"User"> | boolean
    banned?: BoolWithAggregatesFilter<"User"> | boolean
    loginCount?: IntWithAggregatesFilter<"User"> | number
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastPlayedTrackId?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastPlayedPlaylistId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AccountOrderByRelevanceInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: VerificationOrderByRelevanceInput
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type TrackWhereInput = {
    AND?: TrackWhereInput | TrackWhereInput[]
    OR?: TrackWhereInput[]
    NOT?: TrackWhereInput | TrackWhereInput[]
    id?: StringFilter<"Track"> | string
    title?: StringFilter<"Track"> | string
    artist?: StringFilter<"Track"> | string
    src?: StringFilter<"Track"> | string
    fullSrc?: StringNullableFilter<"Track"> | string | null
    cover?: StringFilter<"Track"> | string
    colors?: JsonNullableFilter<"Track">
    type?: StringFilter<"Track"> | string
    createdAt?: DateTimeFilter<"Track"> | Date | string
    updatedAt?: DateTimeFilter<"Track"> | Date | string
    playlists?: PlaylistTrackListRelationFilter
    favoritedBy?: FavoriteTrackListRelationFilter
  }

  export type TrackOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    src?: SortOrder
    fullSrc?: SortOrderInput | SortOrder
    cover?: SortOrder
    colors?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playlists?: PlaylistTrackOrderByRelationAggregateInput
    favoritedBy?: FavoriteTrackOrderByRelationAggregateInput
    _relevance?: TrackOrderByRelevanceInput
  }

  export type TrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackWhereInput | TrackWhereInput[]
    OR?: TrackWhereInput[]
    NOT?: TrackWhereInput | TrackWhereInput[]
    title?: StringFilter<"Track"> | string
    artist?: StringFilter<"Track"> | string
    src?: StringFilter<"Track"> | string
    fullSrc?: StringNullableFilter<"Track"> | string | null
    cover?: StringFilter<"Track"> | string
    colors?: JsonNullableFilter<"Track">
    type?: StringFilter<"Track"> | string
    createdAt?: DateTimeFilter<"Track"> | Date | string
    updatedAt?: DateTimeFilter<"Track"> | Date | string
    playlists?: PlaylistTrackListRelationFilter
    favoritedBy?: FavoriteTrackListRelationFilter
  }, "id">

  export type TrackOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    src?: SortOrder
    fullSrc?: SortOrderInput | SortOrder
    cover?: SortOrder
    colors?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackCountOrderByAggregateInput
    _max?: TrackMaxOrderByAggregateInput
    _min?: TrackMinOrderByAggregateInput
  }

  export type TrackScalarWhereWithAggregatesInput = {
    AND?: TrackScalarWhereWithAggregatesInput | TrackScalarWhereWithAggregatesInput[]
    OR?: TrackScalarWhereWithAggregatesInput[]
    NOT?: TrackScalarWhereWithAggregatesInput | TrackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Track"> | string
    title?: StringWithAggregatesFilter<"Track"> | string
    artist?: StringWithAggregatesFilter<"Track"> | string
    src?: StringWithAggregatesFilter<"Track"> | string
    fullSrc?: StringNullableWithAggregatesFilter<"Track"> | string | null
    cover?: StringWithAggregatesFilter<"Track"> | string
    colors?: JsonNullableWithAggregatesFilter<"Track">
    type?: StringWithAggregatesFilter<"Track"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Track"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Track"> | Date | string
  }

  export type PlaylistWhereInput = {
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    id?: StringFilter<"Playlist"> | string
    title?: StringFilter<"Playlist"> | string
    cover?: StringNullableFilter<"Playlist"> | string | null
    type?: StringFilter<"Playlist"> | string
    category?: EnumPlaylistCategoryFilter<"Playlist"> | $Enums.PlaylistCategory
    isPublic?: BoolFilter<"Playlist"> | boolean
    colors?: JsonNullableFilter<"Playlist">
    authorId?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tracks?: PlaylistTrackListRelationFilter
    favoritedBy?: FavoritePlaylistListRelationFilter
  }

  export type PlaylistOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrderInput | SortOrder
    type?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    colors?: SortOrderInput | SortOrder
    authorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    tracks?: PlaylistTrackOrderByRelationAggregateInput
    favoritedBy?: FavoritePlaylistOrderByRelationAggregateInput
    _relevance?: PlaylistOrderByRelevanceInput
  }

  export type PlaylistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    title?: StringFilter<"Playlist"> | string
    cover?: StringNullableFilter<"Playlist"> | string | null
    type?: StringFilter<"Playlist"> | string
    category?: EnumPlaylistCategoryFilter<"Playlist"> | $Enums.PlaylistCategory
    isPublic?: BoolFilter<"Playlist"> | boolean
    colors?: JsonNullableFilter<"Playlist">
    authorId?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tracks?: PlaylistTrackListRelationFilter
    favoritedBy?: FavoritePlaylistListRelationFilter
  }, "id">

  export type PlaylistOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrderInput | SortOrder
    type?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    colors?: SortOrderInput | SortOrder
    authorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlaylistCountOrderByAggregateInput
    _max?: PlaylistMaxOrderByAggregateInput
    _min?: PlaylistMinOrderByAggregateInput
  }

  export type PlaylistScalarWhereWithAggregatesInput = {
    AND?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    OR?: PlaylistScalarWhereWithAggregatesInput[]
    NOT?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Playlist"> | string
    title?: StringWithAggregatesFilter<"Playlist"> | string
    cover?: StringNullableWithAggregatesFilter<"Playlist"> | string | null
    type?: StringWithAggregatesFilter<"Playlist"> | string
    category?: EnumPlaylistCategoryWithAggregatesFilter<"Playlist"> | $Enums.PlaylistCategory
    isPublic?: BoolWithAggregatesFilter<"Playlist"> | boolean
    colors?: JsonNullableWithAggregatesFilter<"Playlist">
    authorId?: StringNullableWithAggregatesFilter<"Playlist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Playlist"> | Date | string
  }

  export type PlaylistTrackWhereInput = {
    AND?: PlaylistTrackWhereInput | PlaylistTrackWhereInput[]
    OR?: PlaylistTrackWhereInput[]
    NOT?: PlaylistTrackWhereInput | PlaylistTrackWhereInput[]
    id?: StringFilter<"PlaylistTrack"> | string
    playlistId?: StringFilter<"PlaylistTrack"> | string
    trackId?: StringFilter<"PlaylistTrack"> | string
    order?: IntFilter<"PlaylistTrack"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
    track?: XOR<TrackScalarRelationFilter, TrackWhereInput>
  }

  export type PlaylistTrackOrderByWithRelationInput = {
    id?: SortOrder
    playlistId?: SortOrder
    trackId?: SortOrder
    order?: SortOrder
    playlist?: PlaylistOrderByWithRelationInput
    track?: TrackOrderByWithRelationInput
    _relevance?: PlaylistTrackOrderByRelevanceInput
  }

  export type PlaylistTrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    playlistId_trackId?: PlaylistTrackPlaylistIdTrackIdCompoundUniqueInput
    AND?: PlaylistTrackWhereInput | PlaylistTrackWhereInput[]
    OR?: PlaylistTrackWhereInput[]
    NOT?: PlaylistTrackWhereInput | PlaylistTrackWhereInput[]
    playlistId?: StringFilter<"PlaylistTrack"> | string
    trackId?: StringFilter<"PlaylistTrack"> | string
    order?: IntFilter<"PlaylistTrack"> | number
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
    track?: XOR<TrackScalarRelationFilter, TrackWhereInput>
  }, "id" | "playlistId_trackId">

  export type PlaylistTrackOrderByWithAggregationInput = {
    id?: SortOrder
    playlistId?: SortOrder
    trackId?: SortOrder
    order?: SortOrder
    _count?: PlaylistTrackCountOrderByAggregateInput
    _avg?: PlaylistTrackAvgOrderByAggregateInput
    _max?: PlaylistTrackMaxOrderByAggregateInput
    _min?: PlaylistTrackMinOrderByAggregateInput
    _sum?: PlaylistTrackSumOrderByAggregateInput
  }

  export type PlaylistTrackScalarWhereWithAggregatesInput = {
    AND?: PlaylistTrackScalarWhereWithAggregatesInput | PlaylistTrackScalarWhereWithAggregatesInput[]
    OR?: PlaylistTrackScalarWhereWithAggregatesInput[]
    NOT?: PlaylistTrackScalarWhereWithAggregatesInput | PlaylistTrackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlaylistTrack"> | string
    playlistId?: StringWithAggregatesFilter<"PlaylistTrack"> | string
    trackId?: StringWithAggregatesFilter<"PlaylistTrack"> | string
    order?: IntWithAggregatesFilter<"PlaylistTrack"> | number
  }

  export type FavoriteTrackWhereInput = {
    AND?: FavoriteTrackWhereInput | FavoriteTrackWhereInput[]
    OR?: FavoriteTrackWhereInput[]
    NOT?: FavoriteTrackWhereInput | FavoriteTrackWhereInput[]
    id?: StringFilter<"FavoriteTrack"> | string
    userId?: StringFilter<"FavoriteTrack"> | string
    trackId?: StringFilter<"FavoriteTrack"> | string
    createdAt?: DateTimeFilter<"FavoriteTrack"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    track?: XOR<TrackScalarRelationFilter, TrackWhereInput>
  }

  export type FavoriteTrackOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    trackId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    track?: TrackOrderByWithRelationInput
    _relevance?: FavoriteTrackOrderByRelevanceInput
  }

  export type FavoriteTrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_trackId?: FavoriteTrackUserIdTrackIdCompoundUniqueInput
    AND?: FavoriteTrackWhereInput | FavoriteTrackWhereInput[]
    OR?: FavoriteTrackWhereInput[]
    NOT?: FavoriteTrackWhereInput | FavoriteTrackWhereInput[]
    userId?: StringFilter<"FavoriteTrack"> | string
    trackId?: StringFilter<"FavoriteTrack"> | string
    createdAt?: DateTimeFilter<"FavoriteTrack"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    track?: XOR<TrackScalarRelationFilter, TrackWhereInput>
  }, "id" | "userId_trackId">

  export type FavoriteTrackOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    trackId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteTrackCountOrderByAggregateInput
    _max?: FavoriteTrackMaxOrderByAggregateInput
    _min?: FavoriteTrackMinOrderByAggregateInput
  }

  export type FavoriteTrackScalarWhereWithAggregatesInput = {
    AND?: FavoriteTrackScalarWhereWithAggregatesInput | FavoriteTrackScalarWhereWithAggregatesInput[]
    OR?: FavoriteTrackScalarWhereWithAggregatesInput[]
    NOT?: FavoriteTrackScalarWhereWithAggregatesInput | FavoriteTrackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FavoriteTrack"> | string
    userId?: StringWithAggregatesFilter<"FavoriteTrack"> | string
    trackId?: StringWithAggregatesFilter<"FavoriteTrack"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FavoriteTrack"> | Date | string
  }

  export type FavoritePlaylistWhereInput = {
    AND?: FavoritePlaylistWhereInput | FavoritePlaylistWhereInput[]
    OR?: FavoritePlaylistWhereInput[]
    NOT?: FavoritePlaylistWhereInput | FavoritePlaylistWhereInput[]
    id?: StringFilter<"FavoritePlaylist"> | string
    userId?: StringFilter<"FavoritePlaylist"> | string
    playlistId?: StringFilter<"FavoritePlaylist"> | string
    createdAt?: DateTimeFilter<"FavoritePlaylist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
  }

  export type FavoritePlaylistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    playlist?: PlaylistOrderByWithRelationInput
    _relevance?: FavoritePlaylistOrderByRelevanceInput
  }

  export type FavoritePlaylistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_playlistId?: FavoritePlaylistUserIdPlaylistIdCompoundUniqueInput
    AND?: FavoritePlaylistWhereInput | FavoritePlaylistWhereInput[]
    OR?: FavoritePlaylistWhereInput[]
    NOT?: FavoritePlaylistWhereInput | FavoritePlaylistWhereInput[]
    userId?: StringFilter<"FavoritePlaylist"> | string
    playlistId?: StringFilter<"FavoritePlaylist"> | string
    createdAt?: DateTimeFilter<"FavoritePlaylist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
  }, "id" | "userId_playlistId">

  export type FavoritePlaylistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoritePlaylistCountOrderByAggregateInput
    _max?: FavoritePlaylistMaxOrderByAggregateInput
    _min?: FavoritePlaylistMinOrderByAggregateInput
  }

  export type FavoritePlaylistScalarWhereWithAggregatesInput = {
    AND?: FavoritePlaylistScalarWhereWithAggregatesInput | FavoritePlaylistScalarWhereWithAggregatesInput[]
    OR?: FavoritePlaylistScalarWhereWithAggregatesInput[]
    NOT?: FavoritePlaylistScalarWhereWithAggregatesInput | FavoritePlaylistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FavoritePlaylist"> | string
    userId?: StringWithAggregatesFilter<"FavoritePlaylist"> | string
    playlistId?: StringWithAggregatesFilter<"FavoritePlaylist"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FavoritePlaylist"> | Date | string
  }

  export type FavoriteArtistWhereInput = {
    AND?: FavoriteArtistWhereInput | FavoriteArtistWhereInput[]
    OR?: FavoriteArtistWhereInput[]
    NOT?: FavoriteArtistWhereInput | FavoriteArtistWhereInput[]
    id?: StringFilter<"FavoriteArtist"> | string
    userId?: StringFilter<"FavoriteArtist"> | string
    artistName?: StringFilter<"FavoriteArtist"> | string
    createdAt?: DateTimeFilter<"FavoriteArtist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FavoriteArtistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    artistName?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: FavoriteArtistOrderByRelevanceInput
  }

  export type FavoriteArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_artistName?: FavoriteArtistUserIdArtistNameCompoundUniqueInput
    AND?: FavoriteArtistWhereInput | FavoriteArtistWhereInput[]
    OR?: FavoriteArtistWhereInput[]
    NOT?: FavoriteArtistWhereInput | FavoriteArtistWhereInput[]
    userId?: StringFilter<"FavoriteArtist"> | string
    artistName?: StringFilter<"FavoriteArtist"> | string
    createdAt?: DateTimeFilter<"FavoriteArtist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_artistName">

  export type FavoriteArtistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    artistName?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteArtistCountOrderByAggregateInput
    _max?: FavoriteArtistMaxOrderByAggregateInput
    _min?: FavoriteArtistMinOrderByAggregateInput
  }

  export type FavoriteArtistScalarWhereWithAggregatesInput = {
    AND?: FavoriteArtistScalarWhereWithAggregatesInput | FavoriteArtistScalarWhereWithAggregatesInput[]
    OR?: FavoriteArtistScalarWhereWithAggregatesInput[]
    NOT?: FavoriteArtistScalarWhereWithAggregatesInput | FavoriteArtistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FavoriteArtist"> | string
    userId?: StringWithAggregatesFilter<"FavoriteArtist"> | string
    artistName?: StringWithAggregatesFilter<"FavoriteArtist"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FavoriteArtist"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userId: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id: string
    userId: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackCreateInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistTrackCreateNestedManyWithoutTrackInput
    favoritedBy?: FavoriteTrackCreateNestedManyWithoutTrackInput
  }

  export type TrackUncheckedCreateInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistTrackUncheckedCreateNestedManyWithoutTrackInput
    favoritedBy?: FavoriteTrackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type TrackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistTrackUpdateManyWithoutTrackNestedInput
    favoritedBy?: FavoriteTrackUpdateManyWithoutTrackNestedInput
  }

  export type TrackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistTrackUncheckedUpdateManyWithoutTrackNestedInput
    favoritedBy?: FavoriteTrackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type TrackCreateManyInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistCreateInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: UserCreateNestedOneWithoutPlaylistsInput
    tracks?: PlaylistTrackCreateNestedManyWithoutPlaylistInput
    favoritedBy?: FavoritePlaylistCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: PlaylistTrackUncheckedCreateNestedManyWithoutPlaylistInput
    favoritedBy?: FavoritePlaylistUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneWithoutPlaylistsNestedInput
    tracks?: PlaylistTrackUpdateManyWithoutPlaylistNestedInput
    favoritedBy?: FavoritePlaylistUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: PlaylistTrackUncheckedUpdateManyWithoutPlaylistNestedInput
    favoritedBy?: FavoritePlaylistUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistCreateManyInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlaylistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistTrackCreateInput = {
    id?: string
    order?: number
    playlist: PlaylistCreateNestedOneWithoutTracksInput
    track: TrackCreateNestedOneWithoutPlaylistsInput
  }

  export type PlaylistTrackUncheckedCreateInput = {
    id?: string
    playlistId: string
    trackId: string
    order?: number
  }

  export type PlaylistTrackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    playlist?: PlaylistUpdateOneRequiredWithoutTracksNestedInput
    track?: TrackUpdateOneRequiredWithoutPlaylistsNestedInput
  }

  export type PlaylistTrackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistTrackCreateManyInput = {
    id?: string
    playlistId: string
    trackId: string
    order?: number
  }

  export type PlaylistTrackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistTrackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type FavoriteTrackCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoriteTracksInput
    track: TrackCreateNestedOneWithoutFavoritedByInput
  }

  export type FavoriteTrackUncheckedCreateInput = {
    id?: string
    userId: string
    trackId: string
    createdAt?: Date | string
  }

  export type FavoriteTrackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoriteTracksNestedInput
    track?: TrackUpdateOneRequiredWithoutFavoritedByNestedInput
  }

  export type FavoriteTrackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteTrackCreateManyInput = {
    id?: string
    userId: string
    trackId: string
    createdAt?: Date | string
  }

  export type FavoriteTrackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteTrackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritePlaylistsInput
    playlist: PlaylistCreateNestedOneWithoutFavoritedByInput
  }

  export type FavoritePlaylistUncheckedCreateInput = {
    id?: string
    userId: string
    playlistId: string
    createdAt?: Date | string
  }

  export type FavoritePlaylistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritePlaylistsNestedInput
    playlist?: PlaylistUpdateOneRequiredWithoutFavoritedByNestedInput
  }

  export type FavoritePlaylistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistCreateManyInput = {
    id?: string
    userId: string
    playlistId: string
    createdAt?: Date | string
  }

  export type FavoritePlaylistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistCreateInput = {
    id?: string
    artistName: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoriteArtistsInput
  }

  export type FavoriteArtistUncheckedCreateInput = {
    id?: string
    userId: string
    artistName: string
    createdAt?: Date | string
  }

  export type FavoriteArtistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoriteArtistsNestedInput
  }

  export type FavoriteArtistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistCreateManyInput = {
    id?: string
    userId: string
    artistName: string
    createdAt?: Date | string
  }

  export type FavoriteArtistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type PlaylistListRelationFilter = {
    every?: PlaylistWhereInput
    some?: PlaylistWhereInput
    none?: PlaylistWhereInput
  }

  export type FavoriteTrackListRelationFilter = {
    every?: FavoriteTrackWhereInput
    some?: FavoriteTrackWhereInput
    none?: FavoriteTrackWhereInput
  }

  export type FavoritePlaylistListRelationFilter = {
    every?: FavoritePlaylistWhereInput
    some?: FavoritePlaylistWhereInput
    none?: FavoritePlaylistWhereInput
  }

  export type FavoriteArtistListRelationFilter = {
    every?: FavoriteArtistWhereInput
    some?: FavoriteArtistWhereInput
    none?: FavoriteArtistWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaylistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteTrackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoritePlaylistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteArtistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    canMakePlaylistsPublic?: SortOrder
    isReadOnly?: SortOrder
    banned?: SortOrder
    loginCount?: SortOrder
    lastLoginAt?: SortOrder
    lastPlayedTrackId?: SortOrder
    lastPlayedPlaylistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    loginCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    canMakePlaylistsPublic?: SortOrder
    isReadOnly?: SortOrder
    banned?: SortOrder
    loginCount?: SortOrder
    lastLoginAt?: SortOrder
    lastPlayedTrackId?: SortOrder
    lastPlayedPlaylistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    canMakePlaylistsPublic?: SortOrder
    isReadOnly?: SortOrder
    banned?: SortOrder
    loginCount?: SortOrder
    lastLoginAt?: SortOrder
    lastPlayedTrackId?: SortOrder
    lastPlayedPlaylistId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    loginCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountOrderByRelevanceInput = {
    fields: AccountOrderByRelevanceFieldEnum | AccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationOrderByRelevanceInput = {
    fields: VerificationOrderByRelevanceFieldEnum | VerificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PlaylistTrackListRelationFilter = {
    every?: PlaylistTrackWhereInput
    some?: PlaylistTrackWhereInput
    none?: PlaylistTrackWhereInput
  }

  export type PlaylistTrackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackOrderByRelevanceInput = {
    fields: TrackOrderByRelevanceFieldEnum | TrackOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TrackCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    src?: SortOrder
    fullSrc?: SortOrder
    cover?: SortOrder
    colors?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    src?: SortOrder
    fullSrc?: SortOrder
    cover?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    src?: SortOrder
    fullSrc?: SortOrder
    cover?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumPlaylistCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaylistCategory | EnumPlaylistCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaylistCategory[]
    notIn?: $Enums.PlaylistCategory[]
    not?: NestedEnumPlaylistCategoryFilter<$PrismaModel> | $Enums.PlaylistCategory
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PlaylistOrderByRelevanceInput = {
    fields: PlaylistOrderByRelevanceFieldEnum | PlaylistOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlaylistCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    type?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    colors?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlaylistMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    type?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    type?: SortOrder
    category?: SortOrder
    isPublic?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPlaylistCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaylistCategory | EnumPlaylistCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaylistCategory[]
    notIn?: $Enums.PlaylistCategory[]
    not?: NestedEnumPlaylistCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlaylistCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlaylistCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlaylistCategoryFilter<$PrismaModel>
  }

  export type PlaylistScalarRelationFilter = {
    is?: PlaylistWhereInput
    isNot?: PlaylistWhereInput
  }

  export type TrackScalarRelationFilter = {
    is?: TrackWhereInput
    isNot?: TrackWhereInput
  }

  export type PlaylistTrackOrderByRelevanceInput = {
    fields: PlaylistTrackOrderByRelevanceFieldEnum | PlaylistTrackOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlaylistTrackPlaylistIdTrackIdCompoundUniqueInput = {
    playlistId: string
    trackId: string
  }

  export type PlaylistTrackCountOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    trackId?: SortOrder
    order?: SortOrder
  }

  export type PlaylistTrackAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PlaylistTrackMaxOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    trackId?: SortOrder
    order?: SortOrder
  }

  export type PlaylistTrackMinOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    trackId?: SortOrder
    order?: SortOrder
  }

  export type PlaylistTrackSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type FavoriteTrackOrderByRelevanceInput = {
    fields: FavoriteTrackOrderByRelevanceFieldEnum | FavoriteTrackOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FavoriteTrackUserIdTrackIdCompoundUniqueInput = {
    userId: string
    trackId: string
  }

  export type FavoriteTrackCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteTrackMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteTrackMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoritePlaylistOrderByRelevanceInput = {
    fields: FavoritePlaylistOrderByRelevanceFieldEnum | FavoritePlaylistOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FavoritePlaylistUserIdPlaylistIdCompoundUniqueInput = {
    userId: string
    playlistId: string
  }

  export type FavoritePlaylistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoritePlaylistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoritePlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    playlistId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteArtistOrderByRelevanceInput = {
    fields: FavoriteArtistOrderByRelevanceFieldEnum | FavoriteArtistOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FavoriteArtistUserIdArtistNameCompoundUniqueInput = {
    userId: string
    artistName: string
  }

  export type FavoriteArtistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistName?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistName?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteArtistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistName?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PlaylistCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput> | PlaylistCreateWithoutAuthorInput[] | PlaylistUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutAuthorInput | PlaylistCreateOrConnectWithoutAuthorInput[]
    createMany?: PlaylistCreateManyAuthorInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type FavoriteTrackCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput> | FavoriteTrackCreateWithoutUserInput[] | FavoriteTrackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutUserInput | FavoriteTrackCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteTrackCreateManyUserInputEnvelope
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
  }

  export type FavoritePlaylistCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput> | FavoritePlaylistCreateWithoutUserInput[] | FavoritePlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutUserInput | FavoritePlaylistCreateOrConnectWithoutUserInput[]
    createMany?: FavoritePlaylistCreateManyUserInputEnvelope
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
  }

  export type FavoriteArtistCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput> | FavoriteArtistCreateWithoutUserInput[] | FavoriteArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteArtistCreateOrConnectWithoutUserInput | FavoriteArtistCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteArtistCreateManyUserInputEnvelope
    connect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PlaylistUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput> | PlaylistCreateWithoutAuthorInput[] | PlaylistUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutAuthorInput | PlaylistCreateOrConnectWithoutAuthorInput[]
    createMany?: PlaylistCreateManyAuthorInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type FavoriteTrackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput> | FavoriteTrackCreateWithoutUserInput[] | FavoriteTrackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutUserInput | FavoriteTrackCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteTrackCreateManyUserInputEnvelope
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
  }

  export type FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput> | FavoritePlaylistCreateWithoutUserInput[] | FavoritePlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutUserInput | FavoritePlaylistCreateOrConnectWithoutUserInput[]
    createMany?: FavoritePlaylistCreateManyUserInputEnvelope
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
  }

  export type FavoriteArtistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput> | FavoriteArtistCreateWithoutUserInput[] | FavoriteArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteArtistCreateOrConnectWithoutUserInput | FavoriteArtistCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteArtistCreateManyUserInputEnvelope
    connect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PlaylistUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput> | PlaylistCreateWithoutAuthorInput[] | PlaylistUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutAuthorInput | PlaylistCreateOrConnectWithoutAuthorInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutAuthorInput | PlaylistUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PlaylistCreateManyAuthorInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutAuthorInput | PlaylistUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutAuthorInput | PlaylistUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type FavoriteTrackUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput> | FavoriteTrackCreateWithoutUserInput[] | FavoriteTrackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutUserInput | FavoriteTrackCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteTrackUpsertWithWhereUniqueWithoutUserInput | FavoriteTrackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteTrackCreateManyUserInputEnvelope
    set?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    disconnect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    delete?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    update?: FavoriteTrackUpdateWithWhereUniqueWithoutUserInput | FavoriteTrackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteTrackUpdateManyWithWhereWithoutUserInput | FavoriteTrackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
  }

  export type FavoritePlaylistUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput> | FavoritePlaylistCreateWithoutUserInput[] | FavoritePlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutUserInput | FavoritePlaylistCreateOrConnectWithoutUserInput[]
    upsert?: FavoritePlaylistUpsertWithWhereUniqueWithoutUserInput | FavoritePlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoritePlaylistCreateManyUserInputEnvelope
    set?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    disconnect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    delete?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    update?: FavoritePlaylistUpdateWithWhereUniqueWithoutUserInput | FavoritePlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoritePlaylistUpdateManyWithWhereWithoutUserInput | FavoritePlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
  }

  export type FavoriteArtistUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput> | FavoriteArtistCreateWithoutUserInput[] | FavoriteArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteArtistCreateOrConnectWithoutUserInput | FavoriteArtistCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteArtistUpsertWithWhereUniqueWithoutUserInput | FavoriteArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteArtistCreateManyUserInputEnvelope
    set?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    disconnect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    delete?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    connect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    update?: FavoriteArtistUpdateWithWhereUniqueWithoutUserInput | FavoriteArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteArtistUpdateManyWithWhereWithoutUserInput | FavoriteArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteArtistScalarWhereInput | FavoriteArtistScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PlaylistUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput> | PlaylistCreateWithoutAuthorInput[] | PlaylistUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutAuthorInput | PlaylistCreateOrConnectWithoutAuthorInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutAuthorInput | PlaylistUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PlaylistCreateManyAuthorInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutAuthorInput | PlaylistUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutAuthorInput | PlaylistUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput> | FavoriteTrackCreateWithoutUserInput[] | FavoriteTrackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutUserInput | FavoriteTrackCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteTrackUpsertWithWhereUniqueWithoutUserInput | FavoriteTrackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteTrackCreateManyUserInputEnvelope
    set?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    disconnect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    delete?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    update?: FavoriteTrackUpdateWithWhereUniqueWithoutUserInput | FavoriteTrackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteTrackUpdateManyWithWhereWithoutUserInput | FavoriteTrackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
  }

  export type FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput> | FavoritePlaylistCreateWithoutUserInput[] | FavoritePlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutUserInput | FavoritePlaylistCreateOrConnectWithoutUserInput[]
    upsert?: FavoritePlaylistUpsertWithWhereUniqueWithoutUserInput | FavoritePlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoritePlaylistCreateManyUserInputEnvelope
    set?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    disconnect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    delete?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    update?: FavoritePlaylistUpdateWithWhereUniqueWithoutUserInput | FavoritePlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoritePlaylistUpdateManyWithWhereWithoutUserInput | FavoritePlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
  }

  export type FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput> | FavoriteArtistCreateWithoutUserInput[] | FavoriteArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteArtistCreateOrConnectWithoutUserInput | FavoriteArtistCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteArtistUpsertWithWhereUniqueWithoutUserInput | FavoriteArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteArtistCreateManyUserInputEnvelope
    set?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    disconnect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    delete?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    connect?: FavoriteArtistWhereUniqueInput | FavoriteArtistWhereUniqueInput[]
    update?: FavoriteArtistUpdateWithWhereUniqueWithoutUserInput | FavoriteArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteArtistUpdateManyWithWhereWithoutUserInput | FavoriteArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteArtistScalarWhereInput | FavoriteArtistScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type PlaylistTrackCreateNestedManyWithoutTrackInput = {
    create?: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput> | PlaylistTrackCreateWithoutTrackInput[] | PlaylistTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutTrackInput | PlaylistTrackCreateOrConnectWithoutTrackInput[]
    createMany?: PlaylistTrackCreateManyTrackInputEnvelope
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
  }

  export type FavoriteTrackCreateNestedManyWithoutTrackInput = {
    create?: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput> | FavoriteTrackCreateWithoutTrackInput[] | FavoriteTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutTrackInput | FavoriteTrackCreateOrConnectWithoutTrackInput[]
    createMany?: FavoriteTrackCreateManyTrackInputEnvelope
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
  }

  export type PlaylistTrackUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput> | PlaylistTrackCreateWithoutTrackInput[] | PlaylistTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutTrackInput | PlaylistTrackCreateOrConnectWithoutTrackInput[]
    createMany?: PlaylistTrackCreateManyTrackInputEnvelope
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
  }

  export type FavoriteTrackUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput> | FavoriteTrackCreateWithoutTrackInput[] | FavoriteTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutTrackInput | FavoriteTrackCreateOrConnectWithoutTrackInput[]
    createMany?: FavoriteTrackCreateManyTrackInputEnvelope
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
  }

  export type PlaylistTrackUpdateManyWithoutTrackNestedInput = {
    create?: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput> | PlaylistTrackCreateWithoutTrackInput[] | PlaylistTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutTrackInput | PlaylistTrackCreateOrConnectWithoutTrackInput[]
    upsert?: PlaylistTrackUpsertWithWhereUniqueWithoutTrackInput | PlaylistTrackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: PlaylistTrackCreateManyTrackInputEnvelope
    set?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    disconnect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    delete?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    update?: PlaylistTrackUpdateWithWhereUniqueWithoutTrackInput | PlaylistTrackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: PlaylistTrackUpdateManyWithWhereWithoutTrackInput | PlaylistTrackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
  }

  export type FavoriteTrackUpdateManyWithoutTrackNestedInput = {
    create?: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput> | FavoriteTrackCreateWithoutTrackInput[] | FavoriteTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutTrackInput | FavoriteTrackCreateOrConnectWithoutTrackInput[]
    upsert?: FavoriteTrackUpsertWithWhereUniqueWithoutTrackInput | FavoriteTrackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: FavoriteTrackCreateManyTrackInputEnvelope
    set?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    disconnect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    delete?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    update?: FavoriteTrackUpdateWithWhereUniqueWithoutTrackInput | FavoriteTrackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: FavoriteTrackUpdateManyWithWhereWithoutTrackInput | FavoriteTrackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
  }

  export type PlaylistTrackUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput> | PlaylistTrackCreateWithoutTrackInput[] | PlaylistTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutTrackInput | PlaylistTrackCreateOrConnectWithoutTrackInput[]
    upsert?: PlaylistTrackUpsertWithWhereUniqueWithoutTrackInput | PlaylistTrackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: PlaylistTrackCreateManyTrackInputEnvelope
    set?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    disconnect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    delete?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    update?: PlaylistTrackUpdateWithWhereUniqueWithoutTrackInput | PlaylistTrackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: PlaylistTrackUpdateManyWithWhereWithoutTrackInput | PlaylistTrackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
  }

  export type FavoriteTrackUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput> | FavoriteTrackCreateWithoutTrackInput[] | FavoriteTrackUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: FavoriteTrackCreateOrConnectWithoutTrackInput | FavoriteTrackCreateOrConnectWithoutTrackInput[]
    upsert?: FavoriteTrackUpsertWithWhereUniqueWithoutTrackInput | FavoriteTrackUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: FavoriteTrackCreateManyTrackInputEnvelope
    set?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    disconnect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    delete?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    connect?: FavoriteTrackWhereUniqueInput | FavoriteTrackWhereUniqueInput[]
    update?: FavoriteTrackUpdateWithWhereUniqueWithoutTrackInput | FavoriteTrackUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: FavoriteTrackUpdateManyWithWhereWithoutTrackInput | FavoriteTrackUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPlaylistsInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    connect?: UserWhereUniqueInput
  }

  export type PlaylistTrackCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput> | PlaylistTrackCreateWithoutPlaylistInput[] | PlaylistTrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutPlaylistInput | PlaylistTrackCreateOrConnectWithoutPlaylistInput[]
    createMany?: PlaylistTrackCreateManyPlaylistInputEnvelope
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
  }

  export type FavoritePlaylistCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput> | FavoritePlaylistCreateWithoutPlaylistInput[] | FavoritePlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutPlaylistInput | FavoritePlaylistCreateOrConnectWithoutPlaylistInput[]
    createMany?: FavoritePlaylistCreateManyPlaylistInputEnvelope
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
  }

  export type PlaylistTrackUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput> | PlaylistTrackCreateWithoutPlaylistInput[] | PlaylistTrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutPlaylistInput | PlaylistTrackCreateOrConnectWithoutPlaylistInput[]
    createMany?: PlaylistTrackCreateManyPlaylistInputEnvelope
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
  }

  export type FavoritePlaylistUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput> | FavoritePlaylistCreateWithoutPlaylistInput[] | FavoritePlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutPlaylistInput | FavoritePlaylistCreateOrConnectWithoutPlaylistInput[]
    createMany?: FavoritePlaylistCreateManyPlaylistInputEnvelope
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
  }

  export type EnumPlaylistCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PlaylistCategory
  }

  export type UserUpdateOneWithoutPlaylistsNestedInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    upsert?: UserUpsertWithoutPlaylistsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlaylistsInput, UserUpdateWithoutPlaylistsInput>, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type PlaylistTrackUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput> | PlaylistTrackCreateWithoutPlaylistInput[] | PlaylistTrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutPlaylistInput | PlaylistTrackCreateOrConnectWithoutPlaylistInput[]
    upsert?: PlaylistTrackUpsertWithWhereUniqueWithoutPlaylistInput | PlaylistTrackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: PlaylistTrackCreateManyPlaylistInputEnvelope
    set?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    disconnect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    delete?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    update?: PlaylistTrackUpdateWithWhereUniqueWithoutPlaylistInput | PlaylistTrackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: PlaylistTrackUpdateManyWithWhereWithoutPlaylistInput | PlaylistTrackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
  }

  export type FavoritePlaylistUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput> | FavoritePlaylistCreateWithoutPlaylistInput[] | FavoritePlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutPlaylistInput | FavoritePlaylistCreateOrConnectWithoutPlaylistInput[]
    upsert?: FavoritePlaylistUpsertWithWhereUniqueWithoutPlaylistInput | FavoritePlaylistUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: FavoritePlaylistCreateManyPlaylistInputEnvelope
    set?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    disconnect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    delete?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    update?: FavoritePlaylistUpdateWithWhereUniqueWithoutPlaylistInput | FavoritePlaylistUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: FavoritePlaylistUpdateManyWithWhereWithoutPlaylistInput | FavoritePlaylistUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
  }

  export type PlaylistTrackUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput> | PlaylistTrackCreateWithoutPlaylistInput[] | PlaylistTrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistTrackCreateOrConnectWithoutPlaylistInput | PlaylistTrackCreateOrConnectWithoutPlaylistInput[]
    upsert?: PlaylistTrackUpsertWithWhereUniqueWithoutPlaylistInput | PlaylistTrackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: PlaylistTrackCreateManyPlaylistInputEnvelope
    set?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    disconnect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    delete?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    connect?: PlaylistTrackWhereUniqueInput | PlaylistTrackWhereUniqueInput[]
    update?: PlaylistTrackUpdateWithWhereUniqueWithoutPlaylistInput | PlaylistTrackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: PlaylistTrackUpdateManyWithWhereWithoutPlaylistInput | PlaylistTrackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
  }

  export type FavoritePlaylistUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput> | FavoritePlaylistCreateWithoutPlaylistInput[] | FavoritePlaylistUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: FavoritePlaylistCreateOrConnectWithoutPlaylistInput | FavoritePlaylistCreateOrConnectWithoutPlaylistInput[]
    upsert?: FavoritePlaylistUpsertWithWhereUniqueWithoutPlaylistInput | FavoritePlaylistUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: FavoritePlaylistCreateManyPlaylistInputEnvelope
    set?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    disconnect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    delete?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    connect?: FavoritePlaylistWhereUniqueInput | FavoritePlaylistWhereUniqueInput[]
    update?: FavoritePlaylistUpdateWithWhereUniqueWithoutPlaylistInput | FavoritePlaylistUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: FavoritePlaylistUpdateManyWithWhereWithoutPlaylistInput | FavoritePlaylistUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
  }

  export type PlaylistCreateNestedOneWithoutTracksInput = {
    create?: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutTracksInput
    connect?: PlaylistWhereUniqueInput
  }

  export type TrackCreateNestedOneWithoutPlaylistsInput = {
    create?: XOR<TrackCreateWithoutPlaylistsInput, TrackUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistsInput
    connect?: TrackWhereUniqueInput
  }

  export type PlaylistUpdateOneRequiredWithoutTracksNestedInput = {
    create?: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutTracksInput
    upsert?: PlaylistUpsertWithoutTracksInput
    connect?: PlaylistWhereUniqueInput
    update?: XOR<XOR<PlaylistUpdateToOneWithWhereWithoutTracksInput, PlaylistUpdateWithoutTracksInput>, PlaylistUncheckedUpdateWithoutTracksInput>
  }

  export type TrackUpdateOneRequiredWithoutPlaylistsNestedInput = {
    create?: XOR<TrackCreateWithoutPlaylistsInput, TrackUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistsInput
    upsert?: TrackUpsertWithoutPlaylistsInput
    connect?: TrackWhereUniqueInput
    update?: XOR<XOR<TrackUpdateToOneWithWhereWithoutPlaylistsInput, TrackUpdateWithoutPlaylistsInput>, TrackUncheckedUpdateWithoutPlaylistsInput>
  }

  export type UserCreateNestedOneWithoutFavoriteTracksInput = {
    create?: XOR<UserCreateWithoutFavoriteTracksInput, UserUncheckedCreateWithoutFavoriteTracksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteTracksInput
    connect?: UserWhereUniqueInput
  }

  export type TrackCreateNestedOneWithoutFavoritedByInput = {
    create?: XOR<TrackCreateWithoutFavoritedByInput, TrackUncheckedCreateWithoutFavoritedByInput>
    connectOrCreate?: TrackCreateOrConnectWithoutFavoritedByInput
    connect?: TrackWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoriteTracksNestedInput = {
    create?: XOR<UserCreateWithoutFavoriteTracksInput, UserUncheckedCreateWithoutFavoriteTracksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteTracksInput
    upsert?: UserUpsertWithoutFavoriteTracksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoriteTracksInput, UserUpdateWithoutFavoriteTracksInput>, UserUncheckedUpdateWithoutFavoriteTracksInput>
  }

  export type TrackUpdateOneRequiredWithoutFavoritedByNestedInput = {
    create?: XOR<TrackCreateWithoutFavoritedByInput, TrackUncheckedCreateWithoutFavoritedByInput>
    connectOrCreate?: TrackCreateOrConnectWithoutFavoritedByInput
    upsert?: TrackUpsertWithoutFavoritedByInput
    connect?: TrackWhereUniqueInput
    update?: XOR<XOR<TrackUpdateToOneWithWhereWithoutFavoritedByInput, TrackUpdateWithoutFavoritedByInput>, TrackUncheckedUpdateWithoutFavoritedByInput>
  }

  export type UserCreateNestedOneWithoutFavoritePlaylistsInput = {
    create?: XOR<UserCreateWithoutFavoritePlaylistsInput, UserUncheckedCreateWithoutFavoritePlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritePlaylistsInput
    connect?: UserWhereUniqueInput
  }

  export type PlaylistCreateNestedOneWithoutFavoritedByInput = {
    create?: XOR<PlaylistCreateWithoutFavoritedByInput, PlaylistUncheckedCreateWithoutFavoritedByInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutFavoritedByInput
    connect?: PlaylistWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritePlaylistsNestedInput = {
    create?: XOR<UserCreateWithoutFavoritePlaylistsInput, UserUncheckedCreateWithoutFavoritePlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritePlaylistsInput
    upsert?: UserUpsertWithoutFavoritePlaylistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritePlaylistsInput, UserUpdateWithoutFavoritePlaylistsInput>, UserUncheckedUpdateWithoutFavoritePlaylistsInput>
  }

  export type PlaylistUpdateOneRequiredWithoutFavoritedByNestedInput = {
    create?: XOR<PlaylistCreateWithoutFavoritedByInput, PlaylistUncheckedCreateWithoutFavoritedByInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutFavoritedByInput
    upsert?: PlaylistUpsertWithoutFavoritedByInput
    connect?: PlaylistWhereUniqueInput
    update?: XOR<XOR<PlaylistUpdateToOneWithWhereWithoutFavoritedByInput, PlaylistUpdateWithoutFavoritedByInput>, PlaylistUncheckedUpdateWithoutFavoritedByInput>
  }

  export type UserCreateNestedOneWithoutFavoriteArtistsInput = {
    create?: XOR<UserCreateWithoutFavoriteArtistsInput, UserUncheckedCreateWithoutFavoriteArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteArtistsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoriteArtistsNestedInput = {
    create?: XOR<UserCreateWithoutFavoriteArtistsInput, UserUncheckedCreateWithoutFavoriteArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoriteArtistsInput
    upsert?: UserUpsertWithoutFavoriteArtistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoriteArtistsInput, UserUpdateWithoutFavoriteArtistsInput>, UserUncheckedUpdateWithoutFavoriteArtistsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumPlaylistCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaylistCategory | EnumPlaylistCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaylistCategory[]
    notIn?: $Enums.PlaylistCategory[]
    not?: NestedEnumPlaylistCategoryFilter<$PrismaModel> | $Enums.PlaylistCategory
  }

  export type NestedEnumPlaylistCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaylistCategory | EnumPlaylistCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaylistCategory[]
    notIn?: $Enums.PlaylistCategory[]
    not?: NestedEnumPlaylistCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlaylistCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlaylistCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlaylistCategoryFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlaylistCreateWithoutAuthorInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: PlaylistTrackCreateNestedManyWithoutPlaylistInput
    favoritedBy?: FavoritePlaylistCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: PlaylistTrackUncheckedCreateNestedManyWithoutPlaylistInput
    favoritedBy?: FavoritePlaylistUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistCreateOrConnectWithoutAuthorInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput>
  }

  export type PlaylistCreateManyAuthorInputEnvelope = {
    data: PlaylistCreateManyAuthorInput | PlaylistCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteTrackCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    track: TrackCreateNestedOneWithoutFavoritedByInput
  }

  export type FavoriteTrackUncheckedCreateWithoutUserInput = {
    id?: string
    trackId: string
    createdAt?: Date | string
  }

  export type FavoriteTrackCreateOrConnectWithoutUserInput = {
    where: FavoriteTrackWhereUniqueInput
    create: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput>
  }

  export type FavoriteTrackCreateManyUserInputEnvelope = {
    data: FavoriteTrackCreateManyUserInput | FavoriteTrackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoritePlaylistCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    playlist: PlaylistCreateNestedOneWithoutFavoritedByInput
  }

  export type FavoritePlaylistUncheckedCreateWithoutUserInput = {
    id?: string
    playlistId: string
    createdAt?: Date | string
  }

  export type FavoritePlaylistCreateOrConnectWithoutUserInput = {
    where: FavoritePlaylistWhereUniqueInput
    create: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput>
  }

  export type FavoritePlaylistCreateManyUserInputEnvelope = {
    data: FavoritePlaylistCreateManyUserInput | FavoritePlaylistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteArtistCreateWithoutUserInput = {
    id?: string
    artistName: string
    createdAt?: Date | string
  }

  export type FavoriteArtistUncheckedCreateWithoutUserInput = {
    id?: string
    artistName: string
    createdAt?: Date | string
  }

  export type FavoriteArtistCreateOrConnectWithoutUserInput = {
    where: FavoriteArtistWhereUniqueInput
    create: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput>
  }

  export type FavoriteArtistCreateManyUserInputEnvelope = {
    data: FavoriteArtistCreateManyUserInput | FavoriteArtistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type PlaylistUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PlaylistWhereUniqueInput
    update: XOR<PlaylistUpdateWithoutAuthorInput, PlaylistUncheckedUpdateWithoutAuthorInput>
    create: XOR<PlaylistCreateWithoutAuthorInput, PlaylistUncheckedCreateWithoutAuthorInput>
  }

  export type PlaylistUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PlaylistWhereUniqueInput
    data: XOR<PlaylistUpdateWithoutAuthorInput, PlaylistUncheckedUpdateWithoutAuthorInput>
  }

  export type PlaylistUpdateManyWithWhereWithoutAuthorInput = {
    where: PlaylistScalarWhereInput
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PlaylistScalarWhereInput = {
    AND?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    OR?: PlaylistScalarWhereInput[]
    NOT?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    id?: StringFilter<"Playlist"> | string
    title?: StringFilter<"Playlist"> | string
    cover?: StringNullableFilter<"Playlist"> | string | null
    type?: StringFilter<"Playlist"> | string
    category?: EnumPlaylistCategoryFilter<"Playlist"> | $Enums.PlaylistCategory
    isPublic?: BoolFilter<"Playlist"> | boolean
    colors?: JsonNullableFilter<"Playlist">
    authorId?: StringNullableFilter<"Playlist"> | string | null
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    updatedAt?: DateTimeFilter<"Playlist"> | Date | string
  }

  export type FavoriteTrackUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteTrackWhereUniqueInput
    update: XOR<FavoriteTrackUpdateWithoutUserInput, FavoriteTrackUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteTrackCreateWithoutUserInput, FavoriteTrackUncheckedCreateWithoutUserInput>
  }

  export type FavoriteTrackUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteTrackWhereUniqueInput
    data: XOR<FavoriteTrackUpdateWithoutUserInput, FavoriteTrackUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteTrackUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteTrackScalarWhereInput
    data: XOR<FavoriteTrackUpdateManyMutationInput, FavoriteTrackUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteTrackScalarWhereInput = {
    AND?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
    OR?: FavoriteTrackScalarWhereInput[]
    NOT?: FavoriteTrackScalarWhereInput | FavoriteTrackScalarWhereInput[]
    id?: StringFilter<"FavoriteTrack"> | string
    userId?: StringFilter<"FavoriteTrack"> | string
    trackId?: StringFilter<"FavoriteTrack"> | string
    createdAt?: DateTimeFilter<"FavoriteTrack"> | Date | string
  }

  export type FavoritePlaylistUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoritePlaylistWhereUniqueInput
    update: XOR<FavoritePlaylistUpdateWithoutUserInput, FavoritePlaylistUncheckedUpdateWithoutUserInput>
    create: XOR<FavoritePlaylistCreateWithoutUserInput, FavoritePlaylistUncheckedCreateWithoutUserInput>
  }

  export type FavoritePlaylistUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoritePlaylistWhereUniqueInput
    data: XOR<FavoritePlaylistUpdateWithoutUserInput, FavoritePlaylistUncheckedUpdateWithoutUserInput>
  }

  export type FavoritePlaylistUpdateManyWithWhereWithoutUserInput = {
    where: FavoritePlaylistScalarWhereInput
    data: XOR<FavoritePlaylistUpdateManyMutationInput, FavoritePlaylistUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoritePlaylistScalarWhereInput = {
    AND?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
    OR?: FavoritePlaylistScalarWhereInput[]
    NOT?: FavoritePlaylistScalarWhereInput | FavoritePlaylistScalarWhereInput[]
    id?: StringFilter<"FavoritePlaylist"> | string
    userId?: StringFilter<"FavoritePlaylist"> | string
    playlistId?: StringFilter<"FavoritePlaylist"> | string
    createdAt?: DateTimeFilter<"FavoritePlaylist"> | Date | string
  }

  export type FavoriteArtistUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteArtistWhereUniqueInput
    update: XOR<FavoriteArtistUpdateWithoutUserInput, FavoriteArtistUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteArtistCreateWithoutUserInput, FavoriteArtistUncheckedCreateWithoutUserInput>
  }

  export type FavoriteArtistUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteArtistWhereUniqueInput
    data: XOR<FavoriteArtistUpdateWithoutUserInput, FavoriteArtistUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteArtistUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteArtistScalarWhereInput
    data: XOR<FavoriteArtistUpdateManyMutationInput, FavoriteArtistUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteArtistScalarWhereInput = {
    AND?: FavoriteArtistScalarWhereInput | FavoriteArtistScalarWhereInput[]
    OR?: FavoriteArtistScalarWhereInput[]
    NOT?: FavoriteArtistScalarWhereInput | FavoriteArtistScalarWhereInput[]
    id?: StringFilter<"FavoriteArtist"> | string
    userId?: StringFilter<"FavoriteArtist"> | string
    artistName?: StringFilter<"FavoriteArtist"> | string
    createdAt?: DateTimeFilter<"FavoriteArtist"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlaylistTrackCreateWithoutTrackInput = {
    id?: string
    order?: number
    playlist: PlaylistCreateNestedOneWithoutTracksInput
  }

  export type PlaylistTrackUncheckedCreateWithoutTrackInput = {
    id?: string
    playlistId: string
    order?: number
  }

  export type PlaylistTrackCreateOrConnectWithoutTrackInput = {
    where: PlaylistTrackWhereUniqueInput
    create: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput>
  }

  export type PlaylistTrackCreateManyTrackInputEnvelope = {
    data: PlaylistTrackCreateManyTrackInput | PlaylistTrackCreateManyTrackInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteTrackCreateWithoutTrackInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoriteTracksInput
  }

  export type FavoriteTrackUncheckedCreateWithoutTrackInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type FavoriteTrackCreateOrConnectWithoutTrackInput = {
    where: FavoriteTrackWhereUniqueInput
    create: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput>
  }

  export type FavoriteTrackCreateManyTrackInputEnvelope = {
    data: FavoriteTrackCreateManyTrackInput | FavoriteTrackCreateManyTrackInput[]
    skipDuplicates?: boolean
  }

  export type PlaylistTrackUpsertWithWhereUniqueWithoutTrackInput = {
    where: PlaylistTrackWhereUniqueInput
    update: XOR<PlaylistTrackUpdateWithoutTrackInput, PlaylistTrackUncheckedUpdateWithoutTrackInput>
    create: XOR<PlaylistTrackCreateWithoutTrackInput, PlaylistTrackUncheckedCreateWithoutTrackInput>
  }

  export type PlaylistTrackUpdateWithWhereUniqueWithoutTrackInput = {
    where: PlaylistTrackWhereUniqueInput
    data: XOR<PlaylistTrackUpdateWithoutTrackInput, PlaylistTrackUncheckedUpdateWithoutTrackInput>
  }

  export type PlaylistTrackUpdateManyWithWhereWithoutTrackInput = {
    where: PlaylistTrackScalarWhereInput
    data: XOR<PlaylistTrackUpdateManyMutationInput, PlaylistTrackUncheckedUpdateManyWithoutTrackInput>
  }

  export type PlaylistTrackScalarWhereInput = {
    AND?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
    OR?: PlaylistTrackScalarWhereInput[]
    NOT?: PlaylistTrackScalarWhereInput | PlaylistTrackScalarWhereInput[]
    id?: StringFilter<"PlaylistTrack"> | string
    playlistId?: StringFilter<"PlaylistTrack"> | string
    trackId?: StringFilter<"PlaylistTrack"> | string
    order?: IntFilter<"PlaylistTrack"> | number
  }

  export type FavoriteTrackUpsertWithWhereUniqueWithoutTrackInput = {
    where: FavoriteTrackWhereUniqueInput
    update: XOR<FavoriteTrackUpdateWithoutTrackInput, FavoriteTrackUncheckedUpdateWithoutTrackInput>
    create: XOR<FavoriteTrackCreateWithoutTrackInput, FavoriteTrackUncheckedCreateWithoutTrackInput>
  }

  export type FavoriteTrackUpdateWithWhereUniqueWithoutTrackInput = {
    where: FavoriteTrackWhereUniqueInput
    data: XOR<FavoriteTrackUpdateWithoutTrackInput, FavoriteTrackUncheckedUpdateWithoutTrackInput>
  }

  export type FavoriteTrackUpdateManyWithWhereWithoutTrackInput = {
    where: FavoriteTrackScalarWhereInput
    data: XOR<FavoriteTrackUpdateManyMutationInput, FavoriteTrackUncheckedUpdateManyWithoutTrackInput>
  }

  export type UserCreateWithoutPlaylistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlaylistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlaylistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
  }

  export type PlaylistTrackCreateWithoutPlaylistInput = {
    id?: string
    order?: number
    track: TrackCreateNestedOneWithoutPlaylistsInput
  }

  export type PlaylistTrackUncheckedCreateWithoutPlaylistInput = {
    id?: string
    trackId: string
    order?: number
  }

  export type PlaylistTrackCreateOrConnectWithoutPlaylistInput = {
    where: PlaylistTrackWhereUniqueInput
    create: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput>
  }

  export type PlaylistTrackCreateManyPlaylistInputEnvelope = {
    data: PlaylistTrackCreateManyPlaylistInput | PlaylistTrackCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type FavoritePlaylistCreateWithoutPlaylistInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritePlaylistsInput
  }

  export type FavoritePlaylistUncheckedCreateWithoutPlaylistInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type FavoritePlaylistCreateOrConnectWithoutPlaylistInput = {
    where: FavoritePlaylistWhereUniqueInput
    create: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput>
  }

  export type FavoritePlaylistCreateManyPlaylistInputEnvelope = {
    data: FavoritePlaylistCreateManyPlaylistInput | FavoritePlaylistCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPlaylistsInput = {
    update: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlaylistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type UserUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlaylistTrackUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: PlaylistTrackWhereUniqueInput
    update: XOR<PlaylistTrackUpdateWithoutPlaylistInput, PlaylistTrackUncheckedUpdateWithoutPlaylistInput>
    create: XOR<PlaylistTrackCreateWithoutPlaylistInput, PlaylistTrackUncheckedCreateWithoutPlaylistInput>
  }

  export type PlaylistTrackUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: PlaylistTrackWhereUniqueInput
    data: XOR<PlaylistTrackUpdateWithoutPlaylistInput, PlaylistTrackUncheckedUpdateWithoutPlaylistInput>
  }

  export type PlaylistTrackUpdateManyWithWhereWithoutPlaylistInput = {
    where: PlaylistTrackScalarWhereInput
    data: XOR<PlaylistTrackUpdateManyMutationInput, PlaylistTrackUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type FavoritePlaylistUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: FavoritePlaylistWhereUniqueInput
    update: XOR<FavoritePlaylistUpdateWithoutPlaylistInput, FavoritePlaylistUncheckedUpdateWithoutPlaylistInput>
    create: XOR<FavoritePlaylistCreateWithoutPlaylistInput, FavoritePlaylistUncheckedCreateWithoutPlaylistInput>
  }

  export type FavoritePlaylistUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: FavoritePlaylistWhereUniqueInput
    data: XOR<FavoritePlaylistUpdateWithoutPlaylistInput, FavoritePlaylistUncheckedUpdateWithoutPlaylistInput>
  }

  export type FavoritePlaylistUpdateManyWithWhereWithoutPlaylistInput = {
    where: FavoritePlaylistScalarWhereInput
    data: XOR<FavoritePlaylistUpdateManyMutationInput, FavoritePlaylistUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type PlaylistCreateWithoutTracksInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: UserCreateNestedOneWithoutPlaylistsInput
    favoritedBy?: FavoritePlaylistCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateWithoutTracksInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    favoritedBy?: FavoritePlaylistUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistCreateOrConnectWithoutTracksInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
  }

  export type TrackCreateWithoutPlaylistsInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    favoritedBy?: FavoriteTrackCreateNestedManyWithoutTrackInput
  }

  export type TrackUncheckedCreateWithoutPlaylistsInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    favoritedBy?: FavoriteTrackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type TrackCreateOrConnectWithoutPlaylistsInput = {
    where: TrackWhereUniqueInput
    create: XOR<TrackCreateWithoutPlaylistsInput, TrackUncheckedCreateWithoutPlaylistsInput>
  }

  export type PlaylistUpsertWithoutTracksInput = {
    update: XOR<PlaylistUpdateWithoutTracksInput, PlaylistUncheckedUpdateWithoutTracksInput>
    create: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    where?: PlaylistWhereInput
  }

  export type PlaylistUpdateToOneWithWhereWithoutTracksInput = {
    where?: PlaylistWhereInput
    data: XOR<PlaylistUpdateWithoutTracksInput, PlaylistUncheckedUpdateWithoutTracksInput>
  }

  export type PlaylistUpdateWithoutTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneWithoutPlaylistsNestedInput
    favoritedBy?: FavoritePlaylistUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favoritedBy?: FavoritePlaylistUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type TrackUpsertWithoutPlaylistsInput = {
    update: XOR<TrackUpdateWithoutPlaylistsInput, TrackUncheckedUpdateWithoutPlaylistsInput>
    create: XOR<TrackCreateWithoutPlaylistsInput, TrackUncheckedCreateWithoutPlaylistsInput>
    where?: TrackWhereInput
  }

  export type TrackUpdateToOneWithWhereWithoutPlaylistsInput = {
    where?: TrackWhereInput
    data: XOR<TrackUpdateWithoutPlaylistsInput, TrackUncheckedUpdateWithoutPlaylistsInput>
  }

  export type TrackUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favoritedBy?: FavoriteTrackUpdateManyWithoutTrackNestedInput
  }

  export type TrackUncheckedUpdateWithoutPlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favoritedBy?: FavoriteTrackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type UserCreateWithoutFavoriteTracksInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoriteTracksInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoriteTracksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoriteTracksInput, UserUncheckedCreateWithoutFavoriteTracksInput>
  }

  export type TrackCreateWithoutFavoritedByInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistTrackCreateNestedManyWithoutTrackInput
  }

  export type TrackUncheckedCreateWithoutFavoritedByInput = {
    id?: string
    title: string
    artist: string
    src: string
    fullSrc?: string | null
    cover: string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistTrackUncheckedCreateNestedManyWithoutTrackInput
  }

  export type TrackCreateOrConnectWithoutFavoritedByInput = {
    where: TrackWhereUniqueInput
    create: XOR<TrackCreateWithoutFavoritedByInput, TrackUncheckedCreateWithoutFavoritedByInput>
  }

  export type UserUpsertWithoutFavoriteTracksInput = {
    update: XOR<UserUpdateWithoutFavoriteTracksInput, UserUncheckedUpdateWithoutFavoriteTracksInput>
    create: XOR<UserCreateWithoutFavoriteTracksInput, UserUncheckedCreateWithoutFavoriteTracksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoriteTracksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoriteTracksInput, UserUncheckedUpdateWithoutFavoriteTracksInput>
  }

  export type UserUpdateWithoutFavoriteTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoriteTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrackUpsertWithoutFavoritedByInput = {
    update: XOR<TrackUpdateWithoutFavoritedByInput, TrackUncheckedUpdateWithoutFavoritedByInput>
    create: XOR<TrackCreateWithoutFavoritedByInput, TrackUncheckedCreateWithoutFavoritedByInput>
    where?: TrackWhereInput
  }

  export type TrackUpdateToOneWithWhereWithoutFavoritedByInput = {
    where?: TrackWhereInput
    data: XOR<TrackUpdateWithoutFavoritedByInput, TrackUncheckedUpdateWithoutFavoritedByInput>
  }

  export type TrackUpdateWithoutFavoritedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistTrackUpdateManyWithoutTrackNestedInput
  }

  export type TrackUncheckedUpdateWithoutFavoritedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    src?: StringFieldUpdateOperationsInput | string
    fullSrc?: NullableStringFieldUpdateOperationsInput | string | null
    cover?: StringFieldUpdateOperationsInput | string
    colors?: NullableJsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistTrackUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type UserCreateWithoutFavoritePlaylistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritePlaylistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoriteArtists?: FavoriteArtistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritePlaylistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritePlaylistsInput, UserUncheckedCreateWithoutFavoritePlaylistsInput>
  }

  export type PlaylistCreateWithoutFavoritedByInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author?: UserCreateNestedOneWithoutPlaylistsInput
    tracks?: PlaylistTrackCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateWithoutFavoritedByInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: PlaylistTrackUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistCreateOrConnectWithoutFavoritedByInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutFavoritedByInput, PlaylistUncheckedCreateWithoutFavoritedByInput>
  }

  export type UserUpsertWithoutFavoritePlaylistsInput = {
    update: XOR<UserUpdateWithoutFavoritePlaylistsInput, UserUncheckedUpdateWithoutFavoritePlaylistsInput>
    create: XOR<UserCreateWithoutFavoritePlaylistsInput, UserUncheckedCreateWithoutFavoritePlaylistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritePlaylistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritePlaylistsInput, UserUncheckedUpdateWithoutFavoritePlaylistsInput>
  }

  export type UserUpdateWithoutFavoritePlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritePlaylistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoriteArtists?: FavoriteArtistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlaylistUpsertWithoutFavoritedByInput = {
    update: XOR<PlaylistUpdateWithoutFavoritedByInput, PlaylistUncheckedUpdateWithoutFavoritedByInput>
    create: XOR<PlaylistCreateWithoutFavoritedByInput, PlaylistUncheckedCreateWithoutFavoritedByInput>
    where?: PlaylistWhereInput
  }

  export type PlaylistUpdateToOneWithWhereWithoutFavoritedByInput = {
    where?: PlaylistWhereInput
    data: XOR<PlaylistUpdateWithoutFavoritedByInput, PlaylistUncheckedUpdateWithoutFavoritedByInput>
  }

  export type PlaylistUpdateWithoutFavoritedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneWithoutPlaylistsNestedInput
    tracks?: PlaylistTrackUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutFavoritedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: PlaylistTrackUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type UserCreateWithoutFavoriteArtistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    playlists?: PlaylistCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoriteArtistsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    emailVerified?: boolean
    role?: string
    canMakePlaylistsPublic?: boolean
    isReadOnly?: boolean
    banned?: boolean
    loginCount?: number
    lastLoginAt?: Date | string | null
    lastPlayedTrackId?: string | null
    lastPlayedPlaylistId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    playlists?: PlaylistUncheckedCreateNestedManyWithoutAuthorInput
    favoriteTracks?: FavoriteTrackUncheckedCreateNestedManyWithoutUserInput
    favoritePlaylists?: FavoritePlaylistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoriteArtistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoriteArtistsInput, UserUncheckedCreateWithoutFavoriteArtistsInput>
  }

  export type UserUpsertWithoutFavoriteArtistsInput = {
    update: XOR<UserUpdateWithoutFavoriteArtistsInput, UserUncheckedUpdateWithoutFavoriteArtistsInput>
    create: XOR<UserCreateWithoutFavoriteArtistsInput, UserUncheckedCreateWithoutFavoriteArtistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoriteArtistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoriteArtistsInput, UserUncheckedUpdateWithoutFavoriteArtistsInput>
  }

  export type UserUpdateWithoutFavoriteArtistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoriteArtistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    canMakePlaylistsPublic?: BoolFieldUpdateOperationsInput | boolean
    isReadOnly?: BoolFieldUpdateOperationsInput | boolean
    banned?: BoolFieldUpdateOperationsInput | boolean
    loginCount?: IntFieldUpdateOperationsInput | number
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPlayedPlaylistId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    playlists?: PlaylistUncheckedUpdateManyWithoutAuthorNestedInput
    favoriteTracks?: FavoriteTrackUncheckedUpdateManyWithoutUserNestedInput
    favoritePlaylists?: FavoritePlaylistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlaylistCreateManyAuthorInput = {
    id?: string
    title: string
    cover?: string | null
    type?: string
    category?: $Enums.PlaylistCategory
    isPublic?: boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FavoriteTrackCreateManyUserInput = {
    id?: string
    trackId: string
    createdAt?: Date | string
  }

  export type FavoritePlaylistCreateManyUserInput = {
    id?: string
    playlistId: string
    createdAt?: Date | string
  }

  export type FavoriteArtistCreateManyUserInput = {
    id?: string
    artistName: string
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: PlaylistTrackUpdateManyWithoutPlaylistNestedInput
    favoritedBy?: FavoritePlaylistUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: PlaylistTrackUncheckedUpdateManyWithoutPlaylistNestedInput
    favoritedBy?: FavoritePlaylistUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaylistCategoryFieldUpdateOperationsInput | $Enums.PlaylistCategory
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    colors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteTrackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    track?: TrackUpdateOneRequiredWithoutFavoritedByNestedInput
  }

  export type FavoriteTrackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteTrackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlist?: PlaylistUpdateOneRequiredWithoutFavoritedByNestedInput
  }

  export type FavoritePlaylistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteArtistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistTrackCreateManyTrackInput = {
    id?: string
    playlistId: string
    order?: number
  }

  export type FavoriteTrackCreateManyTrackInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type PlaylistTrackUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    playlist?: PlaylistUpdateOneRequiredWithoutTracksNestedInput
  }

  export type PlaylistTrackUncheckedUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistTrackUncheckedUpdateManyWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    playlistId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type FavoriteTrackUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoriteTracksNestedInput
  }

  export type FavoriteTrackUncheckedUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteTrackUncheckedUpdateManyWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistTrackCreateManyPlaylistInput = {
    id?: string
    trackId: string
    order?: number
  }

  export type FavoritePlaylistCreateManyPlaylistInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type PlaylistTrackUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    track?: TrackUpdateOneRequiredWithoutPlaylistsNestedInput
  }

  export type PlaylistTrackUncheckedUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistTrackUncheckedUpdateManyWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type FavoritePlaylistUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritePlaylistsNestedInput
  }

  export type FavoritePlaylistUncheckedUpdateWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoritePlaylistUncheckedUpdateManyWithoutPlaylistInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
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