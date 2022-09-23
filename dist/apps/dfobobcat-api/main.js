(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/dfobobcat-api/src/app/app.controller.ts":
/*!******************************************************!*\
  !*** ./apps/dfobobcat-api/src/app/app.controller.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/dfobobcat-api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/dfobobcat-api/src/app/app.module.ts":
/*!**************************************************!*\
  !*** ./apps/dfobobcat-api/src/app/app.module.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/dfobobcat-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/dfobobcat-api/src/app/app.service.ts");
const core_1 = __webpack_require__(/*! @dfobobcat/api/core */ "./libs/api/core/src/index.ts");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const path_1 = __webpack_require__(/*! path */ "path");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            core_1.CoreModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '../../../uploads'),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/dfobobcat-api/src/app/app.service.ts":
/*!***************************************************!*\
  !*** ./apps/dfobobcat-api/src/app/app.service.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/dfobobcat-api/src/main.ts":
/*!****************************************!*\
  !*** ./apps/dfobobcat-api/src/main.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const session = __webpack_require__(/*! express-session */ "express-session");
const passport = __webpack_require__(/*! passport */ "passport");
const app_module_1 = __webpack_require__(/*! ./app/app.module */ "./apps/dfobobcat-api/src/app/app.module.ts");
const redis_1 = __webpack_require__(/*! redis */ "redis");
const createRedisStore = __webpack_require__(/*! connect-redis */ "connect-redis");
const fs = __webpack_require__(/*! fs */ "fs");
const key = process.env.PRIVATE_KEY_PATH;
const cert = process.env.CERT_PATH;
const opts = {};
if (key &&
    key.length &&
    cert &&
    cert.length &&
    fs.existsSync(key) &&
    fs.existsSync(cert)) {
    opts.httpsOptions = {};
    opts.httpsOptions.key = fs.readFileSync(key);
    opts.httpsOptions.cert = fs.readFileSync(cert);
}
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, opts);
        const configService = app.get(config_1.ConfigService);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = configService.get('APP_PORT');
        const RedisStore = createRedisStore(session);
        const redisClient = redis_1.createClient({
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
        });
        app.use(session({
            secret: configService.get('SESSION_SECRET'),
            store: new RedisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000 * 168,
            },
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        const server = yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
        server.setTimeout(1800000);
    });
}
bootstrap();


/***/ }),

/***/ "./libs/api/admin/src/index.ts":
/*!*************************************!*\
  !*** ./libs/api/admin/src/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-admin.module */ "./libs/api/admin/src/lib/api-admin.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/admin.service */ "./libs/api/admin/src/lib/service/admin.service.ts"), exports);


/***/ }),

/***/ "./libs/api/admin/src/lib/api-admin.module.ts":
/*!****************************************************!*\
  !*** ./libs/api/admin/src/lib/api-admin.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAdminModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const admin_service_1 = __webpack_require__(/*! ./service/admin.service */ "./libs/api/admin/src/lib/service/admin.service.ts");
const src_1 = __webpack_require__(/*! ../../../company/src */ "./libs/api/company/src/index.ts");
let ApiAdminModule = class ApiAdminModule {
};
ApiAdminModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entity_1.ClockIn,
                entity_1.ClockOff,
                entity_1.Job,
                entity_1.Equipment,
                entity_1.User,
                entity_1.Role,
                entity_1.Company,
            ]),
            src_1.CompanyModule,
        ],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], ApiAdminModule);
exports.ApiAdminModule = ApiAdminModule;


/***/ }),

/***/ "./libs/api/admin/src/lib/service/admin.service.ts":
/*!*********************************************************!*\
  !*** ./libs/api/admin/src/lib/service/admin.service.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const company_1 = __webpack_require__(/*! @dfobobcat/api/feature/company */ "./libs/api/company/src/index.ts");
let AdminService = class AdminService {
    constructor(usersRepository, clockOffRepository, roleRepository, companyRepository, companyService) {
        this.usersRepository = usersRepository;
        this.clockOffRepository = clockOffRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.companyService = companyService;
    }
    deleteUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.delete(userId);
            return true;
        });
    }
    updateUser(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { userId, roleId, company: companyName } = args, updateData = tslib_1.__rest(args, ["userId", "roleId", "company"]);
            const user = yield tool_1.findIdOrThrow(this.usersRepository, userId);
            let company = yield this.companyRepository.findOne({ name: companyName });
            if (!company) {
                company = yield this.companyService.addCompany({
                    name: companyName,
                });
            }
            updateData.company = company;
            let role;
            if (roleId) {
                role = yield tool_1.findIdOrThrow(this.roleRepository, roleId);
                updateData.role = role;
            }
            yield this.usersRepository.update(user.id, updateData);
            return true;
        });
    }
    getUsers(args) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let orderBy = tool_1.getOrderAndDirection(args.orderBy);
            if (!orderBy) {
                orderBy = ['user.name', 'ASC'];
            }
            const query = this.usersRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.company', 'company');
            if (args.role === 'staff') {
                query.innerJoinAndSelect('user.role', 'role', 'role.name = :operator OR role.name = :laborer', {
                    operator: graphql_types_1.RoleType.Operator,
                    laborer: graphql_types_1.RoleType.Laborer,
                });
            }
            else if (args.role === 'builder') {
                query.innerJoinAndSelect('user.role', 'role', 'role.name = :builder', {
                    builder: graphql_types_1.RoleType.Builder,
                });
            }
            else {
                query.innerJoinAndSelect('user.role', 'role');
            }
            if (args && args.search && args.search.length) {
                if (args.search && args.search.length > 0) {
                    query.where('LOWER(user.name) like :name', {
                        name: `%${args.search.toLowerCase()}%`,
                    });
                }
            }
            query.orderBy(orderBy[0], orderBy[1]);
            if (args.pagination) {
                const offset = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.offset) ? args.pagination.offset : 15;
                const page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) ? args.pagination.page : 0;
                const skip = page * offset;
                const totalClone = query.clone();
                const total = yield totalClone.getCount();
                const hasNextPage = total > (page + 1) * offset;
                const hasPreviousPage = page > 0;
                const nextPage = hasNextPage ? page + 1 : undefined;
                const previousPage = hasPreviousPage ? page - 1 : undefined;
                return {
                    items: yield query.offset(skip).limit(offset).getMany(),
                    pageInfo: {
                        hasNextPage,
                        hasPreviousPage,
                        nextPage,
                        previousPage,
                    },
                };
            }
            return {
                items: yield query.getMany(),
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    nextPage: undefined,
                    previousPage: undefined,
                },
            };
        });
    }
    staffRoles() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.roleRepository
                .createQueryBuilder('role')
                .where('role.name IN (:laborer, :operator)', {
                laborer: graphql_types_1.RoleType.Laborer,
                operator: graphql_types_1.RoleType.Operator,
            })
                .select(['role.id', 'role.name'])
                .getMany();
        });
    }
};
AdminService = tslib_1.__decorate([
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.User)),
    tslib_1.__param(1, typeorm_2.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(2, typeorm_2.InjectRepository(entity_1.Role)),
    tslib_1.__param(3, typeorm_2.InjectRepository(entity_1.Company)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof company_1.CompanyService !== "undefined" && company_1.CompanyService) === "function" ? _e : Object])
], AdminService);
exports.AdminService = AdminService;


/***/ }),

/***/ "./libs/api/auth/src/index.ts":
/*!************************************!*\
  !*** ./libs/api/auth/src/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/auth.module */ "./libs/api/auth/src/lib/auth.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/guard/claimAuthGuard.guard */ "./libs/api/auth/src/lib/guard/claimAuthGuard.guard.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/guard/logInWithCredentialsGuard */ "./libs/api/auth/src/lib/guard/logInWithCredentialsGuard.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/guard.service */ "./libs/api/auth/src/lib/service/guard.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/require-claim.decorator */ "./libs/api/auth/src/lib/require-claim.decorator.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/auth-callback.decorator */ "./libs/api/auth/src/lib/auth-callback.decorator.ts"), exports);


/***/ }),

/***/ "./libs/api/auth/src/lib/auth-callback.decorator.ts":
/*!**********************************************************!*\
  !*** ./libs/api/auth/src/lib/auth-callback.decorator.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCallback = exports.AUTH_CALLBACK_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.AUTH_CALLBACK_KEY = 'AUTH_CALLBACK';
const AuthCallback = (cb) => common_1.SetMetadata(exports.AUTH_CALLBACK_KEY, cb);
exports.AuthCallback = AuthCallback;


/***/ }),

/***/ "./libs/api/auth/src/lib/auth.module.ts":
/*!**********************************************!*\
  !*** ./libs/api/auth/src/lib/auth.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const auth_resolver_1 = __webpack_require__(/*! ./resolver/auth.resolver */ "./libs/api/auth/src/lib/resolver/auth.resolver.ts");
const graphql_local_strategy_1 = __webpack_require__(/*! ./service/graphql-local.strategy */ "./libs/api/auth/src/lib/service/graphql-local.strategy.ts");
const local_serializer_1 = __webpack_require__(/*! ./service/local.serializer */ "./libs/api/auth/src/lib/service/local.serializer.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const company_1 = __webpack_require__(/*! @dfobobcat/api/feature/company */ "./libs/api/company/src/index.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entity_1.ClockIn,
                entity_1.ClockOff,
                entity_1.Job,
                entity_1.Equipment,
                entity_1.Activity,
                entity_1.User,
                entity_1.Role,
                entity_1.Token,
                entity_1.Company,
            ]),
            config_1.ConfigModule,
            email_1.ApiEmailModule,
            common_1.forwardRef(() => company_1.CompanyModule),
        ],
        controllers: [],
        providers: [
            auth_resolver_1.AuthResolver,
            service_1.AuthService,
            graphql_local_strategy_1.LocalStrategy,
            service_1.UserService,
            local_serializer_1.LocalSerializer,
        ],
        exports: [service_1.UserService, service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/api/auth/src/lib/guard/claimAuthGuard.guard.ts":
/*!*************************************************************!*\
  !*** ./libs/api/auth/src/lib/guard/claimAuthGuard.guard.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimAuthGuard = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const require_claim_decorator_1 = __webpack_require__(/*! ../require-claim.decorator */ "./libs/api/auth/src/lib/require-claim.decorator.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const util_1 = __webpack_require__(/*! @dfobobcat/api/auth/util */ "./libs/api/auth/src/lib/util/src/index.ts");
const auth_callback_decorator_1 = __webpack_require__(/*! ../auth-callback.decorator */ "./libs/api/auth/src/lib/auth-callback.decorator.ts");
const __1 = __webpack_require__(/*! ../.. */ "./libs/api/auth/src/index.ts");
let ClaimAuthGuard = class ClaimAuthGuard {
    constructor(reflector, guardService) {
        this.reflector = reflector;
        this.guardService = guardService;
    }
    canActivate(context) {
        const claimAuth = () => {
            const requiredClaims = this.reflector.getAllAndOverride(require_claim_decorator_1.CLAIMS_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredClaims || !Array.isArray(requiredClaims)) {
                return false;
            }
            if (requiredClaims.length === 1 &&
                requiredClaims[0] === const_1.Claim.PublicMethod) {
                return true;
            }
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const gqlContext = ctx.getContext();
            const ability = util_1.defineAbilityFor(gqlContext);
            for (const claim of requiredClaims) {
                if (ability.cannot(claim)) {
                    return false;
                }
            }
            return true;
        };
        const callbackAuth = () => {
            var _a, _b;
            const cb = this.reflector.getAllAndOverride(auth_callback_decorator_1.AUTH_CALLBACK_KEY, [context.getHandler(), context.getClass()]);
            if (!cb) {
                return false;
            }
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const gqlContext = ctx.getContext();
            const args = (_b = (_a = gqlContext === null || gqlContext === void 0 ? void 0 : gqlContext.req) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.variables;
            return cb(this.guardService, gqlContext, args);
        };
        return claimAuth() || callbackAuth();
    }
};
ClaimAuthGuard = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof __1.GuardService !== "undefined" && __1.GuardService) === "function" ? _b : Object])
], ClaimAuthGuard);
exports.ClaimAuthGuard = ClaimAuthGuard;


/***/ }),

/***/ "./libs/api/auth/src/lib/guard/logInWithCredentialsGuard.ts":
/*!******************************************************************!*\
  !*** ./libs/api/auth/src/lib/guard/logInWithCredentialsGuard.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInWithCredentialsGuard = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
let LogInWithCredentialsGuard = class LogInWithCredentialsGuard extends passport_1.AuthGuard('graphql-local') {
    canActivate(context) {
        const _super = Object.create(null, {
            canActivate: { get: () => super.canActivate }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield _super.canActivate.call(this, context);
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const gqlContext = ctx.getContext();
            if (!gqlContext.user.emailVerified) {
                throw new exception_1.UserError('Please verify your email');
            }
            gqlContext.login(gqlContext.user, (err) => {
                if (err)
                    throw err;
            });
            return true;
        });
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs();
        return request;
    }
};
LogInWithCredentialsGuard = tslib_1.__decorate([
    common_1.Injectable()
], LogInWithCredentialsGuard);
exports.LogInWithCredentialsGuard = LogInWithCredentialsGuard;


/***/ }),

/***/ "./libs/api/auth/src/lib/require-claim.decorator.ts":
/*!**********************************************************!*\
  !*** ./libs/api/auth/src/lib/require-claim.decorator.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireClaim = exports.CLAIMS_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CLAIMS_KEY = 'claims';
const RequireClaim = (...claims) => common_1.SetMetadata(exports.CLAIMS_KEY, claims);
exports.RequireClaim = RequireClaim;


/***/ }),

/***/ "./libs/api/auth/src/lib/resolver/auth.resolver.ts":
/*!*********************************************************!*\
  !*** ./libs/api/auth/src/lib/resolver/auth.resolver.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const logInWithCredentialsGuard_1 = __webpack_require__(/*! ../guard/logInWithCredentialsGuard */ "./libs/api/auth/src/lib/guard/logInWithCredentialsGuard.ts");
const require_claim_decorator_1 = __webpack_require__(/*! ../require-claim.decorator */ "./libs/api/auth/src/lib/require-claim.decorator.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const auth_callback_decorator_1 = __webpack_require__(/*! ../auth-callback.decorator */ "./libs/api/auth/src/lib/auth-callback.decorator.ts");
let AuthResolver = class AuthResolver {
    constructor(usersRepository, userService, authService) {
        this.usersRepository = usersRepository;
        this.userService = userService;
        this.authService = authService;
    }
    register(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const success = yield this.userService.create(ctx, args);
            return { success };
        });
    }
    registerBuilder(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const success = yield this.userService.createBuilder(ctx, args);
            return { success };
        });
    }
    login(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = ctx.getUser();
            return {
                name: user.name,
                role: user.role,
                email: user.email,
            };
        });
    }
    logout(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: this.authService.logout(ctx) };
        });
    }
    forgotPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: this.authService.forgotPassword(email) };
        });
    }
    restorePassword(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: this.authService.restorePassword(args) };
        });
    }
    verifyEmail(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: this.authService.verifyEmail(args) };
        });
    }
    tokenLogin(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.tokenLogin(ctx, args.token);
        });
    }
};
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_callback_decorator_1.AuthCallback((guardService, ctx, args) => guardService.canCreateUserWithRole(ctx, args)),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof graphql_types_1.RegisterUserInput !== "undefined" && graphql_types_1.RegisterUserInput) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof graphql_types_1.RegisterBuilderInput !== "undefined" && graphql_types_1.RegisterBuilderInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "registerBuilder", null);
tslib_1.__decorate([
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    common_1.UseGuards(logInWithCredentialsGuard_1.LogInWithCredentialsGuard),
    graphql_1.Mutation(),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Args('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof graphql_types_1.MutationRestorePasswordArgs !== "undefined" && graphql_types_1.MutationRestorePasswordArgs) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "restorePassword", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof graphql_types_1.VerifyEmailMutationVariables !== "undefined" && graphql_types_1.VerifyEmailMutationVariables) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyEmail", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    require_claim_decorator_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof graphql_types_1.MutationTokenLoginArgs !== "undefined" && graphql_types_1.MutationTokenLoginArgs) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "tokenLogin", null);
AuthResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof service_1.UserService !== "undefined" && service_1.UserService) === "function" ? _g : Object, typeof (_h = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _h : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./libs/api/auth/src/lib/service/graphql-local.strategy.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/auth/src/lib/service/graphql-local.strategy.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_passport_1 = __webpack_require__(/*! graphql-passport */ "graphql-passport");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(graphql_passport_1.GraphQLLocalStrategy) {
    constructor(authService) {
        super({
            passReqToCallback: true,
        });
        this.authService = authService;
    }
    validate(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { input: { email, password }, } = req.body;
            return this.authService.getAuthenticatedUser(email, password);
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./libs/api/auth/src/lib/service/guard.service.ts":
/*!********************************************************!*\
  !*** ./libs/api/auth/src/lib/service/guard.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const util_1 = __webpack_require__(/*! @dfobobcat/api/auth/util */ "./libs/api/auth/src/lib/util/src/index.ts");
/**
 * Contains functions to validate
 * access to endpoints that require
 * more advanced authorization checking
 */
let GuardService = class GuardService {
    constructor(jobsRepository, usersRepository, equipmentsRepository, clockOffRepository, roleRepository) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.equipmentsRepository = equipmentsRepository;
        this.clockOffRepository = clockOffRepository;
        this.roleRepository = roleRepository;
    }
    canGetJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ability = util_1.defineAbilityFor(ctx);
            const user = ctx.getUser();
            const job = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.builder', 'builder')
                .where('job.id = :id', { id: args.id })
                .getOne();
            if (!job) {
                return false;
            }
            const assignedToJob = !!(yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoin('job.staff', 'staff', 'staff.id = :staffId', {
                staffId: user.id,
            })
                .where(`job.id = :jobId`, { jobId: args.id })
                .limit(1)
                .getOne());
            const canGetJob = ability.can(const_1.Claim.GetAllJobs) ||
                (ability.can(const_1.Claim.GetOwnJobs) &&
                    user.hasRole(graphql_types_1.RoleType.Builder) &&
                    job.builder.id == user.id) ||
                (ability.can(const_1.Claim.GetOwnJobs) &&
                    (user.hasRole(graphql_types_1.RoleType.Operator) || user.hasRole(graphql_types_1.RoleType.Laborer)) &&
                    assignedToJob);
            if (canGetJob) {
                return true;
            }
            return false;
        });
    }
    canCreateUserWithRole(ctx, { input }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ability = util_1.defineAbilityFor(ctx);
            const { roleId } = input;
            const foundRole = yield this.roleRepository.findOneOrFail({
                id: roleId,
            });
            if (ability.can(const_1.roleClaimMap[foundRole.name])) {
                return true;
            }
            return false;
        });
    }
};
GuardService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_2.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_2.InjectRepository(entity_1.Equipment)),
    tslib_1.__param(3, typeorm_2.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(4, typeorm_2.InjectRepository(entity_1.Role)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _e : Object])
], GuardService);
exports.GuardService = GuardService;


/***/ }),

/***/ "./libs/api/auth/src/lib/service/local.serializer.ts":
/*!***********************************************************!*\
  !*** ./libs/api/auth/src/lib/service/local.serializer.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSerializer = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
let LocalSerializer = class LocalSerializer extends passport_1.PassportSerializer {
    constructor(usersService) {
        super();
        this.usersService = usersService;
    }
    serializeUser(user, done) {
        done(null, user.id);
    }
    deserializeUser(userId, done) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getById(Number(userId));
            const addedDataToUser = Object.assign(Object.assign({}, user), { getRole() {
                    return this.role.name;
                },
                hasRole(role) {
                    return this.role.name === role;
                } });
            done(null, addedDataToUser);
        });
    }
};
LocalSerializer = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.UserService !== "undefined" && service_1.UserService) === "function" ? _a : Object])
], LocalSerializer);
exports.LocalSerializer = LocalSerializer;


/***/ }),

/***/ "./libs/api/auth/src/lib/util/src/index.ts":
/*!*************************************************!*\
  !*** ./libs/api/auth/src/lib/util/src/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/define-ability-for */ "./libs/api/auth/src/lib/util/src/lib/define-ability-for.ts"), exports);


/***/ }),

/***/ "./libs/api/auth/src/lib/util/src/lib/define-ability-for.ts":
/*!******************************************************************!*\
  !*** ./libs/api/auth/src/lib/util/src/lib/define-ability-for.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilityFor = void 0;
const ability_1 = __webpack_require__(/*! @casl/ability */ "@casl/ability");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
const GuestType = 'guest';
const rolePermissions = {
    [GuestType]: (user, { can }) => {
        can(const_1.Claim.CreateBuilder);
    },
    [graphql_types_1.RoleType.Builder]: (user, { can }) => {
        can(const_1.Claim.CreateJob);
        can(const_1.Claim.UpdateOwnJob);
        can(const_1.Claim.CancelOwnJob);
        can(const_1.Claim.GetOwnJobs);
        can(const_1.Claim.GetEquipment);
        can(const_1.Claim.Authenticated);
        can(const_1.Claim.UpdateOwnAccount);
    },
    [graphql_types_1.RoleType.Operator]: (user, { can }) => {
        can(const_1.Claim.GetOwnJobs);
        can(const_1.Claim.AddClockIn);
        can(const_1.Claim.AddClockOff);
        can(const_1.Claim.GetEquipment);
        can(const_1.Claim.Authenticated);
        can(const_1.Claim.UpdateOwnAccount);
    },
    [graphql_types_1.RoleType.Laborer]: (user, { can }) => {
        can(const_1.Claim.GetOwnJobs);
        can(const_1.Claim.AddClockIn);
        can(const_1.Claim.AddClockOff);
        can(const_1.Claim.GetEquipment);
        can(const_1.Claim.Authenticated);
        can(const_1.Claim.UpdateOwnAccount);
    },
    [graphql_types_1.RoleType.Admin]: (user, { can }) => {
        can(const_1.Claim.CreateJob);
        can(const_1.Claim.GetAllJobs);
        can(const_1.Claim.AssignToJob);
        can(const_1.Claim.GetEquipment);
        can(const_1.Claim.GetAllStaff);
        can(const_1.Claim.GetAllClockOffs);
        can(const_1.Claim.GetOwnJobs);
        can(const_1.Claim.CreateLaborer);
        can(const_1.Claim.CreateOperator);
        can(const_1.Claim.CreateAdmin);
        can(const_1.Claim.CreateBuilder);
        can(const_1.Claim.GetAllRoles);
        can(const_1.Claim.UpdateAllUsers);
        can(const_1.Claim.UpdateAllJobs);
        can(const_1.Claim.UpdateOwnJob);
        can(const_1.Claim.GetAllReports);
        can(const_1.Claim.GetAllUsers);
        can(const_1.Claim.Authenticated);
        can(const_1.Claim.CancelAllJobs);
        can(const_1.Claim.UpdateOwnAccount);
        can(const_1.Claim.DeleteAllUsers);
        can(const_1.Claim.GetCompanies);
        can(const_1.Claim.AddCompany);
    },
};
function defineAbilityFor(ctx) {
    const builder = new ability_1.AbilityBuilder(ability_1.PureAbility);
    const user = ctx.getUser();
    const role = ctx.isAuthenticated()
        ? user.role.name
        : GuestType;
    if (typeof rolePermissions[role] === 'function') {
        rolePermissions[role](user, builder);
    }
    else {
        throw new exception_1.UserError(`Trying to use unknown role "${user.role}"`);
    }
    return builder.build();
}
exports.defineAbilityFor = defineAbilityFor;


/***/ }),

/***/ "./libs/api/clocking/src/clocking.module.ts":
/*!**************************************************!*\
  !*** ./libs/api/clocking/src/clocking.module.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockingModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const clocking_service_1 = __webpack_require__(/*! ./lib/service/clocking.service */ "./libs/api/clocking/src/lib/service/clocking.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const module_1 = __webpack_require__(/*! @dfobobcat/api/shared/module */ "./libs/api/shared/src/index.ts");
const queue_1 = __webpack_require__(/*! @dfobobcat/api/queue */ "./libs/api/queue/src/index.ts");
const image_consumer_1 = __webpack_require__(/*! ./lib/service/image.consumer */ "./libs/api/clocking/src/lib/service/image.consumer.ts");
let ClockingModule = class ClockingModule {
};
ClockingModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.ClockIn, entity_1.ClockOff, entity_1.Job, entity_1.Equipment, entity_1.User]),
            config_1.ConfigModule,
            module_1.ApiSharedModule,
            queue_1.ApiQueueModule,
        ],
        providers: [clocking_service_1.ClockingService, image_consumer_1.ImageConsumer],
        exports: [clocking_service_1.ClockingService],
    })
], ClockingModule);
exports.ClockingModule = ClockingModule;


/***/ }),

/***/ "./libs/api/clocking/src/index.ts":
/*!****************************************!*\
  !*** ./libs/api/clocking/src/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./clocking.module */ "./libs/api/clocking/src/clocking.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/clocking.service */ "./libs/api/clocking/src/lib/service/clocking.service.ts"), exports);


/***/ }),

/***/ "./libs/api/clocking/src/lib/service/clocking.service.ts":
/*!***************************************************************!*\
  !*** ./libs/api/clocking/src/lib/service/clocking.service.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockingService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const path_1 = __webpack_require__(/*! path */ "path");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const bull_1 = __webpack_require__(/*! bull */ "bull");
const bull_2 = __webpack_require__(/*! @nestjs/bull */ "@nestjs/bull");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
let ClockingService = class ClockingService {
    constructor(jobsRepository, usersRepository, clockInRepository, clockOffRepository, imageQueue, config, clockingCommonService, tzService) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.clockInRepository = clockInRepository;
        this.clockOffRepository = clockOffRepository;
        this.imageQueue = imageQueue;
        this.config = config;
        this.clockingCommonService = clockingCommonService;
        this.tzService = tzService;
    }
    hasClockedInToJob(jobId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hasClockedIn = !!(yield this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
                jobId,
            })
                .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
                staffId: userId,
            })
                .getOne());
            return hasClockedIn;
        });
    }
    addClockIn(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = ctx.getUser();
            const staffId = user.id;
            const { jobId } = args, clockData = tslib_1.__rest(args, ["jobId"]);
            const userRecord = yield this.usersRepository.findOne(user.id);
            const clockInTime = new Date().toISOString();
            const jobToAssign = yield this.jobsRepository.findOne(jobId, {
                relations: ['staff', 'activity'],
            });
            const meAssigned = jobToAssign && (jobToAssign === null || jobToAssign === void 0 ? void 0 : jobToAssign.staff.some((person) => person.id === user.id));
            const jobIsActive = jobToAssign &&
                (jobToAssign.status == graphql_types_1.JobStatus.Assigned ||
                    (jobToAssign === null || jobToAssign === void 0 ? void 0 : jobToAssign.status) == graphql_types_1.JobStatus.InProgress);
            const hasClockedIn = !!(yield this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
                jobId,
            })
                .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
                staffId,
            })
                .getOne());
            const hasClockedOff = !!(yield this.clockOffRepository
                .createQueryBuilder('clockIn')
                .innerJoin('clockIn.job', 'job', 'job.id = :jobId', {
                jobId,
            })
                .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
                staffId,
            })
                .getOne());
            if (!meAssigned || !jobIsActive || hasClockedIn || hasClockedOff) {
                throw new exception_1.UserError('You cannot clock in to this job!');
            }
            const clockIn = this.clockInRepository.create(Object.assign({ job: jobToAssign, staff: userRecord, clockInTime }, clockData));
            yield this.clockInRepository.save(clockIn);
            const nowTime = new Date();
            const images = [];
            const data = yield Promise.all(args.files);
            const folder = path_1.join(this.config.get('UPLOADS_PATH'), 'clock-in', `${clockIn.id}`);
            if (!fs_1.existsSync(folder)) {
                fs_1.mkdirSync(folder, { recursive: true });
            }
            for (const file of data) {
                const { mimetype, createReadStream } = file;
                // const ext = filename.split('.').pop();
                const ext = 'png';
                const saveAs = `${tool_1.getRandomString()}.${ext}`;
                const tmpFile = `_${tool_1.getRandomString()}.${ext}`;
                const filePath = path_1.join(folder, saveAs);
                const tmpFilePath = path_1.join(folder, tmpFile);
                const allowedTypes = ['image/jpeg', 'image/png'];
                if (!allowedTypes.includes(mimetype)) {
                    throw new exception_1.UserError('Allowed file types: *.jpg, *.png');
                }
                const writeStreamTmpFile = fs_1.createWriteStream(tmpFilePath);
                const readStream = createReadStream();
                readStream.pipe(writeStreamTmpFile);
                readStream.on('end', () => {
                    writeStreamTmpFile.end();
                    this.imageQueue.add('save-image-with-timestamp', {
                        tmpFilePath,
                        savePath: filePath,
                        addText: this.tzService.convertToTZ(nowTime, true),
                    });
                });
                images.push(saveAs);
            }
            yield this.clockInRepository.update(clockIn.id, { images });
            if ((jobToAssign === null || jobToAssign === void 0 ? void 0 : jobToAssign.status) === graphql_types_1.JobStatus.Assigned) {
                jobToAssign.status = graphql_types_1.JobStatus.InProgress;
                jobToAssign.activity.push({
                    type: graphql_types_1.JobStatus.InProgress,
                    date: new Date(),
                });
                yield this.jobsRepository.save(jobToAssign);
            }
            /**
             * DO not get the equipment by doing joins in the queries above. It does not work.
             */
            const jobEquipment = yield this.jobsRepository
                .createQueryBuilder('job')
                .where('job.id = :jobId', { jobId: jobToAssign === null || jobToAssign === void 0 ? void 0 : jobToAssign.id })
                .leftJoinAndSelect('job.equipment', 'equipment')
                .select(['job.id', 'equipment.id', 'equipment.name'])
                .getOne();
            let equipment = [];
            if (jobEquipment === null || jobEquipment === void 0 ? void 0 : jobEquipment.equipment) {
                equipment = jobEquipment.equipment;
            }
            return {
                id: jobToAssign.id,
                address: jobToAssign.address,
                equipment,
            };
        });
    }
    addClockOff(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = ctx.getUser();
            if (user.role === const_1.Role.Laborer &&
                (!Array.isArray(args.files) || !args.files.length)) {
                throw new exception_1.UserError('Cannot clock off without the images.');
            }
            const { jobId } = args, clockData = tslib_1.__rest(args, ["jobId"]);
            const job = yield this.jobsRepository.findOneOrFail({ id: jobId }, {
                relations: ['staff', 'activity'],
            });
            const userRecord = yield this.usersRepository.findOneOrFail({
                id: user.id,
            });
            const now = tool_1.getTodayStart();
            const hasClockedOff = yield this.clockOffRepository
                .createQueryBuilder('clockOff')
                .innerJoinAndSelect('clockOff.job', 'job')
                .where('clockOff.staff.id = :staffId', { staffId: user.id })
                .andWhere('job.id = :jobId', { jobId: args.jobId })
                .andWhere(`DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`, { now })
                .getOne();
            if (hasClockedOff) {
                throw new exception_1.UserError('You already clocked off from this job today!');
            }
            /**
             * get todays clock in so that we can
             * calculate time worked for today
             */
            const todaysClockIns = yield this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoin('clockIn.job', 'job', 'job.id = :jobId', { jobId })
                .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
                staffId: user.id,
            })
                .where(`DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`, { now })
                .select(['clockIn.id', 'clockIn.clockInTime'])
                .getMany();
            if (!todaysClockIns || !todaysClockIns.length) {
                throw new exception_1.UserError('Clock off is impossible because clock in does not exist!');
            }
            if (todaysClockIns.length > 1) {
                throw new exception_1.UserError('Found too many clock ins for one day. Aborting.');
            }
            const todaysClockIn = todaysClockIns[0];
            const nowTime = new Date();
            const clockOffTime = nowTime.toISOString();
            const clockOff = this.clockOffRepository.create(Object.assign({ job,
                clockOffTime, staff: userRecord }, clockData));
            // total time in mins
            const totalTimeWorked = Math.trunc((new Date(clockOffTime).getTime() -
                new Date(todaysClockIn.clockInTime).getTime()) /
                60000);
            const currentTotalTime = clockOff.totalTimeWorked || 0;
            clockOff.totalTimeWorked = currentTotalTime + totalTimeWorked;
            // save first to get id to create folder with id
            yield this.clockOffRepository.save(clockOff);
            const clockOffId = clockOff.id;
            const images = [];
            if (Array.isArray(args.files) && args.files.length) {
                const data = yield Promise.all(args.files);
                const folder = path_1.join(this.config.get('UPLOADS_PATH'), 'clock-off', `${clockOffId}`);
                if (!fs_1.existsSync(folder)) {
                    fs_1.mkdirSync(folder, { recursive: true });
                }
                for (const file of data) {
                    const { mimetype, createReadStream } = file;
                    // const ext = filename.split('.').pop();
                    const ext = 'png';
                    const saveAs = `${tool_1.getRandomString()}.${ext}`;
                    const tmpFile = `_${tool_1.getRandomString()}.${ext}`;
                    const filePath = path_1.join(folder, saveAs);
                    const tmpFilePath = path_1.join(folder, tmpFile);
                    const allowedTypes = ['image/jpeg', 'image/png'];
                    if (!allowedTypes.includes(mimetype)) {
                        throw new exception_1.UserError('Allowed file types: *.jpg, *.png');
                    }
                    const writeStreamTmpFile = fs_1.createWriteStream(tmpFilePath);
                    const readStream = createReadStream();
                    readStream.pipe(writeStreamTmpFile);
                    readStream.on('end', () => {
                        writeStreamTmpFile.end();
                        this.imageQueue.add('save-image-with-timestamp', {
                            tmpFilePath,
                            savePath: filePath,
                            addText: this.tzService.convertToTZ(nowTime, true),
                        });
                    });
                    images.push(saveAs);
                }
            }
            clockOff.images = images;
            yield this.clockOffRepository.save(clockOff);
            if (yield this.isJobCompleted(job)) {
                job.status = graphql_types_1.JobStatus.Completed;
                job.activity.push({ type: graphql_types_1.JobStatus.Completed, date: new Date() });
                yield this.jobsRepository.save(job);
            }
            return true;
        });
    }
    // job is completed when all staff clocked off
    isJobCompleted(job) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const clockInAmount = yield this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoinAndSelect('clockIn.job', 'job', 'job.id = :jobId', {
                jobId: job.id,
            })
                .getCount();
            const clockOffAmount = yield this.clockOffRepository
                .createQueryBuilder('clockOff')
                .innerJoinAndSelect('clockOff.job', 'job', 'job.id = :jobId', {
                jobId: job.id,
            })
                .getCount();
            const staffAssigned = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.staff', 'staff')
                .where('job.id = :jobId', { jobId: job.id })
                .getOne();
            const amountStaffAssigned = (staffAssigned === null || staffAssigned === void 0 ? void 0 : staffAssigned.staff.length) || 0;
            return (clockInAmount === clockOffAmount && clockInAmount === amountStaffAssigned);
        });
    }
};
ClockingService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_2.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_2.InjectRepository(entity_1.ClockIn)),
    tslib_1.__param(3, typeorm_2.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(4, bull_2.InjectQueue('image')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof bull_1.Queue !== "undefined" && bull_1.Queue) === "function" ? _e : Object, typeof (_f = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _f : Object, typeof (_g = typeof service_1.ClockingCommonService !== "undefined" && service_1.ClockingCommonService) === "function" ? _g : Object, typeof (_h = typeof service_1.TimeZoneService !== "undefined" && service_1.TimeZoneService) === "function" ? _h : Object])
], ClockingService);
exports.ClockingService = ClockingService;


/***/ }),

/***/ "./libs/api/clocking/src/lib/service/image.consumer.ts":
/*!*************************************************************!*\
  !*** ./libs/api/clocking/src/lib/service/image.consumer.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageConsumer = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const bull_1 = __webpack_require__(/*! @nestjs/bull */ "@nestjs/bull");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const canvas = __webpack_require__(/*! canvas */ "canvas");
const image_data_uri_1 = __webpack_require__(/*! image-data-uri */ "image-data-uri");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ImageConsumer = class ImageConsumer {
    constructor(config) {
        this.config = config;
    }
    saveImageWithTimestamp(imageData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tmpFilePath, addText, savePath } = imageData.data;
            canvas.loadImage(tmpFilePath).then((image) => {
                canvas.registerFont(`${this.config.get('SYSTEM_FONT')}`, {
                    family: 'Roboto',
                });
                const cnv = canvas.createCanvas(image.width, image.height);
                const context = cnv.getContext('2d');
                context.drawImage(image, 0, 0);
                context.font = '64px Roboto';
                context.textAlign = 'center';
                context.fillStyle = 'red';
                context.fillText(addText, image.width / 2, image.height * 0.97);
                const imageUri = cnv.toDataURL('image/png');
                image_data_uri_1.outputFile(imageUri, savePath)
                    .then(() => {
                    fs_1.unlinkSync(tmpFilePath);
                })
                    .catch(() => { });
            });
        });
    }
};
tslib_1.__decorate([
    bull_1.Process('save-image-with-timestamp'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageConsumer.prototype, "saveImageWithTimestamp", null);
ImageConsumer = tslib_1.__decorate([
    bull_1.Processor('image'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ImageConsumer);
exports.ImageConsumer = ImageConsumer;


/***/ }),

/***/ "./libs/api/company/src/index.ts":
/*!***************************************!*\
  !*** ./libs/api/company/src/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/company.service */ "./libs/api/company/src/lib/company.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/company.module */ "./libs/api/company/src/lib/company.module.ts"), exports);


/***/ }),

/***/ "./libs/api/company/src/lib/company.module.ts":
/*!****************************************************!*\
  !*** ./libs/api/company/src/lib/company.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const __1 = __webpack_require__(/*! .. */ "./libs/api/company/src/index.ts");
let CompanyModule = class CompanyModule {
};
CompanyModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.Company])],
        providers: [__1.CompanyService],
        exports: [__1.CompanyService],
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;


/***/ }),

/***/ "./libs/api/company/src/lib/company.service.ts":
/*!*****************************************************!*\
  !*** ./libs/api/company/src/lib/company.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
let CompanyService = class CompanyService {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }
    getCompanies() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.companyRepo.find();
        });
    }
    addCompany(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alreadyExists = yield this.companyRepo.findOne({ name: data.name });
            if (alreadyExists) {
                throw new exception_1.UserError('Already exists.');
            }
            const newItem = yield this.companyRepo.save({
                name: data.name,
            });
            return newItem;
        });
    }
};
CompanyService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Company)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CompanyService);
exports.CompanyService = CompanyService;


/***/ }),

/***/ "./libs/api/core/src/index.ts":
/*!************************************!*\
  !*** ./libs/api/core/src/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/core.module */ "./libs/api/core/src/lib/core.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/core.module */ "./libs/api/core/src/lib/core.module.ts"), exports);


/***/ }),

/***/ "./libs/api/core/src/lib/core.module.ts":
/*!**********************************************!*\
  !*** ./libs/api/core/src/lib/core.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const path_1 = __webpack_require__(/*! path */ "path");
const graphql_service_1 = __webpack_require__(/*! ./graphql/graphql.service */ "./libs/api/core/src/lib/graphql/graphql.service.ts");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const job_1 = __webpack_require__(/*! @dfobobcat/api/feature/job */ "./libs/api/job/src/index.ts");
const clocking_1 = __webpack_require__(/*! @dfobobcat/api/feature/clocking */ "./libs/api/clocking/src/index.ts");
const equipment_1 = __webpack_require__(/*! @dfobobcat/api/feature/equipment */ "./libs/api/equipment/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const admin_1 = __webpack_require__(/*! @dfobobcat/api/feature/admin */ "./libs/api/admin/src/index.ts");
const report_1 = __webpack_require__(/*! @dfobobcat/api/feature/report */ "./libs/api/report/src/index.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const bull_1 = __webpack_require__(/*! @nestjs/bull */ "@nestjs/bull");
const Joi = __webpack_require__(/*! @hapi/joi */ "@hapi/joi");
const winston_1 = __webpack_require__(/*! winston */ "winston");
const resolver_1 = __webpack_require__(/*! @dfobobcat/api/resolver */ "./libs/api/core/src/lib/resolver/src/index.ts");
const cron_1 = __webpack_require__(/*! @dfobobcat/api/cron */ "./libs/api/cron/src/index.ts");
const settings_1 = __webpack_require__(/*! @dfobobcat/api/feature/settings */ "./libs/api/settings/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const module_1 = __webpack_require__(/*! @dfobobcat/api/shared/module */ "./libs/api/shared/src/index.ts");
const resolver_2 = __webpack_require__(/*! @dfobobcat/api/resolver */ "./libs/api/core/src/lib/resolver/src/index.ts");
const nest_winston_1 = __webpack_require__(/*! nest-winston */ "nest-winston");
const logging_config_service_1 = __webpack_require__(/*! ./logging/logging-config.service */ "./libs/api/core/src/lib/logging/logging-config.service.ts");
const src_1 = __webpack_require__(/*! ../../../company/src */ "./libs/api/company/src/index.ts");
let CoreModule = class CoreModule {
    constructor(logger) {
        this.logger = logger;
        this.logger.info('Application startup');
        this.logger.info('Timezone ' + process.env.TZ);
        this.logger.info('Timezone shift ' + new Date().getTimezoneOffset());
    }
};
CoreModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    PORT: Joi.number(),
                    APP_ENV: Joi.string().required(),
                    APP_PORT: Joi.number().required(),
                    APP_HOST: Joi.string().required(),
                    APP_LOCALE_CODE: Joi.string().required(),
                    APP_TIMEZONE: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_HOST: Joi.string().required(),
                    DB_NAME: Joi.string().required(),
                    DB_USER: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    SESSION_SECRET: Joi.string().required(),
                    APP_ROOT_PATH: Joi.string().required(),
                    UPLOADS_PATH: Joi.string().required(),
                    SYSTEM_FONT: Joi.string().required(),
                    REDIS_HOST: Joi.string().required(),
                    REDIS_PORT: Joi.number().required(),
                    ALLOWED_ORIGINS: Joi.string().required(),
                    ADMIN_EMAIL: Joi.string().required(),
                    EMAIL_DIR: Joi.string().required(),
                    VERIFY_EMAIL_TOKEN_EXPIRE: Joi.string().required(),
                    RESET_PASSWORD_TOKEN_EXPIRE: Joi.string().required(),
                    LOGIN_TOKEN_EXPIRE: Joi.string().required(),
                    RESTORE_PASSWORD_URL: Joi.string().required(),
                    VERIFY_EMAIL_URL: Joi.string().required(),
                    LOGIN_EDIT_JOB_LINK: Joi.string().required(),
                    LOG_FILE_PATH: Joi.string().required(),
                    EMAIL_HOST: Joi.string().required(),
                    EMAIL_PORT: Joi.number().required(),
                    EMAIL_USER: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    synchronize: configService.get('POSTGRESQL_SYNC') ? true : false,
                    entities: [path_1.join(__dirname, 'entity', 'src', 'lib', '*.entity.{ts,js}')],
                    subscribers: [
                        path_1.join(__dirname, 'entity', 'src', 'lib', 'event-subscriber', '*.{ts,js}'),
                    ],
                    autoLoadEntities: true,
                    useNewUrlParser: true,
                    keepConnectionAlive: true,
                    logging: false,
                }),
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                useClass: logging_config_service_1.WinstonConfigService,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([entity_1.ClockIn, entity_1.ClockOff, entity_1.Job, entity_1.Equipment, entity_1.User, entity_1.Role]),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule, auth_1.AuthModule, nest_winston_1.WinstonModule],
                inject: [config_1.ConfigService, service_1.UserService],
                useClass: graphql_service_1.GraphqlService,
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_1.AuthModule,
            job_1.JobModule,
            clocking_1.ClockingModule,
            equipment_1.EquipmentModule,
            admin_1.ApiAdminModule,
            report_1.ApiReportModule,
            email_1.ApiEmailModule,
            settings_1.ApiSettingsModule,
            module_1.ApiSharedModule,
            src_1.CompanyModule,
        ],
        controllers: [],
        providers: [
            entity_1.UserSubscriber,
            resolver_1.AdminResolver,
            resolver_1.EquipmentResolver,
            resolver_1.UserResolver,
            resolver_1.UserTypeResolver,
            resolver_2.SettingsResolver,
            resolver_1.ClockingResolver,
            resolver_1.JobResolver,
            resolver_1.BuilderResolver,
            auth_1.GuardService,
            resolver_1.StaffResolver,
            resolver_2.ReportResolver,
            auth_1.LogInWithCredentialsGuard,
            cron_1.CronService,
            resolver_1.CompanyResolver,
            {
                provide: core_1.APP_GUARD,
                useFactory: (reflector, guardService) => {
                    return new auth_1.ClaimAuthGuard(reflector, guardService);
                },
                inject: [core_1.Reflector, auth_1.GuardService],
            },
        ],
        exports: [config_1.ConfigModule],
    }),
    tslib_1.__param(0, common_1.Inject(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof winston_1.Logger !== "undefined" && winston_1.Logger) === "function" ? _a : Object])
], CoreModule);
exports.CoreModule = CoreModule;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/index.ts":
/*!***************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/role.entity */ "./libs/api/core/src/lib/entity/src/lib/role.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/activity.entity */ "./libs/api/core/src/lib/entity/src/lib/activity.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/job.entity */ "./libs/api/core/src/lib/entity/src/lib/job.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/equipment.entity */ "./libs/api/core/src/lib/entity/src/lib/equipment.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/clockIn.entity */ "./libs/api/core/src/lib/entity/src/lib/clockIn.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/clockOff.entity */ "./libs/api/core/src/lib/entity/src/lib/clockOff.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/token.entity */ "./libs/api/core/src/lib/entity/src/lib/token.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/company.entity */ "./libs/api/core/src/lib/entity/src/lib/company.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/event-subscriber/user-subscriber */ "./libs/api/core/src/lib/entity/src/lib/event-subscriber/user-subscriber.ts"), exports);


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/activity.entity.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/activity.entity.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const job_entity_1 = __webpack_require__(/*! ./job.entity */ "./libs/api/core/src/lib/entity/src/lib/job.entity.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Activity.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => job_entity_1.Job, (job) => job.activity, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", Array)
], Activity.prototype, "jobs", void 0);
Activity = tslib_1.__decorate([
    typeorm_1.Entity()
], Activity);
exports.Activity = Activity;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/clockIn.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/clockIn.entity.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockIn = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const __1 = __webpack_require__(/*! .. */ "./libs/api/core/src/lib/entity/src/index.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof __1.Job !== "undefined" && __1.Job) === "function" ? _a : Object)
], ClockIn.prototype, "job", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.clockIns, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
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
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ClockIn.prototype, "clockInTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ClockIn.prototype, "images", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ClockIn.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ClockIn.prototype, "updatedAt", void 0);
ClockIn = tslib_1.__decorate([
    typeorm_1.Entity()
], ClockIn);
exports.ClockIn = ClockIn;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/clockOff.entity.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/clockOff.entity.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockOff = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const __1 = __webpack_require__(/*! .. */ "./libs/api/core/src/lib/entity/src/index.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof __1.Job !== "undefined" && __1.Job) === "function" ? _a : Object)
], ClockOff.prototype, "job", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.clockOffs, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], ClockOff.prototype, "staff", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], ClockOff.prototype, "notes", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz'),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
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
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ClockOff.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ClockOff.prototype, "updatedAt", void 0);
ClockOff = tslib_1.__decorate([
    typeorm_1.Entity()
], ClockOff);
exports.ClockOff = ClockOff;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/company.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/company.entity.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const __1 = __webpack_require__(/*! .. */ "./libs/api/core/src/lib/entity/src/index.ts");
let Company = class Company {
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
], Company.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', unique: true }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => __1.User, (user) => user.role),
    tslib_1.__metadata("design:type", Array)
], Company.prototype, "users", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Company.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Company.prototype, "updatedAt", void 0);
Company = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof typeorm_1.DeepPartial !== "undefined" && typeorm_1.DeepPartial) === "function" ? _c : Object])
], Company);
exports.Company = Company;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/equipment.entity.ts":
/*!******************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/equipment.entity.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const job_entity_1 = __webpack_require__(/*! ./job.entity */ "./libs/api/core/src/lib/entity/src/lib/job.entity.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Equipment.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Equipment.prototype, "updatedAt", void 0);
Equipment = tslib_1.__decorate([
    typeorm_1.Entity()
], Equipment);
exports.Equipment = Equipment;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/event-subscriber/user-subscriber.ts":
/*!**********************************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/event-subscriber/user-subscriber.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object])
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/job.entity.ts":
/*!************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/job.entity.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const equipment_entity_1 = __webpack_require__(/*! ./equipment.entity */ "./libs/api/core/src/lib/entity/src/lib/equipment.entity.ts");
const activity_entity_1 = __webpack_require__(/*! ./activity.entity */ "./libs/api/core/src/lib/entity/src/lib/activity.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
const clockIn_entity_1 = __webpack_require__(/*! ./clockIn.entity */ "./libs/api/core/src/lib/entity/src/lib/clockIn.entity.ts");
const clockOff_entity_1 = __webpack_require__(/*! ./clockOff.entity */ "./libs/api/core/src/lib/entity/src/lib/clockOff.entity.ts");
var JobStatus;
(function (JobStatus) {
    JobStatus["Assigned"] = "assigned";
    JobStatus["UnAssigned"] = "unAssigned";
    JobStatus["Cancelled"] = "cancelled";
    JobStatus["Completed"] = "completed";
    JobStatus["InProgress"] = "inProgress";
    JobStatus["Pending"] = "pending";
})(JobStatus || (JobStatus = {}));
let Job = class Job {
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
], Job.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "notes", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "priority", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "stage", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Job.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column('float', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Job.prototype, "lng", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text'),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "status", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Job.prototype, "poFile", void 0);
tslib_1.__decorate([
    typeorm_1.Column('timestamptz'),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Job.prototype, "requestDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Job.prototype, "reminderSent", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.jobRequests, {
        eager: true,
        nullable: true,
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Job.prototype, "builder", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockIn_entity_1.ClockIn, (clockIn) => clockIn.job),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "clockIns", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => clockOff_entity_1.ClockOff, (clockOff) => clockOff.job),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "clockOffs", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => user_entity_1.User, (user) => user.jobs),
    typeorm_1.JoinTable({ name: 'job_staff' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "staff", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => equipment_entity_1.Equipment, (equipment) => equipment.jobs, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'job_equipment' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "equipment", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => activity_entity_1.Activity, (activity) => activity.jobs, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'job_activity' }),
    tslib_1.__metadata("design:type", Array)
], Job.prototype, "activity", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Job.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Job.prototype, "updatedAt", void 0);
Job = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof typeorm_1.DeepPartial !== "undefined" && typeorm_1.DeepPartial) === "function" ? _e : Object])
], Job);
exports.Job = Job;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/role.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/role.entity.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleType = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Role.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Role.prototype, "updatedAt", void 0);
Role = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [Role])
], Role);
exports.Role = Role;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/token.entity.ts":
/*!**************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/token.entity.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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
    tslib_1.__metadata("design:type", String)
], Token.prototype, "resetPasswordToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "resetPasswordExpires", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "verifyEmailToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "verifyEmailExpires", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "builderLoginToken", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "builderLoginExpire", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, (user) => user.token, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Token.prototype, "user", void 0);
Token = tslib_1.__decorate([
    typeorm_1.Entity()
], Token);
exports.Token = Token;


/***/ }),

/***/ "./libs/api/core/src/lib/entity/src/lib/user.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/api/core/src/lib/entity/src/lib/user.entity.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const role_entity_1 = __webpack_require__(/*! ./role.entity */ "./libs/api/core/src/lib/entity/src/lib/role.entity.ts");
const job_entity_1 = __webpack_require__(/*! ./job.entity */ "./libs/api/core/src/lib/entity/src/lib/job.entity.ts");
const clockIn_entity_1 = __webpack_require__(/*! ./clockIn.entity */ "./libs/api/core/src/lib/entity/src/lib/clockIn.entity.ts");
const clockOff_entity_1 = __webpack_require__(/*! ./clockOff.entity */ "./libs/api/core/src/lib/entity/src/lib/clockOff.entity.ts");
const token_entity_1 = __webpack_require__(/*! ./token.entity */ "./libs/api/core/src/lib/entity/src/lib/token.entity.ts");
const __1 = __webpack_require__(/*! .. */ "./libs/api/core/src/lib/entity/src/index.ts");
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
    tslib_1.__metadata("design:type", typeof (_a = typeof role_entity_1.Role !== "undefined" && role_entity_1.Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => __1.Company, (item) => item.users, {
        eager: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof __1.Company !== "undefined" && __1.Company) === "function" ? _b : Object)
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
    tslib_1.__metadata("design:type", typeof (_c = typeof token_entity_1.Token !== "undefined" && token_entity_1.Token) === "function" ? _c : Object)
], User.prototype, "token", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], User.prototype, "updatedAt", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object])
], User);
exports.User = User;


/***/ }),

/***/ "./libs/api/core/src/lib/graphql/graphql.service.ts":
/*!**********************************************************!*\
  !*** ./libs/api/core/src/lib/graphql/graphql.service.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const graphql_passport_1 = __webpack_require__(/*! graphql-passport */ "graphql-passport");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
const nest_winston_1 = __webpack_require__(/*! nest-winston */ "nest-winston");
const winston_1 = __webpack_require__(/*! winston */ "winston");
// import { DateValidatorDirective } from './dateValidator.directive';
let GraphqlService = class GraphqlService {
    constructor(configService, userService, logger) {
        this.configService = configService;
        this.userService = userService;
        this.logger = logger;
    }
    createGqlOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                // fieldResolverEnhancers: ['guards'],
                typePaths: ['./**/*.graphql'],
                resolvers: {
                    Upload: apollo_server_express_1.GraphQLUpload,
                },
                // uploads: {
                //   maxFieldSize: 524288000,
                // },
                path: '/graphql',
                cors: {
                    origin: this.configService.get('ALLOWED_ORIGINS').split(','),
                    credentials: true,
                },
                bodyParserConfig: { limit: '50mb' },
                introspection: false,
                context: ({ req, res, connection }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return graphql_passport_1.buildContext({ req, res, User: req.user });
                }),
                formatError: (error) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    this.logger.error(error);
                    // user must only see specific error messages
                    if (((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.code) !== 'BAD_USER_INPUT') {
                        return {
                            message: 'Sorry, something went wrong! We are already working on it.',
                            code: ((_b = error.extensions) === null || _b === void 0 ? void 0 : _b.code) || 'SERVER_ERROR',
                            statusCode: ((_d = (_c = error.extensions) === null || _c === void 0 ? void 0 : _c.exception) === null || _d === void 0 ? void 0 : _d.status) ||
                                common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        };
                    }
                    return {
                        message: error.message,
                        code: ((_e = error.extensions) === null || _e === void 0 ? void 0 : _e.code) || 'SERVER_ERROR',
                        statusCode: ((_g = (_f = error.extensions) === null || _f === void 0 ? void 0 : _f.exception) === null || _g === void 0 ? void 0 : _g.status) ||
                            common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    };
                },
                debug: false,
                formatResponse: (response) => {
                    return response;
                },
                schemaDirectives: {
                // dateValidator: DateValidatorDirective,
                },
            };
        });
    }
};
GraphqlService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(2, common_1.Inject(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof service_1.UserService !== "undefined" && service_1.UserService) === "function" ? _b : Object, typeof (_c = typeof winston_1.Logger !== "undefined" && winston_1.Logger) === "function" ? _c : Object])
], GraphqlService);
exports.GraphqlService = GraphqlService;


/***/ }),

/***/ "./libs/api/core/src/lib/logging/logging-config.service.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/core/src/lib/logging/logging-config.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonConfigService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const winston_1 = __webpack_require__(/*! winston */ "winston");
let WinstonConfigService = class WinstonConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createWinstonModuleOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                format: winston_1.format.combine(winston_1.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${JSON.stringify(info)}` +
                    (info.splat !== undefined ? `${info.splat}` : ' '))),
                transports: [
                    new winston_1.transports.File({
                        filename: this.configService.get('LOG_FILE_PATH'),
                    }),
                    new winston_1.transports.Console(),
                ],
            };
        });
    }
};
WinstonConfigService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], WinstonConfigService);
exports.WinstonConfigService = WinstonConfigService;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/index.ts":
/*!*****************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/index.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/admin.resolver */ "./libs/api/core/src/lib/resolver/src/lib/admin.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/builder.resolver */ "./libs/api/core/src/lib/resolver/src/lib/builder.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/clocking.resolver */ "./libs/api/core/src/lib/resolver/src/lib/clocking.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/equipment.resolver */ "./libs/api/core/src/lib/resolver/src/lib/equipment.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/job.resolver */ "./libs/api/core/src/lib/resolver/src/lib/job.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/staff.resolver */ "./libs/api/core/src/lib/resolver/src/lib/staff.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/user.resolver */ "./libs/api/core/src/lib/resolver/src/lib/user.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/settings.resolver */ "./libs/api/core/src/lib/resolver/src/lib/settings.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/report.resolver */ "./libs/api/core/src/lib/resolver/src/lib/report.resolver.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/company.resolver */ "./libs/api/core/src/lib/resolver/src/lib/company.resolver.ts"), exports);


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/admin.resolver.ts":
/*!******************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/admin.resolver.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const admin_1 = __webpack_require__(/*! @dfobobcat/api/feature/admin */ "./libs/api/admin/src/index.ts");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
let AdminResolver = class AdminResolver {
    constructor(adminService) {
        this.adminService = adminService;
    }
    updateUser(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.adminService.updateUser(ctx, args) };
        });
    }
    deleteUser(ctx, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.adminService.deleteUser(userId) };
        });
    }
    users(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.getUsers(args);
        });
    }
    staffRoles() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.adminService.staffRoles();
        });
    }
};
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.UpdateAllUsers),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof graphql_types_1.UpdateUserInput !== "undefined" && graphql_types_1.UpdateUserInput) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminResolver.prototype, "updateUser", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.DeleteAllUsers),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminResolver.prototype, "deleteUser", null);
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.GetAllUsers),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof graphql_types_1.UsersQueryVariables !== "undefined" && graphql_types_1.UsersQueryVariables) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "users", null);
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.GetAllRoles),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "staffRoles", null);
AdminResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof admin_1.AdminService !== "undefined" && admin_1.AdminService) === "function" ? _e : Object])
], AdminResolver);
exports.AdminResolver = AdminResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/builder.resolver.ts":
/*!********************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/builder.resolver.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const job_1 = __webpack_require__(/*! @dfobobcat/api/feature/job */ "./libs/api/job/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
let BuilderResolver = class BuilderResolver {
    constructor(builderJobService) {
        this.builderJobService = builderJobService;
    }
    jobRequests(builder, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = builder;
            return this.builderJobService.getBuilderJobs(id, args);
        });
    }
};
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__param(1, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof entity_1.User !== "undefined" && entity_1.User) === "function" ? _a : Object, typeof (_b = typeof graphql_types_1.BuilderJobRequestsArgs !== "undefined" && graphql_types_1.BuilderJobRequestsArgs) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BuilderResolver.prototype, "jobRequests", null);
BuilderResolver = tslib_1.__decorate([
    graphql_1.Resolver('Builder'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof job_1.BuilderJobService !== "undefined" && job_1.BuilderJobService) === "function" ? _c : Object])
], BuilderResolver);
exports.BuilderResolver = BuilderResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/clocking.resolver.ts":
/*!*********************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/clocking.resolver.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockingResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const clocking_1 = __webpack_require__(/*! @dfobobcat/api/feature/clocking */ "./libs/api/clocking/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
let ClockingResolver = class ClockingResolver {
    constructor(clockingService) {
        this.clockingService = clockingService;
    }
    addClockIn(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.clockingService.addClockIn(ctx, args);
        });
    }
    addClockOff(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.clockingService.addClockOff(ctx, args) };
        });
    }
};
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.AddClockIn),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof graphql_types_1.AddClockInInput !== "undefined" && graphql_types_1.AddClockInInput) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClockingResolver.prototype, "addClockIn", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.AddClockOff),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof graphql_types_1.AddClockOffInput !== "undefined" && graphql_types_1.AddClockOffInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClockingResolver.prototype, "addClockOff", null);
ClockingResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof clocking_1.ClockingService !== "undefined" && clocking_1.ClockingService) === "function" ? _c : Object])
], ClockingResolver);
exports.ClockingResolver = ClockingResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/company.resolver.ts":
/*!********************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/company.resolver.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const company_1 = __webpack_require__(/*! @dfobobcat/api/feature/company */ "./libs/api/company/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    companies() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.companyService.getCompanies();
        });
    }
    addCompany(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.companyService.addCompany(args) };
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.PublicMethod),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyResolver.prototype, "companies", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.AddCompany),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof graphql_types_1.AddCompanyInput !== "undefined" && graphql_types_1.AddCompanyInput) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyResolver.prototype, "addCompany", null);
CompanyResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof company_1.CompanyService !== "undefined" && company_1.CompanyService) === "function" ? _b : Object])
], CompanyResolver);
exports.CompanyResolver = CompanyResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/equipment.resolver.ts":
/*!**********************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/equipment.resolver.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const equipment_1 = __webpack_require__(/*! @dfobobcat/api/feature/equipment */ "./libs/api/equipment/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
let EquipmentResolver = class EquipmentResolver {
    constructor(equipmentService) {
        this.equipmentService = equipmentService;
    }
    equipment() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.equipmentService.getEquipment();
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.Authenticated),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], EquipmentResolver.prototype, "equipment", null);
EquipmentResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof equipment_1.EquipmentService !== "undefined" && equipment_1.EquipmentService) === "function" ? _a : Object])
], EquipmentResolver);
exports.EquipmentResolver = EquipmentResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/job.resolver.ts":
/*!****************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/job.resolver.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const job_1 = __webpack_require__(/*! @dfobobcat/api/feature/job */ "./libs/api/job/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
let JobResolver = class JobResolver {
    constructor(jobService) {
        this.jobService = jobService;
    }
    clockOffs(job) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = job;
            return this.jobService.getJobClockOffs(id);
        });
    }
    clockIns(job) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = job;
            return this.jobService.getJobClockIns(id);
        });
    }
    createJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.jobService.createJob(ctx, args) };
        });
    }
    updateJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.jobService.updateJob(ctx, args) };
        });
    }
    updateJobDate(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.jobService.updateJobDate(ctx, args) };
        });
    }
    cancelJob(ctx, jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.jobService.cancelJob(ctx, jobId) };
        });
    }
    job(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.jobService.getJob(args.id);
        });
    }
    jobs(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.jobService.getJobs(args);
        });
    }
    assignToJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { success: yield this.jobService.assignToJob(ctx, args) };
        });
    }
};
tslib_1.__decorate([
    graphql_1.ResolveField(),
    auth_1.RequireClaim(const_1.Claim.GetAllClockOffs),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof entity_1.Job !== "undefined" && entity_1.Job) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "clockOffs", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    auth_1.RequireClaim(const_1.Claim.GetAllClockIns),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof entity_1.Job !== "undefined" && entity_1.Job) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "clockIns", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.CreateJob),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_c = typeof graphql_types_1.CreateJobInput !== "undefined" && graphql_types_1.CreateJobInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "createJob", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.UpdateOwnJob),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof graphql_types_1.UpdateJobInput !== "undefined" && graphql_types_1.UpdateJobInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "updateJob", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.UpdateOwnJob),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof graphql_types_1.UpdateJobDateInput !== "undefined" && graphql_types_1.UpdateJobDateInput) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "updateJobDate", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.CancelOwnJob),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('jobId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "cancelJob", null);
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.AuthCallback((guardService, ctx, args) => guardService.canGetJob(ctx, args)),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof graphql_types_1.QueryJobArgs !== "undefined" && graphql_types_1.QueryJobArgs) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "job", null);
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.GetAllJobs),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof graphql_types_1.QueryJobsArgs !== "undefined" && graphql_types_1.QueryJobsArgs) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "jobs", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.AssignToJob),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_h = typeof graphql_types_1.AssignToJobInput !== "undefined" && graphql_types_1.AssignToJobInput) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], JobResolver.prototype, "assignToJob", null);
JobResolver = tslib_1.__decorate([
    graphql_1.Resolver('Job'),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof job_1.JobService !== "undefined" && job_1.JobService) === "function" ? _j : Object])
], JobResolver);
exports.JobResolver = JobResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/report.resolver.ts":
/*!*******************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/report.resolver.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const report_1 = __webpack_require__(/*! @dfobobcat/api/feature/report */ "./libs/api/report/src/index.ts");
let ReportResolver = class ReportResolver {
    constructor(reportService) {
        this.reportService = reportService;
    }
    report() {
        return {};
    }
    totalWorkedHours(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reportService.getTotalWorkedHours(args);
        });
    }
    jobsForDate(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reportService.getJobsForDate(args);
        });
    }
    jobsForDateFullList(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reportService.getJobsForDateFullList(args);
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.GetAllReports),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ReportResolver.prototype, "report", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof graphql_types_1.ReportTotalWorkedHoursArgs !== "undefined" && graphql_types_1.ReportTotalWorkedHoursArgs) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReportResolver.prototype, "totalWorkedHours", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof graphql_types_1.ReportJobsForDateArgs !== "undefined" && graphql_types_1.ReportJobsForDateArgs) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReportResolver.prototype, "jobsForDate", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof graphql_types_1.ReportJobsForDateFullListArgs !== "undefined" && graphql_types_1.ReportJobsForDateFullListArgs) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReportResolver.prototype, "jobsForDateFullList", null);
ReportResolver = tslib_1.__decorate([
    graphql_1.Resolver('Report'),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof report_1.ReportService !== "undefined" && report_1.ReportService) === "function" ? _d : Object])
], ReportResolver);
exports.ReportResolver = ReportResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/settings.resolver.ts":
/*!*********************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/settings.resolver.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const settings_1 = __webpack_require__(/*! @dfobobcat/api/feature/settings */ "./libs/api/settings/src/index.ts");
let SettingsResolver = class SettingsResolver {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    settings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.settingsService.getSettings();
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.Authenticated),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SettingsResolver.prototype, "settings", null);
SettingsResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof settings_1.SettingsService !== "undefined" && settings_1.SettingsService) === "function" ? _a : Object])
], SettingsResolver);
exports.SettingsResolver = SettingsResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/staff.resolver.ts":
/*!******************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/staff.resolver.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const job_1 = __webpack_require__(/*! @dfobobcat/api/feature/job */ "./libs/api/job/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const report_1 = __webpack_require__(/*! @dfobobcat/api/feature/report */ "./libs/api/report/src/index.ts");
const clocking_1 = __webpack_require__(/*! @dfobobcat/api/feature/clocking */ "./libs/api/clocking/src/index.ts");
let StaffResolver = class StaffResolver {
    constructor(staffJobService, reportService, clockingService) {
        this.staffJobService = staffJobService;
        this.reportService = reportService;
        this.clockingService = clockingService;
    }
    assignedJobs(user, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = user;
            const filter = args.filter ? args.filter : graphql_types_1.JobFilter.Upcoming;
            return this.staffJobService.getStaffJobs(id, args);
        });
    }
    todaysAssignedJob(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = user;
            return this.staffJobService.getTodaysAssignedJob(id);
        });
    }
    hasClockedIntoJob(user, { id }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id: userId } = user;
            return this.clockingService.hasClockedInToJob(id, userId);
        });
    }
};
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__param(1, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof entity_1.User !== "undefined" && entity_1.User) === "function" ? _a : Object, typeof (_b = typeof graphql_types_1.StaffAssignedJobsArgs !== "undefined" && graphql_types_1.StaffAssignedJobsArgs) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StaffResolver.prototype, "assignedJobs", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entity_1.User !== "undefined" && entity_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StaffResolver.prototype, "todaysAssignedJob", null);
tslib_1.__decorate([
    graphql_1.ResolveField(),
    tslib_1.__param(0, graphql_1.Parent()),
    tslib_1.__param(1, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof entity_1.User !== "undefined" && entity_1.User) === "function" ? _d : Object, typeof (_e = typeof graphql_types_1.StaffHasClockedIntoJobArgs !== "undefined" && graphql_types_1.StaffHasClockedIntoJobArgs) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StaffResolver.prototype, "hasClockedIntoJob", null);
StaffResolver = tslib_1.__decorate([
    graphql_1.Resolver('Staff'),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof job_1.StaffJobService !== "undefined" && job_1.StaffJobService) === "function" ? _f : Object, typeof (_g = typeof report_1.ReportService !== "undefined" && report_1.ReportService) === "function" ? _g : Object, typeof (_h = typeof clocking_1.ClockingService !== "undefined" && clocking_1.ClockingService) === "function" ? _h : Object])
], StaffResolver);
exports.StaffResolver = StaffResolver;


/***/ }),

/***/ "./libs/api/core/src/lib/resolver/src/lib/user.resolver.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/core/src/lib/resolver/src/lib/user.resolver.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeResolver = exports.UserResolver = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const auth_1 = __webpack_require__(/*! @dfobobcat/api/auth */ "./libs/api/auth/src/index.ts");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    me(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = ctx.getUser();
            return this.userService.getById(user.id);
        });
    }
    user(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getById(id);
        });
    }
    updateMyAccount(ctx, args) {
        var _a;
        return this.userService.updateUserAccount((_a = ctx === null || ctx === void 0 ? void 0 : ctx.getUser()) === null || _a === void 0 ? void 0 : _a.id, args);
    }
};
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.Authenticated),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
tslib_1.__decorate([
    graphql_1.Query(),
    auth_1.RequireClaim(const_1.Claim.GetAllUsers),
    tslib_1.__param(0, graphql_1.Args('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
tslib_1.__decorate([
    graphql_1.Mutation(),
    auth_1.RequireClaim(const_1.Claim.UpdateOwnAccount),
    tslib_1.__param(0, graphql_1.Context()),
    tslib_1.__param(1, graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof graphql_types_1.UpdateMyAccountMutationVariables !== "undefined" && graphql_types_1.UpdateMyAccountMutationVariables) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserResolver.prototype, "updateMyAccount", null);
UserResolver = tslib_1.__decorate([
    graphql_1.Resolver(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof service_1.UserService !== "undefined" && service_1.UserService) === "function" ? _b : Object])
], UserResolver);
exports.UserResolver = UserResolver;
let UserTypeResolver = class UserTypeResolver {
    __resolveType(user) {
        if (user.role.name === graphql_types_1.RoleType.Builder) {
            return 'Builder';
        }
        else if (user.role.name === graphql_types_1.RoleType.Laborer ||
            user.role.name === graphql_types_1.RoleType.Operator) {
            return 'Staff';
        }
        else if (user.role.name === graphql_types_1.RoleType.Admin) {
            return 'Admin';
        }
        throw new exception_1.UserError('Role does not exist');
    }
};
tslib_1.__decorate([
    graphql_1.ResolveProperty(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entity_1.User !== "undefined" && entity_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserTypeResolver.prototype, "__resolveType", null);
UserTypeResolver = tslib_1.__decorate([
    graphql_1.Resolver('User')
], UserTypeResolver);
exports.UserTypeResolver = UserTypeResolver;


/***/ }),

/***/ "./libs/api/cron/src/index.ts":
/*!************************************!*\
  !*** ./libs/api/cron/src/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/cron.service */ "./libs/api/cron/src/lib/cron.service.ts"), exports);


/***/ }),

/***/ "./libs/api/cron/src/lib/cron.service.ts":
/*!***********************************************!*\
  !*** ./libs/api/cron/src/lib/cron.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
let CronService = class CronService {
    constructor(jobsRepository, emailService, configService, tzService) {
        this.jobsRepository = jobsRepository;
        this.emailService = emailService;
        this.configService = configService;
        this.tzService = tzService;
    }
    jobReminder() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.staff', 'staff')
                .innerJoinAndSelect('job.builder', 'builder')
                .where(`job."requestDate" >= NOW() AND job."requestDate" < NOW() + INTERVAL '24 hours'`)
                .andWhere('job.status != :cancelled', { cancelled: graphql_types_1.JobStatus.Cancelled })
                .getMany();
            for (const job of jobs) {
                //TODO: add logs
                if (job.reminderSent) {
                    continue;
                }
                const staffUsers = job.staff;
                const builder = job.builder;
                const requestDate = this.tzService.convertToTZ(job.requestDate);
                const jobInfo = `${requestDate} - ${job.address}`;
                job.reminderSent = true;
                yield this.jobsRepository.save(job);
                // send to staff
                for (const user of staffUsers) {
                    this.emailService.sendEmail(user.email, email_1.EmailType.STAFF_JOB_REMINDER, {
                        jobInfo,
                        username: user.name,
                        requestDate,
                    });
                }
                // send to builders
                const loginEditJobLink = `${this.configService.get('LOGIN_EDIT_JOB_LINK')}${job.id}?login_token=${builder.token.builderLoginToken}`;
                this.emailService.sendEmail(builder.email, email_1.EmailType.BUILDER_JOB_REMINDER, {
                    jobInfo,
                    username: builder.name,
                    loginEditJobLink,
                    requestDate,
                });
            }
        });
    }
};
tslib_1.__decorate([
    schedule_1.Cron('* 1 * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CronService.prototype, "jobReminder", null);
CronService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.Job)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof service_1.TimeZoneService !== "undefined" && service_1.TimeZoneService) === "function" ? _d : Object])
], CronService);
exports.CronService = CronService;


/***/ }),

/***/ "./libs/api/email/src/index.ts":
/*!*************************************!*\
  !*** ./libs/api/email/src/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-email.module */ "./libs/api/email/src/lib/api-email.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/email.service */ "./libs/api/email/src/lib/service/email.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/types */ "./libs/api/email/src/lib/types.ts"), exports);


/***/ }),

/***/ "./libs/api/email/src/lib/api-email.module.ts":
/*!****************************************************!*\
  !*** ./libs/api/email/src/lib/api-email.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEmailModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const email_service_1 = __webpack_require__(/*! ./service/email.service */ "./libs/api/email/src/lib/service/email.service.ts");
let ApiEmailModule = class ApiEmailModule {
};
ApiEmailModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
        imports: [config_1.ConfigModule],
    })
], ApiEmailModule);
exports.ApiEmailModule = ApiEmailModule;


/***/ }),

/***/ "./libs/api/email/src/lib/service/email.service.ts":
/*!*********************************************************!*\
  !*** ./libs/api/email/src/lib/service/email.service.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const types_1 = __webpack_require__(/*! ../types */ "./libs/api/email/src/lib/types.ts");
const handlebars = __webpack_require__(/*! handlebars */ "handlebars");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
        this.emailDir = this.config.get('EMAIL_DIR');
    }
    sendEmail(to, type, params = {}) {
        const templatePath = path.join(this.emailDir, `${type}.html`);
        const emailContent = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
        const template = handlebars.compile(emailContent);
        const subject = `DFO Scheduler: ${types_1.EMAIL_SUBJECT[type]}`;
        const html = template(Object.assign(Object.assign({}, params), { topic: types_1.EMAIL_SUBJECT[type] }));
        this.send(to, subject, html);
    }
    send(to, subject, html) {
        const config = {
            from: this.config.get('EMAIL_FROM'),
            to,
            subject,
            html,
        };
        let transport;
        if (this.config.get('APP_ENV') === 'production') {
            transport = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: this.config.get('EMAIL_USER'),
                    pass: this.config.get('EMAIL_PASSWORD'),
                },
            });
        }
        else {
            transport = nodemailer.createTransport({
                host: this.config.get('EMAIL_HOST'),
                port: this.config.get('EMAIL_PORT'),
                auth: {
                    user: this.config.get('EMAIL_USER'),
                    pass: this.config.get('EMAIL_PASSWORD'),
                },
            });
        }
        transport
            .sendMail(config)
            .then()
            .catch((err) => {
            // TODO: log error
            // eslint-disable-next-line no-console
            console.log('Email result', err.message);
        });
        return;
    }
};
EmailService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], EmailService);
exports.EmailService = EmailService;


/***/ }),

/***/ "./libs/api/email/src/lib/types.ts":
/*!*****************************************!*\
  !*** ./libs/api/email/src/lib/types.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_SUBJECT = exports.EmailType = void 0;
var EmailType;
(function (EmailType) {
    EmailType["FORGOT_PASSWORD"] = "restore_password";
    EmailType["BUILDER_SIGNUP"] = "signup";
    EmailType["VERIFY_EMAIL"] = "verify_email";
    EmailType["BUILDER_JOB_CREATED"] = "builder_job_created";
    EmailType["ADMIN_JOB_CREATED"] = "admin_job_created";
    EmailType["BUILDER_JOB_ASSIGNED"] = "builder_job_assigned";
    EmailType["BUILDER_JOB_UNASSIGNED"] = "builder_job_unassigned";
    EmailType["STAFF_JOB_ASSIGNED"] = "staff_job_assigned";
    EmailType["STAFF_JOB_UNASSIGNED"] = "staff_job_unassigned";
    EmailType["BUILDER_JOB_RESCHEDULED"] = "builder_job_rescheduled";
    EmailType["STAFF_JOB_RESCHEDULED"] = "staff_job_rescheduled";
    EmailType["ADMIN_JOB_RESCHEDULED"] = "admin_job_rescheduled";
    EmailType["BUILDER_JOB_CANCELLED"] = "builder_job_cancelled";
    EmailType["STAFF_JOB_CANCELLED"] = "staff_job_cancelled";
    EmailType["ADMIN_JOB_CANCELLED"] = "admin_job_cancelled";
    EmailType["BUILDER_JOB_REMINDER"] = "builder_job_reminder";
    EmailType["STAFF_JOB_REMINDER"] = "staff_job_reminder";
})(EmailType = exports.EmailType || (exports.EmailType = {}));
exports.EMAIL_SUBJECT = {
    [EmailType.FORGOT_PASSWORD]: 'Restore your password',
    [EmailType.BUILDER_SIGNUP]: 'Registration Complete',
    [EmailType.VERIFY_EMAIL]: 'Verify your email address',
    [EmailType.BUILDER_JOB_CREATED]: 'Job created',
    [EmailType.ADMIN_JOB_CREATED]: 'Job created',
    [EmailType.BUILDER_JOB_ASSIGNED]: 'Job assigned',
    [EmailType.BUILDER_JOB_UNASSIGNED]: 'Job unassigned',
    [EmailType.STAFF_JOB_ASSIGNED]: 'Job assigned',
    [EmailType.STAFF_JOB_UNASSIGNED]: 'Job unassigned',
    [EmailType.BUILDER_JOB_RESCHEDULED]: 'Job rescheduled',
    [EmailType.STAFF_JOB_RESCHEDULED]: 'Job rescheduled',
    [EmailType.ADMIN_JOB_RESCHEDULED]: 'Job rescheduled',
    [EmailType.BUILDER_JOB_CANCELLED]: 'Job cancelled',
    [EmailType.STAFF_JOB_CANCELLED]: 'Job cancelled',
    [EmailType.ADMIN_JOB_CANCELLED]: 'Job cancelled',
    [EmailType.BUILDER_JOB_REMINDER]: 'Job starts in 24 hours',
    [EmailType.STAFF_JOB_REMINDER]: 'Job starts in 24 hours',
};


/***/ }),

/***/ "./libs/api/equipment/src/index.ts":
/*!*****************************************!*\
  !*** ./libs/api/equipment/src/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/equipment.module */ "./libs/api/equipment/src/lib/equipment.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/equipment.service */ "./libs/api/equipment/src/lib/service/equipment.service.ts"), exports);


/***/ }),

/***/ "./libs/api/equipment/src/lib/equipment.module.ts":
/*!********************************************************!*\
  !*** ./libs/api/equipment/src/lib/equipment.module.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const equipment_service_1 = __webpack_require__(/*! ./service/equipment.service */ "./libs/api/equipment/src/lib/service/equipment.service.ts");
let EquipmentModule = class EquipmentModule {
};
EquipmentModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.Equipment]), config_1.ConfigModule],
        providers: [equipment_service_1.EquipmentService],
        exports: [equipment_service_1.EquipmentService],
    })
], EquipmentModule);
exports.EquipmentModule = EquipmentModule;


/***/ }),

/***/ "./libs/api/equipment/src/lib/service/equipment.service.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/equipment/src/lib/service/equipment.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let EquipmentService = class EquipmentService {
    constructor(equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }
    getEquipment() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.equipmentRepository.find();
        });
    }
};
EquipmentService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Equipment)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], EquipmentService);
exports.EquipmentService = EquipmentService;


/***/ }),

/***/ "./libs/api/job/src/index.ts":
/*!***********************************!*\
  !*** ./libs/api/job/src/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/job.service */ "./libs/api/job/src/lib/service/job.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/builder-job.service */ "./libs/api/job/src/lib/service/builder-job.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/staff-job.service */ "./libs/api/job/src/lib/service/staff-job.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./job.module */ "./libs/api/job/src/job.module.ts"), exports);


/***/ }),

/***/ "./libs/api/job/src/job.module.ts":
/*!****************************************!*\
  !*** ./libs/api/job/src/job.module.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const job_service_1 = __webpack_require__(/*! ./lib/service/job.service */ "./libs/api/job/src/lib/service/job.service.ts");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const staff_job_service_1 = __webpack_require__(/*! ./lib/service/staff-job.service */ "./libs/api/job/src/lib/service/staff-job.service.ts");
const builder_job_service_1 = __webpack_require__(/*! ./lib/service/builder-job.service */ "./libs/api/job/src/lib/service/builder-job.service.ts");
const module_1 = __webpack_require__(/*! @dfobobcat/api/shared/module */ "./libs/api/shared/src/index.ts");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
let JobModule = class JobModule {
};
JobModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.ClockIn, entity_1.ClockOff, entity_1.Job, entity_1.Equipment, entity_1.User, entity_1.Activity]),
            config_1.ConfigModule,
            module_1.ApiSharedModule,
            email_1.ApiEmailModule,
            module_1.ApiSharedModule,
        ],
        providers: [job_service_1.JobService, staff_job_service_1.StaffJobService, builder_job_service_1.BuilderJobService],
        exports: [job_service_1.JobService, staff_job_service_1.StaffJobService, builder_job_service_1.BuilderJobService],
    })
], JobModule);
exports.JobModule = JobModule;


/***/ }),

/***/ "./libs/api/job/src/lib/service/builder-job.service.ts":
/*!*************************************************************!*\
  !*** ./libs/api/job/src/lib/service/builder-job.service.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderJobService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
let BuilderJobService = class BuilderJobService {
    constructor(jobsRepository, usersRepository, equipmentsRepository, clockOffRepository, config) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.equipmentsRepository = equipmentsRepository;
        this.clockOffRepository = clockOffRepository;
        this.config = config;
    }
    getBuilderJobs(builderId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const status = args.status ? args.status : graphql_types_1.JobStatus.Assigned;
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.equipment', 'equipment')
                .leftJoinAndSelect('job.activity', 'activity')
                .where('job.builder.id = :builderId', { builderId });
            if (status) {
                query.andWhere('job.status = :status', { status });
            }
            if (args.search &&
                typeof args.search === 'string' &&
                args.search.length > 0) {
                query.andWhere('LOWER(job.address) like :address', {
                    address: `%${args.search.toLowerCase()}%`,
                });
            }
            const results = yield query
                .orderBy('job.requestDate', 'DESC');
            const builderJobs = yield results.getMany();
            return builderJobs;
        });
    }
};
BuilderJobService = tslib_1.__decorate([
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_1.InjectRepository(entity_1.Equipment)),
    tslib_1.__param(3, typeorm_1.InjectRepository(entity_1.ClockOff)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object])
], BuilderJobService);
exports.BuilderJobService = BuilderJobService;


/***/ }),

/***/ "./libs/api/job/src/lib/service/job.service.ts":
/*!*****************************************************!*\
  !*** ./libs/api/job/src/lib/service/job.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const const_1 = __webpack_require__(/*! @dfobobcat/api/shared/const */ "./libs/api/shared/src/lib/const/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const util_1 = __webpack_require__(/*! @dfobobcat/api/auth/util */ "./libs/api/auth/src/lib/util/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path_1 = __webpack_require__(/*! path */ "path");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const builder_job_service_1 = __webpack_require__(/*! ./builder-job.service */ "./libs/api/job/src/lib/service/builder-job.service.ts");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
let JobService = class JobService {
    constructor(jobsRepository, usersRepository, equipmentsRepository, activityRepository, clockOffRepository, clockInRepository, config, builderJobService, builderUtilService, emailService, tzService) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.equipmentsRepository = equipmentsRepository;
        this.activityRepository = activityRepository;
        this.clockOffRepository = clockOffRepository;
        this.clockInRepository = clockInRepository;
        this.config = config;
        this.builderJobService = builderJobService;
        this.builderUtilService = builderUtilService;
        this.emailService = emailService;
        this.tzService = tzService;
    }
    getJob(jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.equipment', 'equipment')
                .leftJoinAndSelect('job.builder', 'builder')
                .where('job.id = :jobId', { jobId })
                .orderBy()
                .getOneOrFail();
            return result;
        });
    }
    getJobs(args) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const status = args.status ? args.status : [graphql_types_1.JobStatus.Assigned];
            const offset = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.offset) ? args.pagination.offset : 9;
            const page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) ? args.pagination.page : 0;
            const staffFilter = args === null || args === void 0 ? void 0 : args.staff;
            const skip = page * offset;
            const queryIds = this.jobsRepository
                .createQueryBuilder('job')
                .select('job.id');
            if (staffFilter) {
                queryIds.innerJoin('job.staff', 'staff', 'staff.id IN (:...staffFilter)', {
                    staffFilter,
                });
            }
            if (status) {
                queryIds.where('job.status IN (:...status)', { status });
            }
            if (((_c = args.filteredDate) === null || _c === void 0 ? void 0 : _c.calendarType) === const_1.Range.Day) {
                queryIds.andWhere(`DATE(job.requestDate) >= DATE(:startDate) AND DATE(job.requestDate) <= DATE(:startDate)`, { startDate: (_d = args.filteredDate) === null || _d === void 0 ? void 0 : _d.startDate });
            }
            else if (((_e = args.filteredDate) === null || _e === void 0 ? void 0 : _e.calendarType) === const_1.Range.Week) {
                queryIds.andWhere(`DATE(job.requestDate) >= DATE(:startDate) AND DATE(job.requestDate) <= DATE(:endDate)`, {
                    startDate: (_f = args.filteredDate) === null || _f === void 0 ? void 0 : _f.startDate,
                    endDate: (_g = args.filteredDate) === null || _g === void 0 ? void 0 : _g.endDate,
                });
            }
            else if (((_h = args.filteredDate) === null || _h === void 0 ? void 0 : _h.calendarType) === const_1.Range.Month) {
                queryIds.andWhere(`DATE(job.requestDate) >= DATE(:currentDate) AND DATE(job.requestDate) <= DATE(:endDate)`, {
                    currentDate: (_j = args.filteredDate) === null || _j === void 0 ? void 0 : _j.startDate,
                    endDate: (_k = args.filteredDate) === null || _k === void 0 ? void 0 : _k.endDate,
                });
            }
            if (args.search && args.search.length > 0) {
                queryIds.andWhere('LOWER(job.address) like :address', {
                    address: `%${args.search.toLowerCase()}%`,
                });
            }
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .where(`job.id IN (${queryIds.getQuery()})`)
                .setParameters(queryIds.getParameters())
                .leftJoinAndSelect('job.equipment', 'equipment')
                .leftJoinAndSelect('job.builder', 'builder')
                .leftJoinAndSelect('job.activity', 'activity');
            const totalClone = query.clone();
            const total = yield totalClone.getCount();
            const hasNextPage = total > (page + 1) * offset;
            const hasPreviousPage = page > 0;
            const nextPage = hasNextPage ? page + 1 : undefined;
            const previousPage = hasPreviousPage ? page - 1 : undefined;
            let orderBy = tool_1.getOrderAndDirection(args.orderBy);
            let jobs;
            if (!orderBy) {
                orderBy = ['job.id', 'ASC'];
            }
            if (args.filteredDate) {
                orderBy = ['job.requestDate', 'ASC'];
                jobs = yield query.orderBy(...orderBy).getMany();
            }
            else {
                jobs = yield query
                    .orderBy(...orderBy)
                    .take(offset)
                    .skip(skip)
                    .getMany();
            }
            return {
                items: jobs,
                pageInfo: {
                    hasNextPage,
                    hasPreviousPage,
                    nextPage,
                    previousPage,
                },
            };
        });
    }
    createJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let builder;
            let activity = [];
            const user = ctx.getUser();
            const { address, lat, lng, requestDate, notes, priority, stage, adminSelectedBuilder, type, time, } = args;
            const status = graphql_types_1.JobStatus.Pending;
            const equipment = yield this.builderUtilService.findByIdsOrThrow(this.equipmentsRepository, args.equipment);
            activity.push({ type: status, date: new Date() });
            if (adminSelectedBuilder) {
                builder = yield this.usersRepository.findOneOrFail(adminSelectedBuilder, {
                    relations: ['token'],
                });
            }
            else {
                builder = yield this.usersRepository.findOneOrFail(user.id, {
                    relations: ['token'],
                });
            }
            const job = new entity_1.Job({
                address,
                lat,
                lng,
                requestDate: requestDate,
                equipment,
                builder,
                status,
                notes,
                priority,
                stage,
                activity,
            });
            yield this.jobsRepository.save(job);
            const jobInfo = `${this.tzService.convertToTZ(new Date(job.requestDate))} - ${job.address}`;
            const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id}?login_token=${builder.token.builderLoginToken}`;
            //send to builder
            this.emailService.sendEmail(job.builder.email, email_1.EmailType.BUILDER_JOB_CREATED, {
                jobInfo,
                loginEditJobLink,
                username: job.builder.name,
            });
            // send to admin
            const adminEmail = this.config.get('ADMIN_EMAIL');
            if (adminEmail) {
                this.emailService.sendEmail(adminEmail, email_1.EmailType.ADMIN_JOB_CREATED, {
                    jobInfo,
                    username: job.builder.name,
                });
            }
            let fileName;
            if (args.poFile) {
                const file = args.poFile;
                const { createReadStream, mimetype } = yield file;
                const allowedTypes = ['application/pdf'];
                if (!allowedTypes.includes(mimetype)) {
                    throw new exception_1.UserError('Allowed file types: *.pdf');
                }
                const folder = path_1.join(this.config.get('UPLOADS_PATH'), 'po', `${job.id}`);
                try {
                    if (!fs_1.existsSync(folder)) {
                        fs_1.mkdirSync(folder, { recursive: true });
                    }
                }
                catch (err) {
                    // TODO: log this
                }
                fileName = `${tool_1.getRandomString()}.pdf`;
                const poFilePath = path_1.join(folder, fileName);
                const writeStream = fs_1.createWriteStream(poFilePath);
                const readStream = createReadStream();
                // TODO: if error writing file
                readStream.pipe(writeStream);
                job.poFile = fileName;
                yield this.jobsRepository.save(job);
            }
            return true;
        });
    }
    updateJob(ctx, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { address, lat, lng, id, priority } = args;
            const requestDate = new Date(args.requestDate);
            let isReschedule = false;
            const user = ctx.getUser();
            let job = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.builder', 'builder')
                .leftJoinAndSelect('job.staff', 'staff')
                .where('job.id = :jobId', { jobId: id })
                .getOne();
            if (!job) {
                throw new exception_1.UserError('Job was not found.');
            }
            const builder = yield this.usersRepository.findOneOrFail({ id: job.builder.id }, { relations: ['token'] });
            const ability = util_1.defineAbilityFor(ctx);
            if (ability.cannot(const_1.Claim.UpdateAllJobs) &&
                (!this.isOwnJob(user, job) || ability.cannot(const_1.Claim.UpdateOwnJob))) {
                //TODO: log this
                throw new exception_1.UserError();
            }
            if (args.poFile) {
                const file = args.poFile;
                const { createReadStream, mimetype } = yield file;
                const allowedTypes = ['application/pdf'];
                if (!allowedTypes.includes(mimetype)) {
                    throw new exception_1.UserError('Allowed file types: *.pdf');
                }
                const folder = path_1.join(this.config.get('UPLOADS_PATH'), 'po', `${job.id}`);
                try {
                    if (!fs_1.existsSync(folder)) {
                        fs_1.mkdirSync(folder, { recursive: true });
                    }
                }
                catch (err) {
                    // TODO: log this
                }
                const fileName = `${tool_1.getRandomString()}.pdf`;
                const poFilePath = path_1.join(folder, fileName);
                const writeStream = fs_1.createWriteStream(poFilePath);
                const readStream = createReadStream();
                // TODO: if error writing file
                readStream.pipe(writeStream);
                const oldFile = job.poFile;
                if (oldFile && fs_1.existsSync(path_1.join(folder, oldFile))) {
                    fs_1.unlink(path_1.join(folder, oldFile), (err) => {
                        // TODO: log this
                    });
                }
                job.poFile = fileName;
            }
            const equipment = yield this.builderUtilService.findByIdsOrThrow(this.equipmentsRepository, args.equipment);
            if (job.requestDate.toISOString() !== requestDate.toISOString()) {
                isReschedule = true;
            }
            const oldJobData = {
                requestDate: new Date(job.requestDate),
                address: job.address,
                staff: job.staff.map((item) => ({
                    name: item.name,
                    email: item.email,
                })),
            };
            const updatedActivity = job.activity || [];
            updatedActivity.push({ type: 'updated', date: new Date().toISOString() });
            job = Object.assign(Object.assign({}, job), { address,
                lat,
                lng, requestDate: new Date(requestDate), equipment, reminderSent: false, staff: isReschedule ? [] : job.staff, status: isReschedule ? graphql_types_1.JobStatus.Pending : job.status, activity: updatedActivity, priority });
            yield this.jobsRepository.save(job);
            if (isReschedule) {
                const oldRequestDate = this.tzService.convertToTZ(oldJobData.requestDate);
                const newRequestDate = this.tzService.convertToTZ(job.requestDate);
                const jobInfo = `${this.tzService.convertToTZ(oldJobData.requestDate)} - ${oldJobData.address}`;
                // Send to staff
                for (const staff of oldJobData.staff) {
                    this.emailService.sendEmail(staff.email, email_1.EmailType.STAFF_JOB_RESCHEDULED, {
                        jobAddress: oldJobData.address,
                        jobInfo,
                        username: staff.name,
                        oldRequestDate,
                        newRequestDate,
                    });
                }
                // Send To builder
                const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id}?login_token=${builder.token.builderLoginToken}`;
                this.emailService.sendEmail(job.builder.email, email_1.EmailType.BUILDER_JOB_RESCHEDULED, {
                    jobAddress: oldJobData.address,
                    loginEditJobLink,
                    jobInfo,
                    oldRequestDate,
                    newRequestDate,
                    username: user.name,
                });
                if (this.config.get('ADMIN_EMAIL')) {
                    // Send To admin
                    this.emailService.sendEmail(this.config.get('ADMIN_EMAIL'), email_1.EmailType.ADMIN_JOB_RESCHEDULED, {
                        jobAddress: oldJobData.address,
                        jobInfo,
                        oldRequestDate,
                        newRequestDate,
                        username: user.name,
                    });
                }
            }
            return true;
        });
    }
    updateJobDate(ctx, args) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const requestDate = new Date(args.requestDate);
            let isReschedule = false;
            const user = ctx.getUser();
            let job = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.builder', 'builder')
                .leftJoinAndSelect('job.staff', 'staff')
                .where('job.id = :jobId', { jobId: id })
                .getOne();
            if (!job) {
                throw new exception_1.UserError('Job was not found.');
            }
            const builder = yield this.usersRepository.findOneOrFail({ id: job.builder.id }, { relations: ['token'] });
            if (job.requestDate.toISOString() !== requestDate.toISOString()) {
                isReschedule = true;
            }
            const oldJobData = {
                requestDate: new Date(job.requestDate),
                address: job.address,
                staff: job.staff.map((item) => ({
                    name: item.name,
                    email: item.email,
                })),
            };
            const updatedActivity = job.activity || [];
            updatedActivity.push({ type: 'updated', date: new Date().toISOString() });
            job = Object.assign(Object.assign({}, job), { requestDate: new Date(requestDate), reminderSent: false, staff: isReschedule ? [] : job.staff, status: isReschedule ? graphql_types_1.JobStatus.Pending : job.status, activity: updatedActivity });
            yield this.jobsRepository.save(job);
            const oldRequestDate = this.tzService.convertToTZ(oldJobData.requestDate);
            const newRequestDate = this.tzService.convertToTZ(job.requestDate);
            const jobInfo = `${this.tzService.convertToTZ(oldJobData.requestDate)} - ${oldJobData.address}`;
            // Send to staff
            for (const staff of oldJobData.staff) {
                this.emailService.sendEmail(staff.email, email_1.EmailType.STAFF_JOB_RESCHEDULED, {
                    jobAddress: oldJobData.address,
                    jobInfo,
                    username: staff.name,
                    oldRequestDate,
                    newRequestDate,
                });
            }
            // Send To builder
            if ((_a = builder.token) === null || _a === void 0 ? void 0 : _a.builderLoginToken) {
                const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id}?login_token=${builder.token.builderLoginToken}`;
                this.emailService.sendEmail(job.builder.email, email_1.EmailType.BUILDER_JOB_RESCHEDULED, {
                    jobAddress: oldJobData.address,
                    loginEditJobLink,
                    jobInfo,
                    oldRequestDate,
                    newRequestDate,
                    username: user.name,
                });
            }
            return true;
        });
    }
    assignToJob(ctx, args) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (args.staffIds && args.staffIds.length > 3) {
                throw new exception_1.UserError('Cannot assign more than 3 people.');
            }
            const action = args.staffIds.length > 0 ? 'assign' : 'unassign';
            const { jobId } = args;
            const result = yield this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.activity', 'activity')
                .leftJoinAndSelect('job.builder', 'builder')
                .leftJoinAndSelect('job.staff', 'staff')
                .where('job.id = :jobId', { jobId });
            const job = yield result.getOne();
            const staffUsers = action === 'assign'
                ? yield this.builderUtilService.findByIdsOrThrow(this.usersRepository, args.staffIds)
                : job.staff;
            const builder = yield this.usersRepository.findOne({ id: job.builder.id }, { relations: ['token'] });
            if (!builder) {
                throw new exception_1.UserError('The job has no builder.');
            }
            if (job.status === graphql_types_1.JobStatus.Cancelled) {
                throw new exception_1.UserError('Cannot assign or unassign to cancelled job.');
            }
            job.status =
                action === 'assign' ? graphql_types_1.JobStatus.Assigned : graphql_types_1.JobStatus.UnAssigned;
            job.staff = action === 'assign' ? staffUsers : [];
            if (action === 'assign')
                job.activity.push({ type: graphql_types_1.JobStatus.Assigned, date: new Date() });
            else
                job.activity.push({ type: graphql_types_1.JobStatus.UnAssigned, date: new Date() });
            console.log('job job==========', job);
            yield this.jobsRepository.save(job);
            const requestDate = this.tzService.convertToTZ(job.requestDate);
            const jobInfo = `${requestDate} - ${job.address}`;
            const jobAddress = job.address;
            const builderNotifyType = action === 'assign'
                ? email_1.EmailType.BUILDER_JOB_ASSIGNED
                : email_1.EmailType.BUILDER_JOB_UNASSIGNED;
            const stafferNotifyType = action === 'assign'
                ? email_1.EmailType.STAFF_JOB_ASSIGNED
                : email_1.EmailType.STAFF_JOB_UNASSIGNED;
            for (const user of staffUsers) {
                this.emailService.sendEmail(user.email, stafferNotifyType, {
                    jobInfo,
                    requestDate,
                    jobAddress,
                    username: user.name,
                });
            }
            if ((_a = builder.token) === null || _a === void 0 ? void 0 : _a.builderLoginToken) {
                const loginEditJobLink = `${this.config.get('LOGIN_EDIT_JOB_LINK')}${job.id}?login_token=${builder.token.builderLoginToken}`;
                this.emailService.sendEmail(job.builder.email, email_1.EmailType.BUILDER_JOB_ASSIGNED, {
                    jobInfo,
                    requestDate,
                    loginEditJobLink,
                    jobAddress,
                    username: builder.name,
                });
            }
            return true;
        });
    }
    getJobClockOffs(jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.clockOffRepository
                .createQueryBuilder('clockOff')
                .innerJoinAndSelect('clockOff.job', 'job', 'job.id = :jobId', {
                jobId,
            })
                .innerJoinAndSelect('clockOff.staff', 'staff')
                .select([
                'clockOff.id',
                'clockOff.clockOffTime',
                'clockOff.images',
                'clockOff.notes',
                'staff.name',
                'job.address',
            ])
                .getMany();
        });
    }
    getJobClockIns(jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoinAndSelect('clockIn.job', 'job', 'job.id = :jobId', {
                jobId,
            })
                .innerJoinAndSelect('clockIn.staff', 'staff')
                .select([
                'clockIn.id',
                'clockIn.clockInTime',
                'clockIn.images',
                'staff.name',
                'job.address',
            ])
                .getMany();
        });
    }
    cancelJob(ctx, jobId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = ctx.getUser();
            const job = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.builder', 'builder')
                .leftJoinAndSelect('job.staff', 'staff')
                .leftJoinAndSelect('job.activity', 'activity')
                .where('job.id = :jobId', { jobId })
                .getOne();
            if (!job) {
                throw new exception_1.UserError();
            }
            const ability = util_1.defineAbilityFor(ctx);
            if (ability.cannot(const_1.Claim.CancelAllJobs) && !this.isOwnJob(user, job)) {
                throw new exception_1.UserError();
            }
            job.status = graphql_types_1.JobStatus.Cancelled;
            job.activity.push({ type: graphql_types_1.JobStatus.Cancelled, date: new Date() });
            yield this.jobsRepository.save(job);
            const requestDate = this.tzService.convertToTZ(job.requestDate);
            const jobInfo = `${requestDate} - ${job.address}`;
            for (const staffUser of job.staff) {
                this.emailService.sendEmail(staffUser.email, email_1.EmailType.STAFF_JOB_CANCELLED, {
                    jobInfo,
                    requestDate,
                    username: staffUser.name,
                });
            }
            // Send To builder
            this.emailService.sendEmail(user.email, email_1.EmailType.BUILDER_JOB_CANCELLED, {
                jobInfo,
                requestDate,
                username: user.name,
            });
            // Send To admin
            const adminEmail = this.config.get('ADMIN_EMAIL');
            if (adminEmail) {
                this.emailService.sendEmail(adminEmail, email_1.EmailType.ADMIN_JOB_CANCELLED, {
                    jobInfo,
                    requestDate,
                    username: user.name,
                });
            }
            return true;
        });
    }
    isOwnJob(user, job) {
        return user.id === job.builder.id;
    }
};
JobService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_2.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_2.InjectRepository(entity_1.Equipment)),
    tslib_1.__param(3, typeorm_2.InjectRepository(entity_1.Activity)),
    tslib_1.__param(4, typeorm_2.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(5, typeorm_2.InjectRepository(entity_1.ClockIn)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _f : Object, typeof (_g = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _g : Object, typeof (_h = typeof builder_job_service_1.BuilderJobService !== "undefined" && builder_job_service_1.BuilderJobService) === "function" ? _h : Object, typeof (_j = typeof service_1.BuilderUtilService !== "undefined" && service_1.BuilderUtilService) === "function" ? _j : Object, typeof (_k = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _k : Object, typeof (_l = typeof service_1.TimeZoneService !== "undefined" && service_1.TimeZoneService) === "function" ? _l : Object])
], JobService);
exports.JobService = JobService;


/***/ }),

/***/ "./libs/api/job/src/lib/service/staff-job.service.ts":
/*!***********************************************************!*\
  !*** ./libs/api/job/src/lib/service/staff-job.service.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffJobService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
let StaffJobService = class StaffJobService {
    constructor(jobsRepository, usersRepository, equipmentsRepository, clockOffRepository, config, clockingCommonService) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.equipmentsRepository = equipmentsRepository;
        this.clockOffRepository = clockOffRepository;
        this.config = config;
        this.clockingCommonService = clockingCommonService;
    }
    getStaffJobs(userId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let jobs = [];
            const filter = args.filter ? args.filter : graphql_types_1.JobFilter.Upcoming;
            switch (filter) {
                case graphql_types_1.JobFilter.Upcoming: {
                    jobs = yield this.getUpcomingJobs(userId, args);
                    break;
                }
                case graphql_types_1.JobFilter.Past: {
                    jobs = yield this.getPastJobs(userId, args);
                    break;
                }
                case graphql_types_1.JobFilter.Cancelled: {
                    jobs = yield this.getCancelledJobs(userId, args);
                    break;
                }
            }
            return jobs;
        });
    }
    getUpcomingJobs(staffId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = tool_1.getTodayStart();
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.equipment', 'equipment')
                .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId })
                .where('DATE(job.requestDate) >= DATE(:now)', {
                now,
            })
                .andWhere('job.status IN (:...status)', {
                status: [graphql_types_1.JobStatus.Assigned, graphql_types_1.JobStatus.InProgress],
            });
            const todayClockOffs = yield this.clockingCommonService.getTodayClockOffs(staffId);
            if (todayClockOffs.length) {
                query.andWhere('job.id NOT IN (:...jobsWithClockOffs)', {
                    jobsWithClockOffs: todayClockOffs.map((item) => item.job.id),
                });
            }
            if (args.search &&
                typeof args.search === 'string' &&
                args.search.length > 0) {
                query.andWhere('LOWER(job.address) like :address', {
                    address: `%${args.search.toLowerCase()}%`,
                });
            }
            query
                .select([
                'job.id',
                'job.address',
                'job.lat',
                'job.lng',
                'job.status',
                'job.priority',
                'job.requestDate',
                'equipment.name',
                'equipment.id',
            ])
                .orderBy('job.requestDate', 'DESC');
            return query.getMany();
        });
    }
    getPastJobs(staffId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = tool_1.getTodayStart();
            /**
             * return jobs that
             * 1) have status cancelled AND requested in teh past
             * 2) jobs that have clock off for current user
             */
            const jobIdsWithClockOffs = yield this.clockingCommonService.getStaffClocksOff(staffId);
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.equipment', 'equipment')
                .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId });
            if (jobIdsWithClockOffs.length) {
                query
                    .where('job.id IN (:...jobIdsWithClockOffs)', {
                    jobIdsWithClockOffs: jobIdsWithClockOffs.map((item) => item.job.id),
                })
                    .orWhere('job.requestDate < :now', {
                    now,
                })
                    .andWhere('job.status != :status', { status: graphql_types_1.JobStatus.Cancelled });
            }
            else {
                query
                    .where('job.requestDate < :now', {
                    now,
                })
                    .andWhere('job.status != :status', { status: graphql_types_1.JobStatus.Cancelled });
            }
            if (args.search &&
                typeof args.search === 'string' &&
                args.search.length > 0) {
                query.andWhere('LOWER(job.address) like :address', {
                    address: `%${args.search.toLowerCase()}%`,
                });
            }
            query
                .select([
                'job.id',
                'job.address',
                'job.lat',
                'job.lng',
                'job.priority',
                'job.status',
                'job.requestDate',
                'equipment.name',
                'equipment.id',
            ])
                .orderBy('job.requestDate', 'DESC');
            return query.getMany();
        });
    }
    getCancelledJobs(staffId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .leftJoinAndSelect('job.equipment', 'equipment')
                .innerJoin('job.staff', 'staff', 'staff.id = :staffId', { staffId })
                .where('job.status = :status', { status: graphql_types_1.JobStatus.Cancelled });
            if (args.search &&
                typeof args.search === 'string' &&
                args.search.length > 0) {
                query.andWhere('LOWER(job.address) like :address', {
                    address: `%${args.search.toLowerCase()}%`,
                });
            }
            query
                .select([
                'job.id',
                'job.address',
                'job.lat',
                'job.lng',
                'job.priority',
                'job.status',
                'job.requestDate',
                'equipment.name',
                'equipment.id',
            ])
                .orderBy('job.requestDate', 'DESC');
            return query.getMany();
        });
    }
    /**
     * Returns job that current staff memeber has clocked in, but haven't clocked out yet
     * @returns Job
     */
    getTodaysAssignedJob(staffId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = tool_1.getTodayStart();
            const job = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoin('job.staff', 'staff', 'staff.id = :staffId', {
                staffId,
            })
                .innerJoin('job.clockIns', 'clockIns', 'clockIns.staff.id = :staffId', {
                staffId,
            })
                .leftJoinAndSelect('job.clockOffs', 'clockOffs', 'clockOffs.staff.id = :staffId', {
                staffId,
            })
                .where(`DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`, { now })
                .andWhere('job.status IN (:...status)', {
                status: [graphql_types_1.JobStatus.Assigned, graphql_types_1.JobStatus.InProgress],
            })
                .orderBy('job.requestDate', 'DESC')
                .limit(1)
                .getOne();
            /**
             * DO not get the equipment by doing joins in the queries above. It does not work.
             */
            if (job) {
                const equipment = yield this.jobsRepository
                    .createQueryBuilder('job')
                    .where('job.id = :jobId', { jobId: job.id })
                    .leftJoinAndSelect('job.equipment', 'equipment')
                    .select(['job.id', 'equipment.id', 'equipment.name'])
                    .getOne();
                job.equipment = equipment.equipment;
            }
            if (!job || (job.clockOffs && job.clockOffs.length)) {
                return undefined;
            }
            else {
                return job;
            }
        });
    }
};
StaffJobService = tslib_1.__decorate([
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_1.InjectRepository(entity_1.Equipment)),
    tslib_1.__param(3, typeorm_1.InjectRepository(entity_1.ClockOff)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof service_1.ClockingCommonService !== "undefined" && service_1.ClockingCommonService) === "function" ? _f : Object])
], StaffJobService);
exports.StaffJobService = StaffJobService;


/***/ }),

/***/ "./libs/api/queue/src/index.ts":
/*!*************************************!*\
  !*** ./libs/api/queue/src/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-queue.module */ "./libs/api/queue/src/lib/api-queue.module.ts"), exports);


/***/ }),

/***/ "./libs/api/queue/src/lib/api-queue.module.ts":
/*!****************************************************!*\
  !*** ./libs/api/queue/src/lib/api-queue.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiQueueModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bull_1 = __webpack_require__(/*! @nestjs/bull */ "@nestjs/bull");
let ApiQueueModule = class ApiQueueModule {
};
ApiQueueModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        providers: [],
        exports: [bull_1.BullModule],
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'image',
            }),
        ],
    })
], ApiQueueModule);
exports.ApiQueueModule = ApiQueueModule;


/***/ }),

/***/ "./libs/api/report/src/index.ts":
/*!**************************************!*\
  !*** ./libs/api/report/src/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-report.module */ "./libs/api/report/src/lib/api-report.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/service/report.service */ "./libs/api/report/src/lib/service/report.service.ts"), exports);


/***/ }),

/***/ "./libs/api/report/src/lib/api-report.module.ts":
/*!******************************************************!*\
  !*** ./libs/api/report/src/lib/api-report.module.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiReportModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const report_service_1 = __webpack_require__(/*! ./service/report.service */ "./libs/api/report/src/lib/service/report.service.ts");
let ApiReportModule = class ApiReportModule {
};
ApiReportModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.ClockIn, entity_1.ClockOff, entity_1.Job, entity_1.Equipment, entity_1.User, entity_1.Role]),
        ],
        providers: [report_service_1.ReportService],
        exports: [report_service_1.ReportService],
    })
], ApiReportModule);
exports.ApiReportModule = ApiReportModule;


/***/ }),

/***/ "./libs/api/report/src/lib/service/report.service.ts":
/*!***********************************************************!*\
  !*** ./libs/api/report/src/lib/service/report.service.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
let ReportService = class ReportService {
    constructor(usersRepository, jobsRepository, clockOffRepository, roleRepository) {
        this.usersRepository = usersRepository;
        this.jobsRepository = jobsRepository;
        this.clockOffRepository = clockOffRepository;
        this.roleRepository = roleRepository;
    }
    getTotalWorkedHours(args) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const offset = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.offset) ? args.pagination.offset : 15;
            const page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) ? args.pagination.page : 0;
            const skip = page * offset;
            let orderBy = tool_1.getOrderAndDirection(args.orderBy);
            if (!orderBy) {
                orderBy = ['user.name', 'ASC'];
            }
            const date = new Date();
            const startDate = args.startDate
                ? args.startDate
                : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const endDate = args.endDate
                ? args.endDate
                : new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
            const query = this.usersRepository
                .createQueryBuilder('user')
                .innerJoin('user.role', 'role', 'role.name IN (:...staffRoles)', {
                staffRoles: ['laborer', 'operator'],
            });
            if (args && args.search && args.search.length) {
                if (args.search && args.search.length > 0) {
                    query.where('LOWER(user.name) like :name', {
                        name: `%${args.search.toLowerCase()}%`,
                    });
                }
            }
            query
                .leftJoinAndSelect('user.clockOffs', 'clockOff', `DATE(clockOff.clockOffTime) >= DATE(:startDate) AND DATE(clockOff.clockOffTime) <= DATE(:endDate)`, {
                startDate,
                endDate,
            })
                .select([
                'user.id',
                'user.name as name',
                'user.email as email',
                'SUM(clockOff.totalTimeWorked)::INTEGER AS "totalWorkedHours"',
            ]);
            const totalClone = query.clone();
            const total = yield totalClone.getCount();
            const hasNextPage = total > (page + 1) * offset;
            const hasPreviousPage = page > 0;
            const nextPage = hasNextPage ? page + 1 : undefined;
            const previousPage = hasPreviousPage ? page - 1 : undefined;
            const r = {
                items: yield query
                    .orderBy(orderBy[0], orderBy[1], 'NULLS LAST')
                    .groupBy('user.id')
                    .offset(skip)
                    .limit(offset)
                    .getRawMany(),
                pageInfo: {
                    hasNextPage,
                    hasPreviousPage,
                    nextPage,
                    previousPage,
                },
            };
            return r;
        });
    }
    getJobsForDate(args) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const offset = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.offset) ? args.pagination.offset : 15;
            const page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) ? args.pagination.page : 0;
            const skip = page * offset;
            let orderBy = tool_1.getOrderAndDirection(args.orderBy);
            if (!orderBy) {
                orderBy = ['job.address', 'ASC'];
            }
            const date = new Date();
            const selectedDate = args.date
                ? args.date
                : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .where('DATE(job.requestDate) = DATE(:selectedDate)', { selectedDate })
                .andWhere('job.status = :jobStatus', {
                jobStatus: graphql_types_1.JobStatus.Completed,
            });
            const totalClone = query.clone();
            const total = yield totalClone.getCount();
            const hasNextPage = total > (page + 1) * offset;
            const hasPreviousPage = page > 0;
            const nextPage = hasNextPage ? page + 1 : undefined;
            const previousPage = hasPreviousPage ? page - 1 : undefined;
            if (args && args.search && args.search.length) {
                if (args.search && args.search.length > 0) {
                    query.andWhere('LOWER(job.address) like :name', {
                        name: `%${args.search.toLowerCase()}%`,
                    });
                }
            }
            const queryIds = query.offset(skip).limit(offset).select('job.id');
            const result = yield this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.staff', 'staff')
                .innerJoinAndSelect('job.equipment', 'equipment')
                .innerJoinAndSelect('job.builder', 'builder')
                .where(`job.id IN (${queryIds.getQuery()})`)
                .setParameters(queryIds.getParameters())
                .orderBy(orderBy[0], orderBy[1], 'NULLS LAST')
                .getMany();
            return {
                items: result,
                pageInfo: {
                    hasNextPage,
                    hasPreviousPage,
                    nextPage,
                    previousPage,
                },
            };
        });
    }
    getJobsForDateFullList(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let orderBy = tool_1.getOrderAndDirection(args.orderBy);
            if (!orderBy) {
                orderBy = ['job.address', 'ASC'];
            }
            const date = new Date();
            const selectedDate = args.date
                ? args.date
                : new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const query = this.jobsRepository
                .createQueryBuilder('job')
                .innerJoinAndSelect('job.staff', 'staff')
                .innerJoinAndSelect('job.equipment', 'equipment')
                .innerJoinAndSelect('job.builder', 'builder')
                .where('DATE(job.requestDate) = DATE(:selectedDate)', { selectedDate })
                .andWhere('job.status = :jobStatus', {
                jobStatus: graphql_types_1.JobStatus.Completed,
            });
            if (args && args.search && args.search.length) {
                if (args.search && args.search.length > 0) {
                    query.andWhere('LOWER(job.address) like :name', {
                        name: `%${args.search.toLowerCase()}%`,
                    });
                }
            }
            const result = (yield query.orderBy(orderBy[0], orderBy[1], 'NULLS LAST').getMany()).map((item) => {
                const equipment = item.equipment.map((item) => item.name).join(', ');
                const staff = item.staff.map((item) => item.name).join(', ');
                return Object.assign(Object.assign({}, item), { builder: item.builder.name, equipment,
                    staff, notes: '', priority: '', cost: '' });
            });
            return result;
        });
    }
};
ReportService = tslib_1.__decorate([
    tslib_1.__param(0, typeorm_2.InjectRepository(entity_1.User)),
    tslib_1.__param(1, typeorm_2.InjectRepository(entity_1.Job)),
    tslib_1.__param(2, typeorm_2.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(3, typeorm_2.InjectRepository(entity_1.Role)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _d : Object])
], ReportService);
exports.ReportService = ReportService;


/***/ }),

/***/ "./libs/api/settings/src/index.ts":
/*!****************************************!*\
  !*** ./libs/api/settings/src/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-settings.module */ "./libs/api/settings/src/lib/api-settings.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/settings.service */ "./libs/api/settings/src/lib/settings.service.ts"), exports);


/***/ }),

/***/ "./libs/api/settings/src/lib/api-settings.module.ts":
/*!**********************************************************!*\
  !*** ./libs/api/settings/src/lib/api-settings.module.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSettingsModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const settings_service_1 = __webpack_require__(/*! ./settings.service */ "./libs/api/settings/src/lib/settings.service.ts");
let ApiSettingsModule = class ApiSettingsModule {
};
ApiSettingsModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [],
        providers: [settings_service_1.SettingsService],
        exports: [settings_service_1.SettingsService],
    })
], ApiSettingsModule);
exports.ApiSettingsModule = ApiSettingsModule;


/***/ }),

/***/ "./libs/api/settings/src/lib/settings.service.ts":
/*!*******************************************************!*\
  !*** ./libs/api/settings/src/lib/settings.service.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SettingsService = class SettingsService {
    getSettings() {
        const minJobRequestDate = new Date();
        minJobRequestDate.setDate(minJobRequestDate.getDate() + 0);
        return {
            minJobRequestDate,
        };
    }
};
SettingsService = tslib_1.__decorate([
    common_1.Injectable()
], SettingsService);
exports.SettingsService = SettingsService;


/***/ }),

/***/ "./libs/api/shared/src/index.ts":
/*!**************************************!*\
  !*** ./libs/api/shared/src/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/api-shared.module */ "./libs/api/shared/src/lib/api-shared.module.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/src/lib/api-shared.module.ts":
/*!******************************************************!*\
  !*** ./libs/api/shared/src/lib/api-shared.module.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSharedModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const service_1 = __webpack_require__(/*! @dfobobcat/api/shared/service */ "./libs/api/shared/src/lib/service/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ApiSharedModule = class ApiSharedModule {
};
ApiSharedModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.ClockIn, entity_1.ClockOff, entity_1.Job, entity_1.Equipment, entity_1.User]),
            config_1.ConfigModule,
        ],
        controllers: [],
        providers: [service_1.ClockingCommonService, service_1.BuilderUtilService, service_1.TimeZoneService],
        exports: [service_1.ClockingCommonService, service_1.BuilderUtilService, service_1.TimeZoneService],
    })
], ApiSharedModule);
exports.ApiSharedModule = ApiSharedModule;


/***/ }),

/***/ "./libs/api/shared/src/lib/const/src/index.ts":
/*!****************************************************!*\
  !*** ./libs/api/shared/src/lib/const/src/index.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/claim */ "./libs/api/shared/src/lib/const/src/lib/claim.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/role-claim-map */ "./libs/api/shared/src/lib/const/src/lib/role-claim-map.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/role */ "./libs/api/shared/src/lib/const/src/lib/role.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/range */ "./libs/api/shared/src/lib/const/src/lib/range.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/src/lib/const/src/lib/claim.ts":
/*!********************************************************!*\
  !*** ./libs/api/shared/src/lib/const/src/lib/claim.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Claim = void 0;
var Claim;
(function (Claim) {
    Claim["Authenticated"] = "Authenticated";
    Claim["PublicMethod"] = "PublicMethod";
    Claim["CreateJob"] = "CreateJob";
    Claim["CancelAllJobs"] = "CancelAllJobs";
    Claim["GetAllJobs"] = "GetAllJobs";
    Claim["GetOwnJobs"] = "GetOwnJobs";
    Claim["CancelOwnJob"] = "CancelOwnJob";
    Claim["AssignToJob"] = "AssignToJob";
    Claim["CreateAdmin"] = "CreateAdmin";
    Claim["CreateBuilder"] = "CreateBuilder";
    Claim["CreateLaborer"] = "CreateLaborer";
    Claim["CreateOperator"] = "CreateOperator";
    Claim["AddClockIn"] = "AddClockIn";
    Claim["AddClockOff"] = "AddClockOff";
    Claim["AddCompany"] = "AddCompany";
    Claim["GetEquipment"] = "GetEquipment";
    Claim["GetAllStaff"] = "GetAllStaff";
    Claim["GetAllClockOffs"] = "GetAllClockOffs";
    Claim["GetAllClockIns"] = "GetAllClockIns";
    Claim["GetAllRoles"] = "GetAllRoles";
    Claim["GetAllUsers"] = "GetAllUsers";
    Claim["GetAllReports"] = "GetAllReports";
    Claim["GetCompanies"] = "GetCompanies";
    Claim["UpdateAllUsers"] = "UpdateAllUsers";
    Claim["UpdateSelf"] = "UpdateSelf";
    Claim["UpdateAllJobs"] = "UpdateAllJobs";
    Claim["UpdateOwnJob"] = "UpdateOwnJob";
    Claim["DeleteAllUsers"] = "DeleteAllUsers";
    Claim["UpdateOwnAccount"] = "UpdateOwnAccount";
})(Claim = exports.Claim || (exports.Claim = {}));


/***/ }),

/***/ "./libs/api/shared/src/lib/const/src/lib/range.ts":
/*!********************************************************!*\
  !*** ./libs/api/shared/src/lib/const/src/lib/range.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
var Range;
(function (Range) {
    Range["Day"] = "day";
    Range["Week"] = "week";
    Range["Month"] = "month";
})(Range = exports.Range || (exports.Range = {}));


/***/ }),

/***/ "./libs/api/shared/src/lib/const/src/lib/role-claim-map.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/shared/src/lib/const/src/lib/role-claim-map.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.roleClaimMap = void 0;
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const claim_1 = __webpack_require__(/*! ./claim */ "./libs/api/shared/src/lib/const/src/lib/claim.ts");
exports.roleClaimMap = {
    [graphql_types_1.RoleType.Admin]: claim_1.Claim.CreateAdmin,
    [graphql_types_1.RoleType.Builder]: claim_1.Claim.CreateBuilder,
    [graphql_types_1.RoleType.Laborer]: claim_1.Claim.CreateLaborer,
    [graphql_types_1.RoleType.Operator]: claim_1.Claim.CreateOperator,
};


/***/ }),

/***/ "./libs/api/shared/src/lib/const/src/lib/role.ts":
/*!*******************************************************!*\
  !*** ./libs/api/shared/src/lib/const/src/lib/role.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role;
(function (Role) {
    Role["Guest"] = "guest";
    Role["Builder"] = "builder";
    Role["Operator"] = "operator";
    Role["Laborer"] = "laborer";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./libs/api/shared/src/lib/exception/src/index.ts":
/*!********************************************************!*\
  !*** ./libs/api/shared/src/lib/exception/src/index.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/user-error */ "./libs/api/shared/src/lib/exception/src/lib/user-error.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/src/lib/exception/src/lib/user-error.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/shared/src/lib/exception/src/lib/user-error.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
class UserError extends apollo_server_express_1.UserInputError {
    constructor(message = 'Sorry, something went wrong! We are already working on it.') {
        super(message);
    }
}
exports.UserError = UserError;


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/index.ts":
/*!******************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/index.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/auth.service */ "./libs/api/shared/src/lib/service/src/lib/auth.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/user.service */ "./libs/api/shared/src/lib/service/src/lib/user.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/timezone.service */ "./libs/api/shared/src/lib/service/src/lib/timezone.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/clocking-common.service */ "./libs/api/shared/src/lib/service/src/lib/clocking-common.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/builder-utils.service */ "./libs/api/shared/src/lib/service/src/lib/builder-utils.service.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/lib/auth.service.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/lib/auth.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./libs/api/shared/src/lib/service/src/lib/user.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
let AuthService = class AuthService {
    constructor(userService, configService, emailService, usersRepository, tokenRepository) {
        this.userService = userService;
        this.configService = configService;
        this.emailService = emailService;
        this.usersRepository = usersRepository;
        this.tokenRepository = tokenRepository;
    }
    getAuthenticatedUser(email, plainTextPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getByEmail(email);
                yield this.verifyPassword(plainTextPassword, user.password);
                return user;
            }
            catch (error) {
                throw new exception_1.UserError(error.message);
            }
        });
    }
    logout(ctx) {
        if (ctx.getUser()) {
            ctx.logout();
        }
        return true;
    }
    verifyPassword(plainTextPassword, hashedPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isPasswordMatching = yield bcrypt.compare(plainTextPassword, hashedPassword);
            if (!isPasswordMatching) {
                throw new exception_1.UserError('Wrong credentials provided');
            }
        });
    }
    forgotPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getByEmail(email);
            const tokenString = tool_1.generateToken();
            let token = yield this.tokenRepository.findOne({ user: user });
            if (!token) {
                token = this.tokenRepository.create({
                    resetPasswordToken: tokenString,
                    resetPasswordExpires: new Date(Date.now() + 3600000).toISOString(),
                    user,
                });
                yield this.tokenRepository.save(token);
            }
            else {
                token.resetPasswordToken = tokenString;
                token.resetPasswordExpires = new Date(Date.now() + 3600000).toISOString();
                yield this.tokenRepository.save(token);
            }
            const query = new URLSearchParams({
                token: tokenString,
            }).toString();
            const url = `${this.configService.get('RESTORE_PASSWORD_URL')}?${query}`;
            this.emailService.sendEmail(email, email_1.EmailType.FORGOT_PASSWORD, {
                url,
                username: user.name,
            });
            return true;
        });
    }
    restorePassword(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield this.tokenRepository
                .createQueryBuilder('token')
                .where('token."resetPasswordToken" = :token', { token: args.token })
                .innerJoinAndSelect('token.user', 'user')
                .getOne();
            if (!token) {
                throw new exception_1.UserError('Your link does not exist. Please request password change again.');
            }
            const user = token.user;
            const isExpired = new Date().getTime() >
                new Date(token.resetPasswordExpires).getTime();
            if (isExpired) {
                throw new exception_1.UserError('Your link is expired. Please request password change again.');
            }
            token.resetPasswordExpires = null;
            token.resetPasswordToken = null;
            user.password = args.newPassword;
            yield this.usersRepository.save(user);
            return true;
        });
    }
    verifyEmail(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield this.tokenRepository
                .createQueryBuilder('token')
                .where('token.verifyEmailToken = :token', { token: args.token })
                .innerJoinAndSelect('token.user', 'user')
                .getOne();
            if (!token) {
                throw new exception_1.UserError('Your link is not valid. Please concact administrator.');
            }
            const user = token.user;
            if (user.emailVerified) {
                throw new exception_1.UserError('This email is already verified');
            }
            const isExpired = new Date().getTime() >
                new Date(token.verifyEmailExpires).getTime();
            if (isExpired) {
                throw new exception_1.UserError('Your link is expired. Please contact administrator.');
            }
            token.verifyEmailExpires = null;
            token.verifyEmailToken = null;
            user.emailVerified = true;
            yield this.usersRepository.save(user);
            const url = `${this.configService.get('LOGIN_AUTH_LINK')}`;
            this.emailService.sendEmail(user.email, email_1.EmailType['BUILDER_SIGNUP'], {
                username: user.name,
                email: user.email,
                password: user.password,
                url: url,
            });
            return true;
        });
    }
    tokenLogin(ctx, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.tokenRepository
                .createQueryBuilder('token')
                .innerJoinAndSelect('token.user', 'user')
                .innerJoinAndSelect('user.role', 'role')
                .where('token."builderLoginToken" = :token', { token })
                .getOne();
            if (!tokenData) {
                throw new exception_1.UserError('Invalid token.');
            }
            const user = tokenData.user;
            const addedDataToUser = Object.assign(Object.assign({}, user), { getRole() {
                    return this.role.name;
                },
                hasRole(role) {
                    return this.role.name === role;
                } });
            ctx.login(addedDataToUser);
            return user;
        });
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(3, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__param(4, typeorm_1.InjectRepository(entity_1.Token)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/lib/builder-utils.service.ts":
/*!**************************************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/lib/builder-utils.service.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderUtilService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
class BuilderUtilService {
    constructor() { }
    findByIdsOrThrow(repo, ids, message = 'Invalid input error.') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const items = yield repo.findByIds(ids);
            if (items.length !== ids.length) {
                throw new exception_1.UserError(message);
            }
            return items;
        });
    }
    findIdOrThrow(repo, id, message = 'Invalid input error.') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = yield repo.findOne(id);
            if (!item) {
                throw new exception_1.UserError(message);
            }
            return item;
        });
    }
}
exports.BuilderUtilService = BuilderUtilService;


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/lib/clocking-common.service.ts":
/*!****************************************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/lib/clocking-common.service.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockingCommonService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
let ClockingCommonService = class ClockingCommonService {
    constructor(jobsRepository, usersRepository, equipmentsRepository, clockOffRepository, clockInRepository, config) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
        this.equipmentsRepository = equipmentsRepository;
        this.clockOffRepository = clockOffRepository;
        this.clockInRepository = clockInRepository;
        this.config = config;
    }
    /**
     * get all clocks off of a staff person
     */
    getStaffClocksOff(staffId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.clockOffRepository
                .createQueryBuilder('clockOff')
                .innerJoinAndSelect('clockOff.job', 'job')
                .innerJoinAndSelect('clockOff.staff', 'staff', 'staff.id = :staffId', {
                staffId: staffId,
            })
                .select(['clockOff.id', 'job.id'])
                .getMany();
        });
    }
    /**
     * get all clocks off of a staff person for today
     */
    getTodayClockOffs(staffId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = tool_1.getTodayStart();
            return this.clockOffRepository
                .createQueryBuilder('clockOff')
                .innerJoinAndSelect('clockOff.job', 'job')
                .innerJoinAndSelect('clockOff.staff', 'staff', 'staff.id = :staffId', {
                staffId: staffId,
            })
                .where(`DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`, { now })
                .select(['clockOff.id', 'job.id'])
                .getMany();
        });
    }
    /**
     * get all clock ins of a staff person for today
     */
    getTodayClockIns(staffId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = tool_1.getTodayStart();
            return this.clockInRepository
                .createQueryBuilder('clockIn')
                .innerJoinAndSelect('clockIn.job', 'job')
                .innerJoin('clockIn.staff', 'staff', 'staff.id = :staffId', {
                staffId,
            })
                .where(`DATE(job.requestDate) >= DATE(:now) AND DATE(job.requestDate) < DATE(:now) + INTERVAL '1 DAY'`, { now })
                .select(['clockIn.id', 'job.id'])
                .getMany();
        });
    }
};
ClockingCommonService = tslib_1.__decorate([
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.Job)),
    tslib_1.__param(1, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__param(2, typeorm_1.InjectRepository(entity_1.Equipment)),
    tslib_1.__param(3, typeorm_1.InjectRepository(entity_1.ClockOff)),
    tslib_1.__param(4, typeorm_1.InjectRepository(entity_1.ClockIn)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _f : Object])
], ClockingCommonService);
exports.ClockingCommonService = ClockingCommonService;


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/lib/timezone.service.ts":
/*!*********************************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/lib/timezone.service.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZoneService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let TimeZoneService = class TimeZoneService {
    constructor(config) {
        this.config = config;
        this.timezone = this.config.get('APP_TIMEZONE') || 'Australia/Melbourne';
        this.locale = this.config.get('APP_LOCALE_CODE') || 'Australia/Melbourne';
    }
    convertToTZ(date, displayTime = false) {
        let options = {};
        if (displayTime) {
            options = {
                timeZone: 'Australia/Melbourne',
                year: 'numeric',
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };
        }
        else {
            options = {
                timeZone: 'Australia/Melbourne',
                year: 'numeric',
                day: '2-digit',
                month: '2-digit',
            };
        }
        const formatter = new Intl.DateTimeFormat(this.locale, options);
        const formartedDate = formatter.format(date);
        return `${formartedDate.split('/')[1]}/${formartedDate.split('/')[0]}/${formartedDate.split('/')[2]}`;
    }
};
TimeZoneService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], TimeZoneService);
exports.TimeZoneService = TimeZoneService;


/***/ }),

/***/ "./libs/api/shared/src/lib/service/src/lib/user.service.ts":
/*!*****************************************************************!*\
  !*** ./libs/api/shared/src/lib/service/src/lib/user.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entity_1 = __webpack_require__(/*! @dfobobcat/api/entity */ "./libs/api/core/src/lib/entity/src/index.ts");
const graphql_types_1 = __webpack_require__(/*! @dfobobcat/graphql-types */ "./libs/graphql/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
const tool_1 = __webpack_require__(/*! @dfobobcat/api/shared/tool */ "./libs/api/shared/src/lib/tool/src/index.ts");
const email_1 = __webpack_require__(/*! @dfobobcat/api/email */ "./libs/api/email/src/index.ts");
const company_1 = __webpack_require__(/*! @dfobobcat/api/feature/company */ "./libs/api/company/src/index.ts");
let UserService = class UserService {
    constructor(usersRepository, roleRepository, tokenRepository, companyRepository, configService, emailService, companyService) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.tokenRepository = tokenRepository;
        this.companyRepository = companyRepository;
        this.configService = configService;
        this.emailService = emailService;
        this.companyService = companyService;
    }
    getByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ email });
            if (user) {
                return user;
            }
            throw new exception_1.UserError('User with this email does not exist');
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ id });
            if (user) {
                return user;
            }
            throw new exception_1.UserError('User does not exist');
        });
    }
    sendEmailVerify(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenString = tool_1.generateToken();
            let token = yield this.tokenRepository.findOne({ user: user });
            const expires = new Date(Date.now() + Number(this.configService.get('VERIFY_EMAIL_TOKEN_EXPIRE'))).toISOString();
            const tokenData = {
                verifyEmailToken: tokenString,
                verifyEmailExpires: expires,
            };
            if (!token) {
                token = yield this.tokenRepository.create(Object.assign(Object.assign({}, tokenData), { user }));
                yield this.tokenRepository.save(token);
            }
            else {
                yield this.tokenRepository.save(Object.assign(Object.assign({}, token), tokenData));
            }
            const query = new URLSearchParams({
                token: tokenString,
            }).toString();
            const url = `${this.configService.get('VERIFY_EMAIL_URL')}?${query}`;
            this.emailService.sendEmail(user.email, email_1.EmailType.VERIFY_EMAIL, {
                username: user.name,
                url,
            });
        });
    }
    create(ctx, userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ email: userData.email });
            if (user) {
                throw new exception_1.UserError('User with such email already exists.');
            }
            const { roleId, company: companyName } = userData, userFromData = tslib_1.__rest(userData, ["roleId", "company"]);
            let company = null;
            if (companyName) {
                company = yield this.companyRepository.findOne({ name: companyName });
                if (!company) {
                    company = yield this.companyService.addCompany({
                        name: companyName,
                    });
                }
            }
            const foundRole = yield this.roleRepository.findOneOrFail({
                id: roleId,
            });
            const newUser = yield this.usersRepository.create(Object.assign(Object.assign({}, userFromData), { company: company, emailVerified: true }));
            newUser.role = foundRole;
            yield this.usersRepository.save(newUser);
            const url = `${this.configService.get('LOGIN_AUTH_LINK')}`;
            if (newUser.role.name === graphql_types_1.RoleType.Builder) {
                this.emailService.sendEmail(newUser.email, email_1.EmailType['BUILDER_SIGNUP'], {
                    username: newUser.name,
                    email: newUser.email,
                    password: userData.password,
                    url: url,
                });
                const loginToken = tool_1.generateToken();
                const expires = new Date(Date.now() + Number(this.configService.get('LOGIN_TOKEN_EXPIRE'))).toISOString();
                const token = yield this.tokenRepository.create({
                    user: newUser,
                    builderLoginToken: loginToken,
                    builderLoginExpire: expires,
                });
                yield this.tokenRepository.save(token);
            }
            if ([graphql_types_1.RoleType.Laborer, graphql_types_1.RoleType.Operator].includes(newUser.role.name)) {
                this.emailService.sendEmail(newUser.email, email_1.EmailType['BUILDER_SIGNUP'], {
                    username: newUser.name,
                    email: newUser.email,
                    password: userData.password,
                    url: url,
                });
            }
            return true;
        });
    }
    createBuilder(ctx, userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { company: companyName } = userData, userFromData = tslib_1.__rest(userData, ["company"]);
            let company = null;
            if (companyName) {
                company = yield this.companyRepository.findOne({ name: companyName });
                if (!company) {
                    company = yield this.companyService.addCompany({
                        name: companyName,
                    });
                }
            }
            const user = yield this.usersRepository.findOne({ email: userData.email });
            if (user) {
                throw new exception_1.UserError('User with such email already exists.');
            }
            const foundRole = yield this.roleRepository.findOneOrFail({
                name: graphql_types_1.RoleType.Builder,
            });
            const newUser = yield this.usersRepository.create(Object.assign(Object.assign({}, userFromData), { company }));
            newUser.role = foundRole;
            yield this.usersRepository.save(newUser);
            const loginToken = tool_1.generateToken();
            const expires = new Date(Date.now() + Number(this.configService.get('LOGIN_TOKEN_EXPIRE'))).toISOString();
            const token = yield this.tokenRepository.create({
                user: newUser,
                builderLoginToken: loginToken,
                builderLoginExpire: expires,
            });
            yield this.tokenRepository.save(token);
            yield this.sendEmailVerify(newUser);
            return true;
        });
    }
    updateUserAccount(userId, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOneOrFail({ id: userId }, { relations: ['role'] });
            Object.assign(user, args);
            yield this.usersRepository.save(user);
            return user;
        });
    }
};
UserService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__param(1, typeorm_1.InjectRepository(entity_1.Role)),
    tslib_1.__param(2, typeorm_1.InjectRepository(entity_1.Token)),
    tslib_1.__param(3, typeorm_1.InjectRepository(entity_1.Company)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object, typeof (_f = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _f : Object, typeof (_g = typeof company_1.CompanyService !== "undefined" && company_1.CompanyService) === "function" ? _g : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/index.ts":
/*!***************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/index.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/randomString */ "./libs/api/shared/src/lib/tool/src/lib/randomString.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/generateToken */ "./libs/api/shared/src/lib/tool/src/lib/generateToken.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/getTodayStart */ "./libs/api/shared/src/lib/tool/src/lib/getTodayStart.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/getOrderAndDirection */ "./libs/api/shared/src/lib/tool/src/lib/getOrderAndDirection.ts"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./lib/builder-util */ "./libs/api/shared/src/lib/tool/src/lib/builder-util.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/lib/builder-util.ts":
/*!**************************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/lib/builder-util.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.findIdOrThrow = exports.findByIdsOrThrow = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const exception_1 = __webpack_require__(/*! @dfobobcat/api/shared/exception */ "./libs/api/shared/src/lib/exception/src/index.ts");
function findByIdsOrThrow(repo, ids, message = 'Invalid input error.') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const items = yield repo.findByIds(ids);
        if (items.length !== ids.length) {
            throw new exception_1.UserError(message);
        }
        return items;
    });
}
exports.findByIdsOrThrow = findByIdsOrThrow;
function findIdOrThrow(repo, id, message = 'Invalid input error.') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const item = yield repo.findOne(id);
        if (!item) {
            throw new exception_1.UserError(message);
        }
        return item;
    });
}
exports.findIdOrThrow = findIdOrThrow;


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/lib/generateToken.ts":
/*!***************************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/lib/generateToken.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const generateToken = () => crypto_1.randomBytes(20).toString('hex');
exports.generateToken = generateToken;


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/lib/getOrderAndDirection.ts":
/*!**********************************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/lib/getOrderAndDirection.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAndDirection = void 0;
function getOrderAndDirection(orderBy) {
    if (!orderBy || !orderBy.length) {
        return undefined;
    }
    let direction;
    let order;
    if (orderBy[0] == '-' || orderBy[0] == '+') {
        direction = orderBy[0];
        order = orderBy.slice(1);
        return [`${order}`, direction === '-' ? 'DESC' : 'ASC'];
    }
    return undefined;
}
exports.getOrderAndDirection = getOrderAndDirection;


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/lib/getTodayStart.ts":
/*!***************************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/lib/getTodayStart.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayStart = void 0;
/**
 * get 00:00 of today in ISO format
 */
function getTodayStart() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const tzoffset = -660 * 60000;
    return new Date(date - tzoffset).toISOString();
}
exports.getTodayStart = getTodayStart;


/***/ }),

/***/ "./libs/api/shared/src/lib/tool/src/lib/randomString.ts":
/*!**************************************************************!*\
  !*** ./libs/api/shared/src/lib/tool/src/lib/randomString.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomString = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const getRandomString = () => crypto_1.randomBytes(20).toString('hex');
exports.getRandomString = getRandomString;


/***/ }),

/***/ "./libs/graphql/src/index.ts":
/*!***********************************!*\
  !*** ./libs/graphql/src/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
tslib_1.__exportStar(__webpack_require__(/*! ./lib/graphql */ "./libs/graphql/src/lib/graphql.ts"), exports);


/***/ }),

/***/ "./libs/graphql/src/lib/graphql.ts":
/*!*****************************************!*\
  !*** ./libs/graphql/src/lib/graphql.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyJobRequestsGQL = exports.MyJobRequestsDocument = exports.JobLocationGQL = exports.JobLocationDocument = exports.ClockInsGQL = exports.ClockInsDocument = exports.ClockOffsGQL = exports.ClockOffsDocument = exports.JobGQL = exports.JobDocument = exports.MeGQL = exports.MeDocument = exports.HasClockedIntoJobGQL = exports.HasClockedIntoJobDocument = exports.DeleteUserGQL = exports.DeleteUserDocument = exports.UpdateUserGQL = exports.UpdateUserDocument = exports.LogoutGQL = exports.LogoutDocument = exports.AssignToJobGQL = exports.AssignToJobDocument = exports.CancelJobGQL = exports.CancelJobDocument = exports.UpdateJobGQL = exports.UpdateJobDocument = exports.UpdateJobDateGQL = exports.UpdateJobDateDocument = exports.CreateJobGQL = exports.CreateJobDocument = exports.AddClockOffGQL = exports.AddClockOffDocument = exports.AddClockInGQL = exports.AddClockInDocument = exports.TokenLoginGQL = exports.TokenLoginDocument = exports.LoginGQL = exports.LoginDocument = exports.RestorePasswordGQL = exports.RestorePasswordDocument = exports.RegisterGQL = exports.RegisterDocument = exports.ForgotPasswordGQL = exports.ForgotPasswordDocument = exports.RegisterBuilderGQL = exports.RegisterBuilderDocument = exports.JobFragmentFragmentDoc = exports.RoleType = exports.JobStatus = exports.JobFilter = void 0;
exports.ApolloAngularSDK = exports.UpdateMyAccountGQL = exports.UpdateMyAccountDocument = exports.SettingsGQL = exports.SettingsDocument = exports.VerifyEmailGQL = exports.VerifyEmailDocument = exports.UserGQL = exports.UserDocument = exports.StaffRolesGQL = exports.StaffRolesDocument = exports.JobsForDateFullListGQL = exports.JobsForDateFullListDocument = exports.JobsForDateGQL = exports.JobsForDateDocument = exports.TotalWorkedHoursGQL = exports.TotalWorkedHoursDocument = exports.UsersGQL = exports.UsersDocument = exports.JobsGQL = exports.JobsDocument = exports.CompaniesGQL = exports.CompaniesDocument = exports.EquipmentGQL = exports.EquipmentDocument = exports.TodaysAssignedJobGQL = exports.TodaysAssignedJobDocument = exports.MyAssignedJobsGQL = exports.MyAssignedJobsDocument = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const apollo_angular_1 = __webpack_require__(/*! apollo-angular */ "apollo-angular");
const core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
const Apollo = __webpack_require__(/*! apollo-angular */ "apollo-angular");
var JobFilter;
(function (JobFilter) {
    JobFilter["Cancelled"] = "cancelled";
    JobFilter["Past"] = "past";
    JobFilter["Upcoming"] = "upcoming";
})(JobFilter = exports.JobFilter || (exports.JobFilter = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["Assigned"] = "assigned";
    JobStatus["UnAssigned"] = "unAssigned";
    JobStatus["Cancelled"] = "cancelled";
    JobStatus["Completed"] = "completed";
    JobStatus["InProgress"] = "inProgress";
    JobStatus["Pending"] = "pending";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
var RoleType;
(function (RoleType) {
    RoleType["Admin"] = "admin";
    RoleType["Builder"] = "builder";
    RoleType["Laborer"] = "laborer";
    RoleType["Operator"] = "operator";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
exports.JobFragmentFragmentDoc = apollo_angular_1.gql `
  fragment JobFragment on Job {
    id
    address
    lat
    lng
    status
    requestDate
    poFile
    notes
    priority
    equipment {
      id
      name
    }
  }
`;
exports.RegisterBuilderDocument = apollo_angular_1.gql `
  mutation RegisterBuilder($input: RegisterBuilderInput!) {
    registerBuilder(input: $input) {
      success
    }
  }
`;
let RegisterBuilderGQL = class RegisterBuilderGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RegisterBuilderDocument;
    }
};
RegisterBuilderGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _a : Object])
], RegisterBuilderGQL);
exports.RegisterBuilderGQL = RegisterBuilderGQL;
exports.ForgotPasswordDocument = apollo_angular_1.gql `
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;
let ForgotPasswordGQL = class ForgotPasswordGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ForgotPasswordDocument;
    }
};
ForgotPasswordGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _b : Object])
], ForgotPasswordGQL);
exports.ForgotPasswordGQL = ForgotPasswordGQL;
exports.RegisterDocument = apollo_angular_1.gql `
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      success
    }
  }
`;
let RegisterGQL = class RegisterGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RegisterDocument;
    }
};
RegisterGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _c : Object])
], RegisterGQL);
exports.RegisterGQL = RegisterGQL;
exports.RestorePasswordDocument = apollo_angular_1.gql `
  mutation RestorePassword($newPassword: String!, $token: String!) {
    restorePassword(newPassword: $newPassword, token: $token) {
      success
    }
  }
`;
let RestorePasswordGQL = class RestorePasswordGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.RestorePasswordDocument;
    }
};
RestorePasswordGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _d : Object])
], RestorePasswordGQL);
exports.RestorePasswordGQL = RestorePasswordGQL;
exports.LoginDocument = apollo_angular_1.gql `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      role {
        name
      }
      email
      name
    }
  }
`;
let LoginGQL = class LoginGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.LoginDocument;
    }
};
LoginGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _e : Object])
], LoginGQL);
exports.LoginGQL = LoginGQL;
exports.TokenLoginDocument = apollo_angular_1.gql `
  mutation TokenLogin($token: String!) {
    tokenLogin(token: $token) {
      role {
        name
      }
      email
      name
    }
  }
`;
let TokenLoginGQL = class TokenLoginGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TokenLoginDocument;
    }
};
TokenLoginGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _f : Object])
], TokenLoginGQL);
exports.TokenLoginGQL = TokenLoginGQL;
exports.AddClockInDocument = apollo_angular_1.gql `
  mutation AddClockIn($input: AddClockInInput!) {
    addClockIn(input: $input) {
      id
      equipment {
        id
        name
      }
      address
    }
  }
`;
let AddClockInGQL = class AddClockInGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AddClockInDocument;
    }
};
AddClockInGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _g : Object])
], AddClockInGQL);
exports.AddClockInGQL = AddClockInGQL;
exports.AddClockOffDocument = apollo_angular_1.gql `
  mutation AddClockOff($input: AddClockOffInput!) {
    addClockOff(input: $input) {
      success
    }
  }
`;
let AddClockOffGQL = class AddClockOffGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AddClockOffDocument;
    }
};
AddClockOffGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _h : Object])
], AddClockOffGQL);
exports.AddClockOffGQL = AddClockOffGQL;
exports.CreateJobDocument = apollo_angular_1.gql `
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      success
    }
  }
`;
let CreateJobGQL = class CreateJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CreateJobDocument;
    }
};
CreateJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _j : Object])
], CreateJobGQL);
exports.CreateJobGQL = CreateJobGQL;
exports.UpdateJobDateDocument = apollo_angular_1.gql `
  mutation UpdateJobDate($input: UpdateJobDateInput!) {
    updateJobDate(input: $input) {
      success
    }
  }
`;
let UpdateJobDateGQL = class UpdateJobDateGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateJobDateDocument;
    }
};
UpdateJobDateGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _k : Object])
], UpdateJobDateGQL);
exports.UpdateJobDateGQL = UpdateJobDateGQL;
exports.UpdateJobDocument = apollo_angular_1.gql `
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(input: $input) {
      success
    }
  }
`;
let UpdateJobGQL = class UpdateJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateJobDocument;
    }
};
UpdateJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _l : Object])
], UpdateJobGQL);
exports.UpdateJobGQL = UpdateJobGQL;
exports.CancelJobDocument = apollo_angular_1.gql `
  mutation CancelJob($input: Float!) {
    cancelJob(jobId: $input) {
      success
    }
  }
`;
let CancelJobGQL = class CancelJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CancelJobDocument;
    }
};
CancelJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _m : Object])
], CancelJobGQL);
exports.CancelJobGQL = CancelJobGQL;
exports.AssignToJobDocument = apollo_angular_1.gql `
  mutation AssignToJob($input: AssignToJobInput!) {
    assignToJob(input: $input) {
      success
    }
  }
`;
let AssignToJobGQL = class AssignToJobGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.AssignToJobDocument;
    }
};
AssignToJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _o : Object])
], AssignToJobGQL);
exports.AssignToJobGQL = AssignToJobGQL;
exports.LogoutDocument = apollo_angular_1.gql `
  mutation Logout {
    logout {
      success
    }
  }
`;
let LogoutGQL = class LogoutGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.LogoutDocument;
    }
};
LogoutGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _p : Object])
], LogoutGQL);
exports.LogoutGQL = LogoutGQL;
exports.UpdateUserDocument = apollo_angular_1.gql `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
    }
  }
`;
let UpdateUserGQL = class UpdateUserGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateUserDocument;
    }
};
UpdateUserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _q : Object])
], UpdateUserGQL);
exports.UpdateUserGQL = UpdateUserGQL;
exports.DeleteUserDocument = apollo_angular_1.gql `
  mutation DeleteUser($input: Float!) {
    deleteUser(userId: $input) {
      success
    }
  }
`;
let DeleteUserGQL = class DeleteUserGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.DeleteUserDocument;
    }
};
DeleteUserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _r : Object])
], DeleteUserGQL);
exports.DeleteUserGQL = DeleteUserGQL;
exports.HasClockedIntoJobDocument = apollo_angular_1.gql `
  query HasClockedIntoJob($id: Float!) {
    me {
      ... on Staff {
        hasClockedIntoJob(id: $id)
      }
    }
  }
`;
let HasClockedIntoJobGQL = class HasClockedIntoJobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.HasClockedIntoJobDocument;
    }
};
HasClockedIntoJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _s : Object])
], HasClockedIntoJobGQL);
exports.HasClockedIntoJobGQL = HasClockedIntoJobGQL;
exports.MeDocument = apollo_angular_1.gql `
  query Me($status: JobStatus, $filter: JobFilter) {
    me {
      id
      name
      email
      role {
        name
      }
      ... on Builder {
        jobRequests(status: $status) {
          ...JobFragment
        }
      }
      ... on Staff {
        assignedJobs(filter: $filter) {
          ...JobFragment
        }
      }
    }
  }
  ${exports.JobFragmentFragmentDoc}
`;
let MeGQL = class MeGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MeDocument;
    }
};
MeGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _t : Object])
], MeGQL);
exports.MeGQL = MeGQL;
exports.JobDocument = apollo_angular_1.gql `
  query Job($id: Float!) {
    job(id: $id) {
      ...JobFragment
    }
  }
  ${exports.JobFragmentFragmentDoc}
`;
let JobGQL = class JobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobDocument;
    }
};
JobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_u = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _u : Object])
], JobGQL);
exports.JobGQL = JobGQL;
exports.ClockOffsDocument = apollo_angular_1.gql `
  query ClockOffs($id: Float!) {
    job(id: $id) {
      clockOffs {
        id
        clockOffTime
        notes
        staff {
          name
        }
        images
      }
    }
  }
`;
let ClockOffsGQL = class ClockOffsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ClockOffsDocument;
    }
};
ClockOffsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_v = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _v : Object])
], ClockOffsGQL);
exports.ClockOffsGQL = ClockOffsGQL;
exports.ClockInsDocument = apollo_angular_1.gql `
  query ClockIns($id: Float!) {
    job(id: $id) {
      clockIns {
        id
        clockInTime
        staff {
          name
        }
        images
      }
    }
  }
`;
let ClockInsGQL = class ClockInsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.ClockInsDocument;
    }
};
ClockInsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_w = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _w : Object])
], ClockInsGQL);
exports.ClockInsGQL = ClockInsGQL;
exports.JobLocationDocument = apollo_angular_1.gql `
  query JobLocation($id: Float!) {
    job(id: $id) {
      address
      lat
      lng
    }
  }
`;
let JobLocationGQL = class JobLocationGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobLocationDocument;
    }
};
JobLocationGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_x = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _x : Object])
], JobLocationGQL);
exports.JobLocationGQL = JobLocationGQL;
exports.MyJobRequestsDocument = apollo_angular_1.gql `
  query MyJobRequests($status: JobStatus, $search: String) {
    me {
      ... on Builder {
        jobRequests(status: $status, search: $search) {
          ...JobFragment
        }
      }
    }
  }
  ${exports.JobFragmentFragmentDoc}
`;
let MyJobRequestsGQL = class MyJobRequestsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MyJobRequestsDocument;
    }
};
MyJobRequestsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_y = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _y : Object])
], MyJobRequestsGQL);
exports.MyJobRequestsGQL = MyJobRequestsGQL;
exports.MyAssignedJobsDocument = apollo_angular_1.gql `
  query MyAssignedJobs($filter: JobFilter, $search: String) {
    me {
      ... on Staff {
        assignedJobs(filter: $filter, search: $search) {
          id
          address
          lat
          lng
          status
          requestDate
          priority
          equipment {
            id
            name
          }
        }
      }
    }
  }
`;
let MyAssignedJobsGQL = class MyAssignedJobsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.MyAssignedJobsDocument;
    }
};
MyAssignedJobsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_z = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _z : Object])
], MyAssignedJobsGQL);
exports.MyAssignedJobsGQL = MyAssignedJobsGQL;
exports.TodaysAssignedJobDocument = apollo_angular_1.gql `
  query TodaysAssignedJob {
    me {
      ... on Staff {
        todaysAssignedJob {
          id
          address
          lat
          lng
          status
          requestDate
          priority
          equipment {
            id
            name
          }
        }
      }
    }
  }
`;
let TodaysAssignedJobGQL = class TodaysAssignedJobGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TodaysAssignedJobDocument;
    }
};
TodaysAssignedJobGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_0 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _0 : Object])
], TodaysAssignedJobGQL);
exports.TodaysAssignedJobGQL = TodaysAssignedJobGQL;
exports.EquipmentDocument = apollo_angular_1.gql `
  query Equipment {
    equipment {
      id
      name
    }
  }
`;
let EquipmentGQL = class EquipmentGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.EquipmentDocument;
    }
};
EquipmentGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_1 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _1 : Object])
], EquipmentGQL);
exports.EquipmentGQL = EquipmentGQL;
exports.CompaniesDocument = apollo_angular_1.gql `
  query Companies {
    companies {
      name
      id
    }
  }
`;
let CompaniesGQL = class CompaniesGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.CompaniesDocument;
    }
};
CompaniesGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_2 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _2 : Object])
], CompaniesGQL);
exports.CompaniesGQL = CompaniesGQL;
exports.JobsDocument = apollo_angular_1.gql `
  query Jobs(
    $status: [JobStatus]
    $search: String
    $pagination: PaginationArgs
    $staff: [Int!]
    $filteredDate: filteredDateArgs
    $orderBy: String
  ) {
    jobs(
      status: $status
      search: $search
      pagination: $pagination
      filteredDate: $filteredDate
      staff: $staff
      orderBy: $orderBy
    ) {
      pageInfo {
        nextPage
        previousPage
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        address
        lat
        lng
        status
        requestDate
        priority
        notes
        builder {
          name
        }
        activity {
          type
          date
        }
        equipment {
          id
          name
        }
      }
    }
  }
`;
let JobsGQL = class JobsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsDocument;
    }
};
JobsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_3 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _3 : Object])
], JobsGQL);
exports.JobsGQL = JobsGQL;
exports.UsersDocument = apollo_angular_1.gql `
  query Users(
    $role: String
    $search: String
    $paginate: Boolean
    $pagination: PaginationArgs
    $orderBy: String
  ) {
    users(
      role: $role
      search: $search
      paginate: $paginate
      pagination: $pagination
      orderBy: $orderBy
    ) {
      items {
        id
        name
        email
        role {
          id
          name
        }
        company {
          name
        }
      }
      pageInfo {
        nextPage
        previousPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
let UsersGQL = class UsersGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UsersDocument;
    }
};
UsersGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_4 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _4 : Object])
], UsersGQL);
exports.UsersGQL = UsersGQL;
exports.TotalWorkedHoursDocument = apollo_angular_1.gql `
  query TotalWorkedHours(
    $startDate: String
    $endDate: String
    $search: String
    $pagination: PaginationArgs
    $orderBy: String
  ) {
    report {
      totalWorkedHours(
        startDate: $startDate
        endDate: $endDate
        search: $search
        pagination: $pagination
        orderBy: $orderBy
      ) {
        pageInfo {
          nextPage
          previousPage
          hasNextPage
          hasPreviousPage
        }
        items {
          name
          email
          totalWorkedHours
        }
      }
    }
  }
`;
let TotalWorkedHoursGQL = class TotalWorkedHoursGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.TotalWorkedHoursDocument;
    }
};
TotalWorkedHoursGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_5 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _5 : Object])
], TotalWorkedHoursGQL);
exports.TotalWorkedHoursGQL = TotalWorkedHoursGQL;
exports.JobsForDateDocument = apollo_angular_1.gql `
  query JobsForDate(
    $date: String!
    $search: String
    $pagination: PaginationArgs
    $orderBy: String
  ) {
    report {
      jobsForDate(
        date: $date
        search: $search
        pagination: $pagination
        orderBy: $orderBy
      ) {
        pageInfo {
          nextPage
          previousPage
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          staff {
            name
          }
          builder {
            name
          }
          address
          equipment {
            name
          }
        }
      }
    }
  }
`;
let JobsForDateGQL = class JobsForDateGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsForDateDocument;
    }
};
JobsForDateGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_6 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _6 : Object])
], JobsForDateGQL);
exports.JobsForDateGQL = JobsForDateGQL;
exports.JobsForDateFullListDocument = apollo_angular_1.gql `
  query JobsForDateFullList($date: String!, $search: String, $orderBy: String) {
    report {
      jobsForDateFullList(date: $date, search: $search, orderBy: $orderBy) {
        id
        staff
        builder
        address
        equipment
      }
    }
  }
`;
let JobsForDateFullListGQL = class JobsForDateFullListGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.JobsForDateFullListDocument;
    }
};
JobsForDateFullListGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_7 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _7 : Object])
], JobsForDateFullListGQL);
exports.JobsForDateFullListGQL = JobsForDateFullListGQL;
exports.StaffRolesDocument = apollo_angular_1.gql `
  query StaffRoles {
    staffRoles {
      id
      name
    }
  }
`;
let StaffRolesGQL = class StaffRolesGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.StaffRolesDocument;
    }
};
StaffRolesGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_8 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _8 : Object])
], StaffRolesGQL);
exports.StaffRolesGQL = StaffRolesGQL;
exports.UserDocument = apollo_angular_1.gql `
  query User($id: Float!) {
    user(id: $id) {
      name
      email
      company {
        name
      }
      role {
        id
        name
      }
    }
  }
`;
let UserGQL = class UserGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UserDocument;
    }
};
UserGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_9 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _9 : Object])
], UserGQL);
exports.UserGQL = UserGQL;
exports.VerifyEmailDocument = apollo_angular_1.gql `
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
    }
  }
`;
let VerifyEmailGQL = class VerifyEmailGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.VerifyEmailDocument;
    }
};
VerifyEmailGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_10 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _10 : Object])
], VerifyEmailGQL);
exports.VerifyEmailGQL = VerifyEmailGQL;
exports.SettingsDocument = apollo_angular_1.gql `
  query Settings {
    settings {
      minJobRequestDate
    }
  }
`;
let SettingsGQL = class SettingsGQL extends Apollo.Query {
    constructor(apollo) {
        super(apollo);
        this.document = exports.SettingsDocument;
    }
};
SettingsGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_11 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _11 : Object])
], SettingsGQL);
exports.SettingsGQL = SettingsGQL;
exports.UpdateMyAccountDocument = apollo_angular_1.gql `
  mutation UpdateMyAccount($name: String!, $email: String!, $password: String) {
    updateMyAccount(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;
let UpdateMyAccountGQL = class UpdateMyAccountGQL extends Apollo.Mutation {
    constructor(apollo) {
        super(apollo);
        this.document = exports.UpdateMyAccountDocument;
    }
};
UpdateMyAccountGQL = tslib_1.__decorate([
    core_1.Injectable({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_12 = typeof Apollo !== "undefined" && Apollo.Apollo) === "function" ? _12 : Object])
], UpdateMyAccountGQL);
exports.UpdateMyAccountGQL = UpdateMyAccountGQL;
let ApolloAngularSDK = class ApolloAngularSDK {
    constructor(registerBuilderGql, forgotPasswordGql, registerGql, restorePasswordGql, loginGql, tokenLoginGql, addClockInGql, addClockOffGql, createJobGql, updateJobGql, updateJobDateGql, cancelJobGql, assignToJobGql, logoutGql, updateUserGql, deleteUserGql, hasClockedIntoJobGql, meGql, jobGql, clockOffsGql, clockInsGql, jobLocationGql, myJobRequestsGql, myAssignedJobsGql, todaysAssignedJobGql, equipmentGql, companiesGql, jobsGql, usersGql, totalWorkedHoursGql, jobsForDateGql, jobsForDateFullListGql, staffRolesGql, userGql, verifyEmailGql, settingsGql, updateMyAccountGql) {
        this.registerBuilderGql = registerBuilderGql;
        this.forgotPasswordGql = forgotPasswordGql;
        this.registerGql = registerGql;
        this.restorePasswordGql = restorePasswordGql;
        this.loginGql = loginGql;
        this.tokenLoginGql = tokenLoginGql;
        this.addClockInGql = addClockInGql;
        this.addClockOffGql = addClockOffGql;
        this.createJobGql = createJobGql;
        this.updateJobGql = updateJobGql;
        this.updateJobDateGql = updateJobDateGql;
        this.cancelJobGql = cancelJobGql;
        this.assignToJobGql = assignToJobGql;
        this.logoutGql = logoutGql;
        this.updateUserGql = updateUserGql;
        this.deleteUserGql = deleteUserGql;
        this.hasClockedIntoJobGql = hasClockedIntoJobGql;
        this.meGql = meGql;
        this.jobGql = jobGql;
        this.clockOffsGql = clockOffsGql;
        this.clockInsGql = clockInsGql;
        this.jobLocationGql = jobLocationGql;
        this.myJobRequestsGql = myJobRequestsGql;
        this.myAssignedJobsGql = myAssignedJobsGql;
        this.todaysAssignedJobGql = todaysAssignedJobGql;
        this.equipmentGql = equipmentGql;
        this.companiesGql = companiesGql;
        this.jobsGql = jobsGql;
        this.usersGql = usersGql;
        this.totalWorkedHoursGql = totalWorkedHoursGql;
        this.jobsForDateGql = jobsForDateGql;
        this.jobsForDateFullListGql = jobsForDateFullListGql;
        this.staffRolesGql = staffRolesGql;
        this.userGql = userGql;
        this.verifyEmailGql = verifyEmailGql;
        this.settingsGql = settingsGql;
        this.updateMyAccountGql = updateMyAccountGql;
    }
    registerBuilder(variables, options) {
        return this.registerBuilderGql.mutate(variables, options);
    }
    forgotPassword(variables, options) {
        return this.forgotPasswordGql.mutate(variables, options);
    }
    register(variables, options) {
        return this.registerGql.mutate(variables, options);
    }
    restorePassword(variables, options) {
        return this.restorePasswordGql.mutate(variables, options);
    }
    login(variables, options) {
        return this.loginGql.mutate(variables, options);
    }
    tokenLogin(variables, options) {
        return this.tokenLoginGql.mutate(variables, options);
    }
    addClockIn(variables, options) {
        return this.addClockInGql.mutate(variables, options);
    }
    addClockOff(variables, options) {
        return this.addClockOffGql.mutate(variables, options);
    }
    createJob(variables, options) {
        return this.createJobGql.mutate(variables, options);
    }
    updateJob(variables, options) {
        return this.updateJobGql.mutate(variables, options);
    }
    updateJobDate(variables, options) {
        return this.updateJobDateGql.mutate(variables, options);
    }
    cancelJob(variables, options) {
        return this.cancelJobGql.mutate(variables, options);
    }
    assignToJob(variables, options) {
        return this.assignToJobGql.mutate(variables, options);
    }
    logout(variables, options) {
        return this.logoutGql.mutate(variables, options);
    }
    updateUser(variables, options) {
        return this.updateUserGql.mutate(variables, options);
    }
    deleteUser(variables, options) {
        return this.deleteUserGql.mutate(variables, options);
    }
    hasClockedIntoJob(variables, options) {
        return this.hasClockedIntoJobGql.fetch(variables, options);
    }
    hasClockedIntoJobWatch(variables, options) {
        return this.hasClockedIntoJobGql.watch(variables, options);
    }
    me(variables, options) {
        return this.meGql.fetch(variables, options);
    }
    meWatch(variables, options) {
        return this.meGql.watch(variables, options);
    }
    job(variables, options) {
        return this.jobGql.fetch(variables, options);
    }
    jobWatch(variables, options) {
        return this.jobGql.watch(variables, options);
    }
    clockOffs(variables, options) {
        return this.clockOffsGql.fetch(variables, options);
    }
    clockOffsWatch(variables, options) {
        return this.clockOffsGql.watch(variables, options);
    }
    clockIns(variables, options) {
        return this.clockInsGql.fetch(variables, options);
    }
    clockInsWatch(variables, options) {
        return this.clockInsGql.watch(variables, options);
    }
    jobLocation(variables, options) {
        return this.jobLocationGql.fetch(variables, options);
    }
    jobLocationWatch(variables, options) {
        return this.jobLocationGql.watch(variables, options);
    }
    myJobRequests(variables, options) {
        return this.myJobRequestsGql.fetch(variables, options);
    }
    myJobRequestsWatch(variables, options) {
        return this.myJobRequestsGql.watch(variables, options);
    }
    myAssignedJobs(variables, options) {
        return this.myAssignedJobsGql.fetch(variables, options);
    }
    myAssignedJobsWatch(variables, options) {
        return this.myAssignedJobsGql.watch(variables, options);
    }
    todaysAssignedJob(variables, options) {
        return this.todaysAssignedJobGql.fetch(variables, options);
    }
    todaysAssignedJobWatch(variables, options) {
        return this.todaysAssignedJobGql.watch(variables, options);
    }
    equipment(variables, options) {
        return this.equipmentGql.fetch(variables, options);
    }
    equipmentWatch(variables, options) {
        return this.equipmentGql.watch(variables, options);
    }
    companies(variables, options) {
        return this.companiesGql.fetch(variables, options);
    }
    companiesWatch(variables, options) {
        return this.companiesGql.watch(variables, options);
    }
    jobs(variables, options) {
        return this.jobsGql.fetch(variables, options);
    }
    jobsWatch(variables, options) {
        return this.jobsGql.watch(variables, options);
    }
    users(variables, options) {
        return this.usersGql.fetch(variables, options);
    }
    usersWatch(variables, options) {
        return this.usersGql.watch(variables, options);
    }
    totalWorkedHours(variables, options) {
        return this.totalWorkedHoursGql.fetch(variables, options);
    }
    totalWorkedHoursWatch(variables, options) {
        return this.totalWorkedHoursGql.watch(variables, options);
    }
    jobsForDate(variables, options) {
        return this.jobsForDateGql.fetch(variables, options);
    }
    jobsForDateWatch(variables, options) {
        return this.jobsForDateGql.watch(variables, options);
    }
    jobsForDateFullList(variables, options) {
        return this.jobsForDateFullListGql.fetch(variables, options);
    }
    jobsForDateFullListWatch(variables, options) {
        return this.jobsForDateFullListGql.watch(variables, options);
    }
    staffRoles(variables, options) {
        return this.staffRolesGql.fetch(variables, options);
    }
    staffRolesWatch(variables, options) {
        return this.staffRolesGql.watch(variables, options);
    }
    user(variables, options) {
        return this.userGql.fetch(variables, options);
    }
    userWatch(variables, options) {
        return this.userGql.watch(variables, options);
    }
    verifyEmail(variables, options) {
        return this.verifyEmailGql.mutate(variables, options);
    }
    settings(variables, options) {
        return this.settingsGql.fetch(variables, options);
    }
    settingsWatch(variables, options) {
        return this.settingsGql.watch(variables, options);
    }
    updateMyAccount(variables, options) {
        return this.updateMyAccountGql.mutate(variables, options);
    }
};
ApolloAngularSDK = tslib_1.__decorate([
    core_1.Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [RegisterBuilderGQL,
        ForgotPasswordGQL,
        RegisterGQL,
        RestorePasswordGQL,
        LoginGQL,
        TokenLoginGQL,
        AddClockInGQL,
        AddClockOffGQL,
        CreateJobGQL,
        UpdateJobGQL,
        UpdateJobDateGQL,
        CancelJobGQL,
        AssignToJobGQL,
        LogoutGQL,
        UpdateUserGQL,
        DeleteUserGQL,
        HasClockedIntoJobGQL,
        MeGQL,
        JobGQL,
        ClockOffsGQL,
        ClockInsGQL,
        JobLocationGQL,
        MyJobRequestsGQL,
        MyAssignedJobsGQL,
        TodaysAssignedJobGQL,
        EquipmentGQL,
        CompaniesGQL,
        JobsGQL,
        UsersGQL,
        TotalWorkedHoursGQL,
        JobsForDateGQL,
        JobsForDateFullListGQL,
        StaffRolesGQL,
        UserGQL,
        VerifyEmailGQL,
        SettingsGQL,
        UpdateMyAccountGQL])
], ApolloAngularSDK);
exports.ApolloAngularSDK = ApolloAngularSDK;


/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi ./apps/dfobobcat-api/src/main.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\FreeLancer\MEAN\Russel\Init\dfobobcat\apps\dfobobcat-api\src\main.ts */"./apps/dfobobcat-api/src/main.ts");


/***/ }),

/***/ "@angular/core":
/*!********************************!*\
  !*** external "@angular/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@casl/ability":
/*!********************************!*\
  !*** external "@casl/ability" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@casl/ability");

/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),

/***/ "@nestjs/bull":
/*!*******************************!*\
  !*** external "@nestjs/bull" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/bull");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "apollo-angular":
/*!*********************************!*\
  !*** external "apollo-angular" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-angular");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "bull":
/*!***********************!*\
  !*** external "bull" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bull");

/***/ }),

/***/ "canvas":
/*!*************************!*\
  !*** external "canvas" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("canvas");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql-passport":
/*!***********************************!*\
  !*** external "graphql-passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-passport");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),

/***/ "image-data-uri":
/*!*********************************!*\
  !*** external "image-data-uri" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("image-data-uri");

/***/ }),

/***/ "nest-winston":
/*!*******************************!*\
  !*** external "nest-winston" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nest-winston");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map