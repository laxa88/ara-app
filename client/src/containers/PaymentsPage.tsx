import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
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

class PaymentsPage extends React.Component<ClassProps, {}> {
  public componentWillMount() {
    this.props.getPayments();
  }

  public componentDidMount() {
    this.props.getPayments();
  }

  public attachmentRenderer = (attachment: IAttachment) => {
    return (
      <div key={attachment.id}>
        <div>{attachment.file_name}</div>
        <div>{attachment.id}</div>
      </div>
    );
  }

  public itemRenderer = (item: IPayment) => {
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

  public render() {
    const { errorMessage, isLoading, payments } = this.props;

    const items = payments.map(this.itemRenderer);

    return <div>{items}</div>;
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
