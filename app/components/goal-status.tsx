import { IGoal } from "../global";
import { GoalStatusEnum } from "../lib/utils";
import { getTimeRemaining } from "../lib/utils";

type Props = {
  goal: IGoal;
};

const GoalStatus = ({ goal }: Props) => {
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
    dateColor = "text-gray-500";
    unlocked = true;
  }

  let statusText = "awaiting arbiter";
  let statusStyle = "bg-gray-100";
  switch (goal.status) {
    case GoalStatusEnum.Approved:
      statusText = "approved";
      statusStyle = "bg-green-100 text-green-500";
      break;
    case GoalStatusEnum.Rejected:
      statusText = "rejected";
      statusStyle = "bg-red-100 text-red-500";
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className={`m-auto rounded-lg px-2 py-1 text-xs font-medium bg-gray-100 ${dateColor}`}>
        <div className="relative group">
          <span>{unlocked ? "" : "⏱"}</span>
          <span className="ml-1">{getTimeRemaining(goal.unlockTime.toNumber())}</span>
          <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
            <span className="relative z-10 p-2 text-xs leading-none text-gray-700 bg-gray-200 shadow-inner">
              {unlockDate}
            </span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-200"></div>
          </div>
        </div>
      </div>
      {unlocked && (
        <div className={`m-auto rounded-lg px-2 py-1 text-xs font-medium ${statusStyle}`}>
          <span>{statusText}</span>
          <br />
        </div>
      )}
    </div>
  );
};

export default GoalStatus;
