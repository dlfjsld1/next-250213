"use client";

export default function ClinetPage() {
  const write = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <>
      <div>글 작성</div>
      <form 
        onSubmit={write}
        className="flex flex-col w-1/4 gap-3">
        <input 
          className="border-2 border-black" 
          type="text" 
          name="title" 
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