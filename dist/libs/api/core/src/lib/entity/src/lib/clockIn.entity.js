"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockIn = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const __1 = require("..");
const user_entity_1 = require("./user.entity");
let ClockIn = class ClockIn {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], ClockIn.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => __1.Job, (job) => job.clockIns, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", __1.Job)
], ClockIn.prototype, "job", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.clockIns, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", user_entity_1.User)
], ClockIn.prototype, "staff", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float'),
    tslib_1.__metadata("design:type", Number)
], ClockIn.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float'),
    tslib_1.__metadata("design:type", Number)
], ClockIn.prototype, "lng", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz'),
    tslib_1.__metadata("design:type", Date)
], ClockIn.prototype, "clockInTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ClockIn.prototype, "images", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], ClockIn.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], ClockIn.prototype, "updatedAt", void 0);
ClockIn = tslib_1.__decorate([
    typeorm_1.Entity()
], ClockIn);
exports.ClockIn = ClockIn;
//# sourceMappingURL=clockIn.entity.js.map