import AuthContext from "../../contexts/authContext";
import { useProvideAuth } from "../../hooks/Auth";

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default ProvideAuth;
