export enum EmailType {
  FORGOT_PASSWORD = 'restore_password',
  BUILDER_SIGNUP = 'signup',
  VERIFY_EMAIL = 'verify_email',
  BUILDER_JOB_CREATED = 'builder_job_created',
  ADMIN_JOB_CREATED = 'admin_job_created',
  BUILDER_JOB_ASSIGNED = 'builder_job_assigned',
  BUILDER_JOB_UNASSIGNED = 'builder_job_unassigned',

  STAFF_JOB_ASSIGNED = 'staff_job_assigned',
  STAFF_JOB_UNASSIGNED = 'staff_job_unassigned',

  BUILDER_JOB_RESCHEDULED = 'builder_job_rescheduled',
  STAFF_JOB_RESCHEDULED = 'staff_job_rescheduled',
  ADMIN_JOB_RESCHEDULED = 'admin_job_rescheduled',
  BUILDER_JOB_CANCELLED = 'builder_job_cancelled',
  STAFF_JOB_CANCELLED = 'staff_job_cancelled',
  ADMIN_JOB_CANCELLED = 'admin_job_cancelled',
  BUILDER_JOB_REMINDER = 'builder_job_reminder',
  STAFF_JOB_REMINDER = 'staff_job_reminder',
}

interface DefaultParams {
  username: string;
}
interface BuilderSignupParams extends DefaultParams {
  email: string;
  password: string;
  url: string;
}
interface ForgotPasswordParams extends DefaultParams {
  url: string;
}
interface VerifyEmailParams extends DefaultParams {
  url: string;
}
interface JobCreatedParams extends DefaultParams {
  jobInfo: string;
  loginEditJobLink?: string;
}
interface JobAssignedParams extends DefaultParams {
  jobInfo: string;
  requestDate: string;
  loginEditJobLink?: string;
  jobAddress: string;
}
interface JobRescheduleParams extends DefaultParams {
  jobInfo: string;
  oldRequestDate: string;
  newRequestDate: string;
  loginEditJobLink?: string;
  jobAddress: string;
}
interface JobCancelledParams extends DefaultParams {
  jobInfo: string;
  requestDate: string;
}
interface JobReminderParams extends DefaultParams {
  jobInfo: string;
  loginEditJobLink?: string;
  requestDate: string;
}
export interface EmailParams {
  [EmailType.FORGOT_PASSWORD]: ForgotPasswordParams;
  [EmailType.BUILDER_SIGNUP]: BuilderSignupParams;
  [EmailType.VERIFY_EMAIL]: VerifyEmailParams;
  [EmailType.BUILDER_JOB_CREATED]: JobCreatedParams;
  [EmailType.ADMIN_JOB_CREATED]: JobCreatedParams;
  [EmailType.BUILDER_JOB_ASSIGNED]: JobAssignedParams;
  [EmailType.BUILDER_JOB_UNASSIGNED]: JobAssignedParams;
  [EmailType.STAFF_JOB_ASSIGNED]: JobAssignedParams;
  [EmailType.STAFF_JOB_UNASSIGNED]: JobAssignedParams;
  [EmailType.BUILDER_JOB_RESCHEDULED]: JobRescheduleParams;
  [EmailType.STAFF_JOB_RESCHEDULED]: JobRescheduleParams;
  [EmailType.ADMIN_JOB_RESCHEDULED]: JobRescheduleParams;
  [EmailType.BUILDER_JOB_CANCELLED]: JobCancelledParams;
  [EmailType.STAFF_JOB_CANCELLED]: JobCancelledParams;
  [EmailType.ADMIN_JOB_CANCELLED]: JobCancelledParams;
  [EmailType.BUILDER_JOB_REMINDER]: JobReminderParams;
  [EmailType.STAFF_JOB_REMINDER]: JobReminderParams;
}

export const EMAIL_SUBJECT: Record<EmailType, string> = {
  [EmailType.FORGOT_PASSWORD]: 'Restore your password',
  [EmailType.BUILDER_SIGNUP]: 'Registration Complete',
  [EmailType.VERIFY_EMAIL]: 'Verify your email address',
  [EmailType.BUILDER_JOB_CREATED]: 'Job created',
  [EmailType.ADMIN_JOB_CREATED]: 'Job created',
  [EmailType.BUILDER_JOB_ASSIGNED]: 'Job assigned',
  [EmailType.BUILDER_JOB_UNASSIGNED]: 'Job unassigned',

  [EmailType.STAFF_JOB_ASSIGNED]: 'Job assigned',
  [EmailType.STAFF_JOB_UNASSIGNED]: 'Job unassigned',

  [EmailType.BUILDER_JOB_RESCHEDULED]: 'Job rescheduled',
  [EmailType.STAFF_JOB_RESCHEDULED]: 'Job rescheduled',
  [EmailType.ADMIN_JOB_RESCHEDULED]: 'Job rescheduled',
  [EmailType.BUILDER_JOB_CANCELLED]: 'Job cancelled',
  [EmailType.STAFF_JOB_CANCELLED]: 'Job cancelled',
  [EmailType.ADMIN_JOB_CANCELLED]: 'Job cancelled',
  [EmailType.BUILDER_JOB_REMINDER]: 'Job starts in 24 hours',
  [EmailType.STAFF_JOB_REMINDER]: 'Job starts in 24 hours',
};
