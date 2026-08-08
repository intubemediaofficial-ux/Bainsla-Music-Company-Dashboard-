import { createCrudHandlers } from "@/lib/crud";
import { receiptResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(receiptResource);
