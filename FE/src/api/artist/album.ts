import axiosInstance from "../auth/axiosInstance";
import { AlbumResponse } from "@/types/album";

export const fetchAlbums = async (groupId: number): Promise<AlbumResponse> => {
    const response = await axiosInstance.get('/albums' , {
        params : { groupId },
    });
    return response.data.result.albums;
}