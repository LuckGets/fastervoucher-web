import { ownerApi } from '../api/owner/owners.api';
import { OwnerDataSchema } from '../data-schema/owner.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  src: string;
}

interface ShopImage {
  type: string;
  imgPath: string;
}

export interface SettingState {
  name: string;
  logoImage: string;
  colorCode: string;
  emailForLogin: string;
  emailForSendNotification: string;
  carouselImages: Image[];
  actionGetShopInfo: () => void;
  actionEditShopInfo: (data: OwnerDataSchema) => void;
  setSelectedImage: (image: string) => void;
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
      colorCode: '#006838',
      emailForLogin: 'info@emerald.com',
      emailForSendNotification: 'info@emerald.com',
      carouselImages: [
        {
          src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
        },
        { src: 'https://i.imgur.com/UelGops.jpeg' },
        { src: 'https://i.imgur.com/hw3L8oP.jpeg' },
      ],
      actionGetShopInfo: async () => {
        try {
          const result = await ownerApi.getOwnerInfo();
          const data = result?.data?.data;
          console.log('actionGetShopInfo :>> ', data);

          if (data) {
            const logoImage =
              data.img.find((image: ShopImage) => image.type === 'LOGO')
                ?.imgPath || '';
            const carouselImages = data.img
              .filter((image: ShopImage) => image.type === 'BACKGROUND')
              .map((image: ShopImage) => ({ src: `https://${image.imgPath}` }));
            set({
              name: data.name,
              logoImage: `https://${logoImage}`,
              colorCode: data.colorCode,
              emailForSendNotification: data.emailForSendNotification,
              carouselImages,
            });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionEditInfo error:', err);
        }
      },
      actionEditShopInfo: async (data) => {
        try {
          console.log('data :>> ', data);
          const result = await ownerApi.updateInfo(data);
          console.log('result actionEditInfo:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionEditInfo error:', err);
        }
      },
      setSelectedImage: (image: string) => set({ logoImage: image }),
      updateCarouselImages: (images: Image[]) =>
        set({ carouselImages: images }),

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
