import { HtmlHTMLAttributes } from "react";
import { ActiveLink, ActiveLinkType, activeLinkVariant } from "./active-link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const activeLinksVariant = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ActiveLinksProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activeLinksVariant> {
  title: string;
  links: ActiveLinkType[];
  activeLink: VariantProps<typeof activeLinkVariant>;
}

export function ActiveLinks({
  title,
  links,
  variant,
  size,
  activeLink = { active: "default" },
  className,
  ...props
}: ActiveLinksProps) {
  return (
    <nav
      {...props}
      className={cn(activeLinksVariant({ variant, size }), className)}
    >
      <p className="p-2 text-gray-500 dark:text-gray-300 uppercase text-sm">
        {title}
      </p>
      <div className="">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <ActiveLink {...link} {...activeLink} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
