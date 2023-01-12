import { IGoal } from "../global";
import { useGoals } from "./goals-context";
import Card from "./card";

const GoalsGrid = ({ unlocked = false }) => {
  const { goals } = useGoals();

  const goalsFiltered = unlocked
    ? goals.filter((goal: IGoal) => goal.unlockTime.toNumber() * 1000 <= Date.now())
    : goals.filter((goal: IGoal) => goal.unlockTime.toNumber() * 1000 > Date.now());

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {goalsFiltered?.map((goal: IGoal) => {
        return (
          <li key={goal.addr} className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow">
            <Card goal={goal} />
          </li>
        );
      })}
    </ul>
  );
};

export default GoalsGrid;
