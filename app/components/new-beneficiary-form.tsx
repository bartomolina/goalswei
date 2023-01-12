import { useEffect, useState, FormEvent } from "react";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import EscrowFactoryJSON from "../lib/escrow-factory-contract.json";
import { useGoals } from "../components/goals-context";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const NewBeneficairyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { fetchGoals } = useGoals();
  const [formData, setFormData] = useState({
    addr: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    info: "Cool Project",
  });
  const { isConnected } = useAccount();

  const handleSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    writeContract({
      mode: "recklesslyUnprepared",
      address: EscrowFactoryJSON.address,
      // @ts-ignore
      abi: EscrowFactoryJSON.abi,
      functionName: "addBeneficiary",
      args: [formData.addr, formData.info],
    })
      // @ts-ignore
      .then((hash, wait) => {
        return waitForTransaction(hash);
      })
      .then((tx) => {
        setIsLoading(false);
        fetchGoals();
      })
      .catch((error) => setIsLoading(false));
  };

  const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
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
              htmlFor="addr"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
            >
              Address / ENS
            </label>
            <input
              type="text"
              name="addr"
              id="addr"
              value={formData.addr}
              onChange={handleFormChange}
              className="text-xl block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
            />
          </div>
          <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="info"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800"
            >
              Description / URL
            </label>
            <input
              type="text"
              name="info"
              id="info"
              value={formData.info}
              onChange={handleFormChange}
              className="text-sm block w-full border-0 p-0 text-gray-700 placeholder-gray-300 focus:ring-0"
              placeholder="https://github.com/ethereum"
            />
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
              {isConnected ? "Register beneficiary" : "Connect wallet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBeneficairyForm;
