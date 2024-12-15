import { authMiddleware, SignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
    publicRoutes: [], 
    ignoredRoutes: [],
    afterAuth(auth, req) {
        // If user is not signed in, redirect to the sign-in page
        if (!auth.userId) {
            SignIn
        }
    
        // Allow access to all other routes for signed-in users
        return NextResponse.next();
      },
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 