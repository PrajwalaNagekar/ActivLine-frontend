 import { adminLogin } from "../api/auth.api";
import toast from "react-hot-toast";
const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@activline.in');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);



const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await adminLogin({ email, password });
    toast.success("Login successful");
    onLogin();
  } catch (err) {
    toast.error(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 font-sans text-slate-100 p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center mb-8">
          <ActivlineLogo className="h-16 w-auto mb-6 text-white" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Activline Admin</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to manage your network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="admin@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-400">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          <p>Protected by Activline Secure Access</p>
        </div>
      </div>
    </div>
  );
};