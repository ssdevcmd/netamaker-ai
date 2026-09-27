export interface PosterData {
  id?: string;
  name: string;
  designation: string;
  party: string;
  location: string;
  headline: string;
  occasion: string;
  themeGradient: string;
  borderColor: string;
  bannerColor: string;
  leaderPhoto1: string | null;
  leaderPhoto2: string | null;
  userPhoto: string | null;
  createdAt?: string;
}