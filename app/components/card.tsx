import { IGoal } from "../global";
import Image from "next/image";
import { ethers } from "ethers";
import GoalStatus from "./goal-status";
import { truncateEthAddress } from "../lib/utils";
import makeBlockie from "ethereum-blockies-base64";

type Props = {
  goal: IGoal;
};

const Card = ({ goal }: Props) => (
  <div className="bg-white divide-y w-full">
    <div className="flex pt-5 px-5 mb-3">
      <div className="flex-none">
        <Image width={14} height={14} className="h-14 w-14 rounded-xl" src={makeBlockie(goal.depositor)} alt="" />
        <p className="text-xs text-center mt-1 text-gray-500">{truncateEthAddress(goal.depositor, "first")}</p>
      </div>
      <div className="ml-4 content-between grid w-full">
        <p className="text-lg font-semibold text-gray-800 leading-5">{goal.goal}</p>
        <div className="flex justify-between items-center text-lg text-gray-600 mt-2">
          <div>{`${ethers.utils.formatEther(goal.value)} Ξ`}</div>
          <GoalStatus goal={goal} />
        </div>
      </div>
    </div>
    <dl className="flex divide-x">
      <div className="flex-1 px-5 py-3">
        <dt className="text-xs text-gray-400">Arbiter</dt>
        <dd className="text-sm text-gray-800">{truncateEthAddress(goal.arbiter)}</dd>
      </div>
      <div className="flex-1 px-5 py-3">
        <dt className="text-xs text-gray-400">Beneficiary</dt>
        <dd className="text-sm text-gray-800">{truncateEthAddress(goal.beneficiary)}</dd>
      </div>
    </dl>
  </div>
);

export default Card;
