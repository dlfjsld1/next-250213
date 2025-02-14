import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { paths } from "@/lib/backend/apiV1/schema";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
});
export default async function Page() {

  return <ClientPage />;
}