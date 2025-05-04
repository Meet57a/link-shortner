type UrlType = {
    _id: string;
    userId: string;
    title : string;
    longUrl: string;
    shortUrl: string;
    clicks: number;
    customUrl: string;      
    currentDate: string;
    currentTime: string;
}

export default UrlType;