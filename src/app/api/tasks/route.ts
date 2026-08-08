import { createCrudHandlers } from "@/lib/crud";
import { taskResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(taskResource);
