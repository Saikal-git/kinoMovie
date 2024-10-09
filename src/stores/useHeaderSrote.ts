import { create } from "zustand";

interface IHeaderStore {
  videoKey: string;
  setVideoKey: (value: string) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  videoKey: "",
  setVideoKey: (value) => set({ videoKey: value }),
}));
