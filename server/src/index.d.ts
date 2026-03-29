// Type augmentations for request user typing to avoid TS complaints in routes
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
