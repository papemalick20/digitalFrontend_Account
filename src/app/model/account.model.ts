export interface AccountDetails {
    accountId: string;
    solde: number;
    currentPage: number;
    totalPage: number;
    sizePage: number;
    accountOperationDTOs: AccountOperation[];
}

export interface AccountOperation {
    id: number;
    amount: number;
    description: string;
    type: string;
    operationDate: Date;
}