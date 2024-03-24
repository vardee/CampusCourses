import { instance } from "../api/axios.api";
import { CreateCourse } from "../types/types";


export const CourseService = {
    async createNewCourse(getGroupData: string | undefined, createNewCourse: CreateCourse) {
        await instance.post(`groups/${getGroupData}`, createNewCourse)
    },
}