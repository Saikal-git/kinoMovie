import { create } from "zustand";

interface IHeaderStore {
  videoKey: string;
  isMobile: boolean;
  setVideoKey: (value: string) => void;
  setIsMobile: (value: boolean) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  videoKey: "",
  isMobile: true,
  setVideoKey: (value) => set({ videoKey: value }),
  setIsMobile: (value) => set({ isMobile: value }),
}));
