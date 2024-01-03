import { z } from "zod";
import { PrismaMandatoryFields } from "@/types/prisma";
import { AISegmentation } from "@prisma/client";

export const segmentationCommentsSchema = z.object({
  positiveComments: z.array(z.string()).max(3).min(0),
  negativeComments: z.array(z.string()).max(3).min(0),
});

export type SegmentationComments = z.infer<typeof segmentationCommentsSchema>;

export const segmentSchema = z.custom<PrismaMandatoryFields<AISegmentation>>();

export type UserCommentSegment = z.infer<typeof segmentSchema>;
