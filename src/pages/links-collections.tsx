import CreateUrl from '@/components/forms/create-url';
import PopUpInfo from '@/components/link-collection/pop-up-info';
import { RootState } from '@/providers/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const LinksCollections = () => {
  const navigate = useNavigate();

    const data = useSelector((state: RootState) => state.url.urlData);
    const isLoading = useSelector((state: RootState) => state.fetch.isLoading);

    const { user } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        if (user && !user.isAuthenticated) {
            navigate("/");
        }
    }, [user]);

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
            </div>
        ) : (
            <div className="h-screen border-2 bg-gray-900 mx-4 p-4 rounded-[10px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Links Collections</h1>
                    <CreateUrl />
                </div>
                {data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-2xl">No Links Created</h1>
                        <p className="mt-2">Create your first link</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-3 gap-4 mt-4 cursor-pointer' >
                        {data?.map((item, index) => (
                            <PopUpInfo key={index} {...item} />
                        ))}
                    </div>
                )}

            </div>
        )
    )
}

export default LinksCollections