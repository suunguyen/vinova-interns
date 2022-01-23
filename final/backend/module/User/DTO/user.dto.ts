export interface LoginDTO {
    email: string,
    password: string,
}

export interface RegisterDTO {
    fullName: string,
    email: string,
    password: string
}

export interface UpdateDTO {
    fullName: string,
    displayName: string,
    oldPassword: string,
    password: string
}

export interface UpdateDeliveryDTO {
    fullName: string,
    phone: string,
    city: string,
    district: string,
    ward: string,
    apartmentNumber: string
}