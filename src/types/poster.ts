export interface PosterData {
  _id?: string;
  id?: string;
  name: string;
  designation: string;
  headline: string;
  occasion?: string;
  leaderPhoto1?: string | null;
  leaderPhoto2?: string | null;
  userPhoto?: string | null;
  borderColor?: string;
  themeGradient?: string;
  bannerColor?: string;
  party?: string;
  location?: string;
  createdAt?: string;
}