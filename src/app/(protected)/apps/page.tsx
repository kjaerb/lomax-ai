import Image from "next/image";
import LomaxIcon from "public/assets/lomax-icon.png";
import { ApplicationCard } from "./_components/application-card";
import { APPLICATIONS } from "@/lib/constants/applications";

interface AppsPageProps {}

export default function AppsPage({}: AppsPageProps) {
  return (
    <main className="w-full max-h-screen h-full space-y-10">
      <div className="flex items-center justify-center gap-4 pt-10">
        <Image src={LomaxIcon} alt="lomax icon" height={64} />
        <h1 className="font-semibold text-3xl">Lomax AI</h1>
      </div>
      <div>
        {Object.keys(APPLICATIONS).map((key) => {
          const app = APPLICATIONS[key as keyof typeof APPLICATIONS];
          return (
            <ApplicationCard
              key={key}
              href={app.href}
              title={app.title}
              description={app.description}
              locked={false}
            />
          );
        })}
      </div>
    </main>
  );
}
