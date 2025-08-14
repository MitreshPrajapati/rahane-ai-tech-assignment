// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
// const BASE_URL = 'http://localhost:8080'

const ENDPOINTS = {
  LOGIN: `/auth/login`,
  REGISTER: `/auth/register`,
  LOGOUT: `/auth/logout`,
  GET_PROFILE: `/auth/profile`,
  USERS: `/users`,
  LOGS: `/logs`,
  POSTS: `/post`,
  POST_CREATE: `/post/create`,
  CONTENT: `/posts`
};

export default ENDPOINTS;
