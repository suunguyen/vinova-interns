export interface productDto {
    name: string,
    salePrice: number,
    regularPrice: number,
    branch: string,
    description: string,
    selection: object,
    image: Array<string>
}

export interface categoryDto {
    title: string,
    image: string,
    productLst: Array<object>
}

export interface orderDto {
    userId: string,
    details: Array<object>,
    total_price: number,
    payment_status: boolean,
    delivery_fee: number
}