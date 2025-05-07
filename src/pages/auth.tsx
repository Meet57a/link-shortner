import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/providers/store";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "@/services/auth-services";
import { useToast } from "@/hooks/use-toast";
import { fetchLikes } from "@/services/fetch-service";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
});

const AuthPage = () => {
  const { toast } = useToast();
  type auth = "signin" | "signup";
  const [authType, setAuthType] = useState<auth>("signin");

  const [openDialog, setOpenDialog] = useState(false);

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  var data = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  


  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
    atype: string
  ) => {
    e.preventDefault();
    if (atype === "signin") {
      await dispatch(login(form.getValues()));
    } else if (atype === "signup") {
      if (form.getValues().password !== form.getValues().confirmPassword) {
        form.setError("confirmPassword", {
          message: "Password and Confirm Password should be same",
        });
      } else {
        await dispatch(signup(form.getValues()));
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (data != null) {
        if (data.statusCode === 200) {
          toast({
            title: "Success",
            description: data.msg,
          });
          dispatch(fetchLikes());
        } else {
          toast({
            title: "Error",
            description: data.msg,
            variant: "destructive",
          });
        }
      }
    })();
  }, [data]);



  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {/*  DialogTrigger */}
      <DialogTrigger
        className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10  px-8 rounded-md"
        onClick={() => setOpenDialog(true)}
      >
        Login / Signup
      </DialogTrigger>

      {/* DialogContent */}
      <DialogContent className="w-[400px] max-sm:w-[350px] rounded-xl">
        {/* Tabs */}
        <Tabs defaultValue={authType} className="">
          {/* TabsList */}
          <TabsList className="w-full">
            <TabsTrigger
              value="signin"
              className="w-1/2"
              onClick={() => setAuthType("signin")}
            >
              Log in
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="w-1/2"
              onClick={() => setAuthType("signup")}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          {/* TabsList over */}

          {/* TabsContent */}
          <TabsContent value="signin">
            <Form {...form}>
              <form className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end items-center gap-2">
                  <Button type="submit" onClick={(e) => onSubmit(e, "signin")}>
                    Submit
                  </Button>
                  {isLoading ? (
                    <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
                  ) : null}
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="signup">
            <Form {...form}>
              <form className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
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
                        <Input placeholder="E-mail" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end items-center gap-2">
                  <Button type="submit" onClick={(e) => onSubmit(e, "signup")}>
                    Submit
                  </Button>
                  {isLoading ? (
                    <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
                  ) : null}
                </div>
              </form>
            </Form>
          </TabsContent>
          {/* TabsContent over */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
