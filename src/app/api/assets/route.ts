import { createCrudHandlers } from "@/lib/crud";
import { assetLibraryResource } from "@/lib/resources";

export const { GET, POST, PATCH, DELETE } = createCrudHandlers(assetLibraryResource);
