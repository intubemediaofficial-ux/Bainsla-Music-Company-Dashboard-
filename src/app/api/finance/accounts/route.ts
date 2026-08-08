import { createCrudHandlers } from "@/lib/crud";
import { accountResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(accountResource);
