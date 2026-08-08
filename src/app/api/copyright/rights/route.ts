import { createCrudHandlers } from "@/lib/crud";
import { copyrightRightResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(copyrightRightResource);
