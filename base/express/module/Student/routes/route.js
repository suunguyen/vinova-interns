"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_route_1 = __importDefault(require("./student.route"));
const route = (app) => {
    app.use('/api/student', student_route_1.default);
};
exports.default = route;
//# sourceMappingURL=route.js.map