import { BigNumber } from "ethers";

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
  completed: boolean;
  value: BigNumber;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_ALCHEMY_API: string;
  }
}
