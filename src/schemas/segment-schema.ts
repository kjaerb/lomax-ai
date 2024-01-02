import { z } from "zod";
import { UserReponse } from "@prisma/client";
import { PrismaMandatoryFields } from "@/types/prisma";

export const segmentSchema = z.custom<PrismaMandatoryFields<UserReponse>>();

export type UserCommentSegment = z.infer<typeof segmentSchema>;
