import { NextRequest, NextResponse } from "next/server";
import client from "./lib/backend/client";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const reqToken = request.cookies.get("accessToken");

    console.log(request.nextUrl.toString());
    if (request.nextUrl.pathname.startsWith("/post/edit/")) {
        return new NextResponse("로그인이 필요합니다.", {
            status: 401,
            headers: {
                "Content-Type": "text/html; charset=utf-8",

            },
        })
    }

    //넥스트js 서버에서 클라이언트로 가는 것
    const nextResponse = NextResponse.next();

    //서버에서 넥스트js로 가져온 것
    const response = await client.GET("/api/v1/members/me", {
        headers: {
          cookie: (await cookies()).toString(),
        },
      });

    //스프링 서버에서 가져온 쿠키를 nextjs 서버가 클라이언트로 보내주는 응답에 넣어준다
    const springCookie = response.response.headers.getSetCookie();
    nextResponse.headers.set("set-cookie", String(springCookie));
  
    return nextResponse;
  }
  
  export const config = {
    matcher: "/:path*",
  };