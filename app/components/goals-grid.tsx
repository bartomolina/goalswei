import { useGoals } from "./goals-context";
import Card from "./card";

const GoalsGrid = ({ unlocked = false, filter }) => {
  const { goals } = useGoals();
  let goalsFiltered = goals?.slice().sort((a, b) => a.unlockTime - b.unlockTime);
  if (filter) {
    goalsFiltered = goalsFiltered.filter(goal => goal[filter.field] === filter.value);
  }
  goalsFiltered = unlocked
    ? goalsFiltered.filter((goal) => goal.unlockTime.toNumber() * 1000 <= Date.now())
    : goalsFiltered.filter((goal) => goal.unlockTime.toNumber() * 1000 > Date.now());

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {goalsFiltered?.map((goal) => {
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
