const path = require('path');
const faker = require('faker');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const rl = require('readline');
const { promisify } = require('util');

const { randomBytes } = require('crypto');
const generateToken = () => randomBytes(20).toString('hex');

const CONFIG = require('dotenv').config().parsed;

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const conn = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
conn
  .connect()
  .then(() => seedDatabase(conn))
  .then(() => conn.end())
  .then(() => process.exit());

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Prepare readline.question for promisification
readline.question[promisify.custom] = (question) => {
  return new Promise((resolve) => {
    readline.question(question, resolve);
  });
};

function randomDate(startHour = 0, endHour = 0) {
  const now = new Date();
  var start = new Date(now.getFullYear(), now.getMonth(), 1);
  var end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

const generateUsers = async (roleId, count = 20) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const hash = await bcrypt.hash('password', 10);
    users.push([
      faker.internet.email(),
      faker.name.findName(),
      hash,
      roleId,
      true,
    ]);
  }
  return users;
};

const createJobs = async (count = 20) => {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    const jobReqDate = randomDate().toISOString();
    const clockInTime = new Date(jobReqDate).addHours(getRandomInt(1, 5));
    const clockOffTime = new Date(clockInTime).addHours(getRandomInt(1, 5));
    const totalTimeWorked = Math.trunc(
      (new Date(clockOffTime).getTime() - new Date(clockInTime).getTime()) /
      60000,
    );
    /* const builderId = (
      await conn.query(
        'SELECT id FROM public.user WHERE "roleId" = 1 ORDER BY random() LIMIT 1',
      )
    ).rows[0].id; */
    const builderId = 1;
    const staffId = (
      await conn.query(
        'SELECT id FROM public.user WHERE "roleId" = 2 ORDER BY random() LIMIT 1',
      )
    ).rows[0].id;
    const equipmentId = 2;

    const newJobData = [
      faker.address.streetAddress(),
      faker.address.latitude(),
      faker.address.longitude(),
      'assigned',
      jobReqDate,
      builderId,
    ];
    const jobId = (
      await conn.query(
        'INSERT INTO public.job ("address", "lat", "lng", "status", "requestDate", "builderId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        newJobData,
      )
    ).rows[0].id;

    await conn.query(
      'INSERT INTO public.job_equipment ("jobId", "equipmentId") VALUES ($1, $2)',
      [jobId, equipmentId],
    );
    await conn.query(
      'INSERT INTO public.job_staff ("jobId", "userId") VALUES ($1, $2)',
      [jobId, staffId],
    );

    // adding clock ins and offs
    await conn.query(
      'INSERT INTO public.clock_in ("lat", "lng", "clockInTime", "jobId", "staffId") VALUES ($1, $2, $3, $4, $5)',
      [123, 123, clockInTime, jobId, staffId],
    );
    await conn.query(
      'INSERT INTO public.clock_off ("notes", "clockOffTime", "totalTimeWorked", "jobId", "staffId") VALUES ($1, $2, $3, $4, $5)',
      ['', clockOffTime, totalTimeWorked, jobId, staffId],
    );
  }
  for (let i = 0; i < count; i++) {
    const jobReqDate = randomDate().toISOString();

    /*  const builderId = (
      await conn.query(
        'SELECT id FROM public.user WHERE "roleId" = 1 ORDER BY random() LIMIT 1',
      )
    ).rows[0].id; */
    const builderId = 1;
    const equipmentId = 2;

    const newJobData = [
      faker.address.streetAddress(),
      faker.address.latitude(),
      faker.address.longitude(),
      'pending',
      jobReqDate,
      builderId,
    ];
    const jobId = (
      await conn.query(
        'INSERT INTO public.job ("address", "lat", "lng", "status", "requestDate", "builderId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        newJobData,
      )
    ).rows[0].id;

    await conn.query(
      'INSERT INTO public.job_equipment ("jobId", "equipmentId") VALUES ($1, $2)',
      [jobId, equipmentId],
    );
    await conn.query(
      'INSERT INTO public.job_staff ("jobId", "userId") VALUES ($1, $2)',
      [jobId, 2],
    );
    await conn.query(
      'INSERT INTO public.job_staff ("jobId", "userId") VALUES ($1, $2)',
      [jobId, 3],
    );
  }
};

async function getUsers() {
  let USERS = [];
  if (process.env.APP_ENV === 'development') {
    const builders = await generateUsers(1, 40);
    const operators = await generateUsers(2, 40);
    const laborers = await generateUsers(3, 40);
    const admins = await generateUsers(4, 1);

    USERS = [
      [
        'userbuilder@example.com',
        'John Builder',
        await bcrypt.hash('password', 10),
        1,
        true,
      ],
      [
        'useroperator@example.com',
        'John operator',
        await bcrypt.hash('password', 10),
        2,
        true,
      ],
      [
        'userlaborer@example.com',
        'John Laborer',
        await bcrypt.hash('password', 10),
        3,
        true,
      ],

      ...builders,
      ...operators,
      ...laborers,
      ...admins,
    ];
  }
  return USERS;
}

const ROLES = ['builder', 'operator', 'laborer', 'admin'];
const EQUIPMENT = [
  'Slab',
  'Drain Soil',
  'Frame',
  'Brick',
  'Final',
  'Final A',
  'Final B',
  'Edge Beams',
  'Cage',
  'OHS',
  'Rock Removal',
  'Soil Removal',
  'Pier Soil Removal',
  'Extra Work',
];



async function seedDatabase(conn) {
  const roleCount = await conn.query('SELECT COUNT(*) from role');
  if (!Number(roleCount.rows[0].count)) {
    for (role of ROLES) {
      await conn.query('INSERT INTO public.role ("name") VALUES ($1)', [role]);
    }
  }
  const equipmentCount = await conn.query('SELECT COUNT(*) from equipment');
  if (!Number(equipmentCount.rows[0].count)) {
    for (equipment of EQUIPMENT) {
      await conn.query('INSERT INTO public.equipment ("name") VALUES ($1)', [
        equipment,
      ]);
    }
  }

  await addAdmin();

  if (
    process.env.APP_ENV === 'development' ||
    process.env.APP_ENV === 'staging'
  ) {
    const USERS = await getUsers();
    for (user of USERS) {
      const result = await conn.query(
        'INSERT INTO "user" ("email", "name", "password", "roleId", "emailVerified") VALUES ($1, $2, $3, $4, $5) RETURNING id',
        user,
      );
      const userId = result.rows[0].id;
      const loginToken = generateToken();
      const expires = new Date(Date.now() + 31540000000).toISOString();

      await conn.query(
        'INSERT INTO "token" ("builderLoginToken", "builderLoginExpire", "userId") VALUES ($1, $2, $3)',
        [loginToken, expires, userId],
      );
    }
    await createJobs();
  }
}

const addAdmin = async () => {
  const password = await promisify(readline.question)(
    'Enter new admin password: ',
  );
  readline.close();

  if (!password || !password.length) {
    throw new Error('Admin could not be created');
  }
  const hash = await bcrypt.hash(password, 10);

  const name = 'Admin';
  const email = CONFIG.ADMIN_EMAIL;
  const adminData = [email, name, hash, 4, true];
  await conn.query(
    'INSERT INTO "user" ("email", "name", "password", "roleId", "emailVerified") VALUES ($1, $2, $3, $4, $5)',
    adminData,
  );
};
