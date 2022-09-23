"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const role_entity_1 = require("./role.entity");
const job_entity_1 = require("./job.entity");
const clockIn_entity_1 = require("./clockIn.entity");
const clockOff_entity_1 = require("./clockOff.entity");
const token_entity_1 = require("./token.entity");
const __1 = require("..");
let User = class User {
    constructor(input) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                this[key] = value;
            }
        }
    }
    getRole() {
        return this.role.name;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.Role, (role) => role.users, {
        eager: true,
    }),
    tslib_1.__metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => __1.Company, (item) => item.users, {
        eager: true,
    }),
    tslib_1.__metadata("design:type", __1.Company)
], User.prototype, "company", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => job_entity_1.Job, (job) => job.staff),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "jobs", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => job_entity_1.Job, (job) => job.builder),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "jobRequests", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockIn_entity_1.ClockIn, (clockIn) => clockIn.staff),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "clockIns", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockOff_entity_1.ClockOff, (clockOff) => clockOff.staff),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "clockOffs", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => token_entity_1.Token, (token) => token.user),
    tslib_1.__metadata("design:type", token_entity_1.Token)
], User.prototype, "token", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map