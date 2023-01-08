import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";
import { truncateEthAddress, getTimeRemaining } from "../lib/utils";

const Card = ({ goal }) => (
  <div className="divide-y w-full">
    <div className="flex pt-5 px-5 mb-3">
      <div className="flex-none">
        <img className="h-14 w-14 rounded-xl" src={makeBlockie(goal.depositor)} alt="" />
        <p className="text-xs text-center mt-1 text-gray-500">{truncateEthAddress(goal.depositor, "first")}</p>
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-900 leading-5">{goal.goal}</p>
        <p className="flex items-center text-lg text-gray-700 mt-2">
          <span>{`${ethers.utils.formatEther(goal.value)} Ξ`}</span>
          <span className="ml-4 rounded-lg px-2 py-1 text-xs font-medium bg-orange-50 text-orange-700">
            <span>⏱</span>
            <span className="ml-1">{getTimeRemaining(goal.unlockTime.toNumber())}</span>
          </span>
        </p>
      </div>
    </div>
    <dl className="flex divide-x">
      <div className="flex-1 px-5 py-3">
        <dt className="text-xs text-gray-400">Arbiter</dt>
        <dd className="text-sm text-gray-900">{truncateEthAddress(goal.arbiter)}</dd>
      </div>
      <div className="flex-1 px-5 py-3">
        <dt className="text-xs text-gray-400">Beneficiary</dt>
        <dd className="text-sm text-gray-900">{truncateEthAddress(goal.beneficiary)}</dd>
      </div>
    </dl>
  </div>
);
export default Card;
