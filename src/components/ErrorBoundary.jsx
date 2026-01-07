import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { isDark } = this.props;
    
    if (this.state.hasError) {
      return (
        <div className={`flex flex-col items-center justify-center min-h-[400px] p-8 text-center rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
            <AlertTriangle className={`w-10 h-10 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Something went wrong
          </h2>
          <p className={`mb-6 max-w-md ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            An unexpected error occurred while rendering this component.
          </p>
          
          {this.state.error && (
            <div className={`w-full max-w-md p-4 mb-6 text-left rounded-lg border overflow-auto max-h-32 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
              <code className="text-xs font-mono text-red-500">
                {this.state.error.toString()}
              </code>
            </div>
          )}

          <button
            onClick={this.handleReload}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = (props) => {
  const { isDark } = useTheme();
  return <ErrorBoundaryClass {...props} isDark={isDark} />;
};

export default ErrorBoundary;