import { createCrudHandlers } from "@/lib/crud";
import { invoiceResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(invoiceResource);
