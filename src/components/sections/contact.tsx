
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import emailjs from "emailjs-com";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await emailjs.send(
        "service_alrhk8i",
        "template_cv7ka2g",
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        "hbnf92ceDxmCGKG0b"
      );
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary">Get in Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>
        <Card className="max-w-6xl mx-auto">
            <CardContent className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <h3 className="font-headline text-3xl mb-2">Contact Us</h3>
                    <p className="text-muted-foreground mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Tell us about your project..." {...field} rows={6} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                <div className="space-y-6 pt-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-headline">Our Office</h3>
                        <p className="text-muted-foreground">Birtamode-5, Jhapa, Nepal</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-headline">Email Us</h3>
                        <Link href="mailto:basnetcreationshub@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">basnetcreationshub@gmail.com</Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold font-headline">Call Us</h3>
                        <Link href="tel:+9779817943164" className="text-muted-foreground hover:text-primary transition-colors">+977-9817943164</Link>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h3 className="text-xl font-semibold font-headline mb-4">Follow Us</h3>
                      <div className="flex space-x-4">
                        <Link href="https://twitter.com"><Button variant="outline" size="icon" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"><Twitter /></Button></Link>
                        <Link href="https://www.facebook.com/profile.php?id=61573380994962"><Button variant="outline" size="icon" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"><Facebook /></Button></Link>
                        <Link href="https://www.instagram.com/basnetcreations_hub/"><Button variant="outline" size="icon" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"><Instagram /></Button></Link>
                        <Link href="https://linkedin.com"><Button variant="outline" size="icon" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"><Linkedin /></Button></Link>
                      </div>
                    </div>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
