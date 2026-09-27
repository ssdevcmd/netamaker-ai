export interface Template {
  id: string;
  title: string;
  category: "বিজয় দিবস" | "শোক সভা" | "নির্বাচনী প্রচার" | "ঈদ শুভেচ্ছা";
  thumbnail: string;
  previewUrl: string;
  defaultData: Partial<import("./poster").PosterData>;
}