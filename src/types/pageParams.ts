export type ActivitiesPageParams = Promise<{ location: string }>;

export type ActivityDetailParams = Promise<{ location: string; activity_slug: string }>;
export type CategoryParams = Promise<{ location: string; category_slug: string }>;
