import { createCrudHandlers } from "@/lib/crud";
import { expenseResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(expenseResource);
