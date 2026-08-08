import { createCrudHandlers } from "@/lib/crud";
import { copyrightClaimResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(copyrightClaimResource);
