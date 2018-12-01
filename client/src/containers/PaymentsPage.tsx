import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import Button from '../components/Button';
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

  public componentWillMount() {
    this.props.getPayments();
  }

  public componentDidMount() {
    this.props.getPayments();
  }

  public render() {
    const { isModalOpen } = this.state;
    const { errorMessage, isLoading, payments } = this.props;

    const items = payments.map(this.itemRenderer);

    const data = {
      headers: ['header 1', 'header 2'],
      rows: [
        { cells: ['cell 1-1', 'cell 1-2'] },
        { cells: ['cell 2-1', 'cell 2-2'] },
        { cells: ['cell 3-1', 'cell 3-2'] },
      ],
    };

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
        {items} <Table data={data} />
        <Button onClick={this.handleOnClickAddPayment}>Add Payment</Button>
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

  private itemRenderer = (item: IPayment) => {
    const attachments = item.attachments.map(this.attachmentRenderer);

    return (
      <div key={item.id}>
        <div>{item.id}</div>
        <div>{item.date_created}</div>
        <div>{item.date_paid}</div>
        <div>{item.approved}</div>
        <div>{item.date_approved}</div>
        <div>{attachments}</div>
      </div>
    );
  }

  private handleOnClickAddPayment = () => {
    this.setState({ isModalOpen: true });
  }

  private handleAddPaymentCancel = () => {
    this.setState({ isModalOpen: false });
  }

  private handleAddPayment = (datePaid: string, attachments: any[]) => {
    console.log('###', datePaid, attachments);
    this.setState({ isModalOpen: false });
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
