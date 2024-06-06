const devUrl = '/api';
const productUrl = 'https://tsanghi.com/api';

export const url = process.env.NODE_ENV === 'production' ? productUrl : devUrl;