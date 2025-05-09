export interface AlbumResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    albums: Album[];
  };
}

export interface Album {
  albumId: number;
  title: string;
}
