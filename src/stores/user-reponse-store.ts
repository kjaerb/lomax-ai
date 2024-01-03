import { Progress, UserResponseSegment } from "@/schemas/user-comment-schema";
import { Message } from "ai";
import { RefObject } from "react";
import { create } from "zustand";

interface UserResponseStore {
  userResponses: UserResponseSegment[];
  setUserResponses: (userResponses: UserResponseSegment[]) => void;
  setUserResponse: (userResponse: UserResponseSegment, index: number) => void;
  getUserResponse: (index: number) => UserResponseSegment | null;
  getProgress: (index: number) => Progress;
  setProgress: (index: number, progress: Progress) => void;
  setSegmentTrigger: (
    index: number,
    segmentTrigger: RefObject<HTMLButtonElement>
  ) => void;
  setShouldSegment: (index: number, shouldSegment: boolean) => void;
  setMessages: (index: number, messages: Message[]) => void;
  setReload: (index: number, reload: () => void) => void;
}

const useUserResponseStore = create<UserResponseStore>((set, get) => ({
  userResponses: [],
  setUserResponses: (userResponses) => set({ userResponses }),
  setUserResponse: (userResponse, index) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index] = userResponse;
      }
      return { userResponses: updatedStates };
    }),
  getProgress: (index) => {
    const state = get().userResponses[index];
    if (!state) return "not_started";
    return state.segment.progress;
  },
  getUserResponse: (index) => {
    const state = get().userResponses[index];
    if (!state) return null;
    return state;
  },
  setSegmentTrigger: (index, segmentTrigger) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index].segment.segmentTrigger = segmentTrigger;
      }
      return { userResponses: updatedStates };
    }),
  setProgress: (index, progress) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index].segment.progress = progress;
      }
      return { userResponses: updatedStates };
    }),
  setShouldSegment: (index, shouldSegment) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index].segment.shouldSegment = shouldSegment;
      }
      return { userResponses: updatedStates };
    }),
  setMessages: (index, messages) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index].segment.messages = messages;
      }
      return { userResponses: updatedStates };
    }),
  setReload: (index, reload) =>
    set((state) => {
      const updatedStates = [...state.userResponses];
      if (index >= 0 && index < updatedStates.length) {
        updatedStates[index].segment.reload = reload;
      }
      return { userResponses: updatedStates };
    }),
}));

export default useUserResponseStore;
