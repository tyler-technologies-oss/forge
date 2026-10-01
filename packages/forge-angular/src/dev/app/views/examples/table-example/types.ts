export interface IJournal {
  number: number;
  year: number;
  month: number;
  source: string;
  status: number;
  enteredBy: string;
  description: string;
  debits: number;
  credits: number;
  attachments: boolean;
}
