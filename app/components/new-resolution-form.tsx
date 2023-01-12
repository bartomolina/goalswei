import { useEffect, useState, FormEvent } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";
// @ts-ignore
import DatePicker from "react-datepicker";
import EscrowFactoryJSON from "../lib/escrow-factory-contract.json";
import { useGoals } from "../components/goals-context";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const NewResolutionForm = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { fetchGoals } = useGoals();
  const [formData, setFormData] = useState({
    goal: "Test",
    arbiter: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    beneficiary: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    depositAmount: ethers.utils.parseEther("0.01"),
    dueDate: tomorrow.getTime(),
  });
  const { address, connector, isConnected } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: EscrowFactoryJSON.address,
    // @ts-ignore
    abi: EscrowFactoryJSON.abi,
    functionName: "createEscrow",
    args: [formData.goal, formData.arbiter, formData.beneficiary, Math.floor(formData.dueDate / 1000)],
    overrides: {
      value: formData.depositAmount,
    },
  });
  // @ts-ignore
  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      fetchGoals();
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (write) {
      write();
    }
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
              className="text-sm block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              placeholder="PLW3.eth"
            />
          </div>
          <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="beneficiary"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
            >
              Beneficiary address / ENS
            </label>
            <input
              type="text"
              name="beneficiary"
              id="beneficiary"
              value={formData.beneficiary}
              onChange={handleFormChange}
              className="text-sm block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
            />
          </div>
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
                className="text-sm block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
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
                step="0.01"
                onChange={handleETHChange}
                className="text-sm block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
                placeholder="0.01"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isConnected}
              className={
                isConnected
                  ? "w-full rounded-lg bg-indigo-600 py-3 text-lg font-medium text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                  : "w-full rounded-lg bg-indigo-200 py-3 text-lg font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
              }
            >
              {isConnected ? "LFG!" : "Connect wallet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResolutionForm;
