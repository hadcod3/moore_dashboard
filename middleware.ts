// import { authMiddleware } from "@clerk/nextjs";
 
// export default authMiddleware({
//   publicRoutes: [
//     '/',
//     '/packets/:id',
//     '/api/webhook/clerk',
//     '/api/webhook/stripe',
//     '/api/uploadthing'
//   ],
//   ignoredRoutes: [
//     '/api/webhook/clerk',
//     '/api/webhook/stripe',
//     '/api/uploadthing'
//   ]
// });
import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  // You can perform any general middleware tasks here, such as logging, etc.
  
  // Continue to the next middleware or request handler
  return NextResponse.next();
} 

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 