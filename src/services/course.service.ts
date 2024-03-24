import { instance } from "../api/axios.api";
import { CourseDetails, CreateCourse } from "../types/types";


export const CourseService = {
    async createNewCourse(getGroupData: string | undefined, createNewCourse: CreateCourse) {
        await instance.post(`groups/${getGroupData}`, createNewCourse)
    },
    async getCourseDetails(courseId: string | undefined){
        const {data} = await instance.get<CourseDetails>(`courses/${courseId}/details`)
        return data;
    }
}