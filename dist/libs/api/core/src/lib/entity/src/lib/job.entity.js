"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("./equipment.entity");
const activity_entity_1 = require("./activity.entity");
const user_entity_1 = require("./user.entity");
const clockIn_entity_1 = require("./clockIn.entity");
const clockOff_entity_1 = require("./clockOff.entity");
var JobStatus;
(function (JobStatus) {
    JobStatus["Assigned"] = "assigned";
    JobStatus["UnAssigned"] = "unAssigned";
    JobStatus["Cancelled"] = "cancelled";
    JobStatus["Completed"] = "completed";
    JobStatus["InProgress"] = "inProgress";
    JobStatus["Pending"] = "pending";
})(JobStatus || (JobStatus = {}));
let Job = class Job {
    constructor(input) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                this[key] = value;
            }
        }
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Job.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "notes", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "priority", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "stage", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float', { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Job.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float', { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Job.prototype, "lng", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "status", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "poFile", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz'),
    tslib_1.__metadata("design:type", Date)
], Job.prototype, "requestDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Job.prototype, "reminderSent", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.jobRequests, {
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", user_entity_1.User)
], Job.prototype, "builder", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockIn_entity_1.ClockIn, (clockIn) => clockIn.job),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "clockIns", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockOff_entity_1.ClockOff, (clockOff) => clockOff.job),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "clockOffs", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => user_entity_1.User, (user) => user.jobs),
    typeorm_1.JoinTable({ name: 'job_staff' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "staff", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => equipment_entity_1.Equipment, (equipment) => equipment.jobs, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'job_equipment' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "equipment", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => activity_entity_1.Activity, (activity) => activity.jobs, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'job_activity' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "activity", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
Job = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Job);
exports.Job = Job;
//# sourceMappingURL=job.entity.js.map