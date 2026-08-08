import { createCrudHandlers } from "@/lib/crud";
import { incomeResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(incomeResource);
