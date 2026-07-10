export class PaginationQueryDto {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_LIMIT = 10;
  static readonly MAX_LIMIT = 100;

  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly search?: string,
  ) {}

  static from(query: Record<string, unknown>): PaginationQueryDto {
    const page = Math.max(
      1,
      Number(query.page) || PaginationQueryDto.DEFAULT_PAGE,
    );

    const limit = Math.min(
      PaginationQueryDto.MAX_LIMIT,
      Math.max(
        1,
        Number(query.limit) || PaginationQueryDto.DEFAULT_LIMIT,
      ),
    );

    const search =
      typeof query.search === "string" && query.search.trim() !== ""
        ? query.search.trim()
        : undefined;

    return new PaginationQueryDto(
      page,
      limit,
      search,
    );
  }
}