declare namespace Express {
  export interface Response {
    respond: (data: any) => void;
  }

  export interface Request {
    userToken: {
      userId: string
    }
  }
}