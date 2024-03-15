import { instance } from "../api/axios.api";
import { Group, ICreateGroupData, IDeleteGroup } from "../types/types";


export const GroupsService = {
    async getGroups(): Promise<Group[]> {
        const {data} = await instance.get<Group[]>('groups')
        return data;
    },
    async createNewGroup(createNewGroupData: ICreateGroupData) {
        await instance.post('groups', createNewGroupData)
    },
    async deleteGroup(deleteGroupData: IDeleteGroup) {
        await instance.delete(`groups/${deleteGroupData.id}`);
    }  
}