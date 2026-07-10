import { Knex } from "knex";

/*
Only available if List is not include other Object Data
Example usage:
    ```
    const query = db<User>("users");

    if (search) {
        query.whereILike("name", `%${search}%`);
    }

    const options = { page: 1, limit: 10, sortBy: "name", sortOrder: "asc" };
    const result = await paginate<User>(query, options);

    return result;
    ```
*/
interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  primaryKey?: string;
}

export async function paginate<T>(
  query: Knex.QueryBuilder,
  options: PaginationOptions,
) {
  const totalResult = await query
    .clone()
    .clearOrder() // Hilangkan ORDER BY untuk query COUNT
    .count<{ count: string }>(
      `${options.primaryKey ?? "id"} as count`
    )
    .first();

  const dataQuery = query.clone();

  if (options.sortBy) {
    dataQuery.orderBy(
      options.sortBy,
      options.sortOrder ?? "asc",
    );
  }

  const data = await dataQuery
    .offset((options.page - 1) * options.limit)
    .limit(options.limit);

  return {
    data: data as T[],
    total: Number(totalResult?.count ?? 0),
  };
}