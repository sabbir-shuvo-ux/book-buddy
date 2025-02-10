import AuthFormWrapper from "../AuthFormWrapper";

const LoginPage = () => {
  return (
    <AuthFormWrapper
      actionType="LOGIN"
      extraText="Don't have an account ?"
      title="Login"
      linkText="Create an account"
    />
  );
};

export default LoginPage;
