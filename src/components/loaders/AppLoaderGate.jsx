// components/AppLoaderGate.jsx
import { useAuth } from "../../context/AuthContext";
import FullScreenLoader from "../loaders/FullscreenLoaderWithLogo";

const AppLoaderGate = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AppLoaderGate;
