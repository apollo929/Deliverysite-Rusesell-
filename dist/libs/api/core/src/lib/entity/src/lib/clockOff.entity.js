"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockOff = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const __1 = require("..");
const user_entity_1 = require("./user.entity");
let ClockOff = class ClockOff {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], ClockOff.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => __1.Job, (job) => job.clockOffs, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", __1.Job)
], ClockOff.prototype, "job", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.clockOffs, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", user_entity_1.User)
], ClockOff.prototype, "staff", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], ClockOff.prototype, "notes", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz'),
    tslib_1.__metadata("design:type", Date)
], ClockOff.prototype, "clockOffTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'integer', nullable: false, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ClockOff.prototype, "totalTimeWorked", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ClockOff.prototype, "images", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], ClockOff.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], ClockOff.prototype, "updatedAt", void 0);
ClockOff = tslib_1.__decorate([
    typeorm_1.Entity()
], ClockOff);
exports.ClockOff = ClockOff;
//# sourceMappingURL=clockOff.entity.js.map