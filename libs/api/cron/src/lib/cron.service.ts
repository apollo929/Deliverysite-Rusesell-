import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from '@dfobobcat/api/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService, EmailType } from '@dfobobcat/api/email';
import { Cron } from '@nestjs/schedule';
import { JobStatus } from '@dfobobcat/graphql-types';
import { ConfigService } from '@nestjs/config';
import { TimeZoneService } from '@dfobobcat/api/shared/service';
@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private emailService: EmailService,
    private configService: ConfigService,
    private tzService: TimeZoneService,
  ) {}

  @Cron('* 1 * * * *')
  async jobReminder() {
    const jobs = await this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.staff', 'staff')
      .innerJoinAndSelect('job.builder', 'builder')
      .where(
        `job."requestDate" >= NOW() AND job."requestDate" < NOW() + INTERVAL '24 hours'`,
      )
      .andWhere('job.status != :cancelled', { cancelled: JobStatus.Cancelled })
      .getMany();
    for (const job of jobs) {
      //TODO: add logs
      if (job.reminderSent) {
        continue;
      }
      const staffUsers = job.staff;
      const builder = job.builder;
      const requestDate = this.tzService.convertToTZ(job.requestDate);
      const jobInfo = `${requestDate} - ${job.address}`;

      job.reminderSent = true;
      await this.jobsRepository.save(job);

      // send to staff
      for (const user of staffUsers) {
        this.emailService.sendEmail<EmailType.STAFF_JOB_REMINDER>(
          user.email,
          EmailType.STAFF_JOB_REMINDER,
          {
            jobInfo,
            username: user.name,
            requestDate,
          },
        );
      }

      // send to builders
      const loginEditJobLink = `${this.configService.get(
        'LOGIN_EDIT_JOB_LINK',
      )}${job.id}?login_token=${builder.token.builderLoginToken}`;
      this.emailService.sendEmail<EmailType.BUILDER_JOB_REMINDER>(
        builder.email,
        EmailType.BUILDER_JOB_REMINDER,
        {
          jobInfo,
          username: builder.name,
          loginEditJobLink,
          requestDate,
        },
      );
    }
  }
}
