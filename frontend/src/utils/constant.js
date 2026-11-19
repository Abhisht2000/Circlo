const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || (import.meta.env.DEV ? "http://localhost:8000" : window.location.origin);

export const USER_API_END_POINT = `${API_ORIGIN}/api/v1/user`;
export const JOB_API_END_POINT = `${API_ORIGIN}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_ORIGIN}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_ORIGIN}/api/v1/company`;
