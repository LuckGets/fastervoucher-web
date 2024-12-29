import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  src: string;
}

interface Restaurant {
  name: string;
}

export interface SettingState {
  name: string;
  logoImage: string;
  color: string;
  emailForLogin: string;
  emailForSend: string;
  carouselImages: Image[];
  restaurant: Restaurant[];
  setName: (newName: string) => void;
  setSelectedImage: (image: string) => void;
  setColor: (color: string) => void;
  updateCarouselImages: (images: Image[]) => void;
  updateField: <T extends keyof SettingState>(
    key: T,
    value: SettingState[T],
  ) => void;
}

const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      name: 'The Emerald Hotel',
      logoImage: 'https://i.imgur.com/E8fadpG.png',
      color: '#006838',
      emailForLogin: 'info@emerald.com',
      emailForSend: 'info@emerald.com',
      carouselImages: [
        {
          src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
        },
        { src: 'https://i.imgur.com/UelGops.jpeg' },
        { src: 'https://i.imgur.com/hw3L8oP.jpeg' },
      ],
      restaurant: [
        { name: 'Coffee Shop' },
        { name: 'Yok Chinese Restaurant' },
        { name: 'Health club' },
      ],
      setName: (newName: string) => set({ name: newName }),
      setSelectedImage: (image: string) => set({ logoImage: image }),
      setColor: (color: string) => set({ color: color }),
      updateCarouselImages: (images: Image[]) =>
        set({ carouselImages: images }),
      setRestaurant: (restaurant: Restaurant[]) => set({ restaurant }),
      updateField: <T extends keyof SettingState>(
        key: T,
        value: SettingState[T],
      ) => set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSettingStore;
