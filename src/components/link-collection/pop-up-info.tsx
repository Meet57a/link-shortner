import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { AppDispatch, RootState } from "@/providers/store"
import { deleteUrl } from "@/services/url-services"
import UrlType from "@/types/url-type"
import { ArrowRight, Circle, CircleX, Copy } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const PopUpInfo = (item: UrlType) => {
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const isLoading = useSelector((state: RootState) => state.url.isLoading)
    const data = useSelector((state: RootState) => state.url.data)

    const deleteUrlFunc = (id: string) => {

        if (id) {
            toast({
                title: "Are you sure?",
                description: "This action cannot be undone",
                duration: 5000,
                action: (
                    !isLoading ? <div className="flex gap-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                dispatch(deleteUrl(id))
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                toast({
                                    title: "Cancelled",
                                    description: "Url not deleted",
                                    duration: 2000,
                                    action: <Circle className="animate-spin" size={16} />,
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </div> : <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
                )

            })
        }
    }

    useEffect(() => {
        (async () => {
            if (data != null) {
                if (data.statusCode === 200) {
                    toast({
                        title: "Success",
                        description: data.msg,
                    });

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

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast({
                title: "Copied to clipboard",
                description: "You can now paste it anywhere",
                duration: 2000,
                action: <Circle className="animate-spin" size={16} />,
            })
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Please try again",
                duration: 2000,
                action: <CircleX className="animate-spin" size={16} />,
            })
        }

    }
    return (
        <Dialog  >
            <div className='p-4 bg-background rounded-[10px] border-2 border-gray-800 mt-4'>
                <DialogTrigger className="w-full" >
                    <div className='flex mb-2'>
                        <h1 className="">{item.title}</h1>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Link to={import.meta.env.VITE_DOMAIN + item.shortUrl} className='text-xl text-left text-blue-500 underline w-3/4 hover:text-yellow-500 truncate'>{import.meta.env.VITE_DOMAIN + item.shortUrl}</Link>
                        <ArrowRight size={24} />
                    </div>

                    <div className='flex justify-between items-center mt-4'>
                        <div className='text-muted-foreground'>{item.currentTime.substring(0,5)}</div>
                        <div className='text-muted-foreground'>{item.currentDate}</div>
                    </div>
                </DialogTrigger>
                <div className='flex justify-between items-center mt-4'>
                    <span className='text-muted-foreground'>Clicks : {item.clicks}</span>
                    <div className="flex gap-2 items-center ">
                        <Copy size={20} className="text-blue-400 cursor-pointer hover:text-yellow-500" onClick={() => {

                            copy(`http://localhost/${item.shortUrl}`)
                        }} />
                        {isLoading ? <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div> : <CircleX size={20} className="text-red-400 cursor-pointer hover:text-yellow-500" onClick={() => {
                            deleteUrlFunc(item._id)
                        }} />}
                    </div>
                </div>
            </div>
            <DialogContent className="max-w-3xl rounded-xl">
                <DialogHeader>
                    <DialogTitle className="">Link Info</DialogTitle>
                </DialogHeader>
                <DialogDescription className="">
                    <div className="flex text-white gap-4 max-sm:flex-col max-sm:items-center">
                        <div className="h-52 w-52 bg-gray-600"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <span className="flex gap-4 items-center">
                                    <Link className="text-2xl underline text-blue-500 truncate" to={import.meta.env.VITE_DOMAIN + item.shortUrl}>{import.meta.env.VITE_DOMAIN + item.shortUrl}</Link>
                                    <Copy size={20} className="text-blue-400 cursor-pointer hover:text-yellow-500" onClick={
                                        () => {
                                            copy(import.meta.env.VITE_DOMAIN + item.shortUrl)
                                        }
                                    } />
                                </span>
                                <span>Title : {item.title}</span>
                                <span className="flex">Long URL : <Link to={item.longUrl} className="underline truncate text-blue-500 mr-4 ml-1">{item.longUrl}</Link><Copy size={20} className="text-blue-400 cursor-pointer hover:text-yellow-500" onClick={
                                    () => {
                                        copy(item.longUrl)
                                    }
                                } /></span>


                                <span>Custom URL : {item.customUrl}</span>
                                <span>Clicks : {item.clicks}</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="text-muted-foreground">{item.currentTime.substring(0,5)}</div>
                                <div className="text-muted-foreground">{item.currentDate}</div>
                            </div>  


                        </div>
                    </div>


                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default PopUpInfo