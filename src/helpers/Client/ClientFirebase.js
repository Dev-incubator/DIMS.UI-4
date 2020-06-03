import firebase from 'firebase';
import md5 from 'md5';

//* Firebase configuration
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: `${projectId}.firebaseapsp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);

class Client {
  static db = firebase.firestore();

  static directions = ['Front-end', '.Net', 'Salesforce', 'Java'];

  static async getMembers() {
    await Client.deleteTask('3jwHTLFOSnE7gP0VIQKW');
    const members = await Client.db.collection('members').get();

    const membersObject = {};
    members.docs.forEach((doc) => {
      membersObject[doc.id] = doc.data();
      membersObject[doc.id].startDate = new Date(membersObject[doc.id].startDate.seconds * 1000);
      membersObject[doc.id].birthDate = new Date(membersObject[doc.id].birthDate.seconds * 1000);
    });
    return membersObject;
  }

  static async getUserTasks(userID) {
    const tasks = await Client.db.collection('memberTasks').where('userID', '==', userID).get();

    const tasksObject = {};
    let taskData = {};
    await Promise.all(
      tasks.docs.map(async (doc) => {
        taskData = await Client.db.collection('tasks').doc(doc.data().taskID).get();
        tasksObject[doc.id] = Object.assign(doc.data(), taskData.data());
        tasksObject[doc.id].id = doc.id;
        tasksObject[doc.id].taskId = doc.data().taskID;
        tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
        tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
      }),
    );
    return tasksObject;
  }

  static async getMember(userId) {
    const member = await Client.db.collection('members').doc(userId).get();

    return member.data();
  }

  static editMember(
    userId,
    firstName,
    lastName,
    email,
    direction,
    sex,
    education,
    birthDate,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    startDate,
  ) {
    return Client.db.collection('members').doc(userId).update({
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      birthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
    });
  }

  static postMember(
    firstName,
    lastName,
    email,
    direction,
    sex,
    education,
    birthDate,
    universityAverageScore,
    mathScore,
    address,
    mobilePhone,
    skype,
    startDate,
  ) {
    return Client.db.collection('members').add({
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      birthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
    });
  }

  static deleteMember(userId) {
    return Client.db.collection('members').doc(userId).delete();
  }

  static async getUserProgress(userID) {
    const track = await Client.getTracks(userID);

    const progressObject = {};
    let userData = {};

    await Promise.all(
      Object.entries(track).map(async ([id, data]) => {
        const { memberTaskId, ...progressData } = data;
        progressObject[id] = progressData;
        userData = await Client.db.collection('members').doc(userID).get();
        progressObject[id].userName = userData.data().firstName;
      }),
    );

    return progressObject;
  }

  static async getTasks() {
    const tasks = await Client.db.collection('tasks').get();

    const tasksObject = {};
    let users = [];
    let user = {};
    await Promise.all(
      tasks.docs.map(async (doc) => {
        tasksObject[doc.id] = doc.data();
        tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
        tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
        users = await Client.getAssigned(doc.id);
        tasksObject[doc.id].assignedTo = (
          await Promise.all(
            users.map(async ({ memberTaskId, userId }) => {
              user = await Client.getMember(userId);
              if (!user) {
                return null;
              }
              return { userId, memberTaskId, firstName: user.firstName, lastName: user.lastName };
            }),
          )
        ).filter((el) => !!el);
        tasksObject[doc.id].id = doc.id;
        tasksObject[doc.id].taskId = doc.id;
      }),
    );
    return tasksObject;
  }

  static async getAssigned(taskID) {
    const memberTasks = await Client.db.collection('memberTasks').where('taskID', '==', taskID).get();
    return await Promise.all(
      memberTasks.docs.map((doc) => {
        return { userId: doc.data().userID, memberTaskId: doc.id };
      }),
    );
  }

  static async getTracks(userID) {
    const memberTasks = await Client.getUserTasks(userID);
    const tracks = await Client.db.collection('track').where('memberTaskID', 'in', Object.keys(memberTasks)).get();

    const tracksObject = {};
    tracks.docs.map(async (doc) => {
      tracksObject[doc.id] = doc.data();
      tracksObject[doc.id].taskId = memberTasks[doc.data().memberTaskID].taskID;
      tracksObject[doc.id].taskName = memberTasks[doc.data().memberTaskID].taskName;
      tracksObject[doc.id].trackDate = new Date(tracksObject[doc.id].trackDate.seconds * 1000);
    });
    return tracksObject;
  }

  static async assignTask(taskID, userIds) {
    await Promise.all(
      userIds.map((userId) => {
        return Client.db.collection('memberTasks').add({ userID: userId, taskID, status: 'active' });
      }),
    );

    const assigned = await Client.getAssigned(taskID);
    console.log(assigned);
    return assigned.filter(({ userId }) => userIds.includes(userId));
  }

  static editTask(taskId, taskName, description, taskStart, taskDeadline) {
    return Client.db.collection('tasks').doc(taskId).update({ taskName, description, taskStart, taskDeadline });
  }

  static postTask(taskName, description, taskStart, taskDeadline) {
    return Client.db.collection('tasks').add({ taskName, description, taskStart, taskDeadline });
  }

  static setUserTaskState(taskId, userId, status) {
    return Client.db
      .collection('membersTasks')
      .where('userID', '==', userId)
      .where('taskID', '==', taskId)
      .update({ status });
  }

  static async deleteTask(taskId) {
    (await Client.db.collection('membersTasks').where('taskID', '==', taskId).get()).docs.map(async ({ id }) => {
      await Client.db.collection('membersTasks').doc(id).delete();
    });
    await Client.db.collection('tasks').doc(taskId).delete();
  }

  static deleteTrack(trackId) {
    return Client.db.collection('track').doc(trackId).delete();
  }

  static createTrack(memberTaskID, trackNote, trackDate) {
    return Client.db.collection('track').add({ memberTaskID, trackNote, trackDate });
  }

  static editTrack(trackId, trackNote, trackDate) {
    return Client.db.collection('track').doc(trackId).update({ trackNote, trackDate });
  }

  static async unassignTask(taskId, userIds) {
    await Client.db.collection('membersTasks').where('taskId', '==', taskId).where('userId', 'in', userIds).delete();

    const unassigned = await Client.getAssigned(taskId);
    return unassigned.filter(({ userId }) => userIds.includes(userId));
  }

  static async signIn(login, password) {
    const user = await Client.db.collection('users').where('login', '==', login).get();
    if (user) {
      if (user.docs[0].data().password === md5(password)) {
        return {
          status: 'success',
          found: true,
          token: user.docs[0].data().token,
          role: user.docs[0].data().role,
          userId: user.docs[0].data().userID,
        };
      }
      return { status: 'fail', found: true };
    }
    return { status: 'fail', found: false };
  }

  static async checkToken(token) {
    const user = await Client.db.collection('users').where('token', '==', token).get();
    return !!user.docs.length;
  }

  static async getUserInfoByToken(token) {
    const user = await Client.db.collection('users').where('token', '==', token).get();
    const { role, userID: userId } = user.docs[0].data();

    return { role, userId };
  }
}

export default Client;
