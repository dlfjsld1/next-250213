"use client";

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClinetPage() {
  const router = useRouter();

  const write = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const title = form._title.value;
    const content = form.content.value;
    const published = form.published.checked;
    const listed = form.listed.checked;

    if (title.trim() === 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim() === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const response = await client.POST("/api/v1/posts", {
      body: {
        title,
        content,
        published,
        listed,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    const post = response.data.data;
    console.log(post);
    //보통 목록으로 이동하거나 작성글로 이동함 -> 리액트 방식의 페이지 이동으로
    router.push(`/post/${post.id}`);
  };
  return (
    <>
      <div>글 작성</div>
      <form onSubmit={write} className="flex flex-col w-1/4 gap-3">
        <div className="flex gap-3">
          <label>공개여부</label>
          <input type="checkbox" name="published"></input>
        </div>
        <div className="flex gap-3">
          <label>검색여부</label>
          <input type="checkbox" name="listed"></input>
        </div>
        <input
          className="border-2 border-black"
          type="text"
          name="_title"
          placeholder="제목 입력"
        />
        <textarea
          className="border-2 border-black"
          name="content"
          rows={10}
          placeholder="내용 입력"
        ></textarea>
        <input type="submit" value="등록" />
      </form>
    </>
  );
}
