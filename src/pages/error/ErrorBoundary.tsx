import { paths } from '@/config/path';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div role="alert" className="rounded bg-red-100 p-4 text-red-800">
          <p>Something went wrong:</p>
          <pre>Error : {this.state.error?.message}</pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 rounded bg-red-200 p-1"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = paths.main.home.path)}
            className="mt-2 rounded bg-red-200 p-1"
          >
            Back to home page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
