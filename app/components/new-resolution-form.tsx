const NewResolutionForm = () => {
  return (
    <div className="max-w-lg">
      <div className="bg-white p-8 shadow rounded-lg">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="goal" className="block text-gray-900">
              <span className="block font-bold">
                Goal
              </span>
              <span className="block text-sm text-gray-500">
                Set your goal, You're gonna make it!
              </span>
            </label>
            <div className="mt-1">
              <input
                id="goal"
                name="goal"
                type="text"
                required={true}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Run a marathon"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="arbitrer" className="block text-sm text-gray-900">
            Arbitrer Address
            </label>
            <div className="mt-1">
              <input
                id="arbitrer"
                name="arbitrer"
                type="text"
                required={true}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="PLW3.eth"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="beneficiary" className="block text-sm text-gray-900">
            Beneficiary Address
            </label>
            <div className="mt-1">
              <input
                id="beneficiary"
                name="beneficiary"
                type="text"
                required={true}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="depositAmount" className="block text-sm text-gray-900">
            Deposit amount (in ETH)
            </label>
            <div className="mt-1">
              <input
                id="depositAmount"
                name="depositAmount"
                type="text"
                required={true}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="0.01"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResolutionForm;
