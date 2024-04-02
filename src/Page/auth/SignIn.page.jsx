import { Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { RouteGuardComponent } from "../../Components";
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
import signIn from "../../assets/signIn.json";
import { useSignInMutation } from "../../store/endpoints/auth.endpoints";

const SignInPage = () => {
  const [singInFun, { isSuccess, isError, data }] = useSignInMutation();
  const nav = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid email format!"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 letters"),
  });

  const handleSubmit = async (values) => {
    await singInFun(values);
  };

  useEffect(() => {
    if (data?.success) {
      nav("/home");
    } else if (!localStorage.getItem("token")) {
      nav("/");
    }
  }, [data]);

  return (
    <RouteGuardComponent check={data?.success} token={data?.token}>
      <div className=" container-layout py-2">
        <div className=" center-layout md:h-screen  mt-40">
          <div className=" center-layout md:space-x-10">
            <div className="center-layout hidden md:block">
              <LoadingComponent data={signIn} />
            </div>
            <div>
              <Card className="md:w-[350px] w-[340px]">
                <CardHeader className="flex md:flex-row items-center justify-between mb-3">
                  <CardTitle>Sign In</CardTitle>
                  <Link to={"/sign_up"}>
                    <CardDescription className=" text-sky">
                      I don't have an account
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
                                values={values.password}
                                format={"password"}
                                id={"password"}
                                type={"password"}
                                name={"password"}
                                lableName={"Password"}
                                placeholder={"Enter your password"}
                              />
                            </div>
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              className=" bg-sky w-full mt-3 text-white"
                            >
                              Sign In
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
          </div>
        </div>
      </div>
    </RouteGuardComponent>
  );
};

export default SignInPage;
