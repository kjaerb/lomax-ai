import { APPLICATION_ACCESS } from "@prisma/client";

type Application = {
  href: string;
  title: string;
  description: string;
};

export const APPLICATIONS: Record<APPLICATION_ACCESS, Application> = {
  NPS: {
    href: "/nps/dashboard",
    title: "NPS",
    description: "Net Promoter Score",
  },
} as const;
