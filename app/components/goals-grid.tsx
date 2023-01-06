import makeBlockie from "ethereum-blockies-base64";

const GoalsGrid = ({ goals }) => (
  <>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {goals?.map((goal) => {
        return (
          <li
            key={goal.addr}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className={""}></div>

            <div className="flex flex-1 flex-col p-8">
              <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={makeBlockie(goal.depositor)} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{goal.goal}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{goal.arbiter}</dd>
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {goal.beneficiary}
                  </span>
                </dd>
              </dl>
            </div>
          </li>
        );
      })}
    </ul>
  </>
);

export default GoalsGrid;
