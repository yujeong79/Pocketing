// API 호출 디버깅 로그 함수
const isDevelopment = import.meta.env.MODE === 'development';

/**
 * API 요청 로깅 함수
 */
export const logRequest = <T>(url: string, method: string, data: T) => {
  if (!isDevelopment) return;

  console.group(`💙 API Request : ${method.toUpperCase()} ${url}`);
  if (data) {
    console.log('Request Data : ', data);
  }
  console.groupEnd();
};

/**
 * API 응답 로깅 함수
 */
export const logResponse = <T>(url: string, status: number, data: T) => {
  if (!isDevelopment) return;

  console.group(`✅ API Response : ${status} ${url}`);
  console.log('Response Data : ', data);
  console.groupEnd();
};

/**
 * API 에러 로깅 함수
 */
export const logError = <T>(status: number | undefined, error: T) => {
  if (!isDevelopment) return;

  console.group(`❌ API Error : ${status}`);
  console.log('Error Message : ', error);
  console.groupEnd();
};
