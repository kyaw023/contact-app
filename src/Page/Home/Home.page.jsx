import React, { useState } from "react";
import {
  DataTableComponent,
  DrawerComponent,
  EmpytComponent,
  NavComponent,
  RouteGuardComponent,
} from "../../Components";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../Components/ui/sheet";

import { useGetContactQuery } from "../../store/endpoints/contact.endpoints";
import { Button } from "../../Components/ui/button";

const HomePage = () => {
  const { isError, isLoading, data } = useGetContactQuery();

  const contactData = data?.contacts?.data;

  const [edit, setEdit] = useState({
    editContact: false,
    editData: null,
  });

  const editHandler = (id) => {
    const isExisted = contactData.find((cd) => cd.id === id);

    setEdit({ editContact: true, editData: isExisted });
  };

  const handleClose = () => {
    setEdit({ editContact: false, editData: null });
  };

  return (
    <RouteGuardComponent>
      <Sheet>
        <div className=" container-layout">
          <NavComponent />
          <SheetTrigger asChild>
            <div className=" flex md:justify-end my-10 px-3">
              <Button
                variant=""
                className="bg-blue-600 text-slate-100 text-xs md:text-sm"
              >
                <div className=" flex items-center gap-1 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:w-6 md:h-6 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p>Create Contact</p>
                </div>
              </Button>
            </div>
          </SheetTrigger>

          <div>
            {contactData?.length === 0 ? (
              <>
                <div className=" border border-slate-200 h-screen rounded">
                  <EmpytComponent />
                </div>
              </>
            ) : (
              <>
                <DataTableComponent
                  contactData={contactData}
                  editHandler={editHandler}
                />
              </>
            )}
          </div>
          <SheetContent onClose={handleClose} onOverlayClick={handleClose}>
            <SheetHeader>
              <SheetTitle>Contact Information</SheetTitle>
            </SheetHeader>
            <div className="">
              <DrawerComponent edit={edit} handleClose={handleClose} />
            </div>
          </SheetContent>
        </div>
      </Sheet>
    </RouteGuardComponent>
  );
};

export default HomePage;
