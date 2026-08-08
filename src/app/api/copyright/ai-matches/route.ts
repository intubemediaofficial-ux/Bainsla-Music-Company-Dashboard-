import { createCrudHandlers } from "@/lib/crud";
import { aiMatchResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(aiMatchResource);
