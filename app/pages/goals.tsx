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
      <div className="bg-gray-50">
        <div className="mx-auto max-w-6xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">You're the Arbiter</h2>
          <GoalsGrid filter={{ field: "arbiter", value: address }} />
        </div>
      </div>
      <div className="bg-gray-50 mt-10">
        <div className="mx-auto max-w-6xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Your Goals</h2>
          <GoalsGrid filter={{ field: "submitter", value: address }} />
        </div>
      </div>
      <div className="bg-gray-50 mt-10 mb-24">
        <div className="mx-auto max-w-6xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">You're the beneficiary</h2>
          <GoalsGrid filter={{ field: "beneficiary", value: address }} />
        </div>
      </div>
    </>
  );
};

export default Goals;
