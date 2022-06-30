import axios from 'axios';
import { UnauthorizedHandler } from '@/axios/unauthorized-handler';
import { RetryHandler } from '@/axios/retry-handler';

axios.defaults.baseURL = 'api/';

axios.interceptors.response.use(
  response => response,
  UnauthorizedHandler.onRejected(),
);

axios.interceptors.response.use(
  response => response,
  RetryHandler.onRejected(),
);
