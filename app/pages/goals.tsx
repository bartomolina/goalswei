import Head from "next/head";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useGoals } from "../components/goals-context";
import { truncateEthAddress, getTimeRemaining } from "../lib/utils";
import makeBlockie from "ethereum-blockies-base64";
import EscrowJSON from "../lib/escrow-contract.json";

const Goals = () => {
  const { goals } = useGoals();
  const { address } = useAccount();
  const goalsFiltered = goals.filter((goal) => {
    return goal.depositor === address || goal.arbiter === address || goal.beneficiary === address;
  });

  const formatAddress = (_address: `0x${string}`) => {
    return (
      <span className={_address === address ? "bg-yellow-50 p-1 text-yellow-700" : ""}>
        {truncateEthAddress(_address)}
      </span>
    );
  };

  const waitingApproval = (goal) =>
    goal.unlockTime.toNumber() * 1000 <= Date.now() && !goal.completed && goal.arbiter === address;

  const handleApproveGoal = (event: FormEvent, _address) => {
    event.preventDefault();
    console.log("Approving... ", _address);

    writeContract({
      mode: "recklesslyUnprepared",
      address: _address,
      abi: EscrowJSON.abi,
      functionName: "approve",
    })
      .then((hash, wait) => {
        console.log("tx id: ", hash);
        return waitForTransaction(hash);
      })
      .then((tx) => {
        console.log("tx: ", tx);
      });
  };

  const handleRejectGoal = (event: FormEvent, address) => {
    event.preventDefault();
    console.log("Rejecting...", address);
  };

  return (
    <>
      <Head>
        <title>WAGMI - Goals</title>
        <meta name="description" content="WAGMI - Goals" />
      </Head>
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 mb-24 py-8 bg-gray-100 rounded">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Depositor
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Arbiter
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Beneficiary
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {goalsFiltered.map((goal) => (
                <tr key={goal.addr}>
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={makeBlockie(goal.depositor)} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-base text-gray-900">{goal.goal}</div>
                        <div className="text-gray-500">{formatAddress(goal.depositor)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    <div className="text-gray-900">{formatAddress(goal.arbiter)}</div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    <div className="text-gray-900">{formatAddress(goal.beneficiary)}</div>
                  </td>
                  {/* <td className="px-3 py-4 text-sm text-gray-500">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Active
                    </span>
                  </td> */}
                  <td className="px-3 py-4 text-sm text-gray-500">{"role"}</td>
                  <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {waitingApproval(goal) && (
                      <>
                        <div>
                          <a
                            href="#"
                            onClick={(e) => handleApproveGoal(e, goal.addr)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Goal Completed
                          </a>
                        </div>
                        <div>
                          <a
                            href="#"
                            onClick={(e) => handleRejectGoal(e, goal.addr)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Goal failed
                          </a>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Goals;
