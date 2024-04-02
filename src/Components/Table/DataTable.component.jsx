import React, { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import SweetAlert2 from "react-sweetalert2";
import { SheetTrigger } from "../ui/sheet";
import TableLoading from "../../assets/TableLoading.json";
import "animate.css/animate.min.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import { useDeleteContactMutation } from "../../store/endpoints/contact.endpoints";
import LoadingComponent from "../Loading/Loading.component";
import { toast } from "sonner";

const DataTableComponent = ({ contactData, editHandler }) => {
  const [
    deleteContactFun,
    { isError: error, isLoading: loading, isSuccess, data: deleteData },
  ] = useDeleteContactMutation();

  const [swalProps, setSwalProps] = useState({});

  const alertHandler = (id) => {
    console.log(id);
    setSwalProps({
      show: true,
      title: "Are you sure?",
      text: "You will lose your data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      onResolve: () => {
        setSwalProps({
          show: false,
        });
      },
      onConfirm: async () => {
        setSwalProps({
          show: false,
        });
        await deleteContactFun(id);
        toast.success("Delete contact successfully");
      },
    });
  };
  return (
    <div className="bg-white shadow px-5 ">
      {loading ? (
        <div className=" absolute z-50 w-40 h-40 left-[40%] ">
          <LoadingComponent data={TableLoading} />
        </div>
      ) : (
        <div>
          <Table className=" text-xs md:text-sm ">
            <TableHeader className=" bg-blue-600 !rounded-xl ">
              <TableRow className=" border-none">
                <TableHead className="w-[100px] text-white rounded-l-xl">
                  No
                </TableHead>
                <TableHead className=" text-white">Name</TableHead>
                <TableHead className=" text-white">Email</TableHead>
                <TableHead className=" text-white">Phone</TableHead>
                <TableHead className=" text-white">Address</TableHead>
                <TableHead className=" text-white rounded-r-xl">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
            {contactData?.map((contact, index) => {
              return (
                <TableRow key={contact?.id}>
                  <TableCell className="font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="">{contact?.name}</TableCell>
                  <TableCell>{contact?.email}</TableCell>
                  <TableCell>{contact?.phone}</TableCell>
                  <TableCell>{contact?.address}</TableCell>
                  <TableCell>
                    <div className=" lg:space-x-2 space-x-0 space-y-2 lg:space-y-0">
                      <SheetTrigger asChild>
                        <Button
                          onClick={() => editHandler(contact?.id)}
                          variant="outline"
                          className=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="md:w-4 md:h-4 w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </Button>
                      </SheetTrigger>

                      <Button
                        onClick={() => alertHandler(contact?.id)}
                        variant=""
                        className="bg-red-600 text-slate-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="md:w-4 md:h-4 w-3 h-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
          <SweetAlert2 {...swalProps} />
        </div>
      )}
    </div>
  );
};

export default DataTableComponent;
