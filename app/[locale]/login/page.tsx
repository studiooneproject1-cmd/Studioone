"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLoginSchema } from "@/app/models/db/lib/schemas/loginSchema";
import Logo from "@/public/WhiteLogo.png";
import { toast } from "sonner";

type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<loginForm>({ password: "", email: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loginSchema = getLoginSchema(false);
    const result = loginSchema.safeParse(form);

    // VALIDATION ERROR
    if (!result.success) {
      const msg = result.error.issues[0].message;
      setError(msg);
      toast.error(msg);
      setLoading(false);
      setTimeout(() => setError(""), 3000);
      return;
    }

    // SIGN IN
    const valid = await signIn("credentials", {
      password: form.password,
      email: form.email,
      redirect: false,
    });

    // SUCCESS
    if (valid?.ok === true) {
      toast.success("Logged in successfully!");
      router.push("/");
      return;
    }

    // FAIL
    const msg = "Invalid email or password. Please try again.";
    setError(msg);
    toast.error(msg);
    setLoading(false);
    setTimeout(() => setError(""), 3000);
  };

  return (
    <main className="flex min-h-screen">
      
      {/* LEFT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <form
          className="max-w-lg w-full p-7 rounded-lg"
          onSubmit={onSubmit}
          dir="ltr"
        >

          {/* EMAIL */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>

            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                value={form.password}
                onChange={handleChange}
              />

              {/* EYE ICON CENTER FIXED */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {!showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* ERROR DISPLAY (OPTIONAL) */}
          {error && (
            <div className="text-red-500 mt-1 p-2.5 bg-red-50 mb-2 rounded-lg flex justify-center">
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
            w-full px-5 py-2.5 text-center cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* BACK LINK */}
          <Link
            href="/"
            className="block pt-4 text-center text-sm underline-offset-4 text-gray-900 hover:underline m-2"
          >
            Back To Home Page
          </Link>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <Image
            src={Logo}
            alt="Logo"
            width={350}
            height={350}
            className="mx-auto mb-4 object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
