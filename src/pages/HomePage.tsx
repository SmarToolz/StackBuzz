import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import CountdownTimer from "@/components/CountdownTimer";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type EarlyBirdFormValues = z.infer<typeof formSchema>;

const HomePage: React.FC = () => {
  const form = useForm<EarlyBirdFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  // Target date: February 2nd, 2026, 00:00:00 UTC (Month index 1 is February)
  const launchDate = new Date(Date.UTC(2026, 1, 2, 0, 0, 0));

  const onSubmit = (values: EarlyBirdFormValues) => {
    console.log("Early Bird Sign Up Attempt:", values);
    toast.success("You've secured your spot! We'll be in touch.");
    form.reset();
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 bg-black text-white relative">
      {/* Subtle Radial Gradient Overlay for Premium Feel */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle_at_center,_rgba(232,99,36,0.05)_0%,_transparent_50%)]
                      opacity-50 z-0"></div>

      <div className="max-w-3xl mx-auto py-16 relative z-10">
        {/* Hero */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none mb-8 tracking-tighter">
          You’re early.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
          Substrate is the private radar that shows Substack creators exactly what’s trending and who to talk to — in real time.
          <br className="hidden sm:inline" />
          <span className="font-semibold text-brand-primary">The first 500 writers get lifetime early-bird pricing and first access.</span>
        </p>
        
        {/* Main Launch Countdown Timer (Feb 2nd, 2026) */}
        <div className="mb-16">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
            EARLY BIRD OFFER STARTS IN:
          </p>
          <CountdownTimer targetDate={launchDate} />
        </div>

        {/* Live Ticker */}
        <div className="mb-16 space-y-2">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
            Right now
          </p>
          <div className="text-lg sm:text-xl font-semibold text-left inline-block space-y-1 p-4 rounded-lg border border-gray-800 bg-gray-900/50">
            <p className="text-white">→ 3,412 people talking about “AI journaling”</p>
            <p className="text-white">→ 1,890 comments on “remote work burnout”</p>
            <p className="text-white">→ “AI second brain” just spiked 180 %</p>
          </div>
        </div>

        {/* Email Form */}
        <Card className="bg-gray-900 border-gray-800 p-6 sm:p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-4 text-white">Enter your email — secure your spot</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="bg-black border-gray-700 text-white h-12 text-base focus:ring-brand-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold transition-colors
                           bg-brand-primary hover:bg-brand-hover text-white"
              >
                Join the first 500 — it’s free
              </Button>
            </form>
          </Form>
          <p className="text-xs text-gray-500 mt-4">
            No spam ever. Unsubscribe anytime. We launch on February 2nd, 2026.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;