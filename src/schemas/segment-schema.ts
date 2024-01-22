import { z } from "zod";
import { PrismaMandatoryFields } from "@/types/prisma";
import { NPSAISegmentation, NPSSegment } from "@prisma/client";
import { segmentationGroups } from "@/lib/constants/segmentation-groups";

export const segmentationCommentsSchema = z.object({
  positiveComments: z.array(z.string()).max(3).min(0),
  negativeComments: z.array(z.string()).max(3).min(0),
});

export type SegmentationComments = z.infer<typeof segmentationCommentsSchema>;

export const segmentSchema =
  z.custom<PrismaMandatoryFields<NPSAISegmentation>>();

export type UserCommentSegment = z.infer<typeof segmentSchema>;

export const segmentationGroupsSchema = z.enum(segmentationGroups);

export type SegmentationGroups = z.infer<typeof segmentationGroupsSchema>;

export const updateSegmentSchema = z.object({
  positiveComments: z
    .object({
      name: z
        .custom<SegmentationGroups>()
        .refine((value) => value.trim().length > 0, {
          message: "Vælg venligst en gruppe",
        }),
    })
    .array()
    .max(3)
    .min(0),
  negativeComments: z
    .object({
      name: z
        .custom<SegmentationGroups>()
        .refine((value) => value.trim().length > 0, {
          message: "Vælg venligst en gruppe",
        }),
    })
    .array()
    .max(3)
    .min(0),
});

export type UpdateSegment = z.infer<typeof updateSegmentSchema>;
