export type payment = {
  name: string;
  amount: number;
  person: string;
};

export type transaction = {
  transactionName: string;
  creditor: string;
  payments: payment[];
  tax: number;
  tip: number;
};

export type transactions = transaction[];
