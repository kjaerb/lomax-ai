import { ActiveLinkType } from "@/components/navigation/active-link";
import { LayoutIcon, History, FileSpreadsheet } from "lucide-react";

const npsPrefix = "/nps";

export const navigationLinks: ActiveLinkType[] = [
  // {
  //   label: "Dashboard",
  //   href: `${npsPrefix}/dashboard`,
  //   icon: <LayoutIcon />,
  // },
  {
    label: "Segment",
    href: `${npsPrefix}/segment`,
    icon: <FileSpreadsheet />,
  },
  {
    label: "History",
    href: `${npsPrefix}/history`,
    icon: <History />,
  },
] as const;
