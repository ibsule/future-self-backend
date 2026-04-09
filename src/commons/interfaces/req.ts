export interface IReqUser extends Request {
  user: {
    id: string;
    account_type: string;
  };
}
