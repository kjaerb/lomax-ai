import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import LomaxLogo from "public/assets/lomax.png";

interface LogoProps extends Partial<ImageProps> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Image
      width={256}
      {...props}
      src={LomaxLogo}
      alt="lomax logo"
      className={cn(className)}
    />
  );
}
