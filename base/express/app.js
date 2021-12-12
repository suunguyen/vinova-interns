"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connect_config_1 = __importDefault(require("./config/connect.config"));
const student_route_1 = __importDefault(require("./module/Student/routes/student.route"));
(0, connect_config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const route = (app) => {
    app.use('/api/student', student_route_1.default);
};
route(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map