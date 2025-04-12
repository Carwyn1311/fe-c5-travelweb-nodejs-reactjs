// src/declarations.d.ts
declare module '@stomp/stompjs' {
    export class Client {
      [x: string]: any;
      constructor(params: any);
      activate(): void;
      deactivate(): void;
      subscribe(destination: string, callback: (message: IMessage) => void): void;
      publish(params: { destination: string; body: string }): void;
    }
  
    export interface Frame {
      headers: any;
    }
  
    export interface IMessage {
      body: string;
    }
  }
  
  declare module 'sockjs-client' {
    const SockJS: any;
    export default SockJS;
  }
  