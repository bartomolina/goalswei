import { IBeneficiary } from "../global";
import Image from "next/image";
import { useGoals } from "../components/goals-context";
import { truncateEthAddress } from "../lib/utils";
import makeBlockie from "ethereum-blockies-base64";
import { isValidHttpUrl } from "../lib/utils";

const BeneficiariesTable = () => {
  const { beneficiaries } = useGoals();

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Beneficiary
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Description / URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {beneficiaries.map((beneficiary: IBeneficiary) => (
            <tr key={beneficiary.addr} className="h-24">
              <td className="py-4 pl-4 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      width={10}
                      height={10}
                      className="h-10 w-10 rounded-xl"
                      src={makeBlockie(beneficiary.addr)}
                      alt={beneficiary.addr}
                    />
                  </div>
                  <div className="ml-6">
                    <div className="font-mono text-gray-800">{truncateEthAddress(beneficiary.addr)}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-600">
                  {isValidHttpUrl(beneficiary.info) ? (
                    <a href={beneficiary.info} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {beneficiary.info}
                    </a>
                  ) : (
                    beneficiary.info
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeneficiariesTable;
