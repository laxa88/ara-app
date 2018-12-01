export const enum ActionTypes {
  GET = 'PAYMENT/GET',
  GET_SUCCESS = 'PAYMENT/GET_SUCCESS',
  GET_FAIL = 'PAYMENT/GET_FAIL',
  ADD = 'PAYMENT/ADD',
  ADD_SUCCESS = 'PAYMENT/ADD_SUCCESS',
  ADD_FAIL = 'PAYMENT/ADD_FAIL',
  UPDATE = 'PAYMENT/UPDATE',
  UPDATE_SUCCESS = 'PAYMENT/UPDATE_SUCCESS',
  UPDATE_FAIL = 'PAYMENT/UPDATE_FAIL',
  APPROVE = 'PAYMENT/APPROVE',
  APPROVE_SUCCESS = 'PAYMENT/APPROVE_SUCCESS',
  APPROVE_FAIL = 'PAYMENT/APPROVE_FAIL',
}

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

export interface IAction {
  type: string;
  payload?: {
    approved?: boolean;
    date_paid?: string;
    errorMessage?: string;
    id?: number;
    payments?: IPayment[];
  };
  error?: boolean;
  meta?: any;
}

export interface IState {
  errorMessageGet: string;
  errorMessageAdd: string;
  errorMessageUpdate: string;
  errorMessageApprove: string;

  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingUpdate: boolean;
  isLoadingApprove: boolean;

  payments: IPayment[];
}

export interface IProps {
  errorMessageGet: string;
  errorMessageAdd: string;
  errorMessageUpdate: string;
  errorMessageApprove: string;

  isLoadingGet: boolean;
  isLoadingAdd: boolean;
  isLoadingUpdate: boolean;
  isLoadingApprove: boolean;

  payments: IPayment[];
}

export interface IDispatch {
  getPayments: () => void;
  addPayment: (datePaid: string) => void;
  updatePayment: (id: number, datePaid: string) => void;
  approvePayment: (id: number, approved: boolean) => void;
}
