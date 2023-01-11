import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import EscrowFactoryJSON from "../lib/escrow-factory-contract.json";
import EscrowJSON from "../lib/escrow-contract.json";

const GoalsContext = createContext({
  goals: [],
  fetchGoals: undefined,
});

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = () => {
    let _goals = [];

    readContract({
      address: EscrowFactoryJSON.address,
      abi: EscrowFactoryJSON.abi,
      functionName: "getInstances",
    })
      .then((data) => {
        // Transform returned array from ethers into an objects array
        data.map(goal => {
          let _goal = {}
          for (var key in goal) {
            if (isNaN(key)) _goal[key] = goal[key];
          }
          _goals = [..._goals, _goal]
        });

        _goals = _goals.sort((a, b) => a.unlockTime - b.unlockTime);

        return Promise.all(
          _goals.map((goal) => {
            return readContract({
              address: goal.addr,
              abi: EscrowJSON.abi,
              functionName: "completed",
            });
          })
        );
      })
      .then((data) => {
        console.log(data);
        _goals.forEach((goal, i) => goal.completed = data[i]);
        setGoals(_goals);
        console.log(_goals);
      });
  };

  useAccount({
    onConnect() {
      fetchGoals();
    },
  });

  return <GoalsContext.Provider value={{ goals, fetchGoals }}>{children}</GoalsContext.Provider>;
};
