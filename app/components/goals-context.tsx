import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import EscrowFactoryJSON from "../lib/escrow-factory-contract.json";
import EscrowJSON from "../lib/escrow-contract.json";
import { IGoal } from "../global";

const GoalsContext = createContext({
  goals: [],
  beneficiaries: [],
  fetchGoals: () => {},
});

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }: React.PropsWithChildren) => {
  const [goals, setGoals] = useState([] as any);
  const [beneficiaries, setBeneficiaries] = useState([] as any);

  const fetchGoals = () => {
    let _goals: IGoal[] = [];

    readContract({
      address: EscrowFactoryJSON.address,
      abi: EscrowFactoryJSON.abi as any,
      functionName: "getBeneficiaries",
    }).then((beneficiaries: any) => {
      setBeneficiaries(beneficiaries);
      console.log("Beneficiaries: ", beneficiaries);
    });

    readContract({
      address: EscrowFactoryJSON.address,
      abi: EscrowFactoryJSON.abi as any,
      functionName: "getInstances",
    })
      .then((data: any) => {
        // Transform returned array from ethers into an objects array
        data.map((goal: any) => {
          let _goal = {} as any;
          for (var key in goal) {
            if (isNaN(key as any)) _goal[key] = goal[key];
          }
          _goals = [..._goals, _goal];
        });

        _goals = _goals.sort((a, b) => a.unlockTime.toNumber() - b.unlockTime.toNumber());

        return Promise.all(
          _goals.map((goal) => {
            return readContract({
              address: goal.addr,
              abi: EscrowJSON.abi as any,
              functionName: "status",
            });
          })
        );
      })
      .then((data: any) => {
        _goals.forEach((goal, i) => (goal.status = data[i]));
        setGoals(_goals);
        console.log("Goals: ", _goals);
      });
  };

  useAccount({
    onConnect() {
      fetchGoals();
    },
  });

  return <GoalsContext.Provider value={{ goals, beneficiaries, fetchGoals }}>{children}</GoalsContext.Provider>;
};
