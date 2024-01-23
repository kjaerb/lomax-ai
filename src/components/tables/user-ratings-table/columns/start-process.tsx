"use client";

import { Button } from "@/components/ui/button";
import { useSegment } from "@/hooks/use-segment";
import { useUserId } from "@/hooks/use-user";
import { parseDanishDate } from "@/lib/utils";
import { UserComment } from "@/schemas/user-comment-schema";
import useUserResponseStore from "@/stores/user-reponse-store";
import { Row } from "@tanstack/react-table";
import { useEffect, useRef } from "react";

interface ManualStartProcessProps {
  row: Row<UserComment>;
}

export function ManualStartProcess({ row }: ManualStartProcessProps) {
  const userId = useUserId();

  const {
    userComment,
    rating,
    companyAccountNumber,
    companyName,
    surveySendTime,
  } = row.original;
  const index = row.index;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const parsedRating = parseInt(rating.toString(), 10);

  const {
    setSegmentTrigger,
    setProgress,
    setMessages,
    setReload,
    getProgress,
  } = useUserResponseStore();

  const progress = getProgress(index);

  const { messages, error, handleSubmit, isLoading, reload, stop } = useSegment(
    {
      userSegment: {
        userComment,
        userRating: parsedRating,
        npsSource: "NPS", //TODO
        userId: userId || "",
        companyId: null,
        surveySendTime: parseDanishDate(surveySendTime) || new Date(), // possible problem if date is not in correct format
        country: "UNKNOWN", //TODO
      },
      company: {
        companyAccountNumber: companyAccountNumber.toString(),
        companyAccountName: companyName,
      },
    }
  );

  useEffect(() => {
    if (!buttonRef.current) return;
    setSegmentTrigger(index, buttonRef);
    setReload(index, reload);
  }, [index, setSegmentTrigger, setReload, reload]);

  useEffect(() => {
    if (messages.length < 1) return;

    if (isLoading) {
      setProgress(index, "loading");
      setMessages(index, messages);
      return;
    }

    if (error) {
      setProgress(index, "error");
      setMessages(index, messages);
      return;
    }

    setProgress(index, "finished");
    setMessages(index, messages);
  }, [messages, error, isLoading, setProgress, setMessages, index, stop]);

  if (!userId) return <span>Bruger ikke fundet</span>;

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {progress === "loading" ? (
        <Button
          onClick={() => {
            stop();
            setProgress(index, "not_started");
          }}
        >
          Stop
        </Button>
      ) : progress === "not_started" ? (
        <Button disabled={isLoading} ref={buttonRef} type="submit">
          Start
        </Button>
      ) : (
        <Button disabled={isLoading} type="submit" onClick={() => reload()}>
          Reload
        </Button>
      )}
    </form>
  );
}
