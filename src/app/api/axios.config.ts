

import axios from 'axios';
import { environment } from '../enviroment/environment';

export const api = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
