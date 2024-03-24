export interface IUserRegistrationData{
    fullName: string,
    birthDate: string,
    email: string,
    password: string,
    confirmPassword: string
}
export interface IUserLoginData{
    email: string,
    password: string
}

export interface IResponseUserData{
    token: string
}

export interface IUser{
    id: string,
    fullName: string,
    email: string,
    birthdate: string,
    token: string
}
export interface IGetUser{
    fullName: string,
    email: string,
    birthDate: string,
}

export interface IEditProfile{
    fullName: string,
    birthDate: string,
}

export interface IGetUserRole {
    isTeacher: boolean,
    isStudent: boolean,
    isAdmin: boolean
}
export interface Group {
    id: string;
    name: string;
}

export interface ICreateGroupData{
    name: string,
}

export interface IDeleteGroup{
    id: string,
}

export interface GroupCourses {
    id: string,
    name: string,
    startYear: string,
    maximumStudentsCount: number,
    remainingSlotsCount: number,
    status: string,
    semester: string
}

export interface UsersModel {
    id: string,
    fullName: string,
}

export interface CreateCourse {
    name: string,
    startYear: string,
    maximumStudentsCount: string,
    semester: string,
    requirements: string,
    annotations: string,
    mainTeacherId: string
}


interface Students{
    id: string,
    name: string,
    email: string,
    status: string,
    midtermResult: string,
    finalResult: string
}
export interface Teachers{
    name: string,
    email: string,
    isMain: boolean
}
export interface Notifications{
    text: string,
    isImportant: boolean
}
export interface CourseDetails{
    id: string,
    name: string,
    startYear: string,
    maximumStudentsCount: string,
    studentsEnrolledCount: string,
    studentsInQueueCount: string,
    requirements: string,
    annotations: string,
    status: string,
    semester: string,
    students: Students[],
    teachers: Teachers[],
    notifications: Notifications[]
}