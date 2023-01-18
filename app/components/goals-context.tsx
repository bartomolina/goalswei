import { createContext, useContext, useState } from "react";
import { useAccount, useSwitchNetwork } from "wagmi";
import { readContract } from "@wagmi/core";
import GoerliEscrowFactoryJSON from "../lib/goerli-escrow-factory-contract.json";
import LocalEscrowFactoryJSON from "../lib/localhost-escrow-factory-contract.json";
import EscrowJSON from "../lib/escrow-contract.json";
import { IGoal } from "../global";
import { useNotifications } from "./notifications-context";

const GoalsContext = createContext({
  goals: [],
  beneficiaries: [],
  fetchGoals: () => {},
});

export const useGoals = () => useContext(GoalsContext);

export const GoalsProvider = ({ children }: React.PropsWithChildren) => {
  const { showError } = useNotifications();
  const [goals, setGoals] = useState([] as any);
  const [beneficiaries, setBeneficiaries] = useState([] as any);

  let EscrowFactoryJSON = LocalEscrowFactoryJSON;
  if (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() == "goerli") {
    EscrowFactoryJSON = GoerliEscrowFactoryJSON;
  }

  const fetchGoals = () => {
    let _goals: IGoal[] = [];

    readContract({
      address: EscrowFactoryJSON.address,
      abi: EscrowFactoryJSON.abi as any,
      functionName: "getBeneficiaries",
    })
      .then((beneficiaries: any) => {
        setBeneficiaries(beneficiaries);
        console.log("Beneficiaries: ", beneficiaries);
      })
      .catch((error) => {
        console.log(error);
        showError("Error loading beneficiaries", error.message);
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
      })
      .catch((error) => {
        showError("Error loading goals", error.message);
      });
  };

  useAccount({
    onConnect() {
      fetchGoals();
    },
  });

  return <GoalsContext.Provider value={{ goals, beneficiaries, fetchGoals }}>{children}</GoalsContext.Provider>;
};
