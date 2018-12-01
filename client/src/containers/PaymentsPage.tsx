import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { parseDate } from '../common/date';
import Button from '../components/Button';
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

export type Dispatch = IDispatch;
export type Props = IProps;
export type ClassProps = Props & Dispatch;

interface IClassState {
  isModalOpen: boolean;
}

class PaymentsPage extends React.Component<ClassProps, IClassState> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  public componentDidMount() {
    this.props.getPayments();
  }

  public render() {
    const { isModalOpen } = this.state;
    const { errorMessage, isLoading, payments } = this.props;

    const data = {
      headers: this.headerRenderer(),
      rows: payments.map(this.itemRenderer),
    };

    const table = isLoading ? (
      <Loading>Loading payment data...</Loading>
    ) : (
      <Table data={data} />
    );

    const addPaymentModal = isModalOpen ? (
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
    return ['ID', 'Date paid', 'Date created', 'Attachments', 'Approved'];
  }

  private itemRenderer = (item: IPayment) => {
    return {
      cells: [
        item.id,
        parseDate(item.date_paid),
        parseDate(item.date_created),
        item.attachments.length,
        item.approved ? 'Approved' : 'Not approved',
      ],
    };
  }

  private handleOnClickAddPayment = () => {
    this.setState({ isModalOpen: true });
  }

  private handleAddPaymentCancel = () => {
    this.setState({ isModalOpen: false });
  }

  private handleAddPayment = (datePaid: string, attachments: any[]) => {
    this.setState({ isModalOpen: false });
    this.props.addPayment(datePaid);
  }
}

const mapStateToProps = (state: IReducers): Props => ({
  errorMessage: state.payments.errorMessage,
  isLoading: state.payments.isLoading,
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
