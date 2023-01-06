import { useEffect } from "react";
import Head from "next/head";
import NewResolutionForm from "../components/new-resolution-form";
import { useContractRead } from "wagmi";
import ContractJSON from "../lib/contract.json";

const Home = () => {
  const { data, refetch } = useContractRead({
    address: ContractJSON.address,
    abi: ContractJSON.abi,
    functionName: "getInstances",
  });

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <>
      <Head>
        <title>WAGMI - Home</title>
        <meta name="description" content="WAGMI" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-3 md:py-8 sm:px-0 md:grid md:grid-cols-2 gap-10">
          <header className="content-center md:pt-8 mb-5 md:mb-0">
            <div className="space-y-2">
              <span className="block text-4xl font-semibold ">Achieve your goals</span>
              <span className="block text-4xl font-semibold ">Support awesome devs</span>
              <p className="text-gray-500 pt-5">
                Put your ETH where your mouth is! This year, set your new year&apos;s resolutions the Web3 way. Set a
                goal, a target date and the address of an arbitrer.
              </p>
              <p className="text-gray-500 pt-2">
                Once the date is reached, the arbitrer will determine if the goal was achieved and will either return
                the stacked amount to you or send it to the beneficiary.
              </p>
            </div>
          </header>
          <main>
            <NewResolutionForm refetch={refetch} />
          </main>
        </div>
      </div>
      <div style={{ bottom: "0px", transform: "rotate(180deg)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ width: "calc(100% + 1.3px)", height: "70px" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            style={{ stroke: "none", fill: "white" }}
          ></path>
        </svg>
      </div>
      <div className="bg-white"></div>
    </>
  );
};

export default Home;
