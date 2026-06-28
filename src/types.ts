export interface SavedPoster {
  id: string;
  photoUrl: string | null;
  scale: number;
  posX: number;
  posY: number;
  rotation: number;
  customSlogan: string;
  customTicketPrice: string;
  customDate: string;
  downloadedAt: string;
}

export interface PosterPreset {
  id: string;
  name: string;
  customSlogan: string;
  customTicketPrice: string;
  customDate: string;
  scale: number;
  posX: number;
  posY: number;
  rotation: number;
  isSystem?: boolean;
}
