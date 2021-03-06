
export interface IUser {
    _id?: string;
    deviceId: string;
    notificationEnabled?: Boolean;
    mainMemberId?: string;
    relation?: string;
    personalInfo?: IUserPersonalInfo;
    todayGoal?: number;
    schoolTimings?: ISchoolTimings;
    createdDate?: Date | string;
    modifiedDate?: Date | string;
}

export interface IUserPersonalInfo {
    name?: string;
    age?: number;
    height?: number;
    heightUnit?: string;
    weight?: number;
    weightUnit?: string;
    gender?: string;
    phone?: string;
}

export interface ISchoolTimings {
    startTime?: Date | string;
    endTIme?: Date | string;
}
