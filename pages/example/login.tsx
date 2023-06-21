import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { GithubIcon, TwitterIcon } from "icons";
import { postRequest } from "api/index";
import { useRouter } from "next/router";

function LoginPage() {
  const { mode } = useContext(WindmillContext);
  const route = useRouter();
  const [payload, setPayload] = useState({ username: "", password: "" });
  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log({ payload });
    if (payload.username === "" || payload.password === "") {
      alert("Username or Password cannot be empty");
      return;
    }
    console.log("got here");
    onSubmit();
  };

  const onSubmit = async () => {
    console.log({ payload });
    try {
      const result = await postRequest("/users/login", payload);
      console.log({ result });
      if (result?.status == 0) {
        alert(result?.message);
        return;
      }
      localStorage.setItem("userprofile", JSON.stringify(result?.message));
      return route.push("/example");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="john@doe.com"
                  id="username"
                  onChange={handleChange}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  id="password"
                  placeholder="***************"
                  onChange={handleChange}
                />
              </Label>

              {/* <Link href="/example" passHref={true}> */}
              <Button className="mt-4" block onClick={handleSubmit}>
                Log in
              </Button>
              {/* </Link> */}

              <hr className="my-8" />

              <p className="mt-1">
                <Link href="/example/create-account">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Create account
                  </a>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
