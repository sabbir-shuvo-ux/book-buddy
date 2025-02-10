import AuthFormWrapper from "../AuthFormWrapper";

const SignupPage = () => {
  return (
    <AuthFormWrapper
      actionType="SIGNUP"
      extraText="Already have an account ? "
      title="Sign Up"
      linkText="Login Here"
    />
  );
};

export default SignupPage;
