import { createCrudHandlers } from "@/lib/crud";
import { releaseResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(releaseResource);
