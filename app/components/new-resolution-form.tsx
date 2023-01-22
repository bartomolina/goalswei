import { useEffect, useState, FormEvent } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
// @ts-ignore
import DatePicker from "react-datepicker";
import GoerliEscrowFactoryJSON from "../lib/goerli-escrow-factory-contract.json";
import LocalEscrowFactoryJSON from "../lib/localhost-escrow-factory-contract.json";
import BeneficiariesDropdown from "./beneficiaries-dropdown";
import { useGoals } from "../components/goals-context";
import { useNotifications } from "./notifications-context";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const NewResolutionForm = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { showNotification, showError } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingTx, setIsWaitingTx] = useState(false);
  const { fetchGoals } = useGoals();
  const [formData, setFormData] = useState({
    goal: "",
    arbiter: "",
    beneficiary: "",
    depositAmount: ethers.utils.parseEther("0.0001"),
    dueDate: tomorrow.getTime(),
  });
  const { isConnected } = useAccount();

  let EscrowFactoryJSON = LocalEscrowFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    EscrowFactoryJSON = GoerliEscrowFactoryJSON;
  }

  const clearForm = () => {
    setFormData({
      goal: "",
      arbiter: "",
      beneficiary: "",
      depositAmount: ethers.utils.parseEther("0.0001"),
      dueDate: tomorrow.getTime(),
    });
  };

  const handleSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    writeContract({
      mode: "recklesslyUnprepared",
      address: EscrowFactoryJSON.address,
      // @ts-ignore
      abi: EscrowFactoryJSON.abi,
      functionName: "createEscrow",
      args: [formData.goal, formData.arbiter, formData.beneficiary, Math.floor(formData.dueDate / 1000)],
      overrides: {
        value: formData.depositAmount,
      },
    })
      // @ts-ignore
      .then((hash, wait) => {
        setIsWaitingTx(true);
        return waitForTransaction(hash);
      })
      .then((tx) => {
        setIsLoading(false);
        setIsWaitingTx(false);
        fetchGoals();
        clearForm();
        // @ts-ignore
        showNotification("Goal created", tx.transactionHash);
      })
      .catch((error) => {
        setIsLoading(false);
        showError("Error creating goal", error.message);
      });
  };

  const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleDateChange = (event: FormEvent) => {
    setFormData({
      ...formData,
      // @ts-ignore
      dueDate: event.getTime(),
    });
  };

  const handleETHChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: ethers.utils.parseEther(event.currentTarget.value),
    });
  };

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
    <div className="text-sm">
      <div className="bg-white p-8 shadow rounded-lg md:rounded-2xl">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div className="relative rounded-md border border-gray-700 p-3 shadow-md focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="goal"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
            >
              Goal
            </label>
            <input
              type="text"
              name="goal"
              id="goal"
              value={formData.goal}
              onChange={handleFormChange}
              className="text-xl block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              placeholder="Run a marathon"
            />
          </div>
          <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="arbiter"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
            >
              Arbiter address / ENS
            </label>
            <input
              type="text"
              name="arbiter"
              id="arbiter"
              value={formData.arbiter}
              onChange={handleFormChange}
              className="text-sm block w-full border-0 p-0 font-mono text-gray-600 placeholder-gray-200 focus:ring-0"
              placeholder="PLW3.eth"
            />
          </div>
          <BeneficiariesDropdown formData={formData} setFormData={setFormData} />
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="dueDate"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
              >
                Due date
              </label>
              <DatePicker
                type="text"
                name="dueDate"
                id="dueDate"
                selected={formData.dueDate}
                minDate={tomorrow}
                onChange={handleDateChange}
                className="text-xl block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              />
            </div>
            <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="depositAmount"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
              >
                Amount (ETH)
              </label>
              <input
                type="number"
                name="depositAmount"
                id="depositAmount"
                value={ethers.utils.formatEther(formData.depositAmount)}
                step="0.0001"
                onChange={handleETHChange}
                className="text-xl block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
                placeholder="0.0001"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isConnected || isLoading}
              className={
                isConnected && !isLoading
                  ? "w-full rounded-lg bg-indigo-600 py-3 text-lg font-medium text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                  : "w-full rounded-lg bg-indigo-200 py-3 text-lg font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
              }
            >
              {isConnected ? (
                isWaitingTx ? (
                  <>
                    <span>Transaction processing...</span>
                  </>
                ) : (
                  <>
                    <span>LFG</span>
                    <span className="ml-4">🚀</span>
                  </>
                )
              ) : (
                "Connect wallet"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResolutionForm;
