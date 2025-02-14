import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { paths } from "@/lib/backend/apiV1/schema";


const client = createClient<paths>({
    baseUrl: "http://localhost:8080",
});

export default async function Page({
    //params는 주소에서 들어오는 매개변수 객체
    params
} : {
    params: {
        id: number;
    };
}) {
    const { id } = await params;

    const response = await client.GET("/api/v1/posts/{id}", {
        params: {
            path: {
                id,
            }
        }
    });

    const rsData = response.data!!; // 여기는 null이나 undefined가 절대 들어오지 않는다.
    const post = rsData.data;
    
    return <ClientPage post={post} />;
}