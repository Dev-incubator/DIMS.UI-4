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

  static async getMembers() {
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
    const tasks = await Client.db
      .collection('memberTasks')
      .where('userID', '==', userID)
      .get();

    const tasksObject = {};
    let taskData = {};
    await Promise.all(
      tasks.docs.map(async (doc) => {
        taskData = await Client.db
          .collection('tasks')
          .doc(doc.data().taskID)
          .get();
        tasksObject[doc.id] = Object.assign(doc.data(), taskData.data());
        tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
        tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
      }),
    );
    return tasksObject;
  }

  static async getMember(userId) {
    const member = await Client.db
      .collection('members')
      .doc(userId)
      .get();

    return member.data();
  }

  static async getUserProgress(userID) {
    const track = await Client.getTracks(userID);

    const progressObject = {};
    let userData = {};
    console.log(track);
    await Promise.all(
      Object.entries(track).map(async ([id, data]) => {
        const { memberTaskId, ...progressData } = data;
        progressObject[id] = progressData;
        userData = await Client.db
          .collection('members')
          .doc(userID)
          .get();
        progressObject[id].userName = userData.data().firstName;
      }),
    );
    console.log(progressObject);
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
        users = await Client.getAssignedTo(doc.id);
        tasksObject[doc.id].assignedTo = await Promise.all(
          users.map(async ({ memberTaskID, userID }) => {
            user = await Client.getMember(userID);
            return { userID, memberTaskID, firstName: user.firstName, lastName: user.lastName };
          }),
        );
        tasksObject[doc.id].id = doc.id;
      }),
    );
    return tasksObject;
  }

  static async getAssignedTo(taskID) {
    const memberTasks = await Client.db
      .collection('memberTasks')
      .where('taskID', '==', taskID)
      .get();
    return memberTasks.docs.map((doc) => {
      return { userID: doc.data().userID, memberTaskID: doc.id };
    });
  }

  static async getTracks(userID) {
    const memberTasks = await Client.getUserTasks(userID);
    const tracks = await Client.db
      .collection('track')
      .where('memberTaskID', 'in', Object.keys(memberTasks))
      .get();

    const tracksObject = {};
    tracks.docs.map(async (doc) => {
      tracksObject[doc.id] = doc.data();
      tracksObject[doc.id].taskID = memberTasks[doc.data().memberTaskID].taskID;
      tracksObject[doc.id].taskName = memberTasks[doc.data().memberTaskID].taskName;
      tracksObject[doc.id].trackDate = new Date(tracksObject[doc.id].trackDate.seconds * 1000);
    });
    return tracksObject;
  }

  static async signIn(login, password) {
    const user = await Client.db
      .collection('users')
      .where('login', '==', login)
      .get();
    if (user) {
      console.log(md5(password), user.docs[0].data().password, user.docs[0].data().password === md5(password));
      if (user.docs[0].data().password === md5(password)) {
        return {
          status: 'success',
          found: true,
          token: user.docs[0].data().token,
          role: user.docs[0].data().role,
          userID: user.docs[0].data().userID,
        };
      }
      return { status: 'fail', found: true };
    }
    return { status: 'fail', found: false };
  }

  static async checkToken(token) {
    const user = await Client.db
      .collection('users')
      .where('token', '==', token)
      .get();
    return !!user.docs.length;
  }

  static async getUserInfoByToken(token) {
    const user = await Client.db
      .collection('users')
      .where('token', '==', token)
      .get();
    return { role: user.docs[0].data().role, userID: user.docs[0].data().userID };
  }
}

export default Client;
