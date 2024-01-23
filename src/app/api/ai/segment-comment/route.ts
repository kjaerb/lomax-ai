import { Configuration, OpenAIApi } from "openai-edge";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { systemPrompt3 } from "@/lib/constants/system-prompt";
import { addUserResponse } from "@/data/user-response";
import { segmentSchema } from "@/schemas/segment-schema";
import { parseAISegmentString } from "@/lib/ai";

const { OPEN_API_KEY } = process.env;

const config = new Configuration({
  apiKey: OPEN_API_KEY,
});

const promptMessages = [
  {
    role: "system",
    content: systemPrompt3,
  },
];

const openai = new OpenAIApi(config);

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { messages, userSegment } = json;

    const parsedUserComment = segmentSchema.parse(userSegment);
    const {
      userRating,
      userId,
      userComment,
      surveySendTime,
      companyId,
      npsSource,
      country,
    } = parsedUserComment;

    if (!userId) throw "No user found";
    if (!surveySendTime) throw "No survey send time found";

    const contextMessage = [...promptMessages, ...messages];

    const response = await openai.createChatCompletion({
      model: "ft:gpt-3.5-turbo-1106:site-team-lomax::8foBJABg",
      stream: true,
      messages: contextMessage,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (!response.ok) throw "Something went wrong. Try again later";

    const stream = OpenAIStream(response, {
      onCompletion: async (data) => {
        const parsedComments = parseAISegmentString(data);

        if (parsedComments === null) {
          NextResponse.json({
            error: "Error in formatting response from AI",
          });
          throw "Error in formatting response from AI";
        }

        const parsedRating = parseInt(userRating.toString(), 10);

        await addUserResponse({
          data: {
            userComment,
            userId,
            userRating: parsedRating,
            surveySendTime,
            companyId,
            npsSource,
            country,
          },
          negativeComments: parsedComments.negativeComments,
          positiveComments: parsedComments.positiveComments,
        });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("Encountered error", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
