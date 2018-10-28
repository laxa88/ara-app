import * as React from 'react';
import { connect } from 'react-redux';

class DetailsPage extends React.Component<{}, {}> {
  public render() {
    return <div>my details</div>;
  }
}

const mapStateToProps = (state: {}) => state;

export default connect(mapStateToProps)(DetailsPage);
