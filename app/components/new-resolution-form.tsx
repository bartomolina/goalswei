// @ts-nocheck
import { FormEvent, useState } from "react";
import { useAccount, useConnect, useContractWrite, useDisconnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { usePrepareContractWrite } from "wagmi";
import ContractJSON from "../lib/contract.json";

const NewResolutionForm = () => {
  const { address, connector, isConnected } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: ContractJSON.address,
    abi: ContractJSON.abi,
    functionName: "createEscrow",
    args: [address, address],
  });
  const { write } = useContractWrite(config);
  const { connect, connectors, error: connectionError, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Connected: ", isConnected);
    console.log("Supported: ", chain?.unsupported);
    isConnected ? disconnect() : connect();
  };

  return (
    <div className="max-w-lg">
      <button
        onClick={handleSubmit}
        className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Connect / Disconnect
      </button>
      <button
        onClick={handleSubmit}
        className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Connect / Disconnect
      </button>

      <div className="bg-white p-8 shadow rounded-lg">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="goal" className="block text-gray-900">
              <span className="block font-bold">Goal</span>
              <span className="block text-xs text-gray-400">Set a goal, You&apos;re gonna make it!</span>
            </label>
            <div className="mt-1">
              <input
                id="goal"
                name="goal"
                type="text"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Run a marathon"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="arbiter" className="block text-gray-900">
              <span className="block font-bold">Arbiter address</span>
              <span className="block text-xs text-gray-400">You can use a ENS name too</span>
            </label>
            <div className="mt-1">
              <input
                id="arbiter"
                name="arbiter"
                type="text"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="PLW3.eth"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="beneficiary" className="block text-gray-900">
              <span className="block font-bold">Beneficiary address</span>
              <span className="block text-xs text-gray-400">You can use a ENS name too</span>
            </label>
            <div className="mt-1">
              <input
                id="beneficiary"
                name="beneficiary"
                type="text"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="depositAmount" className="block text-gray-900">
              <span className="block font-bold">Deposit amount</span>
              <span className="block text-xs text-gray-400">Set it in ETH</span>
            </label>
            <div className="mt-1">
              <input
                id="depositAmount"
                name="depositAmount"
                type="text"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="0.01"
              ></input>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Let&apos;s go!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResolutionForm;
