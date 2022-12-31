import { FormEvent } from "react";

const NewResolutionForm = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert("Message sent");
  };

  return (
    <div className="max-w-lg">
      <div className="bg-white p-8 shadow rounded-lg">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="goal" className="block text-gray-900">
              <span className="block font-bold">Goal</span>
              <span className="block text-xs text-gray-400">Set a goal, You're gonna make it!</span>
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
            <label htmlFor="arbiter" className="block text-gray-900">
              <span className="block font-bold">Arbiter address</span>
              <span className="block text-xs text-gray-400">You can use a ENS name too</span>
            </label>
            <div className="mt-1">
              <input
                id="arbiter"
                name="arbiter"
                type="text"
                required={true}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="PLW3.eth"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="beneficiary" className="block text-gray-900">
              <span className="block font-bold">Beneficiary address</span>
              <span className="block text-xs text-gray-400">You can use a ENS name too</span>
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
            <label htmlFor="depositAmount" className="block text-gray-900">
              <span className="block font-bold">Deposit amount</span>
              <span className="block text-xs text-gray-400">Set it in ETH</span>
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
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Let's go!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResolutionForm;
