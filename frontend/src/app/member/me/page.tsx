import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { paths } from "@/lib/backend/apiV1/schema";

export default async function Page() {

  return <ClientPage />;
}