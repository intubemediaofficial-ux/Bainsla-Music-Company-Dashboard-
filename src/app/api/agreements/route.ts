import { createCrudHandlers } from "@/lib/crud";
import { agreementResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(agreementResource);
