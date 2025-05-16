import { useState, useCallback, useEffect } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';
import * as S from '@/components/common/ImageCropModalStyle';
import { postS3Image, putS3Image } from '@/api/s3/s3Image';

interface ImageCropModalProps {
  open: boolean;
  image: string | null;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

const CROP_SIZE = 240; // CropArea의 px값과 동일하게!

const ImageCropModal = ({ open, image, onClose, onCropComplete }: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const userId = localStorage.getItem('userId');
  const uniqueFileName = `profile_${userId}_${Date.now()}.jpg`;

  useEffect(() => {
    if (!image) return;

    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const minZoom = Math.max(CROP_SIZE / width, CROP_SIZE / height);
      setZoom(minZoom < 1 ? 1 : minZoom); // 최소 1 이상
      setCrop({ x: 0, y: 0 }); // 중앙
    };
  }, [image]);

  const onCropCompleteHandler = useCallback((_: unknown, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    if (image && croppedAreaPixels) {
      const croppedDataUrl = await getCroppedImg(image, croppedAreaPixels);
      // Blob URL → Blob → File
      const blob = await fetch(croppedDataUrl).then((res) => res.blob());
      const croppedFile = new File([blob], uniqueFileName, { type: 'image/jpeg' });

      const presignedRes = await postS3Image({
        fileName: uniqueFileName,
        contentType: 'image/jpeg',
      });
      const presignedUrl = presignedRes.result.presignedUrl;

      await putS3Image({
        presignedUrl,
        uploadFile: croppedFile,
        header: { 'Content-Type': 'image/jpeg' },
      });

      onCropComplete(presignedUrl.split('?')[0]);
      onClose();
    }
  };

  if (!open || !image) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CropArea>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
          />
          <div className="circle-overlay" />
        </S.CropArea>
        <S.ButtonRow>
          <S.Button onClick={onClose}>취소</S.Button>
          <S.Button onClick={handleDone}>완료</S.Button>
        </S.ButtonRow>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ImageCropModal;
