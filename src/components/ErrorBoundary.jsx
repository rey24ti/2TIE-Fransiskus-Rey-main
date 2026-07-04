import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (typeof fallback === 'function') {
        return fallback({ error });
      }
      return (
        fallback ?? (
          <div style={{ padding: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Terjadi kesalahan</h2>
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              Halaman gagal dimuat. Silakan coba refresh.
            </p>
            {error?.message ? (
              <pre style={{ whiteSpace: 'pre-wrap', color: '#b91c1c' }}>{String(error.message)}</pre>
            ) : null}
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;

