export class PaginationResponseDto<T> {
  constructor(
    public data: T[],
    public page: number,
    public limit: number,
    public total: number,
    public totalPages: number,
  ) {}

  static from<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
  ) {
    return new PaginationResponseDto(
      data,
      page,
      limit,
      total,
      Math.ceil(total / limit),
    );
  }
}