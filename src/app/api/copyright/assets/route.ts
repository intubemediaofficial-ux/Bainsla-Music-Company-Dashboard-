import { createCrudHandlers } from "@/lib/crud";
import { copyrightAssetResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(copyrightAssetResource);
