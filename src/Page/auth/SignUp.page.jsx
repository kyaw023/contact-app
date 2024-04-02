import { Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  default as routeLoading,
  default as signUp,
} from "../../assets/signUp.json";

import LoadingComponent from "../../Components/Loading/Loading.component";
import FormComponent from "../../Components/Form/Form.component";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { useSignUpMutation } from "../../store/endpoints/auth.endpoints";
const SignUpPage = () => {
  const [signUpFun, postData] = useSignUpMutation();

  const { isError, isLoading, isSuccess, data, error } = postData;

  const nav = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid email format!"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 letters"),
    password_confirmation: yup
      .string()
      .required("password_confirmation is required")
      .oneOf([yup.ref("password"), null], "password does't match"),
  });
  useEffect(() => {
    if (isSuccess) {
      nav("/");
    }
  }, [data]);
  const handleSubmit = async (values) => {
    await signUpFun(values);
  };

  console.log(isSuccess, data, error);

  return (
    <div className=" container-layout py-2">
      {isLoading ? (
        <div className=" center-layout h-screen">
          <LoadingComponent data={routeLoading} />
        </div>
      ) : (
        <div className=" center-layout md:space-x-10 md:h-screen mt-20">
          <div className=" hidden md:block">
            <LoadingComponent data={signUp} />
          </div>
          <Card className="w-[350px]">
            <CardHeader className=" flex flex-row items-center justify-between mb-3">
              <CardTitle>Sign Up</CardTitle>
              <Link to={"/"}>
                <CardDescription className=" text-sky">
                  Already have an account
                </CardDescription>
              </Link>
            </CardHeader>
            <CardContent>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValue}
              >
                {({ handleBlur, handleChange, values, isSubmitting }) => (
                  <>
                    {
                      <Form className=" flex flex-col gap-4">
                        <div className="grid w-full items-center gap-4">
                          <FormComponent
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values.name}
                            format={"name"}
                            id={"name"}
                            type={"name"}
                            name={"name"}
                            lableName={"Name"}
                            placeholder={"Enter your name"}
                          />
                          <FormComponent
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values.email}
                            name={"email"}
                            type={"email"}
                            id={"email"}
                            lableName={"Email Address"}
                            placeholder={"Enter your email address"}
                          />

                          <FormComponent
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values.password}
                            id={"password"}
                            type={"password"}
                            name={"password"}
                            lableName={"Password"}
                            placeholder={"Enter your password"}
                          />

                          <FormComponent
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values.password_confirmation}
                            type={"password"}
                            name={"password_confirmation"}
                            id={"password_confirmation"}
                            lableName={"password_confirmation"}
                            placeholder={"Enter your password_confirmation"}
                          />
                        </div>

                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          className=" bg-sky w-full mt-3 text-white"
                        >
                          Sign Up{" "}
                          {isSubmitting && (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          )}
                        </Button>
                      </Form>
                    }
                  </>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
