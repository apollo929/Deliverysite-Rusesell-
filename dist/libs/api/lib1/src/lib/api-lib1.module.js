"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiLib1Module = exports.Color = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Red"] = 1] = "Red";
})(Color = exports.Color || (exports.Color = {}));
let ApiLib1Module = class ApiLib1Module {
};
ApiLib1Module = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiLib1Module);
exports.ApiLib1Module = ApiLib1Module;
//# sourceMappingURL=api-lib1.module.js.map