import { db } from "@/server/db";
import { PrismaMandatoryFields } from "@/types/prisma";
import { UserReponse } from "@prisma/client";

export async function addUserResponse(
  data: PrismaMandatoryFields<UserReponse>
) {
  return await db.userReponse.create({
    data,
  });
}
