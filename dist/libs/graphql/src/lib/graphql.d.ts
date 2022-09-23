import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export declare type Maybe<T> = T | undefined;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    Upload: any;
};
export declare type Activity = {
    date: Scalars['Date'];
    type: Scalars['String'];
};
export declare type AddClockInInput = {
    files: Array<Scalars['Upload']>;
    jobId: Scalars['Float'];
    lat: Scalars['Float'];
    lng: Scalars['Float'];
};
export declare type AddClockInRs = {
    address: Scalars['String'];
    equipment: Array<Equipment>;
    id: Scalars['Float'];
};
export declare type AddClockOffInput = {
    files?: Maybe<Array<Maybe<Scalars['Upload']>>>;
    jobId: Scalars['Float'];
    notes: Scalars['String'];
};
export declare type AddCompanyInput = {
    name: Scalars['String'];
};
export declare type Admin = Node & User & {
    company?: Maybe<Company>;
    email: Scalars['String'];
    id: Scalars['Float'];
    name: Scalars['String'];
    role: Role;
};
export declare type AssignToJobInput = {
    jobId: Scalars['Float'];
    staffIds: Array<Scalars['Float']>;
};
export declare type Builder = Node & User & {
    company?: Maybe<Company>;
    email: Scalars['String'];
    id: Scalars['Float'];
    jobRequests: Array<Job>;
    name: Scalars['String'];
    role: Role;
};
export declare type BuilderJobRequestsArgs = {
    search?: Maybe<Scalars['String']>;
    status?: Maybe<JobStatus>;
};
export declare type ClockIn = Node & {
    clockInTime: Scalars['String'];
    id: Scalars['Float'];
    images?: Maybe<Array<Maybe<Scalars['String']>>>;
    job: Job;
    staff: Staff;
};
export declare type ClockOff = Node & {
    clockOffTime: Scalars['String'];
    id: Scalars['Float'];
    images?: Maybe<Array<Maybe<Scalars['String']>>>;
    notes: Scalars['String'];
    staff: Staff;
};
export declare type ClockOffConnection = {
    edges?: Maybe<Array<Maybe<ClockOffEdge>>>;
    pageInfo: PageInfo;
};
export declare type ClockOffEdge = {
    cursor: Scalars['String'];
    node?: Maybe<ClockOff>;
};
export declare type Company = {
    id: Scalars['Float'];
    name: Scalars['String'];
};
export declare type CreateJobInput = {
    address: Scalars['String'];
    adminSelectedBuilder?: Maybe<Scalars['Float']>;
    created?: Maybe<Scalars['String']>;
    equipment: Array<Scalars['Float']>;
    lat?: Maybe<Scalars['Float']>;
    lng?: Maybe<Scalars['Float']>;
    notes?: Maybe<Scalars['String']>;
    poFile?: Maybe<Scalars['Upload']>;
    priority?: Maybe<Scalars['String']>;
    requestDate: Scalars['Date'];
    stage?: Maybe<Scalars['String']>;
    time?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export declare type UpdateJobDateInput = {
    requestDate: Scalars['Date'];
    updateField: Maybe<Scalars['String']>;
    id: Scalars['Float'];
};
export declare type Equipment = Node & {
    id: Scalars['Float'];
    name: Scalars['String'];
};
export declare type Job = Node & {
    activity: Array<Activity>;
    address: Scalars['String'];
    adminSelectedBuilder?: Maybe<Scalars['Float']>;
    builder: Builder;
    clockIns: Array<ClockIn>;
    clockOffs: Array<ClockOff>;
    created?: Maybe<Scalars['String']>;
    equipment: Array<Equipment>;
    id: Scalars['Float'];
    lat?: Maybe<Scalars['Float']>;
    lng?: Maybe<Scalars['Float']>;
    notes?: Maybe<Scalars['String']>;
    poFile?: Maybe<Scalars['String']>;
    priority?: Maybe<Scalars['String']>;
    requestDate: Scalars['Date'];
    stage?: Maybe<Scalars['String']>;
    status: JobStatus;
    time?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export declare type JobConnection = {
    edges: Array<JobEdge>;
    pageInfo: PageInfo;
};
export declare type JobEdge = {
    cursor: Scalars['String'];
    node: Job;
};
export declare enum JobFilter {
    Cancelled = "cancelled",
    Past = "past",
    Upcoming = "upcoming"
}
export declare type JobPaginated = {
    items: Array<Job>;
    pageInfo: PageInfo;
};
export declare enum JobStatus {
    Assigned = "assigned",
    UnAssigned = "unAssigned",
    Cancelled = "cancelled",
    Completed = "completed",
    InProgress = "inProgress",
    Pending = "pending"
}
export declare type JobsForDateReportItem = {
    address: Scalars['String'];
    builder: Builder;
    equipment: Array<Equipment>;
    id: Scalars['Float'];
    staff: Array<Staff>;
};
export declare type JobsForDateReportPaginated = {
    items: Array<JobsForDateReportItem>;
    pageInfo: PageInfo;
};
export declare type JobsForDateReportTableItem = {
    address: Scalars['String'];
    builder: Scalars['String'];
    equipment: Scalars['String'];
    id: Scalars['Float'];
    staff: Scalars['String'];
};
export declare type LoginInput = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type LoginRs = {
    email: Scalars['String'];
    name: Scalars['String'];
    role: Role;
};
export declare type Mutation = {
    addClockIn: AddClockInRs;
    addClockOff: Success;
    addCompany: Company;
    assignToJob: Success;
    cancelJob: Success;
    createJob: Success;
    deleteUser: Success;
    forgotPassword: Success;
    login: LoginRs;
    logout?: Maybe<Success>;
    register: Success;
    registerBuilder: Success;
    restorePassword: Success;
    tokenLogin: LoginRs;
    updateJob: Success;
    updateJobDate: Success;
    updateMyAccount: User;
    updateUser: Success;
    verifyEmail: Success;
};
export declare type MutationAddClockInArgs = {
    input: AddClockInInput;
};
export declare type MutationAddClockOffArgs = {
    input: AddClockOffInput;
};
export declare type MutationAddCompanyArgs = {
    input: AddCompanyInput;
};
export declare type MutationAssignToJobArgs = {
    input: AssignToJobInput;
};
export declare type MutationCancelJobArgs = {
    jobId: Scalars['Float'];
};
export declare type MutationCreateJobArgs = {
    input: CreateJobInput;
};
export declare type MutationDeleteUserArgs = {
    userId: Scalars['Float'];
};
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationLoginArgs = {
    input: LoginInput;
};
export declare type MutationRegisterArgs = {
    input: RegisterUserInput;
};
export declare type MutationRegisterBuilderArgs = {
    input: RegisterBuilderInput;
};
export declare type MutationRestorePasswordArgs = {
    newPassword: Scalars['String'];
    token: Scalars['String'];
};
export declare type MutationTokenLoginArgs = {
    token: Scalars['String'];
};
export declare type MutationUpdateJobArgs = {
    input: UpdateJobInput;
};
export declare type MutationUpdateMyAccountArgs = {
    email: Scalars['String'];
    name: Scalars['String'];
    password?: Maybe<Scalars['String']>;
};
export declare type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};
export declare type MutationVerifyEmailArgs = {
    token: Scalars['String'];
};
export declare type Node = {
    id: Scalars['Float'];
};
export declare type PageInfo = {
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    nextPage?: Maybe<Scalars['Int']>;
    previousPage?: Maybe<Scalars['Int']>;
};
export declare type PaginationArgs = {
    offset?: Maybe<Scalars['Int']>;
    page?: Maybe<Scalars['Int']>;
};
export declare type Query = {
    companies?: Maybe<Array<Company>>;
    equipment: Array<Equipment>;
    job: Job;
    jobs: JobPaginated;
    me: User;
    report: Report;
    settings: Settings;
    staffRoles: Array<Role>;
    user: User;
    users: UserPaginated;
};
export declare type QueryJobArgs = {
    id: Scalars['Float'];
};
export declare type QueryJobsArgs = {
    filteredDate?: Maybe<FilteredDateArgs>;
    orderBy?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    search?: Maybe<Scalars['String']>;
    staff?: Maybe<Array<Scalars['Int']>>;
    status?: Maybe<Array<Maybe<JobStatus>>>;
};
export declare type QueryUserArgs = {
    id: Scalars['Float'];
};
export declare type QueryUsersArgs = {
    orderBy?: Maybe<Scalars['String']>;
    paginate?: Maybe<Scalars['Boolean']>;
    pagination?: Maybe<PaginationArgs>;
    role?: Maybe<Scalars['String']>;
    search?: Maybe<Scalars['String']>;
};
export declare type RegisterBuilderInput = {
    company?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
};
export declare type RegisterUserInput = {
    company?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
    roleId: Scalars['Float'];
};
export declare type Report = {
    jobsForDate: JobsForDateReportPaginated;
    jobsForDateFullList: Array<Maybe<JobsForDateReportTableItem>>;
    totalWorkedHours: TotalWorkedHoursReportPaginated;
};
export declare type ReportJobsForDateArgs = {
    date: Scalars['String'];
    fullListg?: Maybe<Scalars['Boolean']>;
    orderBy?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    search?: Maybe<Scalars['String']>;
};
export declare type ReportJobsForDateFullListArgs = {
    date: Scalars['String'];
    orderBy?: Maybe<Scalars['String']>;
    search?: Maybe<Scalars['String']>;
};
export declare type ReportTotalWorkedHoursArgs = {
    endDate?: Maybe<Scalars['String']>;
    orderBy?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    search?: Maybe<Scalars['String']>;
    startDate?: Maybe<Scalars['String']>;
};
export declare type Role = {
    id: Scalars['Float'];
    name: RoleType;
};
export declare enum RoleType {
    Admin = "admin",
    Builder = "builder",
    Laborer = "laborer",
    Operator = "operator"
}
export declare type Settings = {
    minJobRequestDate: Scalars['Date'];
};
export declare type Staff = Node & User & {
    assignedJobs: Array<Job>;
    company?: Maybe<Company>;
    email: Scalars['String'];
    hasClockedIntoJob: Scalars['Boolean'];
    id: Scalars['Float'];
    name: Scalars['String'];
    role: Role;
    todaysAssignedJob?: Maybe<Job>;
};
export declare type StaffAssignedJobsArgs = {
    filter?: Maybe<JobFilter>;
    search?: Maybe<Scalars['String']>;
};
export declare type StaffHasClockedIntoJobArgs = {
    id: Scalars['Float'];
};
export declare type Success = {
    success: Scalars['Boolean'];
};
export declare type TotalWorkedHoursReportItem = {
    email: Scalars['String'];
    name: Scalars['String'];
    totalWorkedHours?: Maybe<Scalars['Float']>;
};
export declare type TotalWorkedHoursReportPaginated = {
    items: Array<TotalWorkedHoursReportItem>;
    pageInfo: PageInfo;
};
export declare type UpdateJobInput = {
    address: Scalars['String'];
    adminSelectedBuilder?: Maybe<Scalars['Float']>;
    created?: Maybe<Scalars['String']>;
    equipment: Array<Scalars['Float']>;
    id: Scalars['Float'];
    lat?: Maybe<Scalars['Float']>;
    lng?: Maybe<Scalars['Float']>;
    notes?: Maybe<Scalars['String']>;
    poFile?: Maybe<Scalars['Upload']>;
    priority?: Maybe<Scalars['String']>;
    requestDate: Scalars['Date'];
    stage?: Maybe<Scalars['String']>;
    time?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export declare type UpdateUserInput = {
    company?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    name: Scalars['String'];
    roleId?: Maybe<Scalars['Float']>;
    userId: Scalars['Float'];
};
export declare type User = {
    company?: Maybe<Company>;
    email: Scalars['String'];
    id: Scalars['Float'];
    name: Scalars['String'];
    role: Role;
};
export declare type UserConnection = {
    edges?: Maybe<Array<Maybe<UserEdge>>>;
    pageInfo: PageInfo;
};
export declare type UserEdge = {
    cursor: Scalars['String'];
    node?: Maybe<User>;
};
export declare type UserPaginated = {
    items: Array<User>;
    pageInfo: PageInfo;
};
export declare type FilteredDateArgs = {
    calendarType?: Maybe<Scalars['String']>;
    endDate?: Maybe<Scalars['Date']>;
    startDate?: Maybe<Scalars['Date']>;
};
export declare type RegisterBuilderMutationVariables = Exact<{
    input: RegisterBuilderInput;
}>;
export declare type RegisterBuilderMutation = {
    registerBuilder: {
        success: boolean;
    };
};
export declare type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type ForgotPasswordMutation = {
    forgotPassword: {
        success: boolean;
    };
};
export declare type RegisterMutationVariables = Exact<{
    input: RegisterUserInput;
}>;
export declare type RegisterMutation = {
    register: {
        success: boolean;
    };
};
export declare type RestorePasswordMutationVariables = Exact<{
    newPassword: Scalars['String'];
    token: Scalars['String'];
}>;
export declare type RestorePasswordMutation = {
    restorePassword: {
        success: boolean;
    };
};
export declare type LoginMutationVariables = Exact<{
    input: LoginInput;
}>;
export declare type LoginMutation = {
    login: {
        email: string;
        name: string;
        role: {
            name: RoleType;
        };
    };
};
export declare type TokenLoginMutationVariables = Exact<{
    token: Scalars['String'];
}>;
export declare type TokenLoginMutation = {
    tokenLogin: {
        email: string;
        name: string;
        role: {
            name: RoleType;
        };
    };
};
export declare type AddClockInMutationVariables = Exact<{
    input: AddClockInInput;
}>;
export declare type AddClockInMutation = {
    addClockIn: {
        id: number;
        address: string;
        equipment: Array<{
            id: number;
            name: string;
        }>;
    };
};
export declare type AddClockOffMutationVariables = Exact<{
    input: AddClockOffInput;
}>;
export declare type AddClockOffMutation = {
    addClockOff: {
        success: boolean;
    };
};
export declare type CreateJobMutationVariables = Exact<{
    input: CreateJobInput;
}>;
export declare type CreateJobMutation = {
    createJob: {
        success: boolean;
    };
};
export declare type UpdateJobMutationVariables = Exact<{
    input: UpdateJobInput;
}>;
export declare type UpdateJobMutation = {
    updateJob: {
        success: boolean;
    };
};
export declare type UpdateJobDateMutationVariables = Exact<{
    input: UpdateJobDateInput;
}>;
export declare type UpdateJobDateMutation = {
    updateJobDate: {
        success: boolean;
    };
};
export declare type CancelJobMutationVariables = Exact<{
    input: Scalars['Float'];
}>;
export declare type CancelJobMutation = {
    cancelJob: {
        success: boolean;
    };
};
export declare type AssignToJobMutationVariables = Exact<{
    input: AssignToJobInput;
}>;
export declare type AssignToJobMutation = {
    assignToJob: {
        success: boolean;
    };
};
export declare type LogoutMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type LogoutMutation = {
    logout?: Maybe<{
        success: boolean;
    }>;
};
export declare type UpdateUserMutationVariables = Exact<{
    input: UpdateUserInput;
}>;
export declare type UpdateUserMutation = {
    updateUser: {
        success: boolean;
    };
};
export declare type DeleteUserMutationVariables = Exact<{
    input: Scalars['Float'];
}>;
export declare type DeleteUserMutation = {
    deleteUser: {
        success: boolean;
    };
};
export declare type JobFragmentFragment = {
    id: number;
    address: string;
    lat?: Maybe<number>;
    lng?: Maybe<number>;
    status: JobStatus;
    requestDate: any;
    poFile?: Maybe<string>;
    notes?: Maybe<string>;
    priority?: Maybe<string>;
    equipment: Array<{
        id: number;
        name: string;
    }>;
};
export declare type HasClockedIntoJobQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type HasClockedIntoJobQuery = {
    me: {
        hasClockedIntoJob: boolean;
    } | {};
};
export declare type MeQueryVariables = Exact<{
    status?: Maybe<JobStatus>;
    filter?: Maybe<JobFilter>;
}>;
export declare type MeQuery = {
    me: {
        id: number;
        name: string;
        email: string;
        role: {
            name: RoleType;
        };
    } | {
        id: number;
        name: string;
        email: string;
        jobRequests: Array<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            poFile?: Maybe<string>;
            notes?: Maybe<string>;
            priority?: Maybe<string>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
        role: {
            name: RoleType;
        };
    } | {
        id: number;
        name: string;
        email: string;
        assignedJobs: Array<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            poFile?: Maybe<string>;
            notes?: Maybe<string>;
            priority?: Maybe<string>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
        role: {
            name: RoleType;
        };
    };
};
export declare type JobQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type JobQuery = {
    job: {
        id: number;
        address: string;
        lat?: Maybe<number>;
        lng?: Maybe<number>;
        status: JobStatus;
        requestDate: any;
        poFile?: Maybe<string>;
        notes?: Maybe<string>;
        priority?: Maybe<string>;
        equipment: Array<{
            id: number;
            name: string;
        }>;
    };
};
export declare type ClockOffsQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type ClockOffsQuery = {
    job: {
        clockOffs: Array<{
            id: number;
            clockOffTime: string;
            notes: string;
            images?: Maybe<Array<Maybe<string>>>;
            staff: {
                name: string;
            };
        }>;
    };
};
export declare type ClockInsQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type ClockInsQuery = {
    job: {
        clockIns: Array<{
            id: number;
            clockInTime: string;
            images?: Maybe<Array<Maybe<string>>>;
            staff: {
                name: string;
            };
        }>;
    };
};
export declare type JobLocationQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type JobLocationQuery = {
    job: {
        address: string;
        lat?: Maybe<number>;
        lng?: Maybe<number>;
    };
};
export declare type MyJobRequestsQueryVariables = Exact<{
    status?: Maybe<JobStatus>;
    search?: Maybe<Scalars['String']>;
}>;
export declare type MyJobRequestsQuery = {
    me: {
        jobRequests: Array<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            poFile?: Maybe<string>;
            notes?: Maybe<string>;
            priority?: Maybe<string>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
    } | {};
};
export declare type MyAssignedJobsQueryVariables = Exact<{
    filter?: Maybe<JobFilter>;
    search?: Maybe<Scalars['String']>;
}>;
export declare type MyAssignedJobsQuery = {
    me: {
        assignedJobs: Array<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            priority?: Maybe<string>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
    } | {};
};
export declare type TodaysAssignedJobQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type TodaysAssignedJobQuery = {
    me: {
        todaysAssignedJob?: Maybe<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            priority?: Maybe<string>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
    } | {};
};
export declare type EquipmentQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type EquipmentQuery = {
    equipment: Array<{
        id: number;
        name: string;
    }>;
};
export declare type CompaniesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CompaniesQuery = {
    companies?: Maybe<Array<{
        name: string;
        id: number;
    }>>;
};
export declare type JobsQueryVariables = Exact<{
    status?: Maybe<Array<Maybe<JobStatus>> | Maybe<JobStatus>>;
    search?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    staff?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
    filteredDate?: Maybe<FilteredDateArgs>;
    orderBy?: Maybe<Scalars['String']>;
}>;
export declare type JobsQuery = {
    jobs: {
        pageInfo: {
            nextPage?: Maybe<number>;
            previousPage?: Maybe<number>;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        items: Array<{
            id: number;
            address: string;
            lat?: Maybe<number>;
            lng?: Maybe<number>;
            status: JobStatus;
            requestDate: any;
            priority?: Maybe<string>;
            notes?: Maybe<string>;
            builder: {
                name: string;
            };
            activity: Array<{
                type: string;
                date: any;
            }>;
            equipment: Array<{
                id: number;
                name: string;
            }>;
        }>;
    };
};
export declare type UsersQueryVariables = Exact<{
    role?: Maybe<Scalars['String']>;
    search?: Maybe<Scalars['String']>;
    paginate?: Maybe<Scalars['Boolean']>;
    pagination?: Maybe<PaginationArgs>;
    orderBy?: Maybe<Scalars['String']>;
}>;
export declare type UsersQuery = {
    users: {
        items: Array<{
            id: number;
            name: string;
            email: string;
            role: {
                id: number;
                name: RoleType;
            };
            company?: Maybe<{
                name: string;
            }>;
        } | {
            id: number;
            name: string;
            email: string;
            role: {
                id: number;
                name: RoleType;
            };
            company?: Maybe<{
                name: string;
            }>;
        } | {
            id: number;
            name: string;
            email: string;
            role: {
                id: number;
                name: RoleType;
            };
            company?: Maybe<{
                name: string;
            }>;
        }>;
        pageInfo: {
            nextPage?: Maybe<number>;
            previousPage?: Maybe<number>;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
};
export declare type TotalWorkedHoursQueryVariables = Exact<{
    startDate?: Maybe<Scalars['String']>;
    endDate?: Maybe<Scalars['String']>;
    search?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    orderBy?: Maybe<Scalars['String']>;
}>;
export declare type TotalWorkedHoursQuery = {
    report: {
        totalWorkedHours: {
            pageInfo: {
                nextPage?: Maybe<number>;
                previousPage?: Maybe<number>;
                hasNextPage: boolean;
                hasPreviousPage: boolean;
            };
            items: Array<{
                name: string;
                email: string;
                totalWorkedHours?: Maybe<number>;
            }>;
        };
    };
};
export declare type JobsForDateQueryVariables = Exact<{
    date: Scalars['String'];
    search?: Maybe<Scalars['String']>;
    pagination?: Maybe<PaginationArgs>;
    orderBy?: Maybe<Scalars['String']>;
}>;
export declare type JobsForDateQuery = {
    report: {
        jobsForDate: {
            pageInfo: {
                nextPage?: Maybe<number>;
                previousPage?: Maybe<number>;
                hasNextPage: boolean;
                hasPreviousPage: boolean;
            };
            items: Array<{
                id: number;
                address: string;
                staff: Array<{
                    name: string;
                }>;
                builder: {
                    name: string;
                };
                equipment: Array<{
                    name: string;
                }>;
            }>;
        };
    };
};
export declare type JobsForDateFullListQueryVariables = Exact<{
    date: Scalars['String'];
    search?: Maybe<Scalars['String']>;
    orderBy?: Maybe<Scalars['String']>;
}>;
export declare type JobsForDateFullListQuery = {
    report: {
        jobsForDateFullList: Array<Maybe<{
            id: number;
            staff: string;
            builder: string;
            address: string;
            equipment: string;
        }>>;
    };
};
export declare type StaffRolesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type StaffRolesQuery = {
    staffRoles: Array<{
        id: number;
        name: RoleType;
    }>;
};
export declare type UserQueryVariables = Exact<{
    id: Scalars['Float'];
}>;
export declare type UserQuery = {
    user: {
        name: string;
        email: string;
        company?: Maybe<{
            name: string;
        }>;
        role: {
            id: number;
            name: RoleType;
        };
    } | {
        name: string;
        email: string;
        company?: Maybe<{
            name: string;
        }>;
        role: {
            id: number;
            name: RoleType;
        };
    } | {
        name: string;
        email: string;
        company?: Maybe<{
            name: string;
        }>;
        role: {
            id: number;
            name: RoleType;
        };
    };
};
export declare type VerifyEmailMutationVariables = Exact<{
    token: Scalars['String'];
}>;
export declare type VerifyEmailMutation = {
    verifyEmail: {
        success: boolean;
    };
};
export declare type SettingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type SettingsQuery = {
    settings: {
        minJobRequestDate: any;
    };
};
export declare type UpdateMyAccountMutationVariables = Exact<{
    name: Scalars['String'];
    email: Scalars['String'];
    password?: Maybe<Scalars['String']>;
}>;
export declare type UpdateMyAccountMutation = {
    updateMyAccount: {
        name: string;
        email: string;
    } | {
        name: string;
        email: string;
    } | {
        name: string;
        email: string;
    };
};
export declare const JobFragmentFragmentDoc: ApolloCore.DocumentNode;
export declare const RegisterBuilderDocument: ApolloCore.DocumentNode;
export declare class RegisterBuilderGQL extends Apollo.Mutation<RegisterBuilderMutation, RegisterBuilderMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const ForgotPasswordDocument: ApolloCore.DocumentNode;
export declare class ForgotPasswordGQL extends Apollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const RegisterDocument: ApolloCore.DocumentNode;
export declare class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const RestorePasswordDocument: ApolloCore.DocumentNode;
export declare class RestorePasswordGQL extends Apollo.Mutation<RestorePasswordMutation, RestorePasswordMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const LoginDocument: ApolloCore.DocumentNode;
export declare class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const TokenLoginDocument: ApolloCore.DocumentNode;
export declare class TokenLoginGQL extends Apollo.Mutation<TokenLoginMutation, TokenLoginMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const AddClockInDocument: ApolloCore.DocumentNode;
export declare class AddClockInGQL extends Apollo.Mutation<AddClockInMutation, AddClockInMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const AddClockOffDocument: ApolloCore.DocumentNode;
export declare class AddClockOffGQL extends Apollo.Mutation<AddClockOffMutation, AddClockOffMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const CreateJobDocument: ApolloCore.DocumentNode;
export declare class CreateJobGQL extends Apollo.Mutation<CreateJobMutation, CreateJobMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UpdateJobDateDocument: ApolloCore.DocumentNode;
export declare class UpdateJobDateGQL extends Apollo.Mutation<UpdateJobDateMutation, UpdateJobDateMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UpdateJobDocument: ApolloCore.DocumentNode;
export declare class UpdateJobGQL extends Apollo.Mutation<UpdateJobMutation, UpdateJobMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const CancelJobDocument: ApolloCore.DocumentNode;
export declare class CancelJobGQL extends Apollo.Mutation<CancelJobMutation, CancelJobMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const AssignToJobDocument: ApolloCore.DocumentNode;
export declare class AssignToJobGQL extends Apollo.Mutation<AssignToJobMutation, AssignToJobMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const LogoutDocument: ApolloCore.DocumentNode;
export declare class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UpdateUserDocument: ApolloCore.DocumentNode;
export declare class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const DeleteUserDocument: ApolloCore.DocumentNode;
export declare class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const HasClockedIntoJobDocument: ApolloCore.DocumentNode;
export declare class HasClockedIntoJobGQL extends Apollo.Query<HasClockedIntoJobQuery, HasClockedIntoJobQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const MeDocument: ApolloCore.DocumentNode;
export declare class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const JobDocument: ApolloCore.DocumentNode;
export declare class JobGQL extends Apollo.Query<JobQuery, JobQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const ClockOffsDocument: ApolloCore.DocumentNode;
export declare class ClockOffsGQL extends Apollo.Query<ClockOffsQuery, ClockOffsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const ClockInsDocument: ApolloCore.DocumentNode;
export declare class ClockInsGQL extends Apollo.Query<ClockInsQuery, ClockInsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const JobLocationDocument: ApolloCore.DocumentNode;
export declare class JobLocationGQL extends Apollo.Query<JobLocationQuery, JobLocationQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const MyJobRequestsDocument: ApolloCore.DocumentNode;
export declare class MyJobRequestsGQL extends Apollo.Query<MyJobRequestsQuery, MyJobRequestsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const MyAssignedJobsDocument: ApolloCore.DocumentNode;
export declare class MyAssignedJobsGQL extends Apollo.Query<MyAssignedJobsQuery, MyAssignedJobsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const TodaysAssignedJobDocument: ApolloCore.DocumentNode;
export declare class TodaysAssignedJobGQL extends Apollo.Query<TodaysAssignedJobQuery, TodaysAssignedJobQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const EquipmentDocument: ApolloCore.DocumentNode;
export declare class EquipmentGQL extends Apollo.Query<EquipmentQuery, EquipmentQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const CompaniesDocument: ApolloCore.DocumentNode;
export declare class CompaniesGQL extends Apollo.Query<CompaniesQuery, CompaniesQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const JobsDocument: ApolloCore.DocumentNode;
export declare class JobsGQL extends Apollo.Query<JobsQuery, JobsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UsersDocument: ApolloCore.DocumentNode;
export declare class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const TotalWorkedHoursDocument: ApolloCore.DocumentNode;
export declare class TotalWorkedHoursGQL extends Apollo.Query<TotalWorkedHoursQuery, TotalWorkedHoursQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const JobsForDateDocument: ApolloCore.DocumentNode;
export declare class JobsForDateGQL extends Apollo.Query<JobsForDateQuery, JobsForDateQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const JobsForDateFullListDocument: ApolloCore.DocumentNode;
export declare class JobsForDateFullListGQL extends Apollo.Query<JobsForDateFullListQuery, JobsForDateFullListQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const StaffRolesDocument: ApolloCore.DocumentNode;
export declare class StaffRolesGQL extends Apollo.Query<StaffRolesQuery, StaffRolesQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UserDocument: ApolloCore.DocumentNode;
export declare class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const VerifyEmailDocument: ApolloCore.DocumentNode;
export declare class VerifyEmailGQL extends Apollo.Mutation<VerifyEmailMutation, VerifyEmailMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const SettingsDocument: ApolloCore.DocumentNode;
export declare class SettingsGQL extends Apollo.Query<SettingsQuery, SettingsQueryVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
export declare const UpdateMyAccountDocument: ApolloCore.DocumentNode;
export declare class UpdateMyAccountGQL extends Apollo.Mutation<UpdateMyAccountMutation, UpdateMyAccountMutationVariables> {
    document: ApolloCore.DocumentNode;
    constructor(apollo: Apollo.Apollo);
}
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {
}
interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {
}
interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {
}
export declare class ApolloAngularSDK {
    private registerBuilderGql;
    private forgotPasswordGql;
    private registerGql;
    private restorePasswordGql;
    private loginGql;
    private tokenLoginGql;
    private addClockInGql;
    private addClockOffGql;
    private createJobGql;
    private updateJobGql;
    private updateJobDateGql;
    private cancelJobGql;
    private assignToJobGql;
    private logoutGql;
    private updateUserGql;
    private deleteUserGql;
    private hasClockedIntoJobGql;
    private meGql;
    private jobGql;
    private clockOffsGql;
    private clockInsGql;
    private jobLocationGql;
    private myJobRequestsGql;
    private myAssignedJobsGql;
    private todaysAssignedJobGql;
    private equipmentGql;
    private companiesGql;
    private jobsGql;
    private usersGql;
    private totalWorkedHoursGql;
    private jobsForDateGql;
    private jobsForDateFullListGql;
    private staffRolesGql;
    private userGql;
    private verifyEmailGql;
    private settingsGql;
    private updateMyAccountGql;
    constructor(registerBuilderGql: RegisterBuilderGQL, forgotPasswordGql: ForgotPasswordGQL, registerGql: RegisterGQL, restorePasswordGql: RestorePasswordGQL, loginGql: LoginGQL, tokenLoginGql: TokenLoginGQL, addClockInGql: AddClockInGQL, addClockOffGql: AddClockOffGQL, createJobGql: CreateJobGQL, updateJobGql: UpdateJobGQL, updateJobDateGql: UpdateJobDateGQL, cancelJobGql: CancelJobGQL, assignToJobGql: AssignToJobGQL, logoutGql: LogoutGQL, updateUserGql: UpdateUserGQL, deleteUserGql: DeleteUserGQL, hasClockedIntoJobGql: HasClockedIntoJobGQL, meGql: MeGQL, jobGql: JobGQL, clockOffsGql: ClockOffsGQL, clockInsGql: ClockInsGQL, jobLocationGql: JobLocationGQL, myJobRequestsGql: MyJobRequestsGQL, myAssignedJobsGql: MyAssignedJobsGQL, todaysAssignedJobGql: TodaysAssignedJobGQL, equipmentGql: EquipmentGQL, companiesGql: CompaniesGQL, jobsGql: JobsGQL, usersGql: UsersGQL, totalWorkedHoursGql: TotalWorkedHoursGQL, jobsForDateGql: JobsForDateGQL, jobsForDateFullListGql: JobsForDateFullListGQL, staffRolesGql: StaffRolesGQL, userGql: UserGQL, verifyEmailGql: VerifyEmailGQL, settingsGql: SettingsGQL, updateMyAccountGql: UpdateMyAccountGQL);
    registerBuilder(variables: RegisterBuilderMutationVariables, options?: MutationOptionsAlone<RegisterBuilderMutation, RegisterBuilderMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<RegisterBuilderMutation, Record<string, any>, Record<string, any>>>;
    forgotPassword(variables: ForgotPasswordMutationVariables, options?: MutationOptionsAlone<ForgotPasswordMutation, ForgotPasswordMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<ForgotPasswordMutation, Record<string, any>, Record<string, any>>>;
    register(variables: RegisterMutationVariables, options?: MutationOptionsAlone<RegisterMutation, RegisterMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>>;
    restorePassword(variables: RestorePasswordMutationVariables, options?: MutationOptionsAlone<RestorePasswordMutation, RestorePasswordMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<RestorePasswordMutation, Record<string, any>, Record<string, any>>>;
    login(variables: LoginMutationVariables, options?: MutationOptionsAlone<LoginMutation, LoginMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<LoginMutation, Record<string, any>, Record<string, any>>>;
    tokenLogin(variables: TokenLoginMutationVariables, options?: MutationOptionsAlone<TokenLoginMutation, TokenLoginMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<TokenLoginMutation, Record<string, any>, Record<string, any>>>;
    addClockIn(variables: AddClockInMutationVariables, options?: MutationOptionsAlone<AddClockInMutation, AddClockInMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<AddClockInMutation, Record<string, any>, Record<string, any>>>;
    addClockOff(variables: AddClockOffMutationVariables, options?: MutationOptionsAlone<AddClockOffMutation, AddClockOffMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<AddClockOffMutation, Record<string, any>, Record<string, any>>>;
    createJob(variables: CreateJobMutationVariables, options?: MutationOptionsAlone<CreateJobMutation, CreateJobMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<CreateJobMutation, Record<string, any>, Record<string, any>>>;
    updateJob(variables: UpdateJobMutationVariables, options?: MutationOptionsAlone<UpdateJobMutation, UpdateJobMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<UpdateJobMutation, Record<string, any>, Record<string, any>>>;
    updateJobDate(variables: UpdateJobDateMutationVariables, options?: MutationOptionsAlone<UpdateJobDateMutation, UpdateJobDateMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<UpdateJobDateMutation, Record<string, any>, Record<string, any>>>;
    cancelJob(variables: CancelJobMutationVariables, options?: MutationOptionsAlone<CancelJobMutation, CancelJobMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<CancelJobMutation, Record<string, any>, Record<string, any>>>;
    assignToJob(variables: AssignToJobMutationVariables, options?: MutationOptionsAlone<AssignToJobMutation, AssignToJobMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<AssignToJobMutation, Record<string, any>, Record<string, any>>>;
    logout(variables?: LogoutMutationVariables, options?: MutationOptionsAlone<LogoutMutation, LogoutMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<LogoutMutation, Record<string, any>, Record<string, any>>>;
    updateUser(variables: UpdateUserMutationVariables, options?: MutationOptionsAlone<UpdateUserMutation, UpdateUserMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<UpdateUserMutation, Record<string, any>, Record<string, any>>>;
    deleteUser(variables: DeleteUserMutationVariables, options?: MutationOptionsAlone<DeleteUserMutation, DeleteUserMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<DeleteUserMutation, Record<string, any>, Record<string, any>>>;
    hasClockedIntoJob(variables: HasClockedIntoJobQueryVariables, options?: QueryOptionsAlone<HasClockedIntoJobQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<HasClockedIntoJobQuery>>;
    hasClockedIntoJobWatch(variables: HasClockedIntoJobQueryVariables, options?: WatchQueryOptionsAlone<HasClockedIntoJobQueryVariables>): Apollo.QueryRef<HasClockedIntoJobQuery, Exact<{
        id: number;
    }>>;
    me(variables?: MeQueryVariables, options?: QueryOptionsAlone<MeQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<MeQuery>>;
    meWatch(variables?: MeQueryVariables, options?: WatchQueryOptionsAlone<MeQueryVariables>): Apollo.QueryRef<MeQuery, Exact<{
        status?: Maybe<JobStatus>;
        filter?: Maybe<JobFilter>;
    }>>;
    job(variables: JobQueryVariables, options?: QueryOptionsAlone<JobQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<JobQuery>>;
    jobWatch(variables: JobQueryVariables, options?: WatchQueryOptionsAlone<JobQueryVariables>): Apollo.QueryRef<JobQuery, Exact<{
        id: number;
    }>>;
    clockOffs(variables: ClockOffsQueryVariables, options?: QueryOptionsAlone<ClockOffsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<ClockOffsQuery>>;
    clockOffsWatch(variables: ClockOffsQueryVariables, options?: WatchQueryOptionsAlone<ClockOffsQueryVariables>): Apollo.QueryRef<ClockOffsQuery, Exact<{
        id: number;
    }>>;
    clockIns(variables: ClockInsQueryVariables, options?: QueryOptionsAlone<ClockInsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<ClockInsQuery>>;
    clockInsWatch(variables: ClockInsQueryVariables, options?: WatchQueryOptionsAlone<ClockInsQueryVariables>): Apollo.QueryRef<ClockInsQuery, Exact<{
        id: number;
    }>>;
    jobLocation(variables: JobLocationQueryVariables, options?: QueryOptionsAlone<JobLocationQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<JobLocationQuery>>;
    jobLocationWatch(variables: JobLocationQueryVariables, options?: WatchQueryOptionsAlone<JobLocationQueryVariables>): Apollo.QueryRef<JobLocationQuery, Exact<{
        id: number;
    }>>;
    myJobRequests(variables?: MyJobRequestsQueryVariables, options?: QueryOptionsAlone<MyJobRequestsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<MyJobRequestsQuery>>;
    myJobRequestsWatch(variables?: MyJobRequestsQueryVariables, options?: WatchQueryOptionsAlone<MyJobRequestsQueryVariables>): Apollo.QueryRef<MyJobRequestsQuery, Exact<{
        status?: Maybe<JobStatus>;
        search?: Maybe<string>;
    }>>;
    myAssignedJobs(variables?: MyAssignedJobsQueryVariables, options?: QueryOptionsAlone<MyAssignedJobsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<MyAssignedJobsQuery>>;
    myAssignedJobsWatch(variables?: MyAssignedJobsQueryVariables, options?: WatchQueryOptionsAlone<MyAssignedJobsQueryVariables>): Apollo.QueryRef<MyAssignedJobsQuery, Exact<{
        filter?: Maybe<JobFilter>;
        search?: Maybe<string>;
    }>>;
    todaysAssignedJob(variables?: TodaysAssignedJobQueryVariables, options?: QueryOptionsAlone<TodaysAssignedJobQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<TodaysAssignedJobQuery>>;
    todaysAssignedJobWatch(variables?: TodaysAssignedJobQueryVariables, options?: WatchQueryOptionsAlone<TodaysAssignedJobQueryVariables>): Apollo.QueryRef<TodaysAssignedJobQuery, Exact<{
        [key: string]: never;
    }>>;
    equipment(variables?: EquipmentQueryVariables, options?: QueryOptionsAlone<EquipmentQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<EquipmentQuery>>;
    equipmentWatch(variables?: EquipmentQueryVariables, options?: WatchQueryOptionsAlone<EquipmentQueryVariables>): Apollo.QueryRef<EquipmentQuery, Exact<{
        [key: string]: never;
    }>>;
    companies(variables?: CompaniesQueryVariables, options?: QueryOptionsAlone<CompaniesQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<CompaniesQuery>>;
    companiesWatch(variables?: CompaniesQueryVariables, options?: WatchQueryOptionsAlone<CompaniesQueryVariables>): Apollo.QueryRef<CompaniesQuery, Exact<{
        [key: string]: never;
    }>>;
    jobs(variables?: JobsQueryVariables, options?: QueryOptionsAlone<JobsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<JobsQuery>>;
    jobsWatch(variables?: JobsQueryVariables, options?: WatchQueryOptionsAlone<JobsQueryVariables>): Apollo.QueryRef<JobsQuery, Exact<{
        status?: Maybe<Maybe<JobStatus> | Maybe<JobStatus>[]>;
        search?: Maybe<string>;
        pagination?: Maybe<PaginationArgs>;
        staff?: Maybe<number | number[]>;
        filteredDate?: Maybe<FilteredDateArgs>;
        orderBy?: Maybe<string>;
    }>>;
    users(variables?: UsersQueryVariables, options?: QueryOptionsAlone<UsersQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<UsersQuery>>;
    usersWatch(variables?: UsersQueryVariables, options?: WatchQueryOptionsAlone<UsersQueryVariables>): Apollo.QueryRef<UsersQuery, Exact<{
        role?: Maybe<string>;
        search?: Maybe<string>;
        paginate?: Maybe<boolean>;
        pagination?: Maybe<PaginationArgs>;
        orderBy?: Maybe<string>;
    }>>;
    totalWorkedHours(variables?: TotalWorkedHoursQueryVariables, options?: QueryOptionsAlone<TotalWorkedHoursQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<TotalWorkedHoursQuery>>;
    totalWorkedHoursWatch(variables?: TotalWorkedHoursQueryVariables, options?: WatchQueryOptionsAlone<TotalWorkedHoursQueryVariables>): Apollo.QueryRef<TotalWorkedHoursQuery, Exact<{
        startDate?: Maybe<string>;
        endDate?: Maybe<string>;
        search?: Maybe<string>;
        pagination?: Maybe<PaginationArgs>;
        orderBy?: Maybe<string>;
    }>>;
    jobsForDate(variables: JobsForDateQueryVariables, options?: QueryOptionsAlone<JobsForDateQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<JobsForDateQuery>>;
    jobsForDateWatch(variables: JobsForDateQueryVariables, options?: WatchQueryOptionsAlone<JobsForDateQueryVariables>): Apollo.QueryRef<JobsForDateQuery, Exact<{
        date: string;
        search?: Maybe<string>;
        pagination?: Maybe<PaginationArgs>;
        orderBy?: Maybe<string>;
    }>>;
    jobsForDateFullList(variables: JobsForDateFullListQueryVariables, options?: QueryOptionsAlone<JobsForDateFullListQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<JobsForDateFullListQuery>>;
    jobsForDateFullListWatch(variables: JobsForDateFullListQueryVariables, options?: WatchQueryOptionsAlone<JobsForDateFullListQueryVariables>): Apollo.QueryRef<JobsForDateFullListQuery, Exact<{
        date: string;
        search?: Maybe<string>;
        orderBy?: Maybe<string>;
    }>>;
    staffRoles(variables?: StaffRolesQueryVariables, options?: QueryOptionsAlone<StaffRolesQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<StaffRolesQuery>>;
    staffRolesWatch(variables?: StaffRolesQueryVariables, options?: WatchQueryOptionsAlone<StaffRolesQueryVariables>): Apollo.QueryRef<StaffRolesQuery, Exact<{
        [key: string]: never;
    }>>;
    user(variables: UserQueryVariables, options?: QueryOptionsAlone<UserQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<UserQuery>>;
    userWatch(variables: UserQueryVariables, options?: WatchQueryOptionsAlone<UserQueryVariables>): Apollo.QueryRef<UserQuery, Exact<{
        id: number;
    }>>;
    verifyEmail(variables: VerifyEmailMutationVariables, options?: MutationOptionsAlone<VerifyEmailMutation, VerifyEmailMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<VerifyEmailMutation, Record<string, any>, Record<string, any>>>;
    settings(variables?: SettingsQueryVariables, options?: QueryOptionsAlone<SettingsQueryVariables>): import("rxjs").Observable<ApolloCore.ApolloQueryResult<SettingsQuery>>;
    settingsWatch(variables?: SettingsQueryVariables, options?: WatchQueryOptionsAlone<SettingsQueryVariables>): Apollo.QueryRef<SettingsQuery, Exact<{
        [key: string]: never;
    }>>;
    updateMyAccount(variables: UpdateMyAccountMutationVariables, options?: MutationOptionsAlone<UpdateMyAccountMutation, UpdateMyAccountMutationVariables>): import("rxjs").Observable<ApolloCore.FetchResult<UpdateMyAccountMutation, Record<string, any>, Record<string, any>>>;
}
export {};
