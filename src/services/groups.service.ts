import { instance } from "../api/axios.api";
import { Group, GroupCourses, ICreateGroupData, IDeleteGroup } from "../types/types";


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
    },

    async editGroup(editGroupData: IDeleteGroup,createNewGroupData: ICreateGroupData) {
        await instance.put(`groups/${editGroupData.id}`, createNewGroupData);
    },
    async getGroupCourses(getGroupData: string): Promise<GroupCourses[]> {
        const {data} = await instance.get<GroupCourses[]>(`groups/${getGroupData}`)
        return data;
    }, 
}