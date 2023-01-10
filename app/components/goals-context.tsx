import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import ContractJSON from "../lib/contract.json";

const GoalsContext = createContext({
  goals: [],
  fetchGoals: undefined,
});

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = () => {
    readContract({
      address: ContractJSON.address,
      abi: ContractJSON.abi,
      functionName: "getInstances",
    }).then((data) => {
      console.log(data);
      setGoals(data);
    });
  };

  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Address connected");
      fetchGoals();
    },
    onDisconnect() {
      console.log("Address disconnected");
    },
  });

  return <GoalsContext.Provider value={{ goals, fetchGoals }}>{children}</GoalsContext.Provider>;
};
