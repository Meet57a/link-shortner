import { createSlice } from "@reduxjs/toolkit";
import { createUrl, deleteUrl, clickUrl, fetchUrl } from "@/services/url-services";
import { Url } from "url";
import UrlType from "@/types/url-type";


const initialState: {
    isLoading: boolean;
    data: any;
    urlData: UrlType[] | null;
} = {
    isLoading: false,
    data: null,
    urlData: null,
};

const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUrl.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUrl.fulfilled, (state, action) => {
                state.data = action.payload;
                if (action.payload.statusCode === 200) {
                    const sortedDateLinks = [...action.payload.urls].sort((a, b) => {
                        return new Date(b.currentDate).getUTCDate() - new Date(a.currentDate).getUTCDate();
                    });
                    const sortedTimeLinks = [...sortedDateLinks].sort((a, b) => {
                        return new Date(b.currentDate + "T" + b.currentTime + "Z").getTime() - new Date(a.currentDate + "T" + a.currentTime + "Z").getTime();
                    });
                    state.urlData = sortedTimeLinks;
                } else {
                    state.urlData = null;
                }
                state.isLoading = false;
            })
            .addCase(createUrl.rejected, (state) => {
                state.isLoading = false;
            });
        builder.addCase(deleteUrl.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteUrl.fulfilled, (state, action) => {
            state.data = action.payload;
            if (action.payload.statusCode === 200) {
                const newUrlData = state.urlData?.filter((url) => url._id !== action.payload._id);
                state.urlData = newUrlData || null;
            }
            state.isLoading = false;
        }).addCase(deleteUrl.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(clickUrl.pending, (state) => {
            state.isLoading = true;
        }).addCase(clickUrl.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        }).addCase(clickUrl.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchUrl.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchUrl.fulfilled, (state, action) => {
            const sortedDateLinks = [...action.payload.urls].sort((a, b) => {
                return new Date(b.currentDate).getUTCDate() - new Date(a.currentDate).getUTCDate();
            });
            const sortedTimeLinks = [...sortedDateLinks].sort((a, b) => {
                return new Date(b.currentDate + "T" + b.currentTime + "Z").getTime() - new Date(a.currentDate + "T" + a.currentTime + "Z").getTime();
            });
            state.urlData = sortedTimeLinks;
            state.isLoading = false;
        }).addCase(fetchUrl.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default urlSlice;

