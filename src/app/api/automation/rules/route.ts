import { createCrudHandlers } from "@/lib/crud";
import { automationRuleResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(automationRuleResource);
