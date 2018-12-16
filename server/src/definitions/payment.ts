export interface IAttachment {
  file_name: string;
  id: number;
}

export interface IPayment {
  id: number;
  user_id: number;
  approver_id: number;
  attachments: IAttachment[];
  date_created: string;
  amount: number;
  remarks: string;
}

export interface IMonthPayment {
  id: number;
  date: string;
  userId: number;
  approverId: number;
}
