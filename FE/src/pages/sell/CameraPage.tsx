import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const CameraPage = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.click()
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
