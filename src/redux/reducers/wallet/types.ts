export type Wallet = {
    _id: string;
    type: string;
    initialAmount: Number;
    currentBalance: Number;
    owner: {
      _id: string;
      username: string;
      email: string;
    };
};

export type ServerErrResponse = {
    args: any[]
    failedOperation: string
    message: string
    status: number
    success: boolean
};

export type WalletDataResponse = {
    success: boolean
    wallet: Wallet
}
