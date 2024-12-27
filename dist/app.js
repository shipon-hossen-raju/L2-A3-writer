"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// root route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// app routes
app.use("/api", routes_1.default);
// ------------------
// global Error Handle
app.use(globalErrorHandler_1.default);
exports.default = app;
