// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "src/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "src/components/ui/form";
// import { Input } from "src/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as zod from "zod";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();
//   const SchemeLogin = zod.object({
//     email: zod.string().email("email is valid").nonempty("email is required"),
//     password: zod
//       .string()
//       .nonempty("password is required")
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//         "password is not valid"
//       ),
//   });

//   const LoginForm = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(SchemeLogin),
//   });

//   async function handleRegister(values: zod.infer<typeof SchemeLogin>) {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );
//     const data = await res.json();
//     console.log(data);
//     if (data.message === "success") {
//       toast.success("Logined !", { position: "top-center" });
//       router.push("/");
//     } else {
//       toast.error(data.message, { position: "top-center" });
//     }
//     return (
//       <>
//         <h1>Login now</h1>
//         <Form {...LoginForm}>
//           <form
//             onSubmit={LoginForm.handleSubmit(handleRegister)}
//             className="space-y-3"
//           >
//             <FormField
//               control={LoginForm.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel> email</FormLabel>
//                   <FormControl>
//                     <Input type="email" {...field} />
//                   </FormControl>
//                   <FormDescription />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={LoginForm.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel> password</FormLabel>
//                   <FormControl>
//                     <Input type="password" {...field} />
//                   </FormControl>
//                   <FormDescription />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button className="w-full bg-main">Login</Button>
//           </form>
//         </Form>
//       </>
//     );
//   }
// }

"use client";

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { CountContext } from "src/CountProvider";

import { getCartData } from "src/CartAction/CartAction";
import { CartData } from "src/types/cart.type";

export default function Login() {
  const router = useRouter();
  const { setCount } = useContext(CountContext);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCart() {
      if (session?.user) {
        const cart: CartData = await getCartData();
        const sum = cart.data.products.reduce(
          (total, item) => total += item.count,
          0
        );
        setCount(sum);
      } 
    }
    fetchCart();
  }, [session, setCount]);

  const SchemeLogin = zod.object({
    email: zod
      .string()
      .email("email is not valid")
      .nonempty("email is required"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "password is not valid"
      ),
      // token: zod
      // .string()
      // .nonempty("password is required")
      // .regex(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      //   "password is not valid"
      // ),
  });

  const LoginForm = useForm<zod.infer<typeof SchemeLogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemeLogin),
  });

  async function handleLogin(values: zod.infer<typeof SchemeLogin>) {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (data?.ok) {
      toast.success("Login success!", { position: "top-center" });

      router.push("/");
    } else {
      toast.error(data?.error, { position: "top-center" });
    }
  }

  return (
    <>
      <h1>Login now</h1>
      <Form {...LoginForm}>
        <form onSubmit={LoginForm.handleSubmit(handleLogin)} className="space-y-3">
          <FormField
            control={LoginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/ForgetPassword"> Forget Password???</Link>
          <Button type="submit" className="w-full bg-main cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
