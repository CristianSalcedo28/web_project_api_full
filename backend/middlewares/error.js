export const BadRequestError = (message) => {
  const error = new Error (message);
  error.statusCode = 400;
  return error
}

export const AuthenticationError  = (message) => {
  const error = new Error (message);
  error.statusCode=401;
  return error
}

export const NotFoundError = (message) => {
  const error = new Error (message);
  error.statusCode = 404;
  return error
}

export const ServerError = (message) => {
  const error = new Error (message);
  error.statusCode = 500;
  return error
}

