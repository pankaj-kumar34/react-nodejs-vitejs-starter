import { requestHandler } from '@utils';

export const add = async () => {
  return requestHandler({ url: '/api/v1/calculator/add' });
};

export const subtract = async () => {
  return requestHandler({ url: '/api/v1/calculator/subtract' });
};
