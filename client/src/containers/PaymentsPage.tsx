import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { parseDate } from '../common/date';
import Button from '../components/Button';
import Error from '../components/Error';
import Loading from '../components/Loading';
import PaymentAdd from '../components/modals/PaymentAdd';
import Table from '../components/Table';
import * as paymentsActions from '../store/Payments/actions';
import {
  IAttachment,
  IDispatch,
  IPayment,
  IProps,
} from '../store/Payments/types';
import { IReducers } from '../store/types';

import * as css from './PaymentsPage.css';

export type Dispatch = IDispatch;
export type Props = IProps;
export type ClassProps = Props & Dispatch;

interface IClassState {
  editId: number;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
}

class PaymentsPage extends React.Component<ClassProps, IClassState> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      editId: null,
      isAddModalOpen: false,
      isEditModalOpen: false,
    };
  }

  public componentDidMount() {
    this.props.getPayments();
  }

  public render() {
    const { isAddModalOpen, isEditModalOpen } = this.state;

    const {
      errorMessageAdd,
      errorMessageApprove,
      errorMessageGet,
      errorMessageUpdate,
      isLoadingAdd,
      isLoadingApprove,
      isLoadingGet,
      isLoadingUpdate,
      payments,
    } = this.props;

    const data = {
      headers: this.headerRenderer(),
      rows: payments.map(this.itemRenderer),
    };

    const table = isLoadingGet ? (
      <Loading>Loading payment data...</Loading>
    ) : (
      <Table data={data} />
    );

    const error = errorMessageGet ? (
      <Error>{errorMessageGet}</Error>
    ) : (
      undefined
    );

    const addPaymentModal = isAddModalOpen ? (
      <PaymentAdd
        onClickAdd={this.handleAddPayment}
        onClickCancel={this.handleAddPaymentCancel}
      />
    ) : (
      undefined
    );

    return (
      <div>
        <Button onClick={this.handleOnClickAddPayment}>Add Payment</Button>
        {table}
        {error}
        {addPaymentModal}
      </div>
    );
  }

  private attachmentRenderer = (attachment: IAttachment) => {
    return (
      <div key={attachment.id}>
        <div>{attachment.file_name}</div>
        <div>{attachment.id}</div>
      </div>
    );
  }

  private headerRenderer = () => {
    return ['ID', 'Date paid', 'Date created', 'Attachments', 'Approved', ''];
  }

  private itemRenderer = (item: IPayment) => {
    const editButton = (
      <div className={css.cell}>
        <Button key={item.id} onClick={this.handleOnClickEdit(item.id)}>
          Edit
        </Button>
      </div>
    );

    return {
      cells: [
        item.id,
        parseDate(item.date_paid),
        parseDate(item.date_created),
        item.attachments.length,
        item.approved ? 'Approved' : 'Not approved',
        editButton,
      ],
    };
  }

  private handleOnClickAddPayment = () => {
    this.setState({ isAddModalOpen: true });
  }

  private handleOnClickEdit = (id: number) => () => {
    this.setState({
      editId: id,
      isEditModalOpen: true,
    });
  }

  private handleAddPaymentCancel = () => {
    this.setState({ isAddModalOpen: false });
  }

  private handleAddPayment = (datePaid: string, attachments: any[]) => {
    this.setState({ isAddModalOpen: false });
    this.props.addPayment(datePaid);
  }
}

const mapStateToProps = (state: IReducers): Props => ({
  errorMessageAdd: state.payments.errorMessageAdd,
  errorMessageApprove: state.payments.errorMessageApprove,
  errorMessageGet: state.payments.errorMessageGet,
  errorMessageUpdate: state.payments.errorMessageUpdate,

  isLoadingAdd: state.payments.isLoadingAdd,
  isLoadingApprove: state.payments.isLoadingApprove,
  isLoadingGet: state.payments.isLoadingGet,
  isLoadingUpdate: state.payments.isLoadingUpdate,

  payments: state.payments.payments,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): Dispatch => ({
  addPayment: (dp: string) => dispatch(paymentsActions.addPayment(dp)),

  approvePayment: (id: number, a: boolean) =>
    dispatch(paymentsActions.approvePayment(id, a)),

  getPayments: () => dispatch(paymentsActions.getPayments()),

  updatePayment: (id: number, dp: string) =>
    dispatch(paymentsActions.updatePayment(id, dp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPage);
