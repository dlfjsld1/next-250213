"use client";

import { components } from "@/lib/backend/apiV1/schema";
import client from "@/lib/backend/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientLayout({
  me,
  children,
}: Readonly<{
  me: components["schemas"]["MemberDto"];
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLogined = me.id !== 0;

  return (
    <html lang="en">
      <body className="min-h-[100dvh] flex flex-col">
        <header className="flex gap-3">
          <Link href="/">메인</Link>
          <Link href="/about">소개</Link>
          <Link href="/post/list">글 목록</Link>
          {isLogined && <Link href="/post/write">글 작성</Link>}
          {!isLogined ? (
            <>
              <Link href="/member/login">로그인</Link>
              <Link href="/member/join">회원가입</Link>
            </>
          ) : (
            <Link
              href=""
              onClick={async (e) => {
                e.preventDefault();
                //로그아웃 요청
                const response = await client.DELETE("/api/v1/members/logout", {
                  credentials: "include",
                });
                if (response.error) {
                  alert(response.error.msg);
                  return;
                }
                // router.push("/post/list")
                window.location.href = "/post/list";
              }}
            >
              로그아웃
            </Link>
          )}
          {isLogined && <Link href="/member/me">내정보</Link>}
        </header>
        <div className="flex-grow">{children}</div>
        <footer>푸터</footer>
      </body>
    </html>
  );
}
