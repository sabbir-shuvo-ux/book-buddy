import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";

type Props = {
  actionType: "LOGIN" | "SIGNUP";
  extraText: string;
  title: string;
  linkText: string;
};

const AuthFormWrapper = ({ actionType, extraText, title, linkText }: Props) => {
  return (
    <section className="min-h-[calc(100vh-70px)] h-full grid place-items-center container">
      <div className="max-w-[500px] w-full bg-white p-8 rounded-md">
        <h2 className="text-center text-2xl font-bold pb-4 mb-4 border-b border-solid border-border">
          {title}
        </h2>

        <AuthForm actionType={actionType} />
        <div className="text-center mt-4 border-t border-border border-solid pt-4 flex gap-2">
          <p>{extraText}</p>
          <Link
            className="text-center underline"
            href={actionType === "LOGIN" ? "/signup" : "/login"}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthFormWrapper;
