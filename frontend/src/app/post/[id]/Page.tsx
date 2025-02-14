import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { paths } from "@/lib/backend/apiV1/schema";
import client from "@/lib/backend/client";

export default async function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = await params;
  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
    credentials: "include",
  });

  if (response.error) {
    return <div>{response.error.msg}</div>;
  }

  const rsData = response.data;
  const post = rsData.data;

  return <ClientPage post={post} />;
}