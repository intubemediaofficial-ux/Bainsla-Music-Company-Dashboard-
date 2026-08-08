import { createCrudHandlers } from "@/lib/crud";
import { studioSessionResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(studioSessionResource);
