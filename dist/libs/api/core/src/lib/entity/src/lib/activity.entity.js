"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
let Activity = class Activity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Activity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Activity.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz', { nullable: true }),
    tslib_1.__metadata("design:type", Date)
], Activity.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => job_entity_1.Job, (job) => job.activity, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", Array)
], Activity.prototype, "jobs", void 0);
Activity = tslib_1.__decorate([
    typeorm_1.Entity()
], Activity);
exports.Activity = Activity;
//# sourceMappingURL=activity.entity.js.map