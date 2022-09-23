"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleType = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var RoleType;
(function (RoleType) {
    RoleType["Admin"] = "admin";
    RoleType["Builder"] = "builder";
    RoleType["Laborer"] = "laborer";
    RoleType["Operator"] = "operator";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
let Role = class Role {
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
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ unique: true, type: 'text' }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, (user) => user.role),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
Role = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [Role])
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map