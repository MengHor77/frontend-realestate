import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('Application error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container py-5" aria-live="assertive">
          <h1 className="h3">500 - Something went wrong</h1>
          <p>Please refresh the page or try again later.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
