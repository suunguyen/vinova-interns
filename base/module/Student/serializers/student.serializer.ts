interface IGetAllStudent {
    id: string,
    name: string,
    dateOfBirth: Date,
    gender: boolean
}

interface IGetStudent {
    id: string,
    name: string,
    dateOfBirth: Date,
    gender: boolean,
    created_at: Date,
    updated_at: Date
}

export function serializeGetAllStudent(model: any): IGetAllStudent {
    return {
        id: model._id,
        name: model.name,
        dateOfBirth: model.dateOfBirth,
        gender: model.gender,
    }
}

export function serializeGetStudent(model: any): IGetStudent {
    return {
        id: model._id,
        name: model.name,
        dateOfBirth: model.dateOfBirth,
        gender: model.gender,
        created_at: model.created_at,
        updated_at: model.updated_at,
    }
}