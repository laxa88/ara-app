import * as React from 'react';
import { connect } from 'react-redux';

class PaymentsPage extends React.Component<{}, {}> {
  public render() {
    return <div>payments</div>;
  }
}

const mapStateToProps = (state: {}) => state;

export default connect(mapStateToProps)(PaymentsPage);
