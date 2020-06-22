import faker from 'faker';
import md5 from 'md5';
import Client from './Client';
import getValue from './Client/getValue';

export default class FirebaseFaker {
  static generateMembers() {
    let members = new Array(10).fill(null);
    members = members.map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      sex: faker.helpers.randomize(['Male', 'Female']),
      direction: faker.helpers.randomize(['Java', 'Frontend', '.Net', 'Saleforce']),
      education: faker.company.companyName(),
      startDate: faker.date.recent(),
      universityAverageScore: faker.finance.amount(5, 10, 1),
      address: `${faker.address.city()}, ${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
      mobilePhone: `+375 ${faker.phone.phoneNumberFormat(1)}`,
      skype: `live:${faker.internet.userName()}`,
      birthDate: faker.date.past(20, new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)),
      mathScore: faker.random.number({ min: 50, max: 100 }),
    }));
    members.forEach((el) => Client.db.collection('members').add(el));
  }

  static async generateMemberTasks(userId) {
    let members = new Array(5).fill(null);

    const tasks = await Client.db.collection('tasks').get();

    members = members.map(() => ({
      userId,
      taskId: faker.helpers.randomize(tasks.docs).id,
      state: faker.helpers.randomize(['Active', 'Fail', 'Success']),
    }));

    members.forEach((el) => Client.db.collection('memberTasks').add(el));
  }

  static generateTasks() {
    let tasks = new Array(faker.random.number({ min: 5, max: 10 })).fill(null);
    const generateTaskName = () => {
      const taskName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
      return taskName.charAt(0).toUpperCase() + taskName.slice(1);
    };
    let startDate;
    tasks = tasks.map(() => ({
      taskName: generateTaskName(),
      taskDescription: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
      taskStart: (() => {
        startDate = faker.date.recent();
        return startDate;
      })(),
      taskDeadline: faker.date.future(0, startDate),
    }));
    tasks.forEach(async (el) => Client.db.collection('tasks').add(await el));
  }

  static async generateTracks(userId) {
    const memberTasks = await Client.getUserTasks(userId);
    const tracks = [];
    Object.entries(memberTasks).forEach(({ 0: id, 1: data }) => {
      if (faker.random.boolean && data.state === 'Active') {
        tracks.push({
          memberTaskId: id,
          trackDate: faker.date.future(0, data.startDate),
          trackNote: faker.lorem.paragraph(faker.random.number({ min: 1, max: 5 })),
        });
      }
    });
    tracks.forEach(async (el) => Client.db.collection('track').add(await el));
  }

  static async createUser(login, password, role, userId) {
    await Client.db
      .collection('users')
      .add({ login, password: md5(password), role, userId, token: faker.random.alphaNumeric(15) });
  }

  static async generateUsers() {
    const users = await Client.getMembers();
    const json = [];
    (
      await Promise.allSettled(
        Object.entries(users).map(async ([id, doc]) => {
          const login = (doc.firstName + doc.lastName).toLowerCase();
          const password = faker.internet.password();
          await FirebaseFaker.createUser(login, password, 'member', id);
          json.push({ login, password });
        }),
      )
    ).map(getValue);
    saveAsFile(JSON.stringify(json), 'membersPasswords');
  }
}

function saveAsFile(content, filename) {
  const blob = new Blob([content], { type: 'text/text' });
  const anchor = document.createElement('a');

  anchor.download = `${filename}.txt`;
  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
  anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
  anchor.click();
}
