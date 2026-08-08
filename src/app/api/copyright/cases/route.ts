import { createCrudHandlers } from "@/lib/crud";
import { copyrightCaseResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(copyrightCaseResource);
