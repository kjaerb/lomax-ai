import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

interface ApplicationCardProps {
  href: string;
  title: string;
  description: string;
  locked: boolean;
}

export function ApplicationCard({
  href,
  title,
  description,
  locked,
}: ApplicationCardProps) {
  return (
    <Card
      className={cn(
        "w-52 hover:bg-gray-200 bg-gray-100 transition-colors duration-300 shadow-md group relative"
      )}
    >
      <Link
        href={href}
        tabIndex={locked ? -1 : undefined}
        aria-disabled={locked}
        className={cn(locked && "cursor-not-allowed")}
      >
        {locked && (
          <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
        )}
        <div className={cn(locked && "blur-sm")}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p>{title}</p>
              <ArrowRight
                className={cn(
                  "w-6 h-6",
                  !locked &&
                    "group-hover:translate-x-2 transition-transform duration-300"
                )}
              />
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </div>
      </Link>
    </Card>
  );
}
