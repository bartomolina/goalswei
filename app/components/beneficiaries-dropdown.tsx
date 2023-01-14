import { FormEvent, Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import makeBlockie from "ethereum-blockies-base64";
import { IBeneficiary } from "../global";
import { useGoals } from "./goals-context";
import { BigNumberish } from "ethers";

type FormData = {
  goal: string;
  arbiter: string;
  beneficiary: string;
  depositAmount: BigNumberish;
  dueDate: number;
};

type Props = {
  formData: FormData;
  setFormData: Function;
};

const BeneficiariesDropdown = ({ formData, setFormData }: Props) => {
  const { beneficiaries } = useGoals();
  const [selected, setSelected] = useState({});

  const handleSelect = (selected: IBeneficiary) => {
    setFormData({
      ...formData,
      beneficiary: selected.addr,
    });
    setSelected(selected);
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="relative rounded-md border border-gray-300 p-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
      <Listbox value={selected} onChange={handleSelect}>
        {({ open }) => (
          <>
            <Listbox.Label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-gray-800">
              Beneficiary
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="text-sm block w-full border-0 p-0 font-mono text-gray-600 placeholder-gray-200 focus:ring-0 cursor-default">
                <span className="flex items-center h-3">
                  {formData && Object.keys(formData.beneficiary).length != 0 && (
                    <>
                      <img
                        src={makeBlockie(formData.beneficiary)}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span className="ml-2 truncate">{formData.beneficiary}</span>
                    </>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {beneficiaries.map((beneficiary: IBeneficiary) => (
                    <Listbox.Option
                      key={beneficiary.addr}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={beneficiary}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={makeBlockie(beneficiary.addr)}
                              alt=""
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                            <span
                              className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}
                            >
                              {beneficiary.addr}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default BeneficiariesDropdown;
