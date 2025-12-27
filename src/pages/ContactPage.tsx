import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom"; // Import Link

const contactReasons = [
  "General Inquiry",
  "Feature Request",
  "Partnership/Collaboration",
  "Billing/Account Issue",
  "Other",
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Please select a reason for contact." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactPage: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ContactFormValues) => {
    const loadingToastId = toast.loading("Sending message...");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      console.log("Contact Form Submission:", values);
      
      // In a real application, this would be an API call to send the email.
      
      toast.success("Message sent successfully! We will get back to you shortly.", { id: loadingToastId });
      form.reset();
    } catch (error) {
      console.error("Contact submission error:", error);
      toast.error(`Failed to send message: ${error.message}`, { id: loadingToastId });
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 sm:p-8 bg-black text-white">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-brand-primary flex items-center">
            <Mail className="h-7 w-7 mr-3" />
            Contact Us
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Have a question about pricing, features, or partnerships? Send us a message.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Your Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Jane Doe" 
                        {...field} 
                        className="bg-black border-gray-700 text-white focus:ring-brand-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
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
                        className="bg-black border-gray-700 text-white focus:ring-brand-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject (Dropdown) */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-baseline">
                        <FormLabel className="text-gray-300">Reason for Contact</FormLabel>
                        <Link to="/report-bug" className="text-xs text-red-400 hover:text-red-300 underline">
                            Report a Bug? Click here
                        </Link>
                    </div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black border-gray-700 text-white focus:ring-brand-primary">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700 text-white">
                        {contactReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="I'm interested in..." 
                        {...field} 
                        rows={5}
                        className="bg-black border-gray-700 text-white focus:ring-brand-primary"
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
                           bg-brand-primary hover:bg-brand-hover text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                    <Send className="h-5 w-5 mr-2" />
                )}
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;