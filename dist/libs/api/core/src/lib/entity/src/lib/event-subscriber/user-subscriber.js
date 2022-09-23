"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
const bcrypt = require("bcrypt");
let UserSubscriber = class UserSubscriber {
    constructor(connection) {
        connection.subscribers.push(this);
    }
    listenTo() {
        return user_entity_1.User;
    }
    beforeInsert(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            event.entity.password = yield bcrypt.hash(event.entity.password, 10);
        });
    }
    beforeUpdate(event) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (((_a = event === null || event === void 0 ? void 0 : event.entity) === null || _a === void 0 ? void 0 : _a.password) &&
                event.entity.password.length &&
                event.entity.password !== event.databaseEntity.password) {
                event.entity.password = yield bcrypt.hash(event.entity.password, 10);
            }
        });
    }
};
UserSubscriber = tslib_1.__decorate([
    typeorm_1.EventSubscriber(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Connection])
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
//# sourceMappingURL=user-subscriber.js.map