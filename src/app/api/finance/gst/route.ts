import { createCrudHandlers } from "@/lib/crud";
import { gstResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(gstResource);
