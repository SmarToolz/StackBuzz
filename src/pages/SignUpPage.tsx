import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type SignUpFormValues = z.infer<typeof formSchema>;

const SignUpPage: React.FC = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log("Sign Up Attempt:", values);
    toast.success("Account creation simulated! Check console for details.");
    // In a real app, this would call an API endpoint.
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center">Create Your Account</h2>
        <p className="text-center text-gray-400">Start your free 7-day trial now.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-gray-900 border-gray-700 text-white focus:ring-brand-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-gray-900 border-gray-700 text-white focus:ring-brand-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Primary Button */}
            <Button 
              type="submit" 
              className="w-full py-3 text-lg font-semibold transition-colors 
                         bg-brand-primary hover:bg-brand-hover text-white"
            >
              Create Your Free Account
            </Button>
          </form>
        </Form>

        {/* Legal Anchor Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <Link to="#" className="underline hover:text-brand-hover">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="#" className="underline hover:text-brand-hover">
            Privacy Policy
          </Link>
          .
        </p>
        
        {/* Optional: Magic Link Option */}
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-600">Or</span>
        </div>
        <Button variant="outline" className="w-full bg-black border-gray-700 text-gray-300 hover:bg-gray-900">
          Send Magic Link
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;