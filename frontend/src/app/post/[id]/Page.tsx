import ClientPage from "./ClientPage";
import client from "@/lib/backend/client";
import { cookies } from "next/headers";

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
    headers: {
          cookie: (await cookies()).toString(),
        }
  });

  if (response.error) {
    return <div>{response.error.msg}</div>;
  };

  const rsData = response.data;

  const fetchMeResponse = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    }
  });

  if(fetchMeResponse.error) {
    alert(fetchMeResponse.error.msg);
    return;
  };

  const post = rsData.data;
  const me = fetchMeResponse.data.data;

  return <ClientPage post={post} me={me} />;
}