import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";
import { truncateEthAddress } from "../lib/utils";

const Card = ({ goal }) => {
  console.log(goal);
  return (
    <>
      <div className="divide-y w-full">
        <div className="flex pt-5 px-5 mb-3">
          <div className="flex-none">
            <img className="h-14 w-14 rounded-xl" src={makeBlockie(goal.depositor)} alt="" />
            <p className="text-xs text-center mt-1 text-gray-500">
              {truncateEthAddress(goal.depositor, "first")}
              <br />
              {truncateEthAddress(goal.depositor, "second")}
            </p>
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-900 leading-5">{goal.goal}</p>
            <p className="text-lg text-gray-700 mt-2">{`${ethers.utils.formatEther(goal.value)} Ξ`}</p>
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
    </>
  );
};

export default Card;
