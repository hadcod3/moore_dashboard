// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}
export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    item: { _id: string, name: string}
    price: string
    buyer: { _id: string, firstName: string, lastName: string}
}
export type CreateOrderParams = {
    stripeId: string
    item: { _id: string, name: string}
    buyer: { _id: string, firstName: string, lastName: string}
    totalPrice: string
    amount: string
    createdAt: Date
}  
export type GetOrdersByPacketParams = {
    itemId: string
    searchString: string
} 
export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}
export type GetAllOrdersParams = {
    query: string
    limit: number
    page: number
}
  
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
} 
export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}  
export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// ==========================================================================

export type GetItemsByTypeIdParams = {
    typeId: string;
    query: string;
    category: string;
    limit: number;
    page: number;
}