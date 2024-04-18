import { instance } from "../api/axios.api";
import { AddTeacherToCourse, ChangeStatus, ChangeTermStatus, CourseDetails, CreateCourse, CreateNotification, EditCourseTeacher, MyCourses,  StudentStatus,  TeachingCourse } from "../types/types";


export const CourseService = {
    async createNewCourse(getGroupData: string | undefined, createNewCourse: CreateCourse) {
        await instance.post(`groups/${getGroupData}`, createNewCourse)
    },
    async getCourseDetails(courseId: string | undefined){
        const {data} = await instance.get<CourseDetails>(`courses/${courseId}/details`)
        return data;
    },
    async editNewCourse(courseId: string | undefined, createNewCourse: CreateCourse) {
        await instance.put(`courses/${courseId}`, createNewCourse)
    },
    async editTeacherNewCourse(courseId: string | undefined, editTeacherCourse: EditCourseTeacher) {
        await instance.put(`courses/${courseId}/requirements-and-annotations`, editTeacherCourse)
    },
    async getTeachingCourse(): Promise<TeachingCourse[]> {
        const {data} = await instance.get<TeachingCourse[]>('courses/teaching')
        return data;
    },
    async changeGroupStatus(courseId: string | undefined, groupStatus: ChangeStatus) {
        await instance.post(`courses/${courseId}/status`, groupStatus) 
    },
    async addTeacherToCourse(courseId: string | undefined, teacherId: AddTeacherToCourse) {
        await instance.post(`courses/${courseId}/teachers`, teacherId) 
    },
    async createNotification(courseId: string | undefined, notificationData: CreateNotification) {
        await instance.post(`courses/${courseId}/notifications`, notificationData) 
    },
    async singUpToCourse(courseId: string | undefined) {
        await instance.post(`courses/${courseId}/sign-up`) 
    },
    async getMyCourses(): Promise<MyCourses[]> {
        const {data} = await instance.get<MyCourses[]>('courses/my')
        return data;
    },
    async editStudentStatus(status: StudentStatus, id: string | undefined, studentId:string) {
        console.log(status)
        const {data} = await instance.post(`courses/${id}/student-status/${studentId}`, status)
        return data;
    },
    async editTermStatus(statusData: ChangeTermStatus, id: string | undefined, studentId:string) {
        console.log(studentId)
        console.log(statusData)
        await instance.post(`courses/${id}/marks/${studentId}`, statusData)
    },
    async deleteCourse(courseId: string | undefined) {
        await instance.delete(`courses/${courseId}`) 
    },
}