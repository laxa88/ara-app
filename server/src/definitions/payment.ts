export interface IAttachment {
  file_name: string;
  id: number;
}

export interface IPayment {
  id: number;
  user_id: number;
  attachments: IAttachment[];
  date_created: string;
  amount: number;
  remarks: string;
}
