import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service (e.g., Sentry)
    // You can also display a user-friendly error message here

    // Set hasError to true to render an error UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI here
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
