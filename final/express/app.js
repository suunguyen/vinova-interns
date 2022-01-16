"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connect_config_1 = __importDefault(require("./config/connect.config"));
const user_route_1 = __importDefault(require("./module/User/routes/user.route"));
const product_route_1 = __importDefault(require("./module/Product/routes/product.route"));
const cors_1 = __importDefault(require("cors"));
(0, connect_config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const route = (app) => {
    app.use('/api/auth', user_route_1.default);
    app.use('/api/product', product_route_1.default);
};
route(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map