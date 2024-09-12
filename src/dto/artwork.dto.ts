import { ARTWORK_TYPE } from "@prisma/client";

export interface newArtworkDTO {
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  artistId?: string;
  type: ARTWORK_TYPE;
}
