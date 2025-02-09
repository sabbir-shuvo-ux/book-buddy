import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";

type Props = {
  actionType: "LOGIN" | "SIGNUP";
  extraText: string;
  title: string;
};

const AuthFormWrapper = ({ actionType, extraText, title }: Props) => {
  return (
    <section className="mt-6">
      <h2 className="text-center text-lg font-semibold">{title}</h2>
      <AuthForm actionType={actionType} />
      <div className="text-center">
        <Link
          className="text-center underline"
          href={actionType === "LOGIN" ? "/signup" : "/login"}
        >
          {extraText}
        </Link>
      </div>
    </section>
  );
};

export default AuthFormWrapper;
