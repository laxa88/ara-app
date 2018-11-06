export interface IPayment {
  id: number;
  user_id: number;
  date_created: string;
  date_paid: string;
  date_approved: string;
  approved: boolean;
}
