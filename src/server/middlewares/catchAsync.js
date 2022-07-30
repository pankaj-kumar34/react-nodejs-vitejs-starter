const catchAsync = (handler) => (request, response, next) => {
  handler(request, response, next).catch(next);
};

export default catchAsync;
