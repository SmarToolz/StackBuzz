import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Chrome } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type AuthFormValues = z.infer<typeof formSchema>;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOAuthSignIn = async (provider: 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // Redirect after successful OAuth flow
      },
    });

    if (error) {
      toast.error(`OAuth sign-in failed: ${error.message}`);
    }
    // Supabase handles the redirect, so no need for navigation here.
  };

  const onSubmit = async (values: AuthFormValues) => {
    const { email, password } = values;
    
    if (isLogin) {
      // Login logic
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully! Redirecting...");
        // Supabase auth listener handles session update, but we navigate immediately
        navigate("/dashboard");
      }
    } else {
      // Sign up logic
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check your email for confirmation.");
        // Note: If using email confirmation, the user won't be logged in immediately.
      }
    }
  };

  const title = isLogin ? "Welcome Back" : "Create Your Account";
  const subtitle = isLogin ? "Log in to access your dashboard." : "Start your free 7-day trial now.";
  const buttonText = isLogin ? "Log In" : "Create Your Free Account";

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center">{title}</h2>
        <p className="text-center text-gray-400">{subtitle}</p>

        {/* Google OAuth Button */}
        <Button 
          variant="outline" 
          onClick={() => handleOAuthSignIn('google')}
          className="w-full bg-black border-gray-700 text-gray-300 hover:bg-gray-900"
        >
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-600">Or continue with email</span>
        </div>

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
              {buttonText}
            </Button>
          </form>
        </Form>

        {/* Toggle between Login/Signup */}
        <div className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              form.reset(); // Clear form state on toggle
            }}
            className="underline hover:text-brand-hover font-medium"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
        
        {/* Legal Anchor Text (Only for Signup) */}
        {!isLogin && (
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
        )}
      </div>
    </div>
  );
};

export default AuthPage;