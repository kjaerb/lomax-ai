import {
  SegmentationComments,
  segmentationCommentsSchema,
} from "@/schemas/segment-schema";

/**
 * @description A function that takes a string and returns a positive and negative comment object.
 * @param data string
 */
export function parseAISegmentString(
  data: string
): SegmentationComments | null {
  try {
    const JSONData = JSON.parse(data);

    const keys = Object.keys(JSONData);

    if (keys.length !== 2)
      throw new Error("Invalid response from OpenAI not correct keys");

    let positiveKey = "";
    let negativeKey = "";

    for (const key of keys) {
      if (key.includes("positive")) positiveKey = key;
      if (key.includes("negative")) negativeKey = key;
    }

    const positive = JSONData[positiveKey];
    const negative = JSONData[negativeKey];

    const obj: SegmentationComments = {
      negativeComments: negative,
      positiveComments: positive,
    };

    return segmentationCommentsSchema.parse(obj);
  } catch (ex) {
    return null;
  }
}
