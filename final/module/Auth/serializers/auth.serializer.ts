interface IDB {
    _id: string,
    fullName: string,
    email: string,
    token: string
}

interface IUser {
    userId: string,
    fullName: string,
    email: string,
    token: string
}
export function serializeGetUser(model: IDB): IUser {
    return {
        userId: model._id,
        fullName: model.fullName,
        email: model.email,
        token: model.token
    }
}