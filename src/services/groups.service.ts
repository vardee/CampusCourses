import { instance } from "../api/axios.api";
import { Group } from "../types/types";


export const GroupsService = {
    async getGroups(): Promise<Group[]> {
        const {data} = await instance.get<Group[]>('groups')
        return data;
    },
}