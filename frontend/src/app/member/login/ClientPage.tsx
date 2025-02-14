"use client";

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {

  const router = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value
    
    const response = await client.POST("/api/v1/members/login", {
      body: {
        username,
        password,
      },
      //이 옵션을 넣어야 서버에서 받은 쿠키를 자동으로 저장해준다
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    router.push(`/post/list`);
  }
  
  return (
    <>
      <div>로그인 페이지</div>
      <form 
        onSubmit={login}
        className="flex flex-col w-1/4 gap-3">
        <input 
          className="border-2 border-black" 
          type="text" 
          name="username" 
          placeholder="아이디 입력" 
        />
        <input 
          className="border-2 border-black" 
          type="password" 
          name="password" 
          placeholder="패스워드 입력" 
        />
        <input type="submit" value="로그인" />
      </form>
    </>
  );
}
