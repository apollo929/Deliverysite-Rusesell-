import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Activity = {
  date: Scalars['Date'];
  type: Scalars['String'];
};

export type AddClockInInput = {
  files: Array<Scalars['Upload']>;
  jobId: Scalars['Float'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type AddClockInRs = {
  address: Scalars['String'];
  equipment: Array<Equipment>;
  id: Scalars['Float'];
};

export type AddClockOffInput = {
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  jobId: Scalars['Float'];
  notes: Scalars['String'];
};

export type AddCompanyInput = {
  name: Scalars['String'];
};

export type Admin = Node & User & {
  company?: Maybe<Company>;
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Role;
};

export type AssignToJobInput = {
  jobId: Scalars['Float'];
  staffIds: Array<Scalars['Float']>;
};

export type Assigner = Node & User & {
  company?: Maybe<Company>;
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Role;
};

export type Builder = Node & User & {
  company?: Maybe<Company>;
  email: Scalars['String'];
  id: Scalars['Float'];
  jobRequests: Array<Job>;
  name: Scalars['String'];
  role: Role;
};


export type BuilderJobRequestsArgs = {
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<JobStatus>;
};

export type ClockIn = Node & {
  clockInTime: Scalars['String'];
  id: Scalars['Float'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  job: Job;
  staff: Staff;
};

export type ClockOff = Node & {
  clockOffTime: Scalars['String'];
  id: Scalars['Float'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  notes: Scalars['String'];
  staff: Staff;
};

export type ClockOffConnection = {
  edges?: Maybe<Array<Maybe<ClockOffEdge>>>;
  pageInfo: PageInfo;
};

export type ClockOffEdge = {
  cursor: Scalars['String'];
  node?: Maybe<ClockOff>;
};

export type Company = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateJobInput = {
  address: Scalars['String'];
  adminSelectedBuilder?: InputMaybe<Scalars['Float']>;
  created?: InputMaybe<Scalars['String']>;
  equipment: Array<Scalars['Float']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  notes?: InputMaybe<Scalars['String']>;
  poFile?: InputMaybe<Scalars['Upload']>;
  priority?: InputMaybe<Scalars['String']>;
  requestDate: Scalars['Date'];
  stage?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Equipment = Node & {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Job = Node & {
  activity: Array<Activity>;
  address: Scalars['String'];
  adminSelectedBuilder?: Maybe<Scalars['Float']>;
  assigner?: Maybe<Assigner>;
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
  staff: Array<Staff>;
  stage?: Maybe<Scalars['String']>;
  status: JobStatus;
  time?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type JobConnection = {
  edges: Array<JobEdge>;
  pageInfo: PageInfo;
};

export type JobEdge = {
  cursor: Scalars['String'];
  node: Job;
};

export enum JobFilter {
  Cancelled = 'cancelled',
  Past = 'past',
  Upcoming = 'upcoming'
}

export type JobPaginated = {
  items: Array<Job>;
  pageInfo: PageInfo;
};

export enum JobStatus {
  Assigned = 'assigned',
  Cancelled = 'cancelled',
  Completed = 'completed',
  InProgress = 'inProgress',
  Pending = 'pending',
  UnAssigned = 'unAssigned'
}

export type JobsForDateReportItem = {
  address: Scalars['String'];
  builder: Builder;
  equipment: Array<Equipment>;
  id: Scalars['Float'];
  staff: Array<Staff>;
};

export type JobsForDateReportPaginated = {
  items: Array<JobsForDateReportItem>;
  pageInfo: PageInfo;
};

export type JobsForDateReportTableItem = {
  address: Scalars['String'];
  builder: Scalars['String'];
  equipment: Scalars['String'];
  id: Scalars['Float'];
  staff: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginRs = {
  email: Scalars['String'];
  name: Scalars['String'];
  role: Role;
};

export type Mutation = {
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
  unAssignToJob: Success;
  updateJob: Success;
  updateJobDate: Success;
  updateMyAccount: User;
  updateUser: Success;
  verifyEmail: Success;
};


export type MutationAddClockInArgs = {
  input: AddClockInInput;
};


export type MutationAddClockOffArgs = {
  input: AddClockOffInput;
};


export type MutationAddCompanyArgs = {
  input: AddCompanyInput;
};


export type MutationAssignToJobArgs = {
  input: AssignToJobInput;
};


export type MutationCancelJobArgs = {
  jobId: Scalars['Float'];
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationRegisterBuilderArgs = {
  input: RegisterBuilderInput;
};


export type MutationRestorePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationTokenLoginArgs = {
  token: Scalars['String'];
};


export type MutationUnAssignToJobArgs = {
  input: UnAssignToJobInput;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};


export type MutationUpdateJobDateArgs = {
  input: UpdateJobDateInput;
};


export type MutationUpdateMyAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Node = {
  id: Scalars['Float'];
};

export type PageInfo = {
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  previousPage?: Maybe<Scalars['Int']>;
};

export type PaginationArgs = {
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Query = {
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


export type QueryJobArgs = {
  id: Scalars['Float'];
};


export type QueryJobsArgs = {
  filteredDate?: InputMaybe<FilteredDateArgs>;
  orderBy?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationArgs>;
  search?: InputMaybe<Scalars['String']>;
  staff?: InputMaybe<Array<Scalars['Int']>>;
  status?: InputMaybe<Array<InputMaybe<JobStatus>>>;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Scalars['String']>;
  paginate?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<PaginationArgs>;
  role?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type RegisterBuilderInput = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterUserInput = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['Float'];
};

export type Report = {
  jobsForDate: JobsForDateReportPaginated;
  jobsForDateFullList: Array<Maybe<JobsForDateReportTableItem>>;
  totalWorkedHours: TotalWorkedHoursReportPaginated;
};


export type ReportJobsForDateArgs = {
  date: Scalars['String'];
  fullListg?: InputMaybe<Scalars['Boolean']>;
  orderBy?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationArgs>;
  search?: InputMaybe<Scalars['String']>;
};


export type ReportJobsForDateFullListArgs = {
  date: Scalars['String'];
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};


export type ReportTotalWorkedHoursArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationArgs>;
  search?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type Role = {
  id: Scalars['Float'];
  name: RoleType;
};

export enum RoleType {
  Admin = 'admin',
  Builder = 'builder',
  Laborer = 'laborer',
  Operator = 'operator'
}

export type Settings = {
  minJobRequestDate: Scalars['Date'];
};

export type Staff = Node & User & {
  assignedJobs: Array<Job>;
  company?: Maybe<Company>;
  email: Scalars['String'];
  hasClockedIntoJob: Scalars['Boolean'];
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Role;
  todaysAssignedJob?: Maybe<Job>;
};


export type StaffAssignedJobsArgs = {
  filter?: InputMaybe<JobFilter>;
  search?: InputMaybe<Scalars['String']>;
};


export type StaffHasClockedIntoJobArgs = {
  id: Scalars['Float'];
};

export type Success = {
  success: Scalars['Boolean'];
};

export type TotalWorkedHoursReportItem = {
  email: Scalars['String'];
  name: Scalars['String'];
  totalWorkedHours?: Maybe<Scalars['Float']>;
};

export type TotalWorkedHoursReportPaginated = {
  items: Array<TotalWorkedHoursReportItem>;
  pageInfo: PageInfo;
};

export type UnAssignToJobInput = {
  jobId: Scalars['Float'];
};

export type UpdateJobDateInput = {
  id: Scalars['Float'];
  requestDate: Scalars['Date'];
  updateField: Scalars['String'];
};

export type UpdateJobInput = {
  address: Scalars['String'];
  adminSelectedBuilder?: InputMaybe<Scalars['Float']>;
  created?: InputMaybe<Scalars['String']>;
  equipment: Array<Scalars['Float']>;
  id: Scalars['Float'];
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  notes?: InputMaybe<Scalars['String']>;
  poFile?: InputMaybe<Scalars['Upload']>;
  priority?: InputMaybe<Scalars['String']>;
  requestDate: Scalars['Date'];
  stage?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  roleId?: InputMaybe<Scalars['Float']>;
  userId: Scalars['Float'];
};

export type User = {
  company?: Maybe<Company>;
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  role: Role;
};

export type UserConnection = {
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserPaginated = {
  items: Array<User>;
  pageInfo: PageInfo;
};

export type FilteredDateArgs = {
  calendarType?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type RegisterBuilderMutationVariables = Exact<{
  input: RegisterBuilderInput;
}>;


export type RegisterBuilderMutation = { registerBuilder: { success: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { forgotPassword: { success: boolean } };

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterMutation = { register: { success: boolean } };

export type RestorePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type RestorePasswordMutation = { restorePassword: { success: boolean } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { email: string, name: string, role: { name: RoleType } } };

export type TokenLoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type TokenLoginMutation = { tokenLogin: { email: string, name: string, role: { name: RoleType } } };

export type AddClockInMutationVariables = Exact<{
  input: AddClockInInput;
}>;


export type AddClockInMutation = { addClockIn: { id: number, address: string, equipment: Array<{ id: number, name: string }> } };

export type AddClockOffMutationVariables = Exact<{
  input: AddClockOffInput;
}>;


export type AddClockOffMutation = { addClockOff: { success: boolean } };

export type CreateJobMutationVariables = Exact<{
  input: CreateJobInput;
}>;


export type CreateJobMutation = { createJob: { success: boolean } };

export type UpdateJobMutationVariables = Exact<{
  input: UpdateJobInput;
}>;


export type UpdateJobMutation = { updateJob: { success: boolean } };

export type UpdateJobDateMutationVariables = Exact<{
  input: UpdateJobDateInput;
}>;


export type UpdateJobDateMutation = { updateJobDate: { success: boolean } };

export type CancelJobMutationVariables = Exact<{
  input: Scalars['Float'];
}>;


export type CancelJobMutation = { cancelJob: { success: boolean } };

export type AssignToJobMutationVariables = Exact<{
  input: AssignToJobInput;
}>;


export type AssignToJobMutation = { assignToJob: { success: boolean } };

export type UnAssignToJobMutationVariables = Exact<{
  input: UnAssignToJobInput;
}>;


export type UnAssignToJobMutation = { unAssignToJob: { success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout?: Maybe<{ success: boolean }> };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { updateUser: { success: boolean } };

export type DeleteUserMutationVariables = Exact<{
  input: Scalars['Float'];
}>;


export type DeleteUserMutation = { deleteUser: { success: boolean } };

export type JobFragmentFragment = { id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, poFile?: Maybe<string>, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }>, assigner?: Maybe<{ id: number, name: string }> };

export type HasClockedIntoJobQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type HasClockedIntoJobQuery = { me: { hasClockedIntoJob: boolean } | {} };

export type MeQueryVariables = Exact<{
  status?: Maybe<JobStatus>;
  filter?: Maybe<JobFilter>;
}>;


export type MeQuery = { me: { id: number, name: string, email: string, role: { name: RoleType } } | { id: number, name: string, email: string, role: { name: RoleType } } | { id: number, name: string, email: string, jobRequests: Array<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, poFile?: Maybe<string>, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }>, assigner?: Maybe<{ id: number, name: string }> }>, role: { name: RoleType } } | { id: number, name: string, email: string, assignedJobs: Array<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, poFile?: Maybe<string>, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }>, assigner?: Maybe<{ id: number, name: string }> }>, role: { name: RoleType } } };

export type JobQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JobQuery = { job: { id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, poFile?: Maybe<string>, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }>, assigner?: Maybe<{ id: number, name: string }> } };

export type JobAssignerQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JobAssignerQuery = { job: { assigner?: Maybe<{ name: string }> } };

export type JobStaffsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JobStaffsQuery = { job: { staff: Array<{ name: string }> } };

export type ClockOffsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ClockOffsQuery = { job: { clockOffs: Array<{ id: number, clockOffTime: string, notes: string, images?: Maybe<Array<Maybe<string>>>, staff: { name: string } }> } };

export type ClockInsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ClockInsQuery = { job: { clockIns: Array<{ id: number, clockInTime: string, images?: Maybe<Array<Maybe<string>>>, staff: { name: string } }> } };

export type JobLocationQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JobLocationQuery = { job: { address: string, lat?: Maybe<number>, lng?: Maybe<number> } };

export type MyJobRequestsQueryVariables = Exact<{
  status?: Maybe<JobStatus>;
  search?: Maybe<Scalars['String']>;
}>;


export type MyJobRequestsQuery = { me: { jobRequests: Array<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, poFile?: Maybe<string>, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }>, assigner?: Maybe<{ id: number, name: string }> }> } | {} };

export type MyAssignedJobsQueryVariables = Exact<{
  filter?: Maybe<JobFilter>;
  search?: Maybe<Scalars['String']>;
}>;


export type MyAssignedJobsQuery = { me: { assignedJobs: Array<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, notes?: Maybe<string>, priority?: Maybe<string>, builder: { name: string }, equipment: Array<{ id: number, name: string }> }> } | {} };

export type TodaysAssignedJobQueryVariables = Exact<{ [key: string]: never; }>;


export type TodaysAssignedJobQuery = { me: { todaysAssignedJob?: Maybe<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, notes?: Maybe<string>, priority?: Maybe<string>, equipment: Array<{ id: number, name: string }> }> } | {} };

export type EquipmentQueryVariables = Exact<{ [key: string]: never; }>;


export type EquipmentQuery = { equipment: Array<{ id: number, name: string }> };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { companies?: Maybe<Array<{ name: string, id: number }>> };

export type JobsQueryVariables = Exact<{
  status?: Maybe<Array<Maybe<JobStatus>> | Maybe<JobStatus>>;
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationArgs>;
  staff?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  filteredDate?: Maybe<FilteredDateArgs>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type JobsQuery = { jobs: { pageInfo: { nextPage?: Maybe<number>, previousPage?: Maybe<number>, hasNextPage: boolean, hasPreviousPage: boolean }, items: Array<{ id: number, address: string, lat?: Maybe<number>, lng?: Maybe<number>, status: JobStatus, requestDate: any, priority?: Maybe<string>, notes?: Maybe<string>, builder: { name: string }, assigner?: Maybe<{ id: number, name: string }>, activity: Array<{ type: string, date: any }>, equipment: Array<{ id: number, name: string }> }> } };

export type UsersQueryVariables = Exact<{
  role?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  paginate?: Maybe<Scalars['Boolean']>;
  pagination?: Maybe<PaginationArgs>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type UsersQuery = { users: { items: Array<{ id: number, name: string, email: string, role: { id: number, name: RoleType }, company?: Maybe<{ name: string }> } | { id: number, name: string, email: string, role: { id: number, name: RoleType }, company?: Maybe<{ name: string }> } | { id: number, name: string, email: string, role: { id: number, name: RoleType }, company?: Maybe<{ name: string }> } | { id: number, name: string, email: string, role: { id: number, name: RoleType }, company?: Maybe<{ name: string }> }>, pageInfo: { nextPage?: Maybe<number>, previousPage?: Maybe<number>, hasNextPage: boolean, hasPreviousPage: boolean } } };

export type TotalWorkedHoursQueryVariables = Exact<{
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationArgs>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type TotalWorkedHoursQuery = { report: { totalWorkedHours: { pageInfo: { nextPage?: Maybe<number>, previousPage?: Maybe<number>, hasNextPage: boolean, hasPreviousPage: boolean }, items: Array<{ name: string, email: string, totalWorkedHours?: Maybe<number> }> } } };

export type JobsForDateQueryVariables = Exact<{
  date: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationArgs>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type JobsForDateQuery = { report: { jobsForDate: { pageInfo: { nextPage?: Maybe<number>, previousPage?: Maybe<number>, hasNextPage: boolean, hasPreviousPage: boolean }, items: Array<{ id: number, address: string, staff: Array<{ name: string }>, builder: { name: string }, equipment: Array<{ name: string }> }> } } };

export type JobsForDateFullListQueryVariables = Exact<{
  date: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type JobsForDateFullListQuery = { report: { jobsForDateFullList: Array<Maybe<{ id: number, staff: string, builder: string, address: string, equipment: string }>> } };

export type StaffRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type StaffRolesQuery = { staffRoles: Array<{ id: number, name: RoleType }> };

export type UserQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UserQuery = { user: { name: string, email: string, company?: Maybe<{ name: string }>, role: { id: number, name: RoleType } } | { name: string, email: string, company?: Maybe<{ name: string }>, role: { id: number, name: RoleType } } | { name: string, email: string, company?: Maybe<{ name: string }>, role: { id: number, name: RoleType } } | { name: string, email: string, company?: Maybe<{ name: string }>, role: { id: number, name: RoleType } } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { verifyEmail: { success: boolean } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { settings: { minJobRequestDate: any } };

export type UpdateMyAccountMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type UpdateMyAccountMutation = { updateMyAccount: { name: string, email: string } | { name: string, email: string } | { name: string, email: string } | { name: string, email: string } };

export const JobFragmentFragmentDoc = gql`
    fragment JobFragment on Job {
  id
  address
  lat
  lng
  status
  requestDate
  poFile
  notes
  priority
  equipment {
    id
    name
  }
  assigner {
    id
    name
  }
}
    `;
export const RegisterBuilderDocument = gql`
    mutation RegisterBuilder($input: RegisterBuilderInput!) {
  registerBuilder(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterBuilderGQL extends Apollo.Mutation<RegisterBuilderMutation, RegisterBuilderMutationVariables> {
    document = RegisterBuilderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ForgotPasswordGQL extends Apollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> {
    document = ForgotPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation Register($input: RegisterUserInput!) {
  register(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RestorePasswordDocument = gql`
    mutation RestorePassword($newPassword: String!, $token: String!) {
  restorePassword(newPassword: $newPassword, token: $token) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RestorePasswordGQL extends Apollo.Mutation<RestorePasswordMutation, RestorePasswordMutationVariables> {
    document = RestorePasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    role {
      name
    }
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TokenLoginDocument = gql`
    mutation TokenLogin($token: String!) {
  tokenLogin(token: $token) {
    role {
      name
    }
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TokenLoginGQL extends Apollo.Mutation<TokenLoginMutation, TokenLoginMutationVariables> {
    document = TokenLoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddClockInDocument = gql`
    mutation AddClockIn($input: AddClockInInput!) {
  addClockIn(input: $input) {
    id
    equipment {
      id
      name
    }
    address
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddClockInGQL extends Apollo.Mutation<AddClockInMutation, AddClockInMutationVariables> {
    document = AddClockInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddClockOffDocument = gql`
    mutation AddClockOff($input: AddClockOffInput!) {
  addClockOff(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddClockOffGQL extends Apollo.Mutation<AddClockOffMutation, AddClockOffMutationVariables> {
    document = AddClockOffDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateJobDocument = gql`
    mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateJobGQL extends Apollo.Mutation<CreateJobMutation, CreateJobMutationVariables> {
    document = CreateJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateJobDocument = gql`
    mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateJobGQL extends Apollo.Mutation<UpdateJobMutation, UpdateJobMutationVariables> {
    document = UpdateJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateJobDateDocument = gql`
    mutation UpdateJobDate($input: UpdateJobDateInput!) {
  updateJobDate(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateJobDateGQL extends Apollo.Mutation<UpdateJobDateMutation, UpdateJobDateMutationVariables> {
    document = UpdateJobDateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CancelJobDocument = gql`
    mutation CancelJob($input: Float!) {
  cancelJob(jobId: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CancelJobGQL extends Apollo.Mutation<CancelJobMutation, CancelJobMutationVariables> {
    document = CancelJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AssignToJobDocument = gql`
    mutation AssignToJob($input: AssignToJobInput!) {
  assignToJob(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssignToJobGQL extends Apollo.Mutation<AssignToJobMutation, AssignToJobMutationVariables> {
    document = AssignToJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnAssignToJobDocument = gql`
    mutation UnAssignToJob($input: UnAssignToJobInput!) {
  unAssignToJob(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UnAssignToJobGQL extends Apollo.Mutation<UnAssignToJobMutation, UnAssignToJobMutationVariables> {
    document = UnAssignToJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation DeleteUser($input: Float!) {
  deleteUser(userId: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const HasClockedIntoJobDocument = gql`
    query HasClockedIntoJob($id: Float!) {
  me {
    ... on Staff {
      hasClockedIntoJob(id: $id)
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HasClockedIntoJobGQL extends Apollo.Query<HasClockedIntoJobQuery, HasClockedIntoJobQueryVariables> {
    document = HasClockedIntoJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query Me($status: JobStatus, $filter: JobFilter) {
  me {
    id
    name
    email
    role {
      name
    }
    ... on Builder {
      jobRequests(status: $status) {
        ...JobFragment
      }
    }
    ... on Staff {
      assignedJobs(filter: $filter) {
        ...JobFragment
      }
    }
  }
}
    ${JobFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobDocument = gql`
    query Job($id: Float!) {
  job(id: $id) {
    ...JobFragment
  }
}
    ${JobFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class JobGQL extends Apollo.Query<JobQuery, JobQueryVariables> {
    document = JobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobAssignerDocument = gql`
    query JobAssigner($id: Float!) {
  job(id: $id) {
    assigner {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobAssignerGQL extends Apollo.Query<JobAssignerQuery, JobAssignerQueryVariables> {
    document = JobAssignerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobStaffsDocument = gql`
    query JobStaffs($id: Float!) {
  job(id: $id) {
    staff {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobStaffsGQL extends Apollo.Query<JobStaffsQuery, JobStaffsQueryVariables> {
    document = JobStaffsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClockOffsDocument = gql`
    query ClockOffs($id: Float!) {
  job(id: $id) {
    clockOffs {
      id
      clockOffTime
      notes
      staff {
        name
      }
      images
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClockOffsGQL extends Apollo.Query<ClockOffsQuery, ClockOffsQueryVariables> {
    document = ClockOffsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClockInsDocument = gql`
    query ClockIns($id: Float!) {
  job(id: $id) {
    clockIns {
      id
      clockInTime
      staff {
        name
      }
      images
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClockInsGQL extends Apollo.Query<ClockInsQuery, ClockInsQueryVariables> {
    document = ClockInsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobLocationDocument = gql`
    query JobLocation($id: Float!) {
  job(id: $id) {
    address
    lat
    lng
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobLocationGQL extends Apollo.Query<JobLocationQuery, JobLocationQueryVariables> {
    document = JobLocationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MyJobRequestsDocument = gql`
    query MyJobRequests($status: JobStatus, $search: String) {
  me {
    ... on Builder {
      jobRequests(status: $status, search: $search) {
        ...JobFragment
      }
    }
  }
}
    ${JobFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MyJobRequestsGQL extends Apollo.Query<MyJobRequestsQuery, MyJobRequestsQueryVariables> {
    document = MyJobRequestsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MyAssignedJobsDocument = gql`
    query MyAssignedJobs($filter: JobFilter, $search: String) {
  me {
    ... on Staff {
      assignedJobs(filter: $filter, search: $search) {
        id
        address
        lat
        lng
        status
        requestDate
        notes
        priority
        builder {
          name
        }
        equipment {
          id
          name
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MyAssignedJobsGQL extends Apollo.Query<MyAssignedJobsQuery, MyAssignedJobsQueryVariables> {
    document = MyAssignedJobsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TodaysAssignedJobDocument = gql`
    query TodaysAssignedJob {
  me {
    ... on Staff {
      todaysAssignedJob {
        id
        address
        lat
        lng
        status
        requestDate
        notes
        priority
        equipment {
          id
          name
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TodaysAssignedJobGQL extends Apollo.Query<TodaysAssignedJobQuery, TodaysAssignedJobQueryVariables> {
    document = TodaysAssignedJobDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EquipmentDocument = gql`
    query Equipment {
  equipment {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EquipmentGQL extends Apollo.Query<EquipmentQuery, EquipmentQueryVariables> {
    document = EquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CompaniesDocument = gql`
    query Companies {
  companies {
    name
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CompaniesGQL extends Apollo.Query<CompaniesQuery, CompaniesQueryVariables> {
    document = CompaniesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobsDocument = gql`
    query Jobs($status: [JobStatus], $search: String, $pagination: PaginationArgs, $staff: [Int!], $filteredDate: filteredDateArgs, $orderBy: String) {
  jobs(
    status: $status
    search: $search
    pagination: $pagination
    filteredDate: $filteredDate
    staff: $staff
    orderBy: $orderBy
  ) {
    pageInfo {
      nextPage
      previousPage
      hasNextPage
      hasPreviousPage
    }
    items {
      id
      address
      lat
      lng
      status
      requestDate
      priority
      notes
      builder {
        name
      }
      assigner {
        id
        name
      }
      activity {
        type
        date
      }
      equipment {
        id
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobsGQL extends Apollo.Query<JobsQuery, JobsQueryVariables> {
    document = JobsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    query Users($role: String, $search: String, $paginate: Boolean, $pagination: PaginationArgs, $orderBy: String) {
  users(
    role: $role
    search: $search
    paginate: $paginate
    pagination: $pagination
    orderBy: $orderBy
  ) {
    items {
      id
      name
      email
      role {
        id
        name
      }
      company {
        name
      }
    }
    pageInfo {
      nextPage
      previousPage
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TotalWorkedHoursDocument = gql`
    query TotalWorkedHours($startDate: String, $endDate: String, $search: String, $pagination: PaginationArgs, $orderBy: String) {
  report {
    totalWorkedHours(
      startDate: $startDate
      endDate: $endDate
      search: $search
      pagination: $pagination
      orderBy: $orderBy
    ) {
      pageInfo {
        nextPage
        previousPage
        hasNextPage
        hasPreviousPage
      }
      items {
        name
        email
        totalWorkedHours
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TotalWorkedHoursGQL extends Apollo.Query<TotalWorkedHoursQuery, TotalWorkedHoursQueryVariables> {
    document = TotalWorkedHoursDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobsForDateDocument = gql`
    query JobsForDate($date: String!, $search: String, $pagination: PaginationArgs, $orderBy: String) {
  report {
    jobsForDate(
      date: $date
      search: $search
      pagination: $pagination
      orderBy: $orderBy
    ) {
      pageInfo {
        nextPage
        previousPage
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        staff {
          name
        }
        builder {
          name
        }
        address
        equipment {
          name
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobsForDateGQL extends Apollo.Query<JobsForDateQuery, JobsForDateQueryVariables> {
    document = JobsForDateDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JobsForDateFullListDocument = gql`
    query JobsForDateFullList($date: String!, $search: String, $orderBy: String) {
  report {
    jobsForDateFullList(date: $date, search: $search, orderBy: $orderBy) {
      id
      staff
      builder
      address
      equipment
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JobsForDateFullListGQL extends Apollo.Query<JobsForDateFullListQuery, JobsForDateFullListQueryVariables> {
    document = JobsForDateFullListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const StaffRolesDocument = gql`
    query StaffRoles {
  staffRoles {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StaffRolesGQL extends Apollo.Query<StaffRolesQuery, StaffRolesQueryVariables> {
    document = StaffRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query User($id: Float!) {
  user(id: $id) {
    name
    email
    company {
      name
    }
    role {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyEmailGQL extends Apollo.Mutation<VerifyEmailMutation, VerifyEmailMutationVariables> {
    document = VerifyEmailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SettingsDocument = gql`
    query Settings {
  settings {
    minJobRequestDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SettingsGQL extends Apollo.Query<SettingsQuery, SettingsQueryVariables> {
    document = SettingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateMyAccountDocument = gql`
    mutation UpdateMyAccount($name: String!, $email: String!, $password: String) {
  updateMyAccount(name: $name, email: $email, password: $password) {
    name
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateMyAccountGQL extends Apollo.Mutation<UpdateMyAccountMutation, UpdateMyAccountMutationVariables> {
    document = UpdateMyAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class ApolloAngularSDK {
    constructor(
      private registerBuilderGql: RegisterBuilderGQL,
      private forgotPasswordGql: ForgotPasswordGQL,
      private registerGql: RegisterGQL,
      private restorePasswordGql: RestorePasswordGQL,
      private loginGql: LoginGQL,
      private tokenLoginGql: TokenLoginGQL,
      private addClockInGql: AddClockInGQL,
      private addClockOffGql: AddClockOffGQL,
      private createJobGql: CreateJobGQL,
      private updateJobGql: UpdateJobGQL,
      private updateJobDateGql: UpdateJobDateGQL,
      private cancelJobGql: CancelJobGQL,
      private assignToJobGql: AssignToJobGQL,
      private unAssignToJobGql: UnAssignToJobGQL,
      private logoutGql: LogoutGQL,
      private updateUserGql: UpdateUserGQL,
      private deleteUserGql: DeleteUserGQL,
      private hasClockedIntoJobGql: HasClockedIntoJobGQL,
      private meGql: MeGQL,
      private jobGql: JobGQL,
      private jobAssignerGql: JobAssignerGQL,
      private jobStaffsGql: JobStaffsGQL,
      private clockOffsGql: ClockOffsGQL,
      private clockInsGql: ClockInsGQL,
      private jobLocationGql: JobLocationGQL,
      private myJobRequestsGql: MyJobRequestsGQL,
      private myAssignedJobsGql: MyAssignedJobsGQL,
      private todaysAssignedJobGql: TodaysAssignedJobGQL,
      private equipmentGql: EquipmentGQL,
      private companiesGql: CompaniesGQL,
      private jobsGql: JobsGQL,
      private usersGql: UsersGQL,
      private totalWorkedHoursGql: TotalWorkedHoursGQL,
      private jobsForDateGql: JobsForDateGQL,
      private jobsForDateFullListGql: JobsForDateFullListGQL,
      private staffRolesGql: StaffRolesGQL,
      private userGql: UserGQL,
      private verifyEmailGql: VerifyEmailGQL,
      private settingsGql: SettingsGQL,
      private updateMyAccountGql: UpdateMyAccountGQL
    ) {}
      
    registerBuilder(variables: RegisterBuilderMutationVariables, options?: MutationOptionsAlone<RegisterBuilderMutation, RegisterBuilderMutationVariables>) {
      return this.registerBuilderGql.mutate(variables, options)
    }
    
    forgotPassword(variables: ForgotPasswordMutationVariables, options?: MutationOptionsAlone<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
      return this.forgotPasswordGql.mutate(variables, options)
    }
    
    register(variables: RegisterMutationVariables, options?: MutationOptionsAlone<RegisterMutation, RegisterMutationVariables>) {
      return this.registerGql.mutate(variables, options)
    }
    
    restorePassword(variables: RestorePasswordMutationVariables, options?: MutationOptionsAlone<RestorePasswordMutation, RestorePasswordMutationVariables>) {
      return this.restorePasswordGql.mutate(variables, options)
    }
    
    login(variables: LoginMutationVariables, options?: MutationOptionsAlone<LoginMutation, LoginMutationVariables>) {
      return this.loginGql.mutate(variables, options)
    }
    
    tokenLogin(variables: TokenLoginMutationVariables, options?: MutationOptionsAlone<TokenLoginMutation, TokenLoginMutationVariables>) {
      return this.tokenLoginGql.mutate(variables, options)
    }
    
    addClockIn(variables: AddClockInMutationVariables, options?: MutationOptionsAlone<AddClockInMutation, AddClockInMutationVariables>) {
      return this.addClockInGql.mutate(variables, options)
    }
    
    addClockOff(variables: AddClockOffMutationVariables, options?: MutationOptionsAlone<AddClockOffMutation, AddClockOffMutationVariables>) {
      return this.addClockOffGql.mutate(variables, options)
    }
    
    createJob(variables: CreateJobMutationVariables, options?: MutationOptionsAlone<CreateJobMutation, CreateJobMutationVariables>) {
      return this.createJobGql.mutate(variables, options)
    }
    
    updateJob(variables: UpdateJobMutationVariables, options?: MutationOptionsAlone<UpdateJobMutation, UpdateJobMutationVariables>) {
      return this.updateJobGql.mutate(variables, options)
    }
    
    updateJobDate(variables: UpdateJobDateMutationVariables, options?: MutationOptionsAlone<UpdateJobDateMutation, UpdateJobDateMutationVariables>) {
      return this.updateJobDateGql.mutate(variables, options)
    }
    
    cancelJob(variables: CancelJobMutationVariables, options?: MutationOptionsAlone<CancelJobMutation, CancelJobMutationVariables>) {
      return this.cancelJobGql.mutate(variables, options)
    }
    
    assignToJob(variables: AssignToJobMutationVariables, options?: MutationOptionsAlone<AssignToJobMutation, AssignToJobMutationVariables>) {
      return this.assignToJobGql.mutate(variables, options)
    }
    
    unAssignToJob(variables: UnAssignToJobMutationVariables, options?: MutationOptionsAlone<UnAssignToJobMutation, UnAssignToJobMutationVariables>) {
      return this.unAssignToJobGql.mutate(variables, options)
    }
    
    logout(variables?: LogoutMutationVariables, options?: MutationOptionsAlone<LogoutMutation, LogoutMutationVariables>) {
      return this.logoutGql.mutate(variables, options)
    }
    
    updateUser(variables: UpdateUserMutationVariables, options?: MutationOptionsAlone<UpdateUserMutation, UpdateUserMutationVariables>) {
      return this.updateUserGql.mutate(variables, options)
    }
    
    deleteUser(variables: DeleteUserMutationVariables, options?: MutationOptionsAlone<DeleteUserMutation, DeleteUserMutationVariables>) {
      return this.deleteUserGql.mutate(variables, options)
    }
    
    hasClockedIntoJob(variables: HasClockedIntoJobQueryVariables, options?: QueryOptionsAlone<HasClockedIntoJobQueryVariables>) {
      return this.hasClockedIntoJobGql.fetch(variables, options)
    }
    
    hasClockedIntoJobWatch(variables: HasClockedIntoJobQueryVariables, options?: WatchQueryOptionsAlone<HasClockedIntoJobQueryVariables>) {
      return this.hasClockedIntoJobGql.watch(variables, options)
    }
    
    me(variables?: MeQueryVariables, options?: QueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.fetch(variables, options)
    }
    
    meWatch(variables?: MeQueryVariables, options?: WatchQueryOptionsAlone<MeQueryVariables>) {
      return this.meGql.watch(variables, options)
    }
    
    job(variables: JobQueryVariables, options?: QueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.fetch(variables, options)
    }
    
    jobWatch(variables: JobQueryVariables, options?: WatchQueryOptionsAlone<JobQueryVariables>) {
      return this.jobGql.watch(variables, options)
    }
    
    jobAssigner(variables: JobAssignerQueryVariables, options?: QueryOptionsAlone<JobAssignerQueryVariables>) {
      return this.jobAssignerGql.fetch(variables, options)
    }
    
    jobAssignerWatch(variables: JobAssignerQueryVariables, options?: WatchQueryOptionsAlone<JobAssignerQueryVariables>) {
      return this.jobAssignerGql.watch(variables, options)
    }
    
    jobStaffs(variables: JobStaffsQueryVariables, options?: QueryOptionsAlone<JobStaffsQueryVariables>) {
      return this.jobStaffsGql.fetch(variables, options)
    }
    
    jobStaffsWatch(variables: JobStaffsQueryVariables, options?: WatchQueryOptionsAlone<JobStaffsQueryVariables>) {
      return this.jobStaffsGql.watch(variables, options)
    }
    
    clockOffs(variables: ClockOffsQueryVariables, options?: QueryOptionsAlone<ClockOffsQueryVariables>) {
      return this.clockOffsGql.fetch(variables, options)
    }
    
    clockOffsWatch(variables: ClockOffsQueryVariables, options?: WatchQueryOptionsAlone<ClockOffsQueryVariables>) {
      return this.clockOffsGql.watch(variables, options)
    }
    
    clockIns(variables: ClockInsQueryVariables, options?: QueryOptionsAlone<ClockInsQueryVariables>) {
      return this.clockInsGql.fetch(variables, options)
    }
    
    clockInsWatch(variables: ClockInsQueryVariables, options?: WatchQueryOptionsAlone<ClockInsQueryVariables>) {
      return this.clockInsGql.watch(variables, options)
    }
    
    jobLocation(variables: JobLocationQueryVariables, options?: QueryOptionsAlone<JobLocationQueryVariables>) {
      return this.jobLocationGql.fetch(variables, options)
    }
    
    jobLocationWatch(variables: JobLocationQueryVariables, options?: WatchQueryOptionsAlone<JobLocationQueryVariables>) {
      return this.jobLocationGql.watch(variables, options)
    }
    
    myJobRequests(variables?: MyJobRequestsQueryVariables, options?: QueryOptionsAlone<MyJobRequestsQueryVariables>) {
      return this.myJobRequestsGql.fetch(variables, options)
    }
    
    myJobRequestsWatch(variables?: MyJobRequestsQueryVariables, options?: WatchQueryOptionsAlone<MyJobRequestsQueryVariables>) {
      return this.myJobRequestsGql.watch(variables, options)
    }
    
    myAssignedJobs(variables?: MyAssignedJobsQueryVariables, options?: QueryOptionsAlone<MyAssignedJobsQueryVariables>) {
      return this.myAssignedJobsGql.fetch(variables, options)
    }
    
    myAssignedJobsWatch(variables?: MyAssignedJobsQueryVariables, options?: WatchQueryOptionsAlone<MyAssignedJobsQueryVariables>) {
      return this.myAssignedJobsGql.watch(variables, options)
    }
    
    todaysAssignedJob(variables?: TodaysAssignedJobQueryVariables, options?: QueryOptionsAlone<TodaysAssignedJobQueryVariables>) {
      return this.todaysAssignedJobGql.fetch(variables, options)
    }
    
    todaysAssignedJobWatch(variables?: TodaysAssignedJobQueryVariables, options?: WatchQueryOptionsAlone<TodaysAssignedJobQueryVariables>) {
      return this.todaysAssignedJobGql.watch(variables, options)
    }
    
    equipment(variables?: EquipmentQueryVariables, options?: QueryOptionsAlone<EquipmentQueryVariables>) {
      return this.equipmentGql.fetch(variables, options)
    }
    
    equipmentWatch(variables?: EquipmentQueryVariables, options?: WatchQueryOptionsAlone<EquipmentQueryVariables>) {
      return this.equipmentGql.watch(variables, options)
    }
    
    companies(variables?: CompaniesQueryVariables, options?: QueryOptionsAlone<CompaniesQueryVariables>) {
      return this.companiesGql.fetch(variables, options)
    }
    
    companiesWatch(variables?: CompaniesQueryVariables, options?: WatchQueryOptionsAlone<CompaniesQueryVariables>) {
      return this.companiesGql.watch(variables, options)
    }
    
    jobs(variables?: JobsQueryVariables, options?: QueryOptionsAlone<JobsQueryVariables>) {
      return this.jobsGql.fetch(variables, options)
    }
    
    jobsWatch(variables?: JobsQueryVariables, options?: WatchQueryOptionsAlone<JobsQueryVariables>) {
      return this.jobsGql.watch(variables, options)
    }
    
    users(variables?: UsersQueryVariables, options?: QueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.fetch(variables, options)
    }
    
    usersWatch(variables?: UsersQueryVariables, options?: WatchQueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.watch(variables, options)
    }
    
    totalWorkedHours(variables?: TotalWorkedHoursQueryVariables, options?: QueryOptionsAlone<TotalWorkedHoursQueryVariables>) {
      return this.totalWorkedHoursGql.fetch(variables, options)
    }
    
    totalWorkedHoursWatch(variables?: TotalWorkedHoursQueryVariables, options?: WatchQueryOptionsAlone<TotalWorkedHoursQueryVariables>) {
      return this.totalWorkedHoursGql.watch(variables, options)
    }
    
    jobsForDate(variables: JobsForDateQueryVariables, options?: QueryOptionsAlone<JobsForDateQueryVariables>) {
      return this.jobsForDateGql.fetch(variables, options)
    }
    
    jobsForDateWatch(variables: JobsForDateQueryVariables, options?: WatchQueryOptionsAlone<JobsForDateQueryVariables>) {
      return this.jobsForDateGql.watch(variables, options)
    }
    
    jobsForDateFullList(variables: JobsForDateFullListQueryVariables, options?: QueryOptionsAlone<JobsForDateFullListQueryVariables>) {
      return this.jobsForDateFullListGql.fetch(variables, options)
    }
    
    jobsForDateFullListWatch(variables: JobsForDateFullListQueryVariables, options?: WatchQueryOptionsAlone<JobsForDateFullListQueryVariables>) {
      return this.jobsForDateFullListGql.watch(variables, options)
    }
    
    staffRoles(variables?: StaffRolesQueryVariables, options?: QueryOptionsAlone<StaffRolesQueryVariables>) {
      return this.staffRolesGql.fetch(variables, options)
    }
    
    staffRolesWatch(variables?: StaffRolesQueryVariables, options?: WatchQueryOptionsAlone<StaffRolesQueryVariables>) {
      return this.staffRolesGql.watch(variables, options)
    }
    
    user(variables: UserQueryVariables, options?: QueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.fetch(variables, options)
    }
    
    userWatch(variables: UserQueryVariables, options?: WatchQueryOptionsAlone<UserQueryVariables>) {
      return this.userGql.watch(variables, options)
    }
    
    verifyEmail(variables: VerifyEmailMutationVariables, options?: MutationOptionsAlone<VerifyEmailMutation, VerifyEmailMutationVariables>) {
      return this.verifyEmailGql.mutate(variables, options)
    }
    
    settings(variables?: SettingsQueryVariables, options?: QueryOptionsAlone<SettingsQueryVariables>) {
      return this.settingsGql.fetch(variables, options)
    }
    
    settingsWatch(variables?: SettingsQueryVariables, options?: WatchQueryOptionsAlone<SettingsQueryVariables>) {
      return this.settingsGql.watch(variables, options)
    }
    
    updateMyAccount(variables: UpdateMyAccountMutationVariables, options?: MutationOptionsAlone<UpdateMyAccountMutation, UpdateMyAccountMutationVariables>) {
      return this.updateMyAccountGql.mutate(variables, options)
    }
  }