export type CollectionIconType =
  | 'folder'
  | 'gift'
  | 'heart'
  | 'bag'
  | 'sparkle'
  | 'star';

export interface CollectionPreviewItem {
  id: string | number;
  imageUrl: string;
  title?: string;
}

export interface Collection {
  id: string;
  title: string;
  itemCount: number;
  icon: CollectionIconType;
  previewImages: string[];
  routePath?: string;
  isCustom?: boolean;
  createdAt?: string;
}
