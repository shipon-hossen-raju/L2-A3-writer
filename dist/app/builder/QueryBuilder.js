"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.query = {};
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchQuery = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search; //
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
        var _a, _b;
        const queryObj = Object.assign({}, this.query);
        const excludeField = ["search", "sortBy", "sortOrder"];
        excludeField.forEach((el) => delete queryObj[el]);
        // filter by author
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.author) {
            queryObj.author = (_b = this.query) === null || _b === void 0 ? void 0 : _b.author;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || "-createdAt";
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === "desc" ? "" : "-";
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
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ")) || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
