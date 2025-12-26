import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Send, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/SupabaseAuthProvider";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
  what_happened: z.string().min(10, { message: "Please describe what happened (at least 10 characters)." }),
  steps_to_reproduce: z.string().min(10, { message: "Please list steps to reproduce (at least 10 characters)." }),
  expected_behavior: z.string().optional(),
  actual_behavior: z.string().optional(),
  screenshot_details: z.string().optional(),
});

type BugReportFormValues = z.infer<typeof formSchema>;

const ReportBugPage: React.FC = () => {
  const { user } = useAuth();
  
  const form = useForm<BugReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      what_happened: "",
      steps_to_reproduce: "",
      expected_behavior: "",
      actual_behavior: "",
      screenshot_details: "",
    },
  });
  
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: BugReportFormValues) => {
    const reportData = {
      user_id: user?.id || null,
      email: values.email || user?.email || null,
      what_happened: values.what_happened,
      steps_to_reproduce: values.steps_to_reproduce,
      expected_behavior: values.expected_behavior || null,
      actual_behavior: values.actual_behavior || null,
      screenshot_details: values.screenshot_details || null,
    };

    const loadingToastId = toast.loading("Submitting bug report...");

    try {
      const { error } = await supabase
        .from('bug_reports')
        .insert([reportData]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Bug report submitted! Thank you for helping us improve.", { id: loadingToastId });
      form.reset({
        email: user?.email || "",
        what_happened: "",
        steps_to_reproduce: "",
        expected_behavior: "",
        actual_behavior: "",
        screenshot_details: "",
      });
    } catch (error) {
      console.error("Bug submission error:", error);
      toast.error(`Failed to submit report: ${error.message}`, { id: loadingToastId });
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 sm:p-8 bg-black text-white">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-red-400 flex items-center">
              <Bug className="h-7 w-7 mr-3" />
              Report a Bug
            </CardTitle>
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link to="/support">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Support
              </Link>
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Please provide as much detail as possible so we can quickly diagnose and fix the issue.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Email (Optional) */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email (Optional, for follow-up)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@example.com" 
                        {...field} 
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* What Happened (Required) */}
              <FormField
                control={form.control}
                name="what_happened"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">What happened? (Required)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="E.g., The 'Run Radar' button disappeared after I logged out." 
                        {...field} 
                        rows={3}
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Steps to Reproduce (Required) */}
              <FormField
                control={form.control}
                name="steps_to_reproduce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Steps to reproduce (Required)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="1. Go to /trends. 2. Enter 'AI' and press Enter. 3. Click the 'Pin Keyword' button." 
                        {...field} 
                        rows={4}
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Expected Behavior (Optional) */}
              <FormField
                control={form.control}
                name="expected_behavior"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Expected behavior (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="The keyword should be added to my saved list." 
                        {...field} 
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Actual Behavior (Optional) */}
              <FormField
                control={form.control}
                name="actual_behavior"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Actual behavior (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="I got an error toast saying 'User not authenticated'." 
                        {...field} 
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Screenshot Details (Optional) */}
              <FormField
                control={form.control}
                name="screenshot_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Screenshot/Video Link (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Paste a link to a screenshot (e.g., Imgur, Loom)" 
                        {...field} 
                        className="bg-black border-gray-700 text-white focus:ring-red-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full py-3 text-lg font-semibold transition-colors 
                           bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                    <Send className="h-5 w-5 mr-2" />
                )}
                Submit Bug Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportBugPage;