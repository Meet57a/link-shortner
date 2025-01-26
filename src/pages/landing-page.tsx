import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/providers/store";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);

  const [longUrl, setLongUrl] = useState("");

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleShorten = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !user.isAuthenticated) {    
      toast({
        title: "Authentication",
        description: "Please login to shorten the link",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold">
        <span className="text-yellow-500">Shorten Links,</span> Simplify
        Sharing!
      </h1>
      <p className="mt-2">
        Create short links and share them with your friends and family.
      </p>
      <form
        action=""
        className="flex flex-col items-center justify-center"
        onSubmit={handleShorten}
      >
        <Input
          placeholder="Enter your link here"
          className="w-[600px] h-[50px] mt-10 border-2 border-gray-300"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="mt-4 w-[150px] bg-yellow-5 00">Shorten</Button>
      </form>
    </div>
  );
};

export default LandingPage;
