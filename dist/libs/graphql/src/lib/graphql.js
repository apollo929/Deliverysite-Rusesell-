"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockOffsGQL = exports.ClockOffsDocument = exports.JobStaffsGQL = exports.JobStaffsDocument = exports.JobAssignerGQL = exports.JobAssignerDocument = exports.JobGQL = exports.JobDocument = exports.MeGQL = exports.MeDocument = exports.HasClockedIntoJobGQL = exports.HasClockedIntoJobDocument = exports.DeleteUserGQL = exports.DeleteUserDocument = exports.UpdateUserGQL = exports.UpdateUserDocument = exports.LogoutGQL = exports.LogoutDocument = exports.UnAssignToJobGQL = exports.UnAssignToJobDocument = exports.AssignToJobGQL = exports.AssignToJobDocument = exports.CancelJobGQL = exports.CancelJobDocument = exports.UpdateJobDateGQL = exports.UpdateJobDateDocument = exports.UpdateJobGQL = exports.UpdateJobDocument = exports.CreateJobGQL = exports.CreateJobDocument = exports.AddClockOffGQL = exports.AddClockOffDocument = exports.AddClockInGQL = exports.AddClockInDocument = exports.TokenLoginGQL = exports.TokenLoginDocument = exports.LoginGQL = exports.LoginDocument = exports.RestorePasswordGQL = exports.RestorePasswordDocument = exports.RegisterGQL = exports.RegisterDocument = exports.ForgotPasswordGQL = exports.ForgotPasswordDocument = exports.RegisterBuilderGQL = exports.RegisterBuilderDocument = exports.JobFragmentFragmentDoc = exports.RoleType = exports.JobStatus = exports.JobFilter = void 0;
exports.ApolloAngularSDK = exports.UpdateMyAccountGQL = exports.UpdateMyAccountDocument = exports.SettingsGQL = exports.SettingsDocument = exports.VerifyEmailGQL = exports.VerifyEmailDocument = exports.UserGQL = exports.UserDocument = exports.StaffRolesGQL = exports.StaffRolesDocument = exports.JobsForDateFullListGQL = exports.JobsForDateFullListDocument = exports.JobsForDateGQL = exports.JobsForDateDocument = exports.TotalWorkedHoursGQL = exports.TotalWorkedHoursDocument = exports.UsersGQL = exports.UsersDocument = exports.JobsGQL = exports.JobsDocument = exports.CompaniesGQL = exports.CompaniesDocument = exports.EquipmentGQL = exports.EquipmentDocument = exports.TodaysAssignedJobGQL = exports.TodaysAssignedJobDocument = exports.MyAssignedJobsGQL = exports.MyAssignedJobsDocument = exports.MyJobRequestsGQL = exports.MyJobRequestsDocument = exports.JobLocationGQL = exports.JobLocationDocument = exports.ClockInsGQL = exports.ClockInsDocument = void 0;
const tslib_1 = require("tslib");
const apollo_angular_1 = require("apollo-angular");
const core_1 = require("@angular/core");
const Apollo = require("apollo-angular");
var JobFilter;
(function (JobFilter) {
    JobFilter["Cancelled"] = "cancelled";
    JobFilter["Past"] = "past";
    JobFilter["Upcoming"] = "upcoming";
})(JobFilter = exports.JobFilter || (exports.JobFilter = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["Assigned"] = "assigned";
    JobStatus["Cancelled"] = "cancelled";
    JobStatus["Completed"] = "completed";
    JobStatus["InProgress"] = "inProgress";
    JobStatus["Pending"] = "pending";
    JobStatus["UnAssigned"] = "unAssigned";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
var RoleType;
(function (RoleType) {
    RoleType["Admin"] = "admin";
    RoleType["Builder"] = "builder";
    RoleType["Laborer"] = "laborer";
    RoleType["Operator"] = "operator";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
exports.JobFragmentFragmentDoc = apollo_angular_1.gql `
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
exports.RegisterBuilderDocument = apollo_angular_1.gql `
    mutation RegisterBuilder($input: RegisterBuilderInput!) {
  registerBuilder(input: $input) {
    success
  }
}
    `;
let RegisterBuilderGQL = class RegisterBuilderGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RegisterBuilderDocument;
    }
};
RegisterBuilderGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], RegisterBuilderGQL);
exports.RegisterBuilderGQL = RegisterBuilderGQL;
exports.ForgotPasswordDocument = apollo_angular_1.gql `
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
  }
}
    `;
let ForgotPasswordGQL = class ForgotPasswordGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ForgotPasswordDocument;
    }
};
ForgotPasswordGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], ForgotPasswordGQL);
exports.ForgotPasswordGQL = ForgotPasswordGQL;
exports.RegisterDocument = apollo_angular_1.gql `
    mutation Register($input: RegisterUserInput!) {
  register(input: $input) {
    success
  }
}
    `;
let RegisterGQL = class RegisterGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RegisterDocument;
    }
};
RegisterGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], RegisterGQL);
exports.RegisterGQL = RegisterGQL;
exports.RestorePasswordDocument = apollo_angular_1.gql `
    mutation RestorePassword($newPassword: String!, $token: String!) {
  restorePassword(newPassword: $newPassword, token: $token) {
    success
  }
}
    `;
let RestorePasswordGQL = class RestorePasswordGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RestorePasswordDocument;
    }
};
RestorePasswordGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], RestorePasswordGQL);
exports.RestorePasswordGQL = RestorePasswordGQL;
exports.LoginDocument = apollo_angular_1.gql `
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
let LoginGQL = class LoginGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.LoginDocument;
    }
};
LoginGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], LoginGQL);
exports.LoginGQL = LoginGQL;
exports.TokenLoginDocument = apollo_angular_1.gql `
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
let TokenLoginGQL = class TokenLoginGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TokenLoginDocument;
    }
};
TokenLoginGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], TokenLoginGQL);
exports.TokenLoginGQL = TokenLoginGQL;
exports.AddClockInDocument = apollo_angular_1.gql `
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
let AddClockInGQL = class AddClockInGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AddClockInDocument;
    }
};
AddClockInGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], AddClockInGQL);
exports.AddClockInGQL = AddClockInGQL;
exports.AddClockOffDocument = apollo_angular_1.gql `
    mutation AddClockOff($input: AddClockOffInput!) {
  addClockOff(input: $input) {
    success
  }
}
    `;
let AddClockOffGQL = class AddClockOffGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AddClockOffDocument;
    }
};
AddClockOffGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], AddClockOffGQL);
exports.AddClockOffGQL = AddClockOffGQL;
exports.CreateJobDocument = apollo_angular_1.gql `
    mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    success
  }
}
    `;
let CreateJobGQL = class CreateJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CreateJobDocument;
    }
};
CreateJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], CreateJobGQL);
exports.CreateJobGQL = CreateJobGQL;
exports.UpdateJobDocument = apollo_angular_1.gql `
    mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    success
  }
}
    `;
let UpdateJobGQL = class UpdateJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateJobDocument;
    }
};
UpdateJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UpdateJobGQL);
exports.UpdateJobGQL = UpdateJobGQL;
exports.UpdateJobDateDocument = apollo_angular_1.gql `
    mutation UpdateJobDate($input: UpdateJobDateInput!) {
  updateJobDate(input: $input) {
    success
  }
}
    `;
let UpdateJobDateGQL = class UpdateJobDateGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateJobDateDocument;
    }
};
UpdateJobDateGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UpdateJobDateGQL);
exports.UpdateJobDateGQL = UpdateJobDateGQL;
exports.CancelJobDocument = apollo_angular_1.gql `
    mutation CancelJob($input: Float!) {
  cancelJob(jobId: $input) {
    success
  }
}
    `;
let CancelJobGQL = class CancelJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CancelJobDocument;
    }
};
CancelJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], CancelJobGQL);
exports.CancelJobGQL = CancelJobGQL;
exports.AssignToJobDocument = apollo_angular_1.gql `
    mutation AssignToJob($input: AssignToJobInput!) {
  assignToJob(input: $input) {
    success
  }
}
    `;
let AssignToJobGQL = class AssignToJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AssignToJobDocument;
    }
};
AssignToJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], AssignToJobGQL);
exports.AssignToJobGQL = AssignToJobGQL;
exports.UnAssignToJobDocument = apollo_angular_1.gql `
    mutation UnAssignToJob($input: UnAssignToJobInput!) {
  unAssignToJob(input: $input) {
    success
  }
}
    `;
let UnAssignToJobGQL = class UnAssignToJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UnAssignToJobDocument;
    }
};
UnAssignToJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UnAssignToJobGQL);
exports.UnAssignToJobGQL = UnAssignToJobGQL;
exports.LogoutDocument = apollo_angular_1.gql `
    mutation Logout {
  logout {
    success
  }
}
    `;
let LogoutGQL = class LogoutGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.LogoutDocument;
    }
};
LogoutGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], LogoutGQL);
exports.LogoutGQL = LogoutGQL;
exports.UpdateUserDocument = apollo_angular_1.gql `
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    success
  }
}
    `;
let UpdateUserGQL = class UpdateUserGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateUserDocument;
    }
};
UpdateUserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UpdateUserGQL);
exports.UpdateUserGQL = UpdateUserGQL;
exports.DeleteUserDocument = apollo_angular_1.gql `
    mutation DeleteUser($input: Float!) {
  deleteUser(userId: $input) {
    success
  }
}
    `;
let DeleteUserGQL = class DeleteUserGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.DeleteUserDocument;
    }
};
DeleteUserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], DeleteUserGQL);
exports.DeleteUserGQL = DeleteUserGQL;
exports.HasClockedIntoJobDocument = apollo_angular_1.gql `
    query HasClockedIntoJob($id: Float!) {
  me {
    ... on Staff {
      hasClockedIntoJob(id: $id)
    }
  }
}
    `;
let HasClockedIntoJobGQL = class HasClockedIntoJobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.HasClockedIntoJobDocument;
    }
};
HasClockedIntoJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], HasClockedIntoJobGQL);
exports.HasClockedIntoJobGQL = HasClockedIntoJobGQL;
exports.MeDocument = apollo_angular_1.gql `
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
    ${exports.JobFragmentFragmentDoc}`;
let MeGQL = class MeGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MeDocument;
    }
};
MeGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], MeGQL);
exports.MeGQL = MeGQL;
exports.JobDocument = apollo_angular_1.gql `
    query Job($id: Float!) {
  job(id: $id) {
    ...JobFragment
  }
}
    ${exports.JobFragmentFragmentDoc}`;
let JobGQL = class JobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobDocument;
    }
};
JobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobGQL);
exports.JobGQL = JobGQL;
exports.JobAssignerDocument = apollo_angular_1.gql `
    query JobAssigner($id: Float!) {
  job(id: $id) {
    assigner {
      name
    }
  }
}
    `;
let JobAssignerGQL = class JobAssignerGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobAssignerDocument;
    }
};
JobAssignerGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobAssignerGQL);
exports.JobAssignerGQL = JobAssignerGQL;
exports.JobStaffsDocument = apollo_angular_1.gql `
    query JobStaffs($id: Float!) {
  job(id: $id) {
    staff {
      name
    }
  }
}
    `;
let JobStaffsGQL = class JobStaffsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobStaffsDocument;
    }
};
JobStaffsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobStaffsGQL);
exports.JobStaffsGQL = JobStaffsGQL;
exports.ClockOffsDocument = apollo_angular_1.gql `
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
let ClockOffsGQL = class ClockOffsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ClockOffsDocument;
    }
};
ClockOffsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], ClockOffsGQL);
exports.ClockOffsGQL = ClockOffsGQL;
exports.ClockInsDocument = apollo_angular_1.gql `
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
let ClockInsGQL = class ClockInsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ClockInsDocument;
    }
};
ClockInsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], ClockInsGQL);
exports.ClockInsGQL = ClockInsGQL;
exports.JobLocationDocument = apollo_angular_1.gql `
    query JobLocation($id: Float!) {
  job(id: $id) {
    address
    lat
    lng
  }
}
    `;
let JobLocationGQL = class JobLocationGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobLocationDocument;
    }
};
JobLocationGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobLocationGQL);
exports.JobLocationGQL = JobLocationGQL;
exports.MyJobRequestsDocument = apollo_angular_1.gql `
    query MyJobRequests($status: JobStatus, $search: String) {
  me {
    ... on Builder {
      jobRequests(status: $status, search: $search) {
        ...JobFragment
      }
    }
  }
}
    ${exports.JobFragmentFragmentDoc}`;
let MyJobRequestsGQL = class MyJobRequestsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MyJobRequestsDocument;
    }
};
MyJobRequestsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], MyJobRequestsGQL);
exports.MyJobRequestsGQL = MyJobRequestsGQL;
exports.MyAssignedJobsDocument = apollo_angular_1.gql `
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
let MyAssignedJobsGQL = class MyAssignedJobsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MyAssignedJobsDocument;
    }
};
MyAssignedJobsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], MyAssignedJobsGQL);
exports.MyAssignedJobsGQL = MyAssignedJobsGQL;
exports.TodaysAssignedJobDocument = apollo_angular_1.gql `
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
let TodaysAssignedJobGQL = class TodaysAssignedJobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TodaysAssignedJobDocument;
    }
};
TodaysAssignedJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], TodaysAssignedJobGQL);
exports.TodaysAssignedJobGQL = TodaysAssignedJobGQL;
exports.EquipmentDocument = apollo_angular_1.gql `
    query Equipment {
  equipment {
    id
    name
  }
}
    `;
let EquipmentGQL = class EquipmentGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.EquipmentDocument;
    }
};
EquipmentGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], EquipmentGQL);
exports.EquipmentGQL = EquipmentGQL;
exports.CompaniesDocument = apollo_angular_1.gql `
    query Companies {
  companies {
    name
    id
  }
}
    `;
let CompaniesGQL = class CompaniesGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CompaniesDocument;
    }
};
CompaniesGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], CompaniesGQL);
exports.CompaniesGQL = CompaniesGQL;
exports.JobsDocument = apollo_angular_1.gql `
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
let JobsGQL = class JobsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsDocument;
    }
};
JobsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobsGQL);
exports.JobsGQL = JobsGQL;
exports.UsersDocument = apollo_angular_1.gql `
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
let UsersGQL = class UsersGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UsersDocument;
    }
};
UsersGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UsersGQL);
exports.UsersGQL = UsersGQL;
exports.TotalWorkedHoursDocument = apollo_angular_1.gql `
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
let TotalWorkedHoursGQL = class TotalWorkedHoursGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TotalWorkedHoursDocument;
    }
};
TotalWorkedHoursGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], TotalWorkedHoursGQL);
exports.TotalWorkedHoursGQL = TotalWorkedHoursGQL;
exports.JobsForDateDocument = apollo_angular_1.gql `
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
let JobsForDateGQL = class JobsForDateGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsForDateDocument;
    }
};
JobsForDateGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobsForDateGQL);
exports.JobsForDateGQL = JobsForDateGQL;
exports.JobsForDateFullListDocument = apollo_angular_1.gql `
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
let JobsForDateFullListGQL = class JobsForDateFullListGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsForDateFullListDocument;
    }
};
JobsForDateFullListGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], JobsForDateFullListGQL);
exports.JobsForDateFullListGQL = JobsForDateFullListGQL;
exports.StaffRolesDocument = apollo_angular_1.gql `
    query StaffRoles {
  staffRoles {
    id
    name
  }
}
    `;
let StaffRolesGQL = class StaffRolesGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.StaffRolesDocument;
    }
};
StaffRolesGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], StaffRolesGQL);
exports.StaffRolesGQL = StaffRolesGQL;
exports.UserDocument = apollo_angular_1.gql `
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
let UserGQL = class UserGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UserDocument;
    }
};
UserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UserGQL);
exports.UserGQL = UserGQL;
exports.VerifyEmailDocument = apollo_angular_1.gql `
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    success
  }
}
    `;
let VerifyEmailGQL = class VerifyEmailGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.VerifyEmailDocument;
    }
};
VerifyEmailGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], VerifyEmailGQL);
exports.VerifyEmailGQL = VerifyEmailGQL;
exports.SettingsDocument = apollo_angular_1.gql `
    query Settings {
  settings {
    minJobRequestDate
  }
}
    `;
let SettingsGQL = class SettingsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.SettingsDocument;
    }
};
SettingsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], SettingsGQL);
exports.SettingsGQL = SettingsGQL;
exports.UpdateMyAccountDocument = apollo_angular_1.gql `
    mutation UpdateMyAccount($name: String!, $email: String!, $password: String) {
  updateMyAccount(name: $name, email: $email, password: $password) {
    name
    email
  }
}
    `;
let UpdateMyAccountGQL = class UpdateMyAccountGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateMyAccountDocument;
    }
};
UpdateMyAccountGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Apollo.Apollo])
], UpdateMyAccountGQL);
exports.UpdateMyAccountGQL = UpdateMyAccountGQL;
let ApolloAngularSDK = class ApolloAngularSDK {
    constructor(registerBuilderGql, forgotPasswordGql, registerGql, restorePasswordGql, loginGql, tokenLoginGql, addClockInGql, addClockOffGql, createJobGql, updateJobGql, updateJobDateGql, cancelJobGql, assignToJobGql, unAssignToJobGql, logoutGql, updateUserGql, deleteUserGql, hasClockedIntoJobGql, meGql, jobGql, jobAssignerGql, jobStaffsGql, clockOffsGql, clockInsGql, jobLocationGql, myJobRequestsGql, myAssignedJobsGql, todaysAssignedJobGql, equipmentGql, companiesGql, jobsGql, usersGql, totalWorkedHoursGql, jobsForDateGql, jobsForDateFullListGql, staffRolesGql, userGql, verifyEmailGql, settingsGql, updateMyAccountGql) {
        this.registerBuilderGql = registerBuilderGql;
        this.forgotPasswordGql = forgotPasswordGql;
        this.registerGql = registerGql;
        this.restorePasswordGql = restorePasswordGql;
        this.loginGql = loginGql;
        this.tokenLoginGql = tokenLoginGql;
        this.addClockInGql = addClockInGql;
        this.addClockOffGql = addClockOffGql;
        this.createJobGql = createJobGql;
        this.updateJobGql = updateJobGql;
        this.updateJobDateGql = updateJobDateGql;
        this.cancelJobGql = cancelJobGql;
        this.assignToJobGql = assignToJobGql;
        this.unAssignToJobGql = unAssignToJobGql;
        this.logoutGql = logoutGql;
        this.updateUserGql = updateUserGql;
        this.deleteUserGql = deleteUserGql;
        this.hasClockedIntoJobGql = hasClockedIntoJobGql;
        this.meGql = meGql;
        this.jobGql = jobGql;
        this.jobAssignerGql = jobAssignerGql;
        this.jobStaffsGql = jobStaffsGql;
        this.clockOffsGql = clockOffsGql;
        this.clockInsGql = clockInsGql;
        this.jobLocationGql = jobLocationGql;
        this.myJobRequestsGql = myJobRequestsGql;
        this.myAssignedJobsGql = myAssignedJobsGql;
        this.todaysAssignedJobGql = todaysAssignedJobGql;
        this.equipmentGql = equipmentGql;
        this.companiesGql = companiesGql;
        this.jobsGql = jobsGql;
        this.usersGql = usersGql;
        this.totalWorkedHoursGql = totalWorkedHoursGql;
        this.jobsForDateGql = jobsForDateGql;
        this.jobsForDateFullListGql = jobsForDateFullListGql;
        this.staffRolesGql = staffRolesGql;
        this.userGql = userGql;
        this.verifyEmailGql = verifyEmailGql;
        this.settingsGql = settingsGql;
        this.updateMyAccountGql = updateMyAccountGql;
    }
    registerBuilder(variables, options) {
        return this.registerBuilderGql.mutate(variables, options);
    }
    forgotPassword(variables, options) {
        return this.forgotPasswordGql.mutate(variables, options);
    }
    register(variables, options) {
        return this.registerGql.mutate(variables, options);
    }
    restorePassword(variables, options) {
        return this.restorePasswordGql.mutate(variables, options);
    }
    login(variables, options) {
        return this.loginGql.mutate(variables, options);
    }
    tokenLogin(variables, options) {
        return this.tokenLoginGql.mutate(variables, options);
    }
    addClockIn(variables, options) {
        return this.addClockInGql.mutate(variables, options);
    }
    addClockOff(variables, options) {
        return this.addClockOffGql.mutate(variables, options);
    }
    createJob(variables, options) {
        return this.createJobGql.mutate(variables, options);
    }
    updateJob(variables, options) {
        return this.updateJobGql.mutate(variables, options);
    }
    updateJobDate(variables, options) {
        return this.updateJobDateGql.mutate(variables, options);
    }
    cancelJob(variables, options) {
        return this.cancelJobGql.mutate(variables, options);
    }
    assignToJob(variables, options) {
        return this.assignToJobGql.mutate(variables, options);
    }
    unAssignToJob(variables, options) {
        return this.unAssignToJobGql.mutate(variables, options);
    }
    logout(variables, options) {
        return this.logoutGql.mutate(variables, options);
    }
    updateUser(variables, options) {
        return this.updateUserGql.mutate(variables, options);
    }
    deleteUser(variables, options) {
        return this.deleteUserGql.mutate(variables, options);
    }
    hasClockedIntoJob(variables, options) {
        return this.hasClockedIntoJobGql.fetch(variables, options);
    }
    hasClockedIntoJobWatch(variables, options) {
        return this.hasClockedIntoJobGql.watch(variables, options);
    }
    me(variables, options) {
        return this.meGql.fetch(variables, options);
    }
    meWatch(variables, options) {
        return this.meGql.watch(variables, options);
    }
    job(variables, options) {
        return this.jobGql.fetch(variables, options);
    }
    jobWatch(variables, options) {
        return this.jobGql.watch(variables, options);
    }
    jobAssigner(variables, options) {
        return this.jobAssignerGql.fetch(variables, options);
    }
    jobAssignerWatch(variables, options) {
        return this.jobAssignerGql.watch(variables, options);
    }
    jobStaffs(variables, options) {
        return this.jobStaffsGql.fetch(variables, options);
    }
    jobStaffsWatch(variables, options) {
        return this.jobStaffsGql.watch(variables, options);
    }
    clockOffs(variables, options) {
        return this.clockOffsGql.fetch(variables, options);
    }
    clockOffsWatch(variables, options) {
        return this.clockOffsGql.watch(variables, options);
    }
    clockIns(variables, options) {
        return this.clockInsGql.fetch(variables, options);
    }
    clockInsWatch(variables, options) {
        return this.clockInsGql.watch(variables, options);
    }
    jobLocation(variables, options) {
        return this.jobLocationGql.fetch(variables, options);
    }
    jobLocationWatch(variables, options) {
        return this.jobLocationGql.watch(variables, options);
    }
    myJobRequests(variables, options) {
        return this.myJobRequestsGql.fetch(variables, options);
    }
    myJobRequestsWatch(variables, options) {
        return this.myJobRequestsGql.watch(variables, options);
    }
    myAssignedJobs(variables, options) {
        return this.myAssignedJobsGql.fetch(variables, options);
    }
    myAssignedJobsWatch(variables, options) {
        return this.myAssignedJobsGql.watch(variables, options);
    }
    todaysAssignedJob(variables, options) {
        return this.todaysAssignedJobGql.fetch(variables, options);
    }
    todaysAssignedJobWatch(variables, options) {
        return this.todaysAssignedJobGql.watch(variables, options);
    }
    equipment(variables, options) {
        return this.equipmentGql.fetch(variables, options);
    }
    equipmentWatch(variables, options) {
        return this.equipmentGql.watch(variables, options);
    }
    companies(variables, options) {
        return this.companiesGql.fetch(variables, options);
    }
    companiesWatch(variables, options) {
        return this.companiesGql.watch(variables, options);
    }
    jobs(variables, options) {
        return this.jobsGql.fetch(variables, options);
    }
    jobsWatch(variables, options) {
        return this.jobsGql.watch(variables, options);
    }
    users(variables, options) {
        return this.usersGql.fetch(variables, options);
    }
    usersWatch(variables, options) {
        return this.usersGql.watch(variables, options);
    }
    totalWorkedHours(variables, options) {
        return this.totalWorkedHoursGql.fetch(variables, options);
    }
    totalWorkedHoursWatch(variables, options) {
        return this.totalWorkedHoursGql.watch(variables, options);
    }
    jobsForDate(variables, options) {
        return this.jobsForDateGql.fetch(variables, options);
    }
    jobsForDateWatch(variables, options) {
        return this.jobsForDateGql.watch(variables, options);
    }
    jobsForDateFullList(variables, options) {
        return this.jobsForDateFullListGql.fetch(variables, options);
    }
    jobsForDateFullListWatch(variables, options) {
        return this.jobsForDateFullListGql.watch(variables, options);
    }
    staffRoles(variables, options) {
        return this.staffRolesGql.fetch(variables, options);
    }
    staffRolesWatch(variables, options) {
        return this.staffRolesGql.watch(variables, options);
    }
    user(variables, options) {
        return this.userGql.fetch(variables, options);
    }
    userWatch(variables, options) {
        return this.userGql.watch(variables, options);
    }
    verifyEmail(variables, options) {
        return this.verifyEmailGql.mutate(variables, options);
    }
    settings(variables, options) {
        return this.settingsGql.fetch(variables, options);
    }
    settingsWatch(variables, options) {
        return this.settingsGql.watch(variables, options);
    }
    updateMyAccount(variables, options) {
        return this.updateMyAccountGql.mutate(variables, options);
    }
};
ApolloAngularSDK = tslib_1.__decorate([
    core_1.Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [RegisterBuilderGQL,
        ForgotPasswordGQL,
        RegisterGQL,
        RestorePasswordGQL,
        LoginGQL,
        TokenLoginGQL,
        AddClockInGQL,
        AddClockOffGQL,
        CreateJobGQL,
        UpdateJobGQL,
        UpdateJobDateGQL,
        CancelJobGQL,
        AssignToJobGQL,
        UnAssignToJobGQL,
        LogoutGQL,
        UpdateUserGQL,
        DeleteUserGQL,
        HasClockedIntoJobGQL,
        MeGQL,
        JobGQL,
        JobAssignerGQL,
        JobStaffsGQL,
        ClockOffsGQL,
        ClockInsGQL,
        JobLocationGQL,
        MyJobRequestsGQL,
        MyAssignedJobsGQL,
        TodaysAssignedJobGQL,
        EquipmentGQL,
        CompaniesGQL,
        JobsGQL,
        UsersGQL,
        TotalWorkedHoursGQL,
        JobsForDateGQL,
        JobsForDateFullListGQL,
        StaffRolesGQL,
        UserGQL,
        VerifyEmailGQL,
        SettingsGQL,
        UpdateMyAccountGQL])
], ApolloAngularSDK);
exports.ApolloAngularSDK = ApolloAngularSDK;
//# sourceMappingURL=graphql.js.map