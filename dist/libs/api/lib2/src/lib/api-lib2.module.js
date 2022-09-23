"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiLib2Module = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lib1_1 = require("@dfobobcat/api/lib1");
let ApiLib2Module = class ApiLib2Module {
    constructor() {
        console.log(lib1_1.Color);
    }
};
ApiLib2Module = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        providers: [],
        exports: [],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ApiLib2Module);
exports.ApiLib2Module = ApiLib2Module;
//# sourceMappingURL=api-lib2.module.js.map