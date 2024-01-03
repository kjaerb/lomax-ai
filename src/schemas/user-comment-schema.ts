import { Message } from "ai";
import { RefObject } from "react";
import { z } from "zod";

export const userCommentSchema = z.object({
  companyAccountNumber: z.number().or(z.string()),
  companyName: z.string(),
  rating: z.number().or(z.string()),
  userComment: z.string(),
  surveySendTime: z.string(),
  weekYear: z.string(),
});

export type UserComment = z.infer<typeof userCommentSchema>;

export const feedbackSchema = z.object({
  positiveComments: z.array(z.string()).max(3).min(0),
  negativeComments: z.array(z.string()).max(3).min(0),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export const progress = [
  "not_started",
  "loading",
  "error",
  "finished",
] as const;

export type Progress = (typeof progress)[number];

export const userResponseSchema = userCommentSchema.and(
  feedbackSchema.optional()
);

export type UserResponse = z.infer<typeof userResponseSchema>;

export const segment = z.object({
  messages: z.custom<Message[]>(),
  segmentTrigger: z.custom<RefObject<HTMLButtonElement> | null>(),
  reload: z.custom<() => void>(),
  shouldSegment: z.boolean(),
  progress: z.enum(progress),
});

export type Segment = z.infer<typeof segment>;

export const userResponseSegmentSchema = z.object({
  userResponse: userResponseSchema,
  segment: segment,
});

export type UserResponseSegment = z.infer<typeof userResponseSegmentSchema>;
