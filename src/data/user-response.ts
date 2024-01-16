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
  return await db.$transaction(async (tx) => {
    // transaction to rollback if error
    const positive = await Promise.all(
      // create or connect positive nps segment to a nps group
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
                  type: "Positive",
                },
              },
            },
          },
        });
      }),
    );
    const negative = await Promise.all(
      // create or connect negative nps segment to a nps group
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
                  type: "Negative",
                },
              },
            },
          },
        });
      }),
    );

    await tx.nPSGroup.updateMany({
      // updates the count of the nps group
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
