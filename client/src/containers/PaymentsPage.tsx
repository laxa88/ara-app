import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { parseDate } from '../common/date';
import Button from '../components/Button';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ModalPayment from '../components/modals/ModalPayment';
import Table from '../components/Table';
import * as paymentsActions from '../store/Payments/actions';
import { IDispatch, IPayment, IProps } from '../store/Payments/types';
import { IReducers } from '../store/types';

import ModalPreviewImage from '../components/modals/ModalPreviewImage';
import * as paths from '../constants/paths';
import * as css from './PaymentsPage.css';

export type Dispatch = IDispatch;
export type Props = IProps;
export type ClassProps = Props & Dispatch;

interface IClassState {
  editId: number;
  isModalOpen: boolean;
  isModalPreviewOpen: boolean;
  previewImageUrl: string;
}

class PaymentsPage extends React.Component<ClassProps, IClassState> {
  constructor(props: ClassProps) {
    super(props);

    this.state = {
      editId: null,
      isModalOpen: false,
      isModalPreviewOpen: false,
      previewImageUrl: '',
    };
  }

  public componentDidMount() {
    this.props.getPayments();
  }

  public render() {
    const { isModalOpen, isModalPreviewOpen, previewImageUrl } = this.state;

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

    return (
      <div>
        <div className={css.add}>
          <Button onClick={this.handleOnClickConfirmPayment}>
            Add Payment
          </Button>
        </div>

        {table}

        {error}

        <ModalPayment
          onClickConfirm={this.handleAddPayment}
          onClickCancel={this.handleAddPaymentCancel}
          isOpen={isModalOpen}
        />

        <ModalPreviewImage
          imageUrl={previewImageUrl}
          isOpen={isModalPreviewOpen}
          onClose={this.handleOnClosePreview}
        />
      </div>
    );
  }

  // private attachmentRenderer = (attachment: IAttachment) => {
  //   return (
  //     <div key={attachment.id}>
  //       <div>{attachment.file_name}</div>
  //       <div>{attachment.id}</div>
  //     </div>
  //   );
  // }

  private headerRenderer = () => {
    return ['ID', 'Date created', 'Attachments', 'Approver', ''];
  }

  private itemRenderer = (item: IPayment) => {
    const editButton = (
      <div className={css.cell}>
        <Button key={item.id} onClick={this.handleOnClickEdit(item.id)}>
          Edit
        </Button>
      </div>
    );

    const attachmentLinks = item.attachments.map(attachment => (
      <Button
        key={attachment.id}
        onClick={this.handleOnClickAttachment(1, 11, attachment.file_name)}
      />
    ));

    return {
      cells: [
        item.id,
        parseDate(item.date_created),
        attachmentLinks,
        item.approver_id,
        editButton,
      ],
    };
  }

  private handleOnClickConfirmPayment = () => {
    this.setState({ isModalOpen: true });
  }

  private handleOnClickEdit = (id: number) => () => {
    this.setState({
      editId: id,
      isModalOpen: true,
    });
  }

  private handleOnClickAttachment = (
    userId: number,
    paymentId: number,
    url: string,
  ) => () => {
    const previewImageUrl =
      `${paths.development.BASE_SERVER_PATH}` +
      `/${userId}/${paymentId}/${url}`;

    this.setState({
      previewImageUrl,
      isModalPreviewOpen: true,
    });
  }

  private handleOnClosePreview = () => {
    this.setState({
      isModalPreviewOpen: false,
    });
  }

  private handleAddPaymentCancel = () => {
    this.setState({ isModalOpen: false });
  }

  private handleAddPayment = (
    amount: number,
    remarks: string,
    attachments: any[],
  ) => {
    this.setState({ isModalOpen: false });
    this.props.addPayment(amount, remarks, attachments);
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
  addPayment: (amount: number, remarks: string, attachments: any[]) =>
    dispatch(paymentsActions.addPayment(amount, remarks, attachments)),

  approvePayment: (id: number, a: boolean) =>
    dispatch(paymentsActions.approvePayment(id, a)),

  getPayments: () => dispatch(paymentsActions.getPayments()),

  updatePayment: (id: number, amount: number, remarks: string) =>
    dispatch(paymentsActions.updatePayment(id, amount, remarks)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPage);
