import { createCrudHandlers } from "@/lib/crud";
import { dmcaResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(dmcaResource);
