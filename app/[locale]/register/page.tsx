"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getRegisterSchema,
  type RegisterFormType,
} from "@/app/models/db/lib/schemas/registerSchema";
import Logo from "@/public/WhiteLogo.png";
import { toast } from "sonner";

const RegisterPage = () => {
   notFound();
  return null; 
  const router = useRouter();
  const registerSchema = getRegisterSchema();

  const [form, setForm] = useState<RegisterFormType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};

      (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach(
        (key) => {
          const messages = fieldErrors[key];
          if (messages && messages[0]) {
            newErrors[key as string] = messages[0];
            toast.error(messages[0]);
          }
        }
      );

      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/users/register`,
        {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
        }
      );

      toast.success("Account created successfully!");

      const loginResult = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginResult?.ok) {
        router.push("/");
      } else {
        toast.error("Failed to login after registration.");
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Registration failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      
      
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <form
          className="max-w-lg w-full p-7 rounded-lg"
          onSubmit={onSubmit}
          dir="ltr"
        >
          <h1 className="text-2xl flex justify-center mb-4 font-semibold text-gray-800">
            Create Account
          </h1>


          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              disabled={loading}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>


          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              disabled={loading}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

 
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled={loading}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

    
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                disabled={loading}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>


          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                disabled={loading}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

      
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
            w-full px-5 py-2.5 text-center cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <Link
            href="/login"
            className="block pt-4 text-center text-sm underline-offset-4 text-gray-900 hover:underline m-2"
          >
            Already have an account?
          </Link>
        </form>
      </div>

     
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

export default RegisterPage;
