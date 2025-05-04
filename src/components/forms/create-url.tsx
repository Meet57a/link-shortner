import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/providers/store";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { createUrl } from "@/services/url-services";
import { useEffect, useState } from "react";


const formSchema = z.object({
    title: z.string().min(3).max(50),
    longUrl: z.string().url(),
    customUrl: z.string()
});


const CreateUrl = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const { toast } = useToast();
    const isLoading = useSelector((state: RootState) => state.url.isLoading);
    const data = useSelector((state: RootState) => state.url.data);
    const dispatch = useDispatch<AppDispatch>();

    


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            longUrl: "",
            customUrl: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(createUrl(values));
    }

    useEffect(() => {
        (async () => {
            if (data != null) {
                if (data.statusCode === 200) {
                    toast({
                        title: "Success",
                        description: data.msg,
                    });
                    form.reset();
                    setOpenDialog(false);
                } else {
                    toast({
                        title: "Error",
                        description: data.msg,
                        variant: "destructive",
                    });
                }
            }
        })();
    }, [data])

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button className="bg-yellow-500">Create Link</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="">Create Link</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="longUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Long URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Long URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Custom URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end items-center gap-2">
                                <Button type="submit">
                                    Submit
                                </Button>
                                {isLoading ? (
                                    <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
                                ) : null}
                            </div>
                        </form>
                    </Form>

                </DialogDescription>
            </DialogContent>
        </Dialog>

    )
}

export default CreateUrl