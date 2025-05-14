// src/types/gemini.ts

export interface GeminiRequest {
  postImageUrls: string[]
}

export interface GeminiResultItem {
  groupName: string
  memberName: string
  postImageUrl: string
}

export interface GeminiResult {
  results: GeminiResultItem[]
  errors: GeminiError[] | null
  total: number
  success: number
  failed: number
}

export interface GeminiError {
  url: string
  error: {
    code: string
    message: string
  }
}
