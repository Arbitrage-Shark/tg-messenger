declare module 'telegram-mtproto' {
    export class MTProto {
        constructor(config: any);
        call(method: string, params: any): Promise<any>;
    }
}
