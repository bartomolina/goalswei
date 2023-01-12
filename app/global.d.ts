import { BigNumber } from "ethers";
import { GoalStatusEnum } from "./lib/utils";

interface Window {
  ethereum: ExternalProvider;
}

interface IGoal {
  addr: `0x${string}`;
  goal: string;
  arbiter: `0x${string}`;
  beneficiary: `0x${string}`;
  depositor: `0x${string}`;
  unlockTime: BigNumber;
  status: GoalStatus;
  value: BigNumber;
}

interface IBeneficiary {
  addr: `0x${string}`;
  info: string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_ALCHEMY_API: string;
  }
}
