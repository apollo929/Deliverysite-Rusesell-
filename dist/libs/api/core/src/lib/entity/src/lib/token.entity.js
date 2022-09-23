"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const class_transformer_1 = require("class-transformer");
let Token = class Token {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Token.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "resetPasswordToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "resetPasswordExpires", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "verifyEmailToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "verifyEmailExpires", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "builderLoginToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "builderLoginExpire", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, (user) => user.token, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", user_entity_1.User)
], Token.prototype, "user", void 0);
Token = tslib_1.__decorate([
    typeorm_1.Entity()
], Token);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map