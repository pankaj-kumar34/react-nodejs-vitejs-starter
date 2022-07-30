export const catchAsync = (handler) => {
  return (request, response, next) => {
    handler(request, response, next).catch(next);
  };
};
