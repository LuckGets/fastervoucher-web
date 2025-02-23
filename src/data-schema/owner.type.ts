export interface ImageData {
  id: string;
  imgPath: string;
  type: 'LOGO' | 'BACKGROUND';
  createdAt: string;
  updatedAt: string;
}

export interface OwnerDataSchema {
  id: string;
  emailForSendNotification: string;
  colorCode: string;
  name: string;
  img: ImageData[];
}

export type password = {
  passwordForRedeem: string;
};
