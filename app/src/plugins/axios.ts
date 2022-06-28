import axios from 'axios';
import { UnauthorizedHandler } from '@/axios/unauthorized-handler';

axios.defaults.baseURL = 'api/';
axios.interceptors.response.use(
  response => response,
  UnauthorizedHandler.onRejected(),
);