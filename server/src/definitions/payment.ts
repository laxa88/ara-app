export interface IAttachment {
  file_name: string;
  id: number;
}

export interface IPayment {
  id: number;
  attachments: IAttachment[];
  approved: boolean;
  date_approved: string;
  date_created: string;
  date_paid: string;
}
