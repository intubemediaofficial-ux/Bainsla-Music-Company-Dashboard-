import { createCrudHandlers } from "@/lib/crud";
import { paymentResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(paymentResource);
