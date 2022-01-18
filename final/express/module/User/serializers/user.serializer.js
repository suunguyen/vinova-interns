"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGetUserInfo = exports.serializeGetUser = void 0;
function serializeGetUser(model) {
    return {
        userId: model._id,
        fullName: model.fullName,
        displayName: model.displayName === null ? model.fullName : model.displayName,
        email: model.email,
        avatar: model.avatar,
        token: model.token
    };
}
exports.serializeGetUser = serializeGetUser;
function serializeGetUserInfo(model) {
    return {
        userId: model._id,
        fullName: model.fullName,
        displayName: model.displayName,
        avatar: model.avatar,
        email: model.email
    };
}
exports.serializeGetUserInfo = serializeGetUserInfo;
//# sourceMappingURL=user.serializer.js.map