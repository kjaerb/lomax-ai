import {
  negativeGroups,
  neutralGroups,
  positiveGroups,
} from "../../src/lib/constants/segmentation-groups";
import { prisma } from "../seed";

async function seedNPSDenmark() {
  // Seeding positive groups
  console.log("Seeding NPS groups");
  console.log("Seeding positive groups");
  for (const name of positiveGroups) {
    await prisma.nPSGroup.create({
      data: {
        name: name,
        count: 0, // Assuming count starts at 0
        type: "POSITIVE", // Enum value for this group
        country: "DENMARK",
      },
    });
  }

  // Seeding negative groups
  console.log("Seeding negative groups");
  for (const name of negativeGroups) {
    await prisma.nPSGroup.create({
      data: {
        name: name,
        count: 0,
        type: "NEGATIVE",
        country: "DENMARK",
      },
    });
  }

  // Seeding neutral groups
  console.log("Seeding neutral groups");

  for (const name of neutralGroups) {
    await prisma.nPSGroup.create({
      data: {
        name: name,
        count: 0,
        type: "NEUTRAL",
        country: "DENMARK",
      },
    });
  }
}

export async function seedNPS() {
  await seedNPSDenmark();
}
