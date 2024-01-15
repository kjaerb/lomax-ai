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
}: AddUserResponseProps) {
  // transaction to rollback if error
  return await db.$transaction(async (tx) => {
    // create or connect nps segment to a nps group
    const positive = await Promise.all(
      positiveComments.map(async (comment) => {
        return await tx.nPSSegment.create({
          data: {
            name: comment,
            type: "Positive",
            npsGroup: {
              connectOrCreate: {
                where: {
                  name: comment,
                },
                create: {
                  name: comment,
                  count: 0,
                },
              },
            },
          },
        });
      })
    );
    const negative = await Promise.all(
      negativeComments.map(async (comment) => {
        return await tx.nPSSegment.create({
          data: {
            name: comment,
            type: "Negative",
            npsGroup: {
              connectOrCreate: {
                where: {
                  name: comment,
                },
                create: {
                  name: comment,
                  count: 0,
                },
              },
            },
          },
        });
      })
    );

    // updates the count of the nps group
    await tx.nPSGroup.updateMany({
      where: {
        name: {
          in: [...positiveComments, ...negativeComments],
        },
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return await tx.nPSAISegmentation.create({
      data: {
        ...data,
        negativeComments: {
          connect: negative,
        },
        positiveComments: {
          connect: positive,
        },
      },
    });
  });
}
