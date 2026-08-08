import { createCrudHandlers } from "@/lib/crud";
import { evidenceResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(evidenceResource);
