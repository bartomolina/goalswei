import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";
import { truncateEthAddress, getTimeRemaining } from "../lib/utils";

const Card = ({ goal }) => {
  let unlocked = false;
  const unlockTime = goal.unlockTime.toNumber();
  const unlockDate = new Date(unlockTime * 1000).toLocaleDateString();
  const remainingTime = getTimeRemaining(unlockTime);
  let dateColor = "text-red-800";
  if (remainingTime.includes("in ")) {
    if (remainingTime.includes("months") || remainingTime.includes("year") || remainingTime.includes("years")) {
      dateColor = "text-green-700";
    } else if (remainingTime.includes("month")) {
      dateColor = "text-orange-400";
    }
  } else {
    unlocked = true;
  }

  return (
    <div className="bg-white divide-y w-full">
      <div className="flex pt-5 px-5 mb-3">
        <div className="flex-none">
          <img className="h-14 w-14 rounded-xl" src={makeBlockie(goal.depositor)} alt="" />
          <p className="text-xs text-center mt-1 text-gray-500">{truncateEthAddress(goal.depositor, "first")}</p>
        </div>
        <div className="ml-4 content-between grid w-full">
          <p className="text-lg font-semibold text-gray-800 leading-5">{goal.goal}</p>
          <div className="flex justify-between items-center text-lg text-gray-600 mt-2">
            <div>{`${ethers.utils.formatEther(goal.value)} Ξ`}</div>
            <div className={`rounded-lg px-2 py-1 text-xs font-medium bg-gray-100 ${dateColor}`}>
              <div className="relative group">
                <span className={unlocked ? "text-yellow-500" : ""}>{unlocked ? "⚠️" : "⏱"}</span>
                <span className="ml-1">{getTimeRemaining(goal.unlockTime.toNumber())}</span>
                <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                  <span className="relative z-10 p-2 text-xs leading-none text-gray-700 bg-gray-200 shadow-inner">
                    {unlockDate}
                  </span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-200"></div>
                </div>
              </div>
            </div>
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
      {unlocked && (
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
          >
            Goal completed!
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
