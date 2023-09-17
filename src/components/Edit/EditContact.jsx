import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateContact } from "../../api";

export default function EditContact ({ open, setOpen, editData, onContactUpdated}) {
  
  const cancelButtonRef = useRef(null);

  const [name, setName] = useState(editData ? editData.Info.Name: '');
  const [email, setEmail] = useState(editData ?editData.Info.DefaultEmail.EmailAddress: '');
  const [phone, setPhone] = useState(editData ? editData.Info.DefaultPhone.Number: '');
  const [id, setId] = useState(editData ? editData.ID: 0);
  const [infoId, setInfoId] = useState(editData ? editData.Info.ID: 0);
  const [emailId, setEmailId] = useState(editData ? editData.Info.DefaultEmailID: 0);
  const [phoneId, setPhoneId] = useState(editData ? editData.Info.DefaultPhoneID: 0);

  useEffect(() => {
    if (editData) {
      console.log('EditData', editData)
      setName(editData.Info.Name);
      setEmail(editData.Info.DefaultEmail.EmailAddress);
      setPhone(editData.Info.DefaultPhone.Number);
      setId(editData.ID);
      setInfoId(editData.Info.ID);
      setEmailId(editData.Info.DefaultEmailID);
      setPhoneId(editData.Info.DefaultPhoneID);
    }
  }, [editData]);

  const handleSubmit = async () => {
    console.log('handleSubmit in EditContact')
    try {
      const updatedContact = {
        name,
        email,
        phone,
      };
      console.log('Updating contact', id, infoId, updatedContact);
      const result = await updateContact(id, infoId, emailId, phoneId, updatedContact);
      console.log(result);
      onContactUpdated(result);
      setOpen(false);
      console.log(result);
    } catch (error) {
      console.log("Could not update contact:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2 mb-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="name"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="   John Doe"
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2 mb-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="you@example.com"
                    />
                  </div>

                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="phone"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="   +47 5939000087"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleSubmit} //handle form submit
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

