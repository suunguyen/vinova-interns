export interface CreateStudentDTO {
    name: string,
    dateOfBirth: Date,
    gender: boolean,
    created_at: Date,
}

export interface PutStudentDTO {
    name: string,
    dateOfBirth: Date,
    gender: boolean,
    updated_at: Date,
}