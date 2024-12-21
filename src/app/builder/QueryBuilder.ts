import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown> = {};

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchQuery = this.query?.search as string; //

    if (searchQuery) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: searchQuery,
            $options: "i",
          },
        })),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeField = ["search", "sortBy", "sortOrder"];
    excludeField.forEach((el) => delete queryObj[el]);

    // filter by author
    if (this.query?.author) {
      queryObj.author = this.query?.author;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortBy = (this?.query?.sortBy as string) || "-createdAt";
    const sortOrder = (this?.query?.sortOrder as string) === "desc" ? "" : "-";
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(",").join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
