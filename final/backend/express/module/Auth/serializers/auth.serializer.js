"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGetUser = void 0;
function serializeGetUser(model) {
    return {
        userId: model._id,
        fullName: model.fullName,
        email: model.email,
        token: model.token
    };
}
exports.serializeGetUser = serializeGetUser;
//# sourceMappingURL=auth.serializer.js.map