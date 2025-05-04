import React, { useState, useCallback } from 'react';
import { Wonyoung1, Wonyoung2, Wonyoung3 } from '@/assets/assets';
import * as S from './ImageCarouselStyle';

const images = [Wonyoung1, Wonyoung2, Wonyoung3];

interface ImageCarouselProps {
  onImageChange?: (index: number) => void;
  optionCompleteStatus: boolean[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ onImageChange, optionCompleteStatus }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handlePrevClick = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex((i) => {
        const newIndex = i - 1;
        onImageChange?.(newIndex);
        return newIndex;
      });
    }
  }, [selectedIndex, onImageChange]);

  const handleNextClick = useCallback(() => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex((i) => {
        const newIndex = i + 1;
        onImageChange?.(newIndex);
        return newIndex;
      });
    }
  }, [selectedIndex, onImageChange]);

  const isFirstSlide = selectedIndex === 0;
  const isLastSlide = selectedIndex === images.length - 1;

  return (
    <S.Container>
      <S.ArrowButton
        direction="left"
        onClick={handlePrevClick}
        style={{ opacity: isFirstSlide ? 0.5 : 1 }}
        aria-label="이전 이미지"
        disabled={isFirstSlide}
      />

      <S.SlideWindow>
        {/* ← 왼쪽 슬롯 */}
        {selectedIndex > 0 ? (
          <S.ImageWrapper $isSelected={false}>
            <S.CarouselImage src={images[selectedIndex - 1]} alt={`이미지 ${selectedIndex}`} />
          </S.ImageWrapper>
        ) : (
          <S.EmptySlot size="small" />
        )}

        {/* ← 중앙 슬롯 */}
        <S.ImageWrapper $isSelected>
          <S.CarouselImage src={images[selectedIndex]} alt={`이미지 ${selectedIndex + 1}`} />
        </S.ImageWrapper>

        {/* ← 오른쪽 슬롯 */}
        {selectedIndex < images.length - 1 ? (
          <S.ImageWrapper $isSelected={false}>
            <S.CarouselImage src={images[selectedIndex + 1]} alt={`이미지 ${selectedIndex + 2}`} />
          </S.ImageWrapper>
        ) : (
          <S.EmptySlot size="small" />
        )}
      </S.SlideWindow>
      <S.DotContainer>
        {images.map((_, idx) => (
          <S.Dot
            key={idx}
            $isActive={idx === selectedIndex}
            $isComplete={optionCompleteStatus[idx]}
          />
        ))}
      </S.DotContainer>

      <S.ArrowButton
        direction="right"
        onClick={handleNextClick}
        style={{ opacity: isLastSlide ? 0.5 : 1 }}
        aria-label="다음 이미지"
        disabled={isLastSlide}
      />
    </S.Container>
  );
};

export default ImageCarousel;
