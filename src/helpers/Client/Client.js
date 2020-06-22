import axios from 'axios';
import Validator from '../Validator';
import concatPath from '../concatPath';
import getValue from './getValue';

const apiPath = process.env.REACT_APP_APIPATH;
class Client {
  static directions = ['React', '.Net', 'Angular', 'Java'];

  static states = ['active', 'success', 'fail'];

  static createMembersObject(memberResponse) {
    const member = {};
    const {
      FullName,
      Email,
      Direction,
      Sex,
      Education,
      Age,
      UniversityAverageScore,
      MathScore,
      Address,
      MobilePhone,
      Skype,
      StartDate,
    } = memberResponse;

    const [firstName, lastName] = FullName.split(' ');
    member.firstName = firstName;
    member.lastName = lastName;

    const birthDate = new Date();
    birthDate.setFullYear(new Date().getFullYear() - Age);

    member.birthDate = birthDate;
    member.email = Email;
    member.direction = Direction;
    member.sex = Sex === 'M' ? 'Male' : 'Female';
    member.education = Education;
    member.universityAverageScore = UniversityAverageScore;
    member.mathScore = MathScore * 10;
    member.address = Address;
    member.mobilePhone = Validator.parsePhoneByMask(MobilePhone, '+999 (99) 99-99-99');
    member.skype = Skype;
    member.startDate = new Date(StartDate);

    return member;
  }

  static async getMembers() {
    const members = (await axios.get(concatPath(apiPath, 'profiles'))).data;

    const membersObject = {};
    members.forEach((member) => {
      membersObject[member.UserId] = Client.createMembersObject(member);
    });
    return membersObject;
  }

  static postMember(
    Name,
    LastName,
    Email,
    Direction,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate,
  ) {
    return axios.post(concatPath(apiPath, 'create'), {
      Name,
      LastName,
      Email,
      DirectionId: Client.directions.indexOf(Direction) + 1,
      Sex: Sex === 'Male' ? 'M' : 'F',
      Education,
      BirthDate: Validator.fromDateToMask(BirthDate, 'yyyy-MM-dd'),
      UniversityAverageScore: parseFloat(UniversityAverageScore),
      MathScore: MathScore / 10.0,
      Address,
      MobilePhone: MobilePhone.replace(/[^0-9+]/g, ''),
      Skype,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
    });
  }

  static editMember(
    UserId,
    Name,
    LastName,
    Email,
    Direction,
    Sex,
    Education,
    BirthDate,
    UniversityAverageScore,
    MathScore,
    Address,
    MobilePhone,
    Skype,
    StartDate,
  ) {
    return axios.put(concatPath(apiPath, 'profile', 'edit', UserId.toString()), {
      Name,
      LastName,
      Email,
      DirectionId: Client.directions.indexOf(Direction) + 1,
      Sex: Sex === 'Male' ? 'M' : 'F',
      Education,
      BirthDate: Validator.fromDateToMask(BirthDate, 'yyyy-MM-dd'),
      UniversityAverageScore: parseFloat(UniversityAverageScore),
      MathScore: MathScore / 10.0,
      Address,
      MobilePhone: MobilePhone.replace(/[^0-9+]/g, ''),
      Skype,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
    });
  }

  static createTasksObject(tasksResponse) {
    const { TaskId, Name, Description, StartDate, DeadlineDate } = tasksResponse;
    const tasks = {};
    tasks.id = TaskId.toString();
    tasks.taskId = TaskId;
    tasks.taskName = Name;
    tasks.taskDescription = Description;
    tasks.taskStart = new Date(StartDate);
    tasks.taskDeadline = new Date(DeadlineDate);
    return tasks;
  }

  static async getTasks() {
    const tasks = (await axios.get(concatPath(apiPath, 'tasks'))).data;

    const tasksObject = {};
    await Promise.all(
      tasks.map(async (task) => {
        tasksObject[task.TaskId] = Client.createTasksObject(task);
      }),
    );
    return tasksObject;
  }

  static createUserTasksObject(userTasksResponse) {
    const { UserId, TaskId, TaskName, Description, StartDate, DeadlineDate, State } = userTasksResponse;
    const userTasks = {};

    userTasks.id = TaskId.toString() + UserId.toString();
    userTasks.userId = UserId;
    userTasks.taskId = TaskId;
    userTasks.taskName = TaskName;
    userTasks.taskDescription = Description;
    userTasks.taskStart = new Date(StartDate);
    userTasks.taskDeadline = new Date(DeadlineDate);
    userTasks.state = State;
    return userTasks;
  }

  static async getUserTasks(userId) {
    const userTasks = (await axios.get(concatPath(apiPath, 'user', 'tasks', userId))).data;
    const userTasksObject = {};

    userTasks.forEach((userTask) => {
      userTasksObject[userTask.TaskId.toString() + userTask.UserId.toString()] = Client.createUserTasksObject(userTask);
    });
    return userTasksObject;
  }

  static assignTask(taskId, usersIds) {
    return axios.post(concatPath(apiPath, 'user', 'task', 'add', taskId.toString()), usersIds);
  }

  static async getUsersMemberTasks(taskId, usersIds) {
    let allUserTasks;
    let userTasks;

    const resultArray = (
      await Promise.allSettled(
        usersIds.map(async (userId) => {
          allUserTasks = await this.getUserTasks(userId);

          userTasks = Object.keys(allUserTasks).find((memberTaskId) => {
            return allUserTasks[memberTaskId].taskId.toString() === taskId.toString();
          });

          if (!userTasks || !userTasks.length) {
            return null;
          }
          return {
            userId,
            taskId,
            memberTaskId: userTasks,
          };
        }),
      )
    ).map(getValue);
    return resultArray.filter((element) => {
      return !!element;
    });
  }

  static async getAssigned(members, taskId) {
    const allUsers = { ...members };
    const assignedTo = [];
    let userTasks;

    (
      await Promise.allSettled(
        Object.entries(allUsers).map(async ([userId, user]) => {
          userTasks = await this.getUserTasks(userId);
          Object.values(userTasks).forEach((userTask) => {
            if (userTask.taskId.toString() === taskId.toString()) {
              assignedTo.push({
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                memberTaskId: userTask.id,
              });
            }
          });
        }),
      )
    ).map(getValue);
    return assignedTo;
  }

  static editTask(TaskId, Name, Description, StartDate, DeadlineDate) {
    return axios.put(concatPath(apiPath, 'task', 'edit'), {
      TaskId,
      Name,
      Description,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      DeadlineDate: Validator.fromDateToMask(DeadlineDate, 'yyyy-MM-dd'),
    });
  }

  static postTask(Name, Description, StartDate, DeadlineDate) {
    return axios.post(concatPath(apiPath, 'task', 'create'), {
      Name,
      Description,
      StartDate: Validator.fromDateToMask(StartDate, 'yyyy-MM-dd'),
      DeadlineDate: Validator.fromDateToMask(DeadlineDate, 'yyyy-MM-dd'),
    }).data;
  }

  static setUserTaskState(TaskId, UserId, Status) {
    const StatusId = (Client.states.indexOf(Status) + 1).toString();
    return axios.put(concatPath(apiPath, 'user', 'task'), {
      TaskId: TaskId.toString(),
      UserId: UserId.toString(),
      StatusId,
    });
  }

  static deleteMember(userId) {
    return axios.delete(concatPath(apiPath, 'profile', 'delete', userId));
  }

  static deleteTask(taskId) {
    return axios.delete(concatPath(apiPath, 'task', 'delete', taskId));
  }

  static getUserProgress(userId) {
    // TODO Redo after API update
    return {};
  }

  static getTracks(userId) {
    // TODO Redo after API update
    return {};
  }

  static deleteTrack(trackId) {
    // TODO Redo after API update
    return {};
  }

  static createTrack(userId) {
    // TODO Redo after API update
    return {};
  }

  static editTrack(userId) {
    // TODO Redo after API update
    return {};
  }

  static async unassignTask(taskId, userIds) {
    // TODO Restore after API bug fix
    // const userTasks = [];
    // const allUsers = Object.keys(await Client.getMembers());
    // let foundTasks;
    // await Promise.all(
    //   allUsers.map(async (userId) => {
    //     foundTasks = Object.values(await Client.getUserTasks(userId.toString())).filter(
    //       ({ taskId: candidateTaskId }) => {
    //         return taskId === candidateTaskId;
    //       },
    //     );
    //     if (foundTasks.length) {
    //       userTasks.push(...foundTasks);
    //     }
    //   }),
    // );
    // await Client.deleteTask(taskId.toString());
    // let createdTask = false;
    // await Promise.all(
    //   Object.values(userTasks).map(async (userTask) => {
    //     if (userIds.indexOf(userTask.userId) < 0) {
    //       const { userId, taskName, taskDescription, taskStart, taskDeadline, state } = userTask;
    //       if (!createdTask) {
    //         createdTask = true;
    //         await Client.postTask(taskName, taskDescription, taskStart, taskDeadline);
    //       }
    //       await Client.setUserTaskState(taskId.toString(), userId.toString(), state);
    //     }
    //   }),
    // );
    // await Client.assignTask(taskId, arraysSubtraction(allUsers, userIds));
  }

  static async checkToken(token) {
    // TODO Redo after API update
    return true;
  }

  static signIn(login, password) {
    // TODO Redo after API update
    let role = 'admin';
    if (login === 'member') {
      role = 'member';
    }
    return { status: 'success', found: true, token: `${role}token`, role, userId: '2' };
  }

  static async getUserInfoByToken(token) {
    // TODO Redo after API update
    let role = 'admin';
    if (token === 'membertoken') {
      role = 'member';
    }
    return { role, userId: '2' };
  }
}

export default Client;
