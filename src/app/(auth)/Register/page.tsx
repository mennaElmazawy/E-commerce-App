// "use client";

// import React from "react";
// import { Form, useForm } from "react-hook-form";
// import { Button } from "src/components/ui/button";
// import {
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

// export default function Register() {
//   const router = useRouter();
//   const SchemeRegister = zod
//     .object({
//       name: zod
//         .string()
//         .nonempty("Name is required")
//         .min(2, "minimum 2 char")
//         .max(15, "maximum 15 char "),
//       email: zod.string().email("email is valid").nonempty("email is required"),
//       password: zod
//         .string()
//         .nonempty("password is required")
//         .regex(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//           "password is not valid"
//         ),
//       rePassword: zod
//         .string()
//         .nonempty("password is required")
//         .regex(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//           "password is not valid"
//         ),
//       phone: zod
//         .string()
//         .nonempty("phone is required")
//         .regex(/^(010|011|012|015)[0-9]{8}$/, "phone is not valid"),
//     })
//     .refine(
//       (obj) => {
//         return obj.password == obj.rePassword;
//       },
//       {
//         path: ["rePassword"],
//         error: "passwords do not match",
//       }
//     );
//   const RegisterForm = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     resolver: zodResolver(SchemeRegister),
//   });

//   async function handleRegister(values: zod.infer<typeof SchemeRegister>) {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
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
//     if (data.messege === "success") {
//       toast.success("Account created successfully !", {
//         position: "top-center",
//       });
//       router.push("/login");
//     } else {
//       toast.error(data.messege), { position: "top-center" };
//     }
//   }
//   return (
//     <>
//       <h1>Register now</h1>
//       <Form {...RegisterForm}>
//         <form
//           onSubmit={RegisterForm.handleSubmit(handleRegister)}
//           className="space-y-3"
//         >
//           <FormField
//             control={RegisterForm.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> Name</FormLabel>
//                 <FormControl>
//                   <Input type="text" {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={RegisterForm.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={RegisterForm.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> password</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={RegisterForm.control}
//             name="rePassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> rePassword</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//          
//           <FormField
//             control={RegisterForm.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> phone</FormLabel>
//                 <FormControl>
//                   <Input type="tel" {...field} />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button className="w-full bg-main">Register</Button>
//         </form>
//       </Form>
//     </>
//   );
// }


"use client";

import React from "react";
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

export default function Register() {
  const router = useRouter();

  const SchemeRegister = zod
    .object({
      name: zod
        .string()
        .nonempty("Name is required")
        .min(2, "Minimum 2 characters")
        .max(15, "Maximum 15 characters"),
      email: zod
        .string()
        .nonempty("Email is required")
        .email("Email is not valid"),
      password: zod
        .string()
        .nonempty("Password is required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain uppercase, lowercase, number, special char and be at least 6 chars"
        ),
      rePassword: zod
        .string()
        .nonempty("Please confirm your password"),
      phone: zod
        .string()
        .nonempty("Phone is required")
        .regex(/^(010|011|012|015)[0-9]{8}$/, "Phone is not valid"),
    })
    .refine((obj) => obj.password === obj.rePassword, {
      path: ["rePassword"],
      message: "Passwords do not match",
    });

  const RegisterForm = useForm<zod.infer<typeof SchemeRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(SchemeRegister),
  });

  async function handleRegister(values: zod.infer<typeof SchemeRegister>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.message === "success") {
        toast.success("Account created successfully!", {
          position: "top-center",
        });
        router.push("/Login");
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Network error", { position: "top-center" });
    }
  }

  return (
    <>
      <h1>Register now</h1>
      <Form {...RegisterForm}>
        <form
          onSubmit={RegisterForm.handleSubmit(handleRegister)}
          className="space-y-3"
        >
          {/* Name */}
          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={RegisterForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={RegisterForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-main">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}

