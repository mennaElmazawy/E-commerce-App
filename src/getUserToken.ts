import { jwtDecode } from "jwt-decode";
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers";

export async function getUserToken() {


    const TokenSession =
        process.env.NODE_ENV === "production"
            ? "_Secure-next-auth.session-token"
            : "next-auth.session-token";
    const cookiesData = await cookies()
    const encryptedToken = cookiesData.get(TokenSession)?.value
   
    const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! })

    return data?.token
}


export async function getUserIdFromToken() {
    const TokenSession =
        process.env.NODE_ENV === "production"
            ? "_Secure-next-auth.session-token"
            : "next-auth.session-token";
    const cookiesData = await cookies()
    const encryptedToken = cookiesData.get(TokenSession)?.value
    
    const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! })
    return data?.sub
}





