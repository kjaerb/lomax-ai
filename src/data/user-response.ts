import { db } from "@/server/db";
import { PrismaMandatoryFields } from "@/types/prisma";
import { AISegmentation } from "@prisma/client";

export async function addUserResponse(
  data: PrismaMandatoryFields<AISegmentation>
) {
  return await db.aISegmentation.create({
    data: {
      ...data,
    },
  });
}
