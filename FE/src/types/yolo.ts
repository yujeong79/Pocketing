// src/types/yolo.ts
export interface CroppedImage {
  postImageUrl: string;
}

export interface YoloCropResult {
  cropped_files: CroppedImage[];
}
