"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGetStudent = exports.serializeGetAllStudent = void 0;
function serializeGetAllStudent(model) {
    return {
        id: model._id,
        name: model.name,
        dateOfBirth: model.dateOfBirth,
        gender: model.gender,
    };
}
exports.serializeGetAllStudent = serializeGetAllStudent;
function serializeGetStudent(model) {
    return {
        id: model._id,
        name: model.name,
        dateOfBirth: model.dateOfBirth,
        gender: model.gender,
        created_at: model.created_at,
        updated_at: model.updated_at,
    };
}
exports.serializeGetStudent = serializeGetStudent;
//# sourceMappingURL=student.serializer.js.map