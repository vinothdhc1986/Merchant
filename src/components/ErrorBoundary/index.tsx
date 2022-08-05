/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ReactNode } from 'react';
import CustomNoDataFound from '../CustomNoDataFound';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    hasError: false,
  };

  componentDidCatch(): void {
    this.setState({
      hasError: true,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <CustomNoDataFound
          title="Something Went Wrong"
          subTitle="Please Refresh"
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
