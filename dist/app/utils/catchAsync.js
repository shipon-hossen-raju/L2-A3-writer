"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log("error => ", err);
        return next(err);
    });
};
exports.default = catchAsync;
