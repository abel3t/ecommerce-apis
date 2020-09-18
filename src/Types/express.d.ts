declare namespace Express {
  export interface Request {
    userToken: {
      userId: string
    }
  }
}