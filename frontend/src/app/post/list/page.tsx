import { paths } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import createClient from "openapi-fetch";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
});

export default async function Page({
  searchParams,
}: {
  searchParams: {
    keywordType?: "title" | "content";
    keyword: string;
    pageSize: number;
    page: number;
  };
}) {
  const { 
    keywordType = "title", 
    keyword = "", 
    pageSize = 10, 
    page = 1 
  } = searchParams;

  const response = await client.GET("/api/v1/posts", {
    params: {
      query: {
        keyword,
        keywordType,
        pageSize,
        page,
      },
    },
  });

  const rsData = response.data!!; // 여기는 null이나 undefined가 절대 들어오지 않는다.
  const pageDto = rsData.data;

  return (
    <div>
      <h1>글 목록</h1>

      <div>응답 코드 : {rsData.code}</div>
      <div>결과 메시지 : {rsData.msg}</div>

      <div>totalPages : {pageDto.totalPages}</div>
      <div>totalItems : {pageDto.totalItems}</div>
      <div>currentPageNo : {pageDto.currentPageNo}</div>
      <div>pageSize : {pageDto.pageSize}</div>

      <hr />

      <form>
        <select name="keywordType" defaultValue={keywordType}>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          placeholder="검색어 입력"
          type="text"
          name="keyword"
          defaultValue={keyword}
        />
        <input type="submit" value="검색" />
        <label className="ml-5" htmlFor="">페이지당 행 개수</label>
        <select name="pageSize" defaultValue={pageSize}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </form>

      <div className="flex gap-2">
        {
            Array.from({length: pageDto.totalPages}, (_, i) => i + 1).map(
            (pageNo) => <Link 
            //현재 페이지면 빨간색 아니면 파란색
            className={pageNo === page ? "text-red-500" : "text-blue-500"}
            key={page}
            href={
              `/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${page}`
            }>{page}</Link>
        )}
      </div>
      <Link href="">1</Link>
      <Link href="">2</Link>
      <Link href="">3</Link>

      <ul>
        {pageDto.items.map((item) => {
          return (
            <li className="border-2 border-red-500 my-2 p-2" key={item.id}>
              <div>id : {item.id}</div>
              <div>title : {item.title}</div>
              <div>authorId : {item.authorId}</div>
              <div>authorName : {item.authorName}</div>
              <div>published : {`${item.published}`}</div>
              <div>listed : {`${item.listed}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
