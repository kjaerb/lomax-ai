import { db } from "@/server/db";
import { PrismaMandatoryFields } from "@/types/prisma";
import { NPSAISegmentation } from "@prisma/client";

interface AddUserResponseProps {
  data: PrismaMandatoryFields<NPSAISegmentation>;
  positiveComments: string[];
  negativeComments: string[];
}

export async function addUserResponse({
  data,
  positiveComments,
  negativeComments,
}: AddUserResponseProps) {}
