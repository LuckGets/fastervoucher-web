import { create } from 'zustand';

interface FilterStore {
  selectedChannel: string;
  setSelectedChannel: (channel: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedChannel: '',
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
}));
