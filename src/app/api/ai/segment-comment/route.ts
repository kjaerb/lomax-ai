import { Configuration, OpenAIApi } from "openai-edge";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { systemPrompt, systemPrompt2 } from "@/lib/constants/system-prompt";
import { userCommentSchema } from "@/schemas/user-comment-schema";
import { addUserResponse } from "@/data/user-response";
import { segmentSchema } from "@/schemas/segment-schema";

const { OPEN_API_KEY, NPS_FINE_TUNE_MODEL } = process.env;

const config = new Configuration({
  apiKey: OPEN_API_KEY,
});

const promptMessages = [
  {
    role: "system",
    content: systemPrompt,
  },
];

const openai = new OpenAIApi(config);

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { messages, userSegment } = json;

    const parsedUserComment = segmentSchema.parse(userSegment);
    const { companyAccountNumber, companyAccountName, rating, userId } =
      parsedUserComment;

    const contextMessage = [...promptMessages, ...messages];

    const response = await openai.createChatCompletion({
      model: NPS_FINE_TUNE_MODEL,
      stream: true,
      messages: contextMessage,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (!response.ok) {
      return NextResponse.json("Something went wrong. Try again later");
    }

    const stream = OpenAIStream(response, {
      onCompletion: async (data) => {
        const parsedRating = parseInt(rating.toString(), 10);

        await addUserResponse({
          comment: data,
          companyAccountName: companyAccountName,
          companyAccountNumber: companyAccountNumber.toString(),
          rating: parsedRating,
          userId: userId,
        });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
