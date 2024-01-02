import { getDicebear } from "@/lib/dicebear";
import Image from "next/image";

interface DicebearInitialsImageProps {
  seed: string;
}

export function DicebearInitialsImage({ seed }: DicebearInitialsImageProps) {
  return <Image src={getDicebear(seed)} alt="bruger" width={32} height={32} />;
}
