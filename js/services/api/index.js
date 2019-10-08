import axios from 'axios';

import { Logger } from './interceptors/Logger';

const DEBUG = true;

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Cache-Control': 'no-cache',
        // Laravel specific -
        // 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
        // 'X-REQUESTED-WITH': 'XMLHttpRequest',
    },
});

if (DEBUG) {
    api.interceptors.response.use(Logger.success, Logger.error);
}

export default api;
