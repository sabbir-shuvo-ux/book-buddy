import { auth } from "@/lib/auth";
import { getWelcomeMessage } from "@/lib/getWelcomeMessage";

const WelcomeSectionWrapper = async () => {
  const session = await auth();

  return (
    <section className="py-10 container">
      <div className="">
        {session?.user?.email && (
          <>
            <h3 className="text-lg font-semibold capitalize">
              {getWelcomeMessage(session.user?.email.replace(/@.*$/, ""))}
            </h3>

            <h4>You are Reading 0 books now</h4>
          </>
        )}
      </div>
    </section>
  );
};

export default WelcomeSectionWrapper;
