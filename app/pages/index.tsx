import { useEffect, useState } from "react";
import Head from "next/head";
import Hero from "../components/hero";
import NewResolutionForm from "../components/new-resolution-form";
import GoalsGrid from "../components/goals-grid";

const Home = () => {
  const [hasMounted, setHasMounted] = useState(false);

  // To prevent hydration errors:
  // https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution
  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted]);
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>GoalsWei - Home</title>
        <meta name="description" content="WAGMI" />
      </Head>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="p-4 md:pt-8 sm:px-0 md:grid md:grid-cols-8 gap-3">
            <header className="content-center md:pt-14 mb-5 md:mb-0 col-span-4">
              <Hero />
            </header>
            <main className="col-span-4 lg:ml-8">
              <NewResolutionForm />
            </main>
          </div>
        </div>
      </div>
      <div style={{ bottom: "0px", transform: "rotate(180deg)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="fill-current bg-gray-100"
          style={{ width: "calc(100% + 1.3px)", height: "70px" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            style={{ stroke: "none", fill: "white" }}
          ></path>
        </svg>
      </div>
      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-8 mb-24">
        <GoalsGrid />
      </div>
    </>
  );
};

export default Home;
