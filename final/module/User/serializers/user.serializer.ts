interface IDB {
    _id: string,
    fullName: string,
    displayName: string,
    avatar: string,
    email: string,
    token: string,
    address: string,
}

interface IUser {
    userId: string,
    fullName: string,
    displayName?: string,
    avatar?: string,
    email: string,
    token?: string,
    address?: string,
}

export function serializeGetUser(model: IDB): IUser {
    return {
        userId: model._id,
        fullName: model.fullName,
        displayName: model.displayName === null ? model.fullName : model.displayName,
        email: model.email,
        avatar: model.avatar,
        token: model.token
    }
}

export function serializeGetUserInfo(model: IDB): IUser {
    return {
        userId: model._id,
        fullName: model.fullName,
        displayName: model.displayName,
        avatar: model.avatar,
        email: model.email
    }
}