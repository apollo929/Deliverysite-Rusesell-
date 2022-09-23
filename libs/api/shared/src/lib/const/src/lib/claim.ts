export enum Claim {
  Authenticated = 'Authenticated',
  PublicMethod = 'PublicMethod',

  CreateJob = 'CreateJob',
  CancelAllJobs = 'CancelAllJobs',
  GetAllJobs = 'GetAllJobs',
  GetOwnJobs = 'GetOwnJobs',
  CancelOwnJob = 'CancelOwnJob',
  AssignToJob = 'AssignToJob',

  CreateAdmin = 'CreateAdmin',
  CreateBuilder = 'CreateBuilder',
  CreateLaborer = 'CreateLaborer',
  CreateOperator = 'CreateOperator',

  AddClockIn = 'AddClockIn',
  AddClockOff = 'AddClockOff',
  AddCompany = 'AddCompany',
  GetEquipment = 'GetEquipment',
  GetAllStaff = 'GetAllStaff',
  GetAllClockOffs = 'GetAllClockOffs',
  GetAllClockIns = 'GetAllClockIns',
  GetAllRoles = 'GetAllRoles',
  GetAllUsers = 'GetAllUsers',
  GetAllReports = 'GetAllReports',
  GetCompanies = 'GetCompanies',

  UpdateAllUsers = 'UpdateAllUsers',
  UpdateSelf = 'UpdateSelf',
  UpdateAllJobs = 'UpdateAllJobs',
  UpdateOwnJob = 'UpdateOwnJob',

  DeleteAllUsers = 'DeleteAllUsers',

  UpdateOwnAccount = 'UpdateOwnAccount',
}
