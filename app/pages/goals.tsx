import { IGoal } from "../global";
import { GoalStatusEnum } from "../lib/utils";
import { FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useGoals } from "../components/goals-context";
import GoalStatus from "../components/goal-status";
import { truncateEthAddress, getTimeRemaining } from "../lib/utils";
import makeBlockie from "ethereum-blockies-base64";
import EscrowJSON from "../lib/escrow-contract.json";
import { useNotifications } from "../components/notifications-context";

const Goals = () => {
  const { showNotification, showError } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const { goals } = useGoals();
  const { address } = useAccount();
  const { fetchGoals } = useGoals();
  const goalsFiltered = goals.filter((goal: IGoal) => {
    return goal.depositor === address || goal.arbiter === address || goal.beneficiary === address;
  });

  const formatAddress = (_address: `0x${string}`, half:undefined | "first" | "second" = undefined) => {
    return (
      <span className={_address === address ? "bg-yellow-50 p-1 text-yellow-700" : ""}>
        {truncateEthAddress(_address, half)}
      </span>
    );
  };

  const waitingApproval = (goal: IGoal) =>
    goal.unlockTime.toNumber() * 1000 <= Date.now() &&
    goal.status === GoalStatusEnum.Pending &&
    goal.arbiter === address;

  const handleApproval = (event: FormEvent, _address: `0x${string}`, action: string) => {
    setIsLoading(true);
    event.preventDefault();

    const notificationMsg = action === "approve" ? "approved" : "rejected";
    const errorMsg = action === "approve" ? "approving" : "rejecting";

    writeContract({
      mode: "recklesslyUnprepared",
      address: _address,
      // @ts-ignore
      abi: EscrowJSON.abi,
      functionName: action,
    })
      // @ts-ignore
      .then((hash, wait) => {
        return waitForTransaction(hash);
      })
      .then((tx) => {
        setIsLoading(false);
        fetchGoals();
        // @ts-ignore
        showNotification(`Goal ${notificationMsg}`, tx.transactionHash);
      })
      .catch((error) => {
        setIsLoading(false);
        showError(`Error ${errorMsg} goal`, error.message);
      });
  };

  return (
    <>
      <Head>
        <title>GoalsWei - Goals</title>
        <meta name="description" content="GoalsWei - Yout goals" />
      </Head>
      <div className="bg-gray-100 pb-24">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Goal
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Value
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Arbiter
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Beneficiary
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {goalsFiltered.map((goal: IGoal) => (
                  <tr key={goal.addr} className="h-24">
                    <td className="py-4 pl-4 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            width={10}
                            height={10}
                            className="h-10 w-10 rounded-xl"
                            src={makeBlockie(goal.depositor)}
                            alt={goal.depositor}
                          />
                          <p className="text-xs text-center mt-1 -ml-2 font-mono text-gray-400">
                            {formatAddress(goal.depositor, "first")}
                          </p>
                        </div>
                        <div className="ml-6">
                          <div className="font-semibold text-xl text-gray-800">{goal.goal}</div>
                          <div className="font-mono text-gray-400 text-xs">{formatAddress(goal.addr)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-xl text-gray-500">
                      <div className="text-gray-600">{`${ethers.utils.formatEther(goal.value)} Ξ`}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="font-mono text-gray-800">{formatAddress(goal.arbiter)}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="font-mono text-gray-800">{formatAddress(goal.beneficiary)}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <GoalStatus goal={goal} />
                    </td>
                    <td className="relative py-2 pl-3 pr-4 text-right text-xl font-medium sm:pr-6">
                      {waitingApproval(goal) && (
                        <div className="space-x-3 flex justify-center">
                          <button
                            type="button"
                            onClick={(e) => handleApproval(e, goal.addr, "approve")}
                            disabled={isLoading}
                            className={
                              !isLoading
                                ? "rounded-md bg-green-500 py-2 px-3 text-white shadow-sm hover:bg-green-400 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                                : "rounded-md bg-green-200 py-2 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                            }
                          >
                            {"👍"}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleApproval(e, goal.addr, "reject")}
                            disabled={isLoading}
                            className={
                              !isLoading
                                ? "rounded-md bg-red-500 py-2 px-3 text-white shadow-sm hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                                : "rounded-md bg-red-200 py-2 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                            }
                          >
                            {"👎"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;
