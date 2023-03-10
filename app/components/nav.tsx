import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ActiveLink from "./active-link";

const navigation = [
  { name: "New goal", href: "/" },
  { name: "Your goals", href: "/goals" },
  { name: "Beneficiaries", href: "/beneficiaries" },
];

const Nav = () => {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg- hite">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex h-9 justify-between">
              <div className="hidden sm:flex">
                {/* Home */}
                <div className="text-2xl mr-5 font-semibold lg:mr-11 lg:inline hidden">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">GoalsWei.io</span>
                </div>
                {/* Menu items */}
                <div className="hidden sm:flex md:space-x-11 sm:space-x-5">
                  {navigation.map((item) => (
                    <ActiveLink
                      key={item.href}
                      activeClassName="text-gray-900 border-indigo-500"
                      inactiveClassName="text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-200"
                      className="px-1 pt-1 border-b-2 text-sm font-semibold"
                      href={item.href}
                    >
                      {item.name}
                    </ActiveLink>
                  ))}
                </div>
              </div>
              {/* Right menu items */}
              <div className="sm:ml-6 sm:items-center">
                <ConnectKitButton showBalance={true} />
              </div>
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button
                  type="button"
                  className="inline-flex p-2 rounded-md bg-white text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <ActiveLink
                  key={item.href}
                  activeClassName="text-indigo-700 border-indigo-500"
                  inactiveClassName="hover:bg-gray-50 text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
                  className="block pl-3 py-2 border-l-4 font-semibold"
                  href={item.href}
                >
                  {item.name}
                </ActiveLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
