import { createCrudHandlers } from "@/lib/crud";
import { videoShootResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(videoShootResource);
