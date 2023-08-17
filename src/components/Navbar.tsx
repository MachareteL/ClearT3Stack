import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Clear from "public/ClearG.svg";
import Logo from "public/logo.png";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Catálogo", href: "/product", current: false },
  { name: "Quem Somos", href: "/about", current: false },
  { name: "Frete", href: "#", current: false },
];

export default function Navbar() {
  const { status, data } = useSession();

  const { pathname } = useRouter();
  if (pathname == "/signup") {
    return <></>;
  }
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start sm:space-x-20">
                <Link href={"/"} className="flex flex-shrink-0 items-center">
                  <Image
                    height={42}
                    width={42}
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    src={Logo}
                    alt="Your Company"
                  />
                  <Image src={Clear} alt="Clear" height={42} width={72} />
                  {/* <img
                    className="h-10 w-auto"
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    src="logo.png"
                    alt="Your Company"
                  /> */}
                  {/* <h1
                    className={`${pacifico.className} text-3xl text-[#252B42]`}
                  >
                    Clear
                  </h1> */}
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex h-full items-center space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`${
                          item.current ? "" : ""
                        } text-base font-medium text-[#737373]`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}

                {status != "authenticated" ? (
                  <Link
                    href={"/signup"}
                    className={`mr-3 flex space-x-1 text-primary-light-blue`}
                  >
                    <UserIcon className="h-6 w-6" />
                    Login
                  </Link>
                ) : (
                  <Menu as="div" className="relative mr-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full  text-sm">
                        <span className="absolute -inset-1.5" />
                        <img
                          className="h-8 w-8 rounded-full"
                          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={
                            data?.user.image ??
                            "https://via.placeholder.com/150"
                          }
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                        {data.user.role == "admin" ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/admin/newproduct"
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700`}
                                >
                                  Criar Produtos
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/admin/manageproduct"
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700`}
                                >
                                  Gerenciar Produtos
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                <button
                  type="button"
                  className="rounded-full text-primary-light-blue"
                >
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
