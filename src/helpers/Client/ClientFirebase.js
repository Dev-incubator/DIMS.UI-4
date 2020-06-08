import firebase from 'firebase';
import md5 from 'md5';
import DateMask from '../Validator/DateMask';

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

const db = firebase.firestore();

const Client = {
  directions: ['Front-end', '.Net', 'Salesforce', 'Java'],

  getDirections: async () => {
    const directions = await db.collection('directions').get();
    Client.directions = directions.docs.map((direction) => {
      return direction.data().name;
    });
  },

  getMembers: async () => {
    const members = await db.collection('members').get();
    const membersObject = {};

    const formatMember = async (doc) => {
      membersObject[doc.id] = {
        ...doc.data(),
        startDate: new Date(doc.data().startDate.seconds * 1000),
        birthDate: new Date(doc.data().birthDate.seconds * 1000),
      };
    };

    members.docs.forEach(formatMember);
    return membersObject;
  },

  getUserTasks: async (userID) => {
    const tasks = await db.collection('membersTasks').where('userID', '==', userID).get();
    const tasksObject = {};
    let taskData = {};

    const formatTasks = async (doc) => {
      taskData = await db.collection('tasks').doc(doc.data().taskID).get();
      tasksObject[doc.id] = {
        ...doc.data(),
        ...taskData.data(),
        id: doc.id,
        taskId: doc.data().taskID,
        taskStart: new Date(doc.data().taskStart.seconds * 1000),
        taskDeadline: new Date(doc.data().taskDeadline.seconds * 1000),
      };
    };

    await Promise.allSettled(tasks.docs.map(formatTasks));
    return tasksObject;
  },

  getMember: async (userId) => {
    const member = await db.collection('members').doc(userId).get();

    return member.data();
  },

  editMember: (
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
  ) => {
    return db.collection('members').doc(userId).update({
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
  },

  postMember: (
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
  ) => {
    return db.collection('members').add({
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
  },

  deleteMember: (userId) => {
    return db.collection('members').doc(userId).delete();
  },

  getUserProgress: async (userID) => {
    const track = await Client.getTracks(userID);

    const progressObject = {};
    let userData = {};

    const formatProgress = async ([id, data]) => {
      const { memberTaskId, ...progressData } = data;
      progressObject[id] = progressData;
      userData = await db.collection('members').doc(userID).get();
      progressObject[id].userName = userData.data().firstName;
    };

    await Promise.allSettled(Object.entries(track).map(formatProgress));

    return progressObject;
  },

  getTasks: async () => {
    const tasks = await db.collection('tasks').get();

    const tasksObject = {};
    let users = [];
    let user = {};

    const formatAssigned = async () => {
      return (
        await Promise.allSettled(
          users.map(async ({ memberTaskId, userId }) => {
            user = await Client.getMember(userId);
            if (!user) {
              return null;
            }
            return { userId, memberTaskId, firstName: user.firstName, lastName: user.lastName };
          }),
        )
      ).filter((el) => !!el);
    };

    const formatTask = async (doc) => {
      tasksObject[doc.id] = doc.data();
      tasksObject[doc.id].taskStart = new Date(tasksObject[doc.id].taskStart.seconds * 1000);
      tasksObject[doc.id].taskDeadline = new Date(tasksObject[doc.id].taskDeadline.seconds * 1000);
      users = await Client.getAssigned(doc.id);
      tasksObject[doc.id].assignedTo = await formatAssigned();
      tasksObject[doc.id].id = doc.id;
      tasksObject[doc.id].taskId = doc.id;
    };

    await Promise.allSettled(tasks.docs.map(formatTask));
    return tasksObject;
  },

  getAssigned: async (taskID) => {
    const membersTasks = await db.collection('membersTasks').where('taskID', '==', taskID).get();
    const formatAssigned = (doc) => {
      return { userId: doc.data().userID, memberTaskId: doc.id };
    };

    return Promise.allSettled(membersTasks.docs.map(formatAssigned));
  },

  getAllAssigned: async () => {
    const taskIds = Object.keys(await Client.getTasks());
    const assigned = {};

    const processAssigned = async (taskId) => {
      const assignedArray = await Client.getAssigned(taskId);
      assigned[taskId] = assignedArray;
    };

    await Promise.allSettled(taskIds.map(processAssigned));

    return assigned;
  },

  getTracks: async (userID) => {
    const membersTasks = await Client.getUserTasks(userID);
    const tracks = await db.collection('track').where('memberTaskID', 'in', Object.keys(membersTasks)).get();

    const tracksObject = {};
    const formatTrack = async ({ id, data }) => {
      tracksObject[id] = {
        ...data(),
        taskId: membersTasks[data().memberTaskID].taskID,
        taskName: membersTasks[data().memberTaskID].taskName,
        trackDate: new Date(tracksObject[id].trackDate.seconds * 1000),
      };
    };

    tracks.docs.map(formatTrack);
    return tracksObject;
  },

  assignTask: async (taskID, userIds) => {
    const addMemberTask = (userId) => {
      return db.collection('membersTasks').add({ userID: userId, taskID, status: 'active' });
    };

    await Promise.allSettled(userIds.map(addMemberTask));

    const assigned = await Client.getAssigned(taskID);
    return assigned.filter(({ userId }) => userIds.includes(userId));
  },

  editTask: (taskId, taskName, taskDescription, taskStart, taskDeadline) => {
    return db.collection('tasks').doc(taskId).update({ taskName, taskDescription, taskStart, taskDeadline });
  },

  postTask: async (taskName, taskDescription, taskStart, taskDeadline) => {
    const { id } = await db.collection('tasks').add({ taskName, taskDescription, taskStart, taskDeadline });
    return id;
  },

  setUserTaskState: (memberTaskId, status) => {
    return db.collection('membersTasks').doc(memberTaskId).update({ status });
  },

  deleteMemberTasks: async (taskId) => {
    (await db.collection('membersTasks').where('taskID', '==', taskId).get()).docs.map(async ({ id }) => {
      await db.collection('membersTasks').doc(id).delete();
    });
  },

  deleteTask: async (taskId) => {
    await Client.deleteMemberTasks(taskId);
    await db.collection('tasks').doc(taskId).delete();
  },

  deleteTrack: (trackId) => {
    return db.collection('track').doc(trackId).delete();
  },

  createTrack: (memberTaskID, trackNote, trackDate) => {
    const date = DateMask.parseDateByMask(trackDate, 'dd-MM-yyyy');
    return db.collection('track').add({ memberTaskID, trackNote, trackDate: date });
  },

  editTrack: (trackId, trackNote, trackDate) => {
    const date = DateMask.parseDateByMask(trackDate, 'dd-MM-yyyy');
    return db.collection('track').doc(trackId).update({ trackNote, trackDate: date });
  },

  unassignTask: async (taskId, userIds) => {
    const tasks = await await db
      .collection('membersTasks')
      .where('taskID', '==', taskId)
      .where('userID', 'in', userIds)
      .get();

    const batch = db.batch();

    tasks.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    batch.commit();

    const unassigned = await Client.getAssigned(taskId);
    return unassigned.filter(({ userId }) => userIds.includes(userId));
  },

  signIn: async (login, password) => {
    const user = await db.collection('users').where('login', '==', login).get();
    if (user && user.docs.length) {
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
  },

  checkToken: async (token) => {
    const user = await db.collection('users').where('token', '==', token).get();
    return !!user.docs.length;
  },

  getUserInfoByToken: async (token) => {
    const user = await db.collection('users').where('token', '==', token).get();
    const { role, userID: userId } = user.docs[0].data();

    return { role, userId };
  },
};

export default Client;
