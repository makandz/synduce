import AuthContext from "../../libs/contexts/authContext";
import { useProvideAuth } from "../../libs/hooks/Auth";

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default ProvideAuth;
