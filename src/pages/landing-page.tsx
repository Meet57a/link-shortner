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
    <div className="flex flex-col items-center justify-center pt-20 max-sm:px-4">
      <h1 className="text-4xl font-bold">
        <span className="text-yellow-500">Shorten Links,</span> Simplify
        Sharing!      
      </h1>
      <p className="mt-2">
        Create short links and share them with your friends and family.
      </p>
      <form
        action=""
        className="flex flex-col items-center justify-center max-sm:w-full"
        onSubmit={handleShorten}
      >
        <Input
          placeholder="Enter your link here"
          className="h-[50px] mt-10 border-2 border-gray-300 lg:w-[600px] md:w-[600px] sm:w-[600px] max-sm:w-full"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="mt-4 w-[150px] bg-yellow-500">Shorten</Button>
      </form>
    </div>
  );
};

export default LandingPage;
