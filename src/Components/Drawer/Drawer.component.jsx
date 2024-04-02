import { Form, Formik } from "formik";
import React, { useRef } from "react";

import * as yup from "yup";
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from "../../store/endpoints/contact.endpoints";
import FormComponent from "../Form/Form.component";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const DrawerComponent = ({ edit, handleClose }) => {
  const [createContactFun, createData] = useCreateContactMutation();

  const [updateContactFun, { data: updateData }] = useUpdateContactMutation();

  const closeRef = useRef();

  const initialValue = {
    email: edit?.editData?.email || "",
    name: edit?.editData?.name || "",
    phone: edit?.editData?.phone || "",
    address: edit?.editData?.address || "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .required("email is required!")
      .email("Invalid email format!"),

    phone: yup
      .string()
      .required("Phone field is required!")
      .min(9, "phone number must be 8 letters (min)")
      .max(11, "phone number must be 11 letters (max)"),
    address: yup.string().required("address is required"),
  });

  const handleSubmit = async (values) => {
    if (edit?.editContact) {
      await updateContactFun({ id: edit?.editData?.id, ...values });
      toast.success("Update contact successfully");
    } else {
      await createContactFun(values);
      toast.success("Create contact successfully");
    }

    closeRef?.current.click();
  };
  return (
    <div className="">
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValue}
      >
        {({ handleBlur, handleChange, values, isSubmitting }) => (
          <>
            {
              <Form className="">
                <div className="flex flex-col gap-4 mt-5 h-full">
                  <div className=" space-y-5">
                    <FormComponent
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values.name}
                      format={"name"}
                      id={"name"}
                      type={"text"}
                      name={"name"}
                      lableName={"Name"}
                      placeholder={"Enter your name"}
                    />
                    <FormComponent
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values.email}
                      type={"email"}
                      name={"email"}
                      id={"email"}
                      lableName={"Email Address"}
                      placeholder={"Enter your email"}
                    />
                    <FormComponent
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values.phone}
                      format={"phone"}
                      id={"phone"}
                      type={"text"}
                      name={"phone"}
                      lableName={"Phone"}
                      placeholder={"Enter your Phone"}
                    />
                    <FormComponent
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values.address}
                      format={"address"}
                      id={"address"}
                      type={"text"}
                      name={"address"}
                      lableName={"Address"}
                      placeholder={"Enter your Address"}
                    />
                  </div>
                  <div className="flex justify-between items-center space-x-2 pb-10">
                    <SheetClose ref={closeRef} className=" w-full">
                      <Button
                        onClick={handleClose}
                        variant="outline"
                        disabled={isSubmitting}
                        type="button"
                        className="  border-blue-600 w-full mt-3 text-xs md:text-sm"
                      >
                        Cancle
                      </Button>
                    </SheetClose>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className=" bg-sky w-full mt-3 text-white text-xs md:text-sm"
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {edit?.editContact ? "UpdateContact" : "CreateContact"}
                    </Button>
                  </div>
                </div>
              </Form>
            }
          </>
        )}
      </Formik>
    </div>
  );
};

export default DrawerComponent;
