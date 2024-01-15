import { Messages } from "@/components/ai/messages";
import { parseAISegmentString } from "@/lib/ai";
import { SegmentationComments } from "@/schemas/segment-schema";
import useUserResponseStore from "@/stores/user-reponse-store";
import { useEffect, useState } from "react";

interface CommentsProps {
  index: number;
}

export function Comments({ index }: CommentsProps) {
  const { getUserResponse, setProgress } = useUserResponseStore();
  const state = getUserResponse(index);
  const [messageObjState, setMessageObjState] =
    useState<SegmentationComments | null>(null);

  const progress = state?.segment.progress;
  const messages = state?.segment.messages;

  useEffect(() => {
    try {
      if (!messages) return;

      if (progress !== "finished") return;

      const messageObj = parseAISegmentString(
        messages[messages.length - 1].content
      );

      if (messageObj === null) return;
      setMessageObjState(messageObj);
    } catch (e) {
      console.error(e);
      setProgress(index, "error");
    }
  }, [progress, setProgress, setMessageObjState, index, messages]);

  if (!state || !messages) return null;

  return (
    <div className="space-y-2">
      {messageObjState ? (
        <>
          {messageObjState.positiveComments.length > 0 && (
            <div className="text-emerald-500">
              <span className="font-bold">Positive kommentarer:</span>
              <div className="flex flex-col space-y-2">
                {messageObjState.positiveComments.map((comment, i) => (
                  <span key={i}>{comment}</span>
                ))}
              </div>
            </div>
          )}
          {messageObjState.negativeComments.length > 0 && (
            <div className="text-red-500">
              <span className="font-bold">Negative kommentarer:</span>
              <div className="flex flex-col space-y-2 ">
                {messageObjState.negativeComments.map((comment, i) => (
                  <span key={i}>{comment}</span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Messages messages={messages} showInitialMessage={false} />
      )}
    </div>
  );
}
