import Head from "next/head";
import { useAccount } from "wagmi";
import GoalsGrid from "../components/goals-grid";

const Goals = () => {
  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>WAGMI - Goals</title>
        <meta name="description" content="WAGMI - Goals" />
      </Head>
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 mb-24">
        <div className="bg-gray-100 p-4 md:p-8 rounded">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">You're the Arbiter</h2>
          <GoalsGrid filter={{ field: "arbiter", value: address }} />
        </div>
        <div className="bg-gray-100 p-4 md:p-8 rounded mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Your Goals</h2>
          <GoalsGrid filter={{ field: "depositor", value: address }} />
        </div>
        <div className="bg-gray-100 p-4 md:p-8 rounded mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">You're the beneficiary</h2>
          <GoalsGrid filter={{ field: "beneficiary", value: address }} />
        </div>
      </div>
    </>
  );
};

export default Goals;
