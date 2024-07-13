// Expand the schema of how responses should look.
// zod validates data type
import { z } from "zod";

const PostSchema = z.object({
  PostText: z.string().describe("the main text of the post"),
  PostcontentType: z.enum(["text", "image"]).describe("the type of content"),
});

export const CustomSchema = z.object({
  tweet: z.array(PostSchema),
});

export type CustomSchemaType = z.infer<typeof CustomSchema>;
