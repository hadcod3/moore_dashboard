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
  
// ====== CATEGORY PARAMS
export type CreatePacketCategoryParams = {
    packetCategoryName: string
}
export type CreateProductCategoryParams = {
    productCategoryName: string
}
export type CreateGearCategoryParams = {
    gearCategoryName: string
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

// ====== PACKET PARAMS
export type CreatePacketParams = {
    packet: {
      title: string
      description: string
      imageUrl: string
      price: string
      categoryId: string
    }
    path: string
}
export type UpdatePacketParams = {
    packet: {
      _id: string
      title: string
      imageUrl: string
      description: string
      categoryId: string
      price: string
    }
    path: string
}
export type DeletePacketParams = {
    packetId: string
    path: string
}
export type GetAllPacketsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetRelatedPacketsByCategoryParams = {
    categoryId: string
    packetId: string
    limit?: number
    page: number | string
}
export type Packet = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    category: {
      _id: string
      name: string
    }
}

// ====== PRODUCT PARAMS
export type CreateProductsParams = {
    product: {
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
        categoryId: string
    }
    path: string
}
export type UpdateProductsParams = {
    product: {
        _id: string
        title: string
        imageUrl: string
        description: string
        categoryId: string
        price: string
        stock: string
    }
    path: string
}
export type DeleteProductParams = {
    productId: string
    path: string
}
export type GetAllProductsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type GetRelatedProductsByCategoryParams = {
    categoryId: string
    productId: string
    limit?: number
    page: number | string
}
export type Product = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    stock: string
    category: {
      _id: string
      name: string
    }
}

// ====== GEAR PARAMS
export type CreateGearsParams = {
    gear: {
        title: string
        description: string
        imageUrl: string
        price: string
        stock: string
        categoryId: string
    }
    path: string
}
export type UpdateGearsParams = {
    gear: {
        _id: string
        title: string
        imageUrl: string
        description: string
        categoryId: string
        price: string
        stock: string
    }
    path: string
}
export type DeleteGearParams = {
    gearId: string
    path: string
}
export type GetAllGearsParams = {
    query: string
    category: string
    limit: number
    page: number
}
export type Gear = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    stock: string
    category: {
      _id: string
      name: string
    }
}