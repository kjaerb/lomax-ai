import { db } from "@/server/db";
import { PrismaMandatoryFields } from "@/types/prisma";
import { NPSAISegmentation, NPSSegment, SEGMENT_TYPE } from "@prisma/client";

export async function incrementNPSGroupCount(groupName: string) {
  return await db.nPSGroup.update({
    where: {
      name: groupName,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
}

export async function decrementNPSGroupCount(groupName: string) {
  return await db.nPSGroup.update({
    where: {
      name: groupName,
    },
    data: {
      count: {
        decrement: 1,
      },
    },
  });
}

export async function incrementManyNPSGroupCount(groupNames: string[]) {
  return await db.nPSGroup.updateMany({
    where: {
      name: {
        in: groupNames,
      },
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
}

export async function decrementManyNPSGroupCount(groupNames: string[]) {
  return await db.nPSGroup.updateMany({
    where: {
      name: {
        in: groupNames,
      },
    },
    data: {
      count: {
        decrement: 1,
      },
    },
  });
}

type Segment = {
  name: string;
  type: SEGMENT_TYPE;
};

type AddSegmentProps = {
  segment: Segment;
  aiSegmentationId: number;
};

export async function addSegment({
  segment,
  aiSegmentationId,
}: AddSegmentProps): Promise<NPSSegment> {
  const { name, type } = segment;
  return await db.$transaction(async (tx) => {
    // create or connect nps segment to a nps group
    const npsGroup = await tx.nPSGroup.upsert({
      where: {
        name,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        name,
        count: 1,
        type,
      },
    });

    // create nps segment and connect to nps group
    return await tx.nPSSegment.create({
      data: {
        name,
        npsGroupId: npsGroup.id,
        npsAISegmentationId: aiSegmentationId,
        type,
      },
    });
  });
}

/**
 * A function that takes an ID for a segment and removes it from the database. It also decrements the count in the NPSGroup.
 * @param segmentId id of segment to be removed
 * @returns a promise of the removed segment
 */
export async function removeSegment(segmentId: number): Promise<NPSSegment> {
  return await db.$transaction(async (tx) => {
    // Retrieve NPSSegment with its NPSGroup
    const segment = await tx.nPSSegment.findUnique({
      where: {
        id: segmentId,
      },
      include: {
        npsGroup: true,
      },
    });

    if (!segment || !segment.npsGroupId) {
      throw new Error("Segment not found");
    }

    // Decrement the count in NPSGroup
    await tx.nPSGroup.update({
      where: { id: segment.npsGroupId },
      data: {
        count: {
          decrement: 1,
        },
      },
    });

    // Delete the NPSSegment
    return await tx.nPSSegment.delete({
      where: {
        id: segmentId,
      },
    });
  });
}

type AddSegmentsProps = {
  segments: Segment[];
  aiSegmentationId: number;
};

export async function addSegments({
  segments,
  aiSegmentationId,
}: AddSegmentsProps): Promise<NPSSegment[]> {
  const mappedTransaction = segments.map(async (segment) => {
    return await addSegment({
      segment,
      aiSegmentationId,
    });
  });

  return await Promise.all(mappedTransaction);
}

export async function removeSegments(
  segmentIds: number[],
  npsAISegmentationId?: number
) {
  return await db.$transaction(async (tx) => {
    const segments = await tx.nPSSegment.findMany({
      where: {
        id: {
          in: segmentIds,
        },
        ...(npsAISegmentationId ? { npsAISegmentationId } : {}),
      },
      include: {
        npsGroup: true,
      },
    });

    const mappedTransaction = segments.map(async (segment) => {
      if (segment.npsGroupId) {
        await tx.nPSGroup.update({
          where: {
            id: segment.npsGroupId,
          },
          data: {
            count: {
              decrement: 1,
            },
          },
        });

        return await tx.nPSSegment.delete({
          where: {
            id: segment.id,
          },
        });
      }
    });

    return Promise.all(mappedTransaction);
  });
}

type CreateAISegmentationProps = {
  data: PrismaMandatoryFields<NPSAISegmentation>;
};

export async function createAISegmentation({
  data,
}: CreateAISegmentationProps): Promise<NPSAISegmentation> {
  const { userId } = data;

  if (!userId) {
    throw new Error("No user found");
  }

  return await db.nPSAISegmentation.create({
    data: {
      ...data,
    },
  });
}

type CreateAISegmentationWithSegmentsProps = {
  data: PrismaMandatoryFields<NPSAISegmentation>;
  positiveComments: string[];
  negativeComments: string[];
};

export async function createAISegmentationWithSegments({
  data,
  positiveComments,
  negativeComments,
}: CreateAISegmentationWithSegmentsProps): Promise<NPSAISegmentation> {
  return await db.$transaction(async () => {
    const aiSegmentation = await createAISegmentation({ data });

    const positiveSegments: Segment[] = positiveComments.map((comment) => {
      return {
        name: comment,
        type: "POSITIVE",
      };
    });
    const negativeSegments: Segment[] = negativeComments.map((comment) => {
      return {
        name: comment,
        type: "NEGATIVE",
      };
    });

    await addSegments({
      aiSegmentationId: aiSegmentation.id,
      segments: [...positiveSegments, ...negativeSegments],
    });

    return aiSegmentation;
  });
}

export async function deleteAISegmentation(
  id: number
): Promise<NPSAISegmentation> {
  return await db.$transaction(async (tx) => {
    // Retrieve all segments related to the AISegmentation for group count update
    const segments = await tx.nPSSegment.findMany({
      where: {
        npsAISegmentationId: id,
      },
      select: {
        name: true,
      },
    });

    // Decrement count in NPSGroups
    const groupUpdatePromises = segments.map(
      async (segment) => await decrementNPSGroupCount(segment.name)
    );

    await Promise.all(groupUpdatePromises);

    // Delete the AISegmentation (related segments are deleted automatically)
    return await tx.nPSAISegmentation.delete({
      where: {
        id,
      },
    });
  });
}

export async function getAISegmentations() {
  return await db.nPSAISegmentation.findMany({
    include: { user: true, segments: true },
  });
}

export async function getNumAISegmentations(amount: number) {
  return await db.nPSAISegmentation.findMany({
    include: { user: true, segments: true },
    take: amount,
  });
}

type AISegmentationPaginationProps = {
  amount: number;
  skip: number;
};

export async function getAISegmentationPagination({
  amount,
  skip,
}: AISegmentationPaginationProps) {
  return await db.nPSAISegmentation.findMany({
    include: { user: true, segments: true },
    take: amount,
    skip,
  });
}

export async function getAISegmentationCount(): Promise<number> {
  return await db.nPSAISegmentation.count();
}

type UpdateSegmentationProps = {
  aiSegmentationId: number;
  positiveComments: string[];
  negativeComments: string[];
};

export async function updateSegmentationSegments({
  aiSegmentationId,
  positiveComments,
  negativeComments,
}: UpdateSegmentationProps) {
  return await db.$transaction(async (tx) => {
    // Retrieve current segments
    const currentSegments = await tx.nPSSegment.findMany({
      where: {
        npsAISegmentationId: aiSegmentationId,
      },
      include: {
        npsGroup: true,
      },
    });

    // Determine segments to add and remove
    const allComments = [...positiveComments, ...negativeComments];
    const segmentsToAdd = allComments.filter(
      (name) => !currentSegments.some((segment) => segment.name === name)
    );
    const segmentsToRemove = currentSegments.filter(
      (segment) => !allComments.includes(segment.name)
    );

    // Update NPSGroups (increment for new, decrement for removed)
    const updateGroupCounts = async () => {
      const groupUpdates = [];

      // Increment count for new segments
      for (const name of segmentsToAdd) {
        const type = positiveComments.includes(name) ? "POSITIVE" : "NEGATIVE";
        groupUpdates.push(
          addSegment({
            aiSegmentationId,
            segment: {
              name,
              type,
            },
          })
        );
      }

      // Decrement count for removed segments
      for (const segment of segmentsToRemove) {
        if (segment.npsGroupId) {
          groupUpdates.push(
            tx.nPSGroup.update({
              where: {
                id: segment.npsGroupId,
              },
              data: {
                count: {
                  decrement: 1,
                },
              },
            })
          );
        }
      }

      await Promise.all(groupUpdates);
    };

    // Add new segments and remove outdated ones
    const removeOldSegments = tx.nPSSegment.deleteMany({
      where: {
        id: {
          in: segmentsToRemove.map((segment) => segment.id),
        },
      },
    });

    return await Promise.all([updateGroupCounts(), removeOldSegments]);
  });
}
