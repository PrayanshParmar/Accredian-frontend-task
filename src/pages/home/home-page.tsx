import Dashboard from "@/components/dashboard";
import NavBar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col ">
      <NavBar isAuth={false} />
      <main className="flex-1">
        <section className="w-full bg-gradient-to-r from-primary to-primary-foreground py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                Refer and Earn
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
                Invite your friends and earn rewards.
              </p>
              <div className="mt-8">
                <Button
                  className="rounded-md px-6 py-3"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 px-4 sm:px-6 ">
          <Dashboard />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
