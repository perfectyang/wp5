declare namespace API {
  export interface RESPONSE<T = any> {
    code: string | number;
    data: T;
    message: string;
    success?: boolean | string;
  }
}
