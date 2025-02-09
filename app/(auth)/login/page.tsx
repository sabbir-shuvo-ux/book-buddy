import AuthFormWrapper from "../AuthFormWrapper";

const LoginPage = () => {
  return (
    <AuthFormWrapper
      actionType="LOGIN"
      extraText="Create an account"
      title="Login"
    />
  );
};

export default LoginPage;
