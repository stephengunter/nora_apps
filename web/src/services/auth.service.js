import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const source =`${API_URL}/auth`;

const login = (credentials) => BaseService.post(`${source}`, credentials);

const refreshToken = (credentials) => BaseService.post(`${source}/RefreshToken`, credentials);

export default { login, refreshToken };