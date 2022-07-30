import { catchAsync } from '../middlewares';
import calculator from '../services/calculator';

export const add = catchAsync(async (req, resp) => {
  const result = calculator.add(1, 2);

  resp.status(200).json({ result: result });
});

export const subtract = catchAsync(async (req, resp) => {
  const result = calculator.subtract(1, 2);

  resp.status(200).json({ result: result });
});

export const multiply = catchAsync(async (req, resp) => {
  const result = calculator.multiply(1, 2);

  resp.status(200).json({ result: result });
});

export const divide = catchAsync(async (req, resp) => {
  const result = calculator.divide(1, 2);

  resp.status(200).json({ result: result });
});
