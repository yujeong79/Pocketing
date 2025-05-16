import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const CameraPage = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.click()
  }, [])

  useEffect(() => {
    if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      inputRef.current?.click()
    } else {
      alert("아이폰에서는 사파리에서 홈 화면에 추가한 뒤 카메라를 사용할 수 있어요.")
    }
  }, [])


  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // UploadPage로 이동하면서 파일 전달
    const state = { capturedFile: file }
    navigate('/upload', { state })
  }

  return (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      capture="environment"
      onChange={handleCapture}
      style={{ display: 'none' }}
    />
  )
}

export default CameraPage
