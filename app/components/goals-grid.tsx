import Card from "./card";

const GoalsGrid = ({ goals }) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {goals?.map((goal) => {
        return (
          <li key={goal.addr} className="flex space-x-5 overflow-hidden rounded-lg border border-gray-300 shadow">
            <Card goal={goal} />
          </li>
        );
      })}
  </ul>
);

export default GoalsGrid;
