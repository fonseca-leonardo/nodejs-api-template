export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIROMENT: 'development' | 'production';

      PORT: number;
    }
  }

  export interface IUserTokenData {
    id: number;
  }
}
