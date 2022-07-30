import { catchAsync } from '../middlewares';

export const getReadiness = (req, resp) => {
  resp.status(200).json({ result: 'ok' });
};

export const getLiveness = catchAsync(async (req, resp) => {
  resp.status(200).json({ result: 'ok' });
});
