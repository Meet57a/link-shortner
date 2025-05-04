import { useToast } from "@/hooks/use-toast";
import { AppDispatch, RootState } from "@/providers/store";
import { fetchLongUrl } from "@/services/fetch-service";
import { clickUrl } from "@/services/url-services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UAParser } from "ua-parser-js";

const RedirectPage = () => {
    const parser = new UAParser();
    const { shortUrl } = useParams<{ shortUrl: string }>();
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();


    const isLoading = useSelector((state: RootState) => state.url.isLoading);
    const data = useSelector((state: RootState) => state.fetch.lognUrlfetchData);
    const likes = useSelector((state: RootState) => state.fetch.likes);

    const redirect = async () => {
        const resp = parser.getResult();

        dispatch(fetchLongUrl(shortUrl))
            .unwrap()
            .then((res) => {
                if (res.status) {
                    const longUrl = res.longUrl;
                    const body = {
                        shortUrl: shortUrl,
                        device: resp.device.type || "desktop",
                    }

                    dispatch(clickUrl(body))
                        .unwrap()
                        .then((res) => {
                            if (res.status) {
                                window.location.href = longUrl;
                            } else {
                                console.log(res);

                                toast({
                                    title: "Error",
                                    description: res.msg,
                                    variant: "destructive",
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            toast({
                                title: "Error",
                                description: err.msg,
                                variant: "destructive",
                            });
                        }
                        );
                } else {
                    toast({
                        title: "Error",
                        description: res.msg,
                        variant: "destructive",
                    });
                }
            })
            .catch((err) => {
                console.log(err);

                toast({
                    title: "Error",
                    description: err.msg,
                    variant: "destructive",
                });
            });
    }

    useEffect(() => {
        if (shortUrl) {
            redirect();
        } else {
            toast({
                title: "Error",
                description: "Invalid URL",
                variant: "destructive",
            });
        }
    }, [shortUrl]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <div className="flex items-center justify-center mb-4">
                <div className="text-3xl">
                    Link <span className="text-yellow-500">Shortner</span>
                </div>
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold ">Redirecting...</h1>
                <p className="text-sm text-muted-foreground mb-4">
                    You are being redirected to the original link.
                </p>
                <div className="flex flex-col items-center justify-center gap-4">
                    {isLoading ? <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div> : null}
                    {data?.msg ? <p className="text-sm text-red-500">{data.msg}</p> : null}
                </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
                <span className="text-yellow-500">{likes}</span> Client{likes > 1 ? "s" : ""} likes this tool 
            </p>

            <div className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-md mt-4">
                <h1 className="text-2xl font-bold ">About Link <span className="text-yellow-500">Shortner</span></h1>
                <p className="text-sm text-muted-foreground mb-4">
                    Link Shortner is a simple and easy to use link shortener service. It allows you to shorten long URLs into short, easy-to-share links.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    You can also track the number of clicks on your shortened links.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    This service is free to use and does not require any costs.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions or feedback, please feel free to contact us.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    Thank you for using Link Shortner!
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    &copy; 2024 Link Shortner. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                    Version 1.0.0
                </p>


            </div>
        </div>

    )
}

export default RedirectPage