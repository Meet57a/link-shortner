import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Mail } from 'lucide-react';



const formSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    msg: z.string().min(6).max(100),
    access_key: z.string().optional(),
});


const About = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            msg: "",
            access_key: "bda9a88d-afc0-4a36-a003-eeddfcdc8d73",
        },
    });

    const [result, setResult] = React.useState("");

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        setResult("Sending....");


        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            form.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className=" border-2 bg-gray-900 mx-4 p-4 rounded-[10px]">
            <h1 className='text-2xl'>About Us</h1>
            <div className='flex gap-2 max-sm:flex-col'>
                <div className='bg-background rounded-[10px] border-2 border-gray-800 w-1/2 p-4 max-sm:w-full'>
                    <h1 className='mb-2'>Contact Us Form</h1>
                    <p className='text-muted-foreground mb-2'>We are here to help you with any questions or concerns you may have. Please fill out the form below and we will get back to you as soon as possible.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your E-mail" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="msg"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea rows={6} placeholder="Type your message here." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end items-center gap-2">
                                <Button type="submit">
                                    Submit
                                </Button>
                                {
                                    result && <p className='text-muted-foreground'>{result}</p>
                                }
                            </div>
                        </form>
                    </Form>
                </div>
                <div className='bg-background rounded-[10px] border-2 border-gray-800 w-1/2 p-4 max-sm:w-full'>
                    <h1 className='mb-2'>About Us</h1>
                    <p className='text-muted-foreground mb-2'>We are a team of developers who are passionate about creating tools that make your life easier. Our goal is to provide you with the best experience possible.</p>
                    <p className='text-muted-foreground mb-2'>We are constantly working to improve our tools and add new features. If you have any suggestions or feedback, please feel free to reach out to us.</p>
                    <p className='text-muted-foreground mb-2'>Thank you for using our tools and we hope you enjoy them!</p>
                    <p className='text-muted-foreground mb-2'>If you have any questions or concerns, please feel free to reach out to us at </p>
                    <Mail className='mr-2 inline cursor-pointer' onClick={() => {
                        window.location.href = "mailto:meetsenjaliya9048@gmail.com"
                    }} size={20} color="white" /> <span className='text-blue-500 underline cursor-pointer' onClick={() => {
                        window.location.href = "mailto:meetsenjaliya9048@gmail.com"
                    }}>meetsenjali2018@gmail.com</span>




                </div>
            </div>


        </div>


    )
}

export default About