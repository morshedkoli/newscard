export interface PhotoCardData {
  image: File | null;
  imageUrl: string | null;
  headline: string;
}

export interface BrandingConfig {
  logo: string;
  channelName: string;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface CardDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}