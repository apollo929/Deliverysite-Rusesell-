"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
let Equipment = class Equipment {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Equipment.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Equipment.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => job_entity_1.Job, (job) => job.equipment, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], Equipment.prototype, "jobs", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Equipment.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Equipment.prototype, "updatedAt", void 0);
Equipment = tslib_1.__decorate([
    typeorm_1.Entity()
], Equipment);
exports.Equipment = Equipment;
//# sourceMappingURL=equipment.entity.js.map