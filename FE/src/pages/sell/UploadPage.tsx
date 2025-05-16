// src/pages/sell/UploadPage.tsx
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './UploadPageStyle'
import { BackIcon2 } from '@/assets/assets'
import { uploadImageForCrop } from '@/api/postRegistration/uploadImageForCrop'
import { analyzeWithGemini } from '@/api/postRegistration/analyzeWithGemini'
import { CroppedImage } from '@/types/yolo'
import { GeminiResultItem } from '@/types/gemini'
import { useLocation } from 'react-router-dom'
import Logo2D from '@/assets/icons/logo-2d.svg';
import { AlbumIcon, RefreshIcon2 } from '@/assets/assets';

const UploadPage = () => {
  const location = useLocation()
  const capturedFile = location.state?.capturedFile as File | undefined

  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [rotateDeg, setRotateDeg] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [croppedList, setCroppedList] = useState<CroppedImage[]>([])

  // 🔥 텍스트 상태를 ReactNode로 바꿈
  const [guideText, setGuideText] = useState<React.ReactNode>(
    <>해당 포토카드 <span>등록</span>을 시작할까요?</>
  )
  const [subGuideText, setSubGuideText] = useState(  <>
    포토카드가 회전되어 있으면<br />
    사진 분석이 제대로 되지 않을 수 있어요.
  </>)
  const [phase, setPhase] = useState<'idle' | 'cropping' | 'analyzing'>('idle')

  useEffect(() => {
    if (capturedFile) {
      setFile(capturedFile)
      setPreviewImageUrl(URL.createObjectURL(capturedFile))
    }
  }, [capturedFile])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewImageUrl(URL.createObjectURL(selected));
  }

  const rotate = () => {
    setRotateDeg((prev) => (prev + 90) % 360)
  }

  const startAnalysis = async () => {
    if (!file) return

    setPhase('cropping')
    setGuideText(
      <><span>AI 분석 중</span>입니다.</>
    )
    setSubGuideText(<>포토카드 분리 작업 중...</>)

    try {
      const rotatedFile = await rotateImageFile(file, rotateDeg)

      const startTime = Date.now()
      const cropped = await uploadImageForCrop(rotatedFile)
      setCroppedList(cropped)

      setPhase('analyzing')
      setGuideText(<><span>AI 분석 중</span>입니다.</>)
      setSubGuideText(<>인물 정보 분석 중...</>)

      const urls = cropped.map((c) => c.postImageUrl)
      const geminiResult: GeminiResultItem[] = await analyzeWithGemini(urls)
      console.log('Gemini 분석 결과:', geminiResult)

      const elapsed = Date.now() - startTime
      const minDisplay = 4000
      if (elapsed < minDisplay) {
        await new Promise((r) => setTimeout(r, minDisplay - elapsed))
      }

      navigate('/post', { state: { geminiResult } })
    } catch (err: any) {
      alert(err.message || '분석 중 오류 발생')
    }
  }

  return (
    <S.GuideBackground>
      <S.BackButton onClick={() => navigate(-1)}>
        <img src={BackIcon2} alt="뒤로가기" />
      </S.BackButton>

      <S.MainGuideText>{guideText}</S.MainGuideText>
      <S.GuideText>{subGuideText}</S.GuideText>

      {/* 통통 튀는 애니메이션션 */}
      {phase === 'cropping' && (
        <S.LogoBounceWrapper>
          <S.Logo src={Logo2D} alt="로고1" delay="-0.32s" />
          <S.Logo src={Logo2D} alt="로고2" delay="-0.16s" />
          <S.Logo src={Logo2D} alt="로고3" delay="0s" />
        </S.LogoBounceWrapper>
      )}

      {/* 상태: 대기 중 */}
      {phase === 'idle' && previewImageUrl && (
        <S.PreviewWrapper>
          <S.RotatableImage
            src={previewImageUrl}
            alt="미리보기"
            style={{ transform: `rotate(${rotateDeg}deg)` }}
          />
          <S.ButtonBar>
            <S.SmallActionButton variant="album" onClick={rotate}><img src={RefreshIcon2} alt="회전 아이콘" />회전</S.SmallActionButton>
            <S.SmallActionButton variant="camera" onClick={startAnalysis}><img src={AlbumIcon} alt="앨범 아이콘" />분석 시작</S.SmallActionButton>
          </S.ButtonBar>
        </S.PreviewWrapper>
      )}

      {/* 상태: 분석 중 (카드 분리 후) */}
      {phase === 'analyzing' && croppedList.length > 0 && (
        <div style={{ marginTop: '16px', width: '100%' }}>
          <S.GuideText>{croppedList.length}장의 카드가 감지되었습니다.</S.GuideText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '12px' }}>
            {croppedList.map((item, i) => (
              <img key={i} src={item.postImageUrl} alt={`감지된-${i}`} style={{ width: '100%' }} />
            ))}
          </div>
        </div>
      )}

      {/* 숨겨진 업로드 input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </S.GuideBackground>
  )
}

export default UploadPage

// 🔧 이미지 회전 유틸
const rotateImageFile = (file: File, degree: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject('Canvas context 실패')

      if (degree % 180 === 0) {
        canvas.width = img.width
        canvas.height = img.height
      } else {
        canvas.width = img.height
        canvas.height = img.width
      }

      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((degree * Math.PI) / 180)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)

      canvas.toBlob((blob) => {
        if (!blob) return reject('Blob 생성 실패')
        const rotatedFile = new File([blob], file.name, { type: file.type })
        resolve(rotatedFile)
      }, file.type)
    }

    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
