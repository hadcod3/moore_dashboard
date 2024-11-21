// import ProductCollection from '@/components/shared/ProductCollection';
// import { getProductById, getRelatedProductsByCategory } from '@/lib/actions/product.actions';
// import { SearchParamProps } from '@/types'
// import Image from 'next/image';

// const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
//   const product = await getProductById(id);

//   const relatedProducts = await getRelatedProductsByCategory({
//     categoryId: product.category._id,
//     productId: product._id,
//     page: searchParams.page as string,
//   })

// //   return (
// //     <>
// //         <section className="flex justify-center py-5 bg-primary-100 bg-dotted-pattern bg-contain">
// //         <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
// //             <Image 
// //             src={product.imageUrl}
// //             alt="product thumbnail"
// //             width={1000}
// //             height={1000}
// //             className="h-full min-h-[300px] object-cover object-center"
// //             />

// //             <div className="flex w-full flex-col gap-8 p-5 md:p-10">
// //             <div className="flex flex-col gap-6">
// //                 <h2 className='h2-bold'>{product.title}</h2>
// //                 <h5 className='text-base text-slate-500'>Stock : {product.stock}</h5>
// //                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
// //                     <p className="text-4xl font-bold">
// //                         Rp {parseInt(product.price).toLocaleString()}
// //                     </p>
// //                 </div>
// //             </div>

// //             <div className="flex flex-col gap-2">
// //                 <p className="p-bold-20 text-grey-600">Description:</p>
// //                 <p className="p-medium-16 lg:p-regular-18">{product.description}</p>
// //                 <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{product.url}</p>
// //             </div>
// //             </div>
// //         </div>
// //         </section>
    
// //         {/* Packets with the same category */}
// //         <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
// //         <h2 className="h2-bold">Related Packets</h2>

// //         <ProductCollection 
// //             data={relatedProducts?.data}
// //             emptyTitle="No Packets Found"
// //             emptyStateSubtext="Come back later"
// //             collectionType="All_Products"
// //             limit={3}
// //             page={searchParams.page as string}
// //             totalPages={relatedProducts?.totalPages}
// //             />
// //         </section>
// //     </>
// //   )
  
//     return (
//         <div className='py-10 px-3'>
//             <section className="flex justify-center content-start">
//                 <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8">
//                     <div className='flex justify-center'>
//                         <Image 
//                         src={product.imageUrl}
//                         alt="product thumbnail"
//                         width={1000}
//                         height={1000}
//                         className="max-h-[400px] max-w-[400px] object-cover object-center rounded-3xl"
//                         />
//                     </div>
//                     <div className="flex w-full flex-col gap-3">
//                         <div className="flex flex-col gap-3">
//                             <div className='flex gap-2'>
//                                 <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
//                                     product
//                                 </p>
//                                 <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
//                                     {product.category.name}
//                                 </p>
//                             </div>
//                             <h2 className='font-medium text-[24px] text-secondary-300'>{product.title}</h2>
//                             <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//                                 <div className="flex gap-3">
//                                     <p className="text-[32px] font-bold text-secondary-400 font-aleo">Rp {parseInt(product.price).toLocaleString()}</p> 
//                                 </div>
//                             </div>
//                             <h5 className='text-base text-primary-300/70'>Stock : {product.stock}</h5>
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <p className="p-bold-20 text-secondary-400">Description:</p>
//                             <p className="p-medium-16 lg:p-regular-18 text-secondary-300">{product.description}</p>
//                         </div>
//                         {/* <VendorCard vendorAva={organizerProfile.photo} vendorName={organizerProfile.username}/> */}
//                     </div>
//                 </div>
//             </section>
            
//             {/* Packets with the same category */}
//             <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
//             <h2 className="h2-bold text-secondary-300">Related Products</h2>

//             <ProductCollection 
//                 data={relatedProducts?.data}
//                 emptyTitle="No Product Found"
//                 emptyStateSubtext="Come back later"
//                 collectionType="All_Products"
//                 limit={3}
//                 page={searchParams.page as string}
//                 totalPages={relatedProducts?.totalPages}
//                 />
//             </section>
//         </div>
//     )
// }

// export default ProductDetails