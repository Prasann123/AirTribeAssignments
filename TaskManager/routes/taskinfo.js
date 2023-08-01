const taskRoutes = require("express").Router();
const bodyParser = require("body-parser");
const tasks = require("../tasks");
const {
  validateTasks,
  isValidDate,
  isNullOrUndefined,
} = require("../Validator/validator");
const { isValid, parseISO } = require("date-fns");

taskRoutes.use(bodyParser.json());

//insert a new task using post
taskRoutes.post("/", (req, res) => {
  const tasksDetails = req.body;

  const validationResult = validateTasks(tasksDetails);
  if (validationResult.status) {
    let AlteredTask = JSON.parse(JSON.stringify(tasks));
    AlteredTask.push(tasksDetails);

    return res.status(200).json("Task has been added successfully");
  } else {
    return res.status(400).json(validationResult.message);
  }
});

//update priorities based on id
taskRoutes.put("/priorities/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatePriority = req.body;
  let tasksUpdate = tasks.map((priority) =>
    priority.id === taskId ? { ...priority, ...updatePriority } : priority
  );

  return res.status(200).json(tasksUpdate);
});

//update tasks with put single update or multiple fields update it works dynamically
taskRoutes.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskRecieved = req.body;
  const errors = {};
  const tobeUpdatedTask = tasks.find((task) => task.id === parseInt(taskId));

  if (isNullOrUndefined(tobeUpdatedTask)) {
    return res.status(404).json("Task requested does not exist.");
  }
  //const validationResult = validateTasks(tasksDetails);

  //this validation needs to be refactored into validation section.
  if ("title" in taskRecieved && typeof taskRecieved.title !== "string") {
    errors.status = "title must be string";
  } else if ("title" in taskRecieved) {
    tobeUpdatedTask.title = taskRecieved.title;
  }
  if (
    "completed" in taskRecieved &&
    typeof taskRecieved.completed !== "boolean"
  ) {
    errors.status = "completed status must be boolean";
  } else if ("completed" in taskRecieved) {
    tobeUpdatedTask.completed = taskRecieved.completed;
  }
  if (
    "description" in taskRecieved &&
    typeof taskRecieved.description !== "string"
  ) {
    errors.status = "description must be string";
  } else if ("description" in taskRecieved) {
    tobeUpdatedTask.description = taskRecieved.description;
  }
  if (
    "priority" in taskRecieved &&
    typeof taskRecieved.priority !== "string" &&
    !["high", "low", "medium"].includes(taskRecieved.priority.toLowerCase())
  ) {
    errors.status = "priority must be string";
  } else if ("priority" in taskRecieved) {
    tobeUpdatedTask.priority = taskRecieved.priority;
  }
  if ("createDate" in taskRecieved && !isValidDate(taskRecieved.createDate)) {
    errors.status = "createDate not in correct format";
  } else if ("createDate" in taskRecieved) {
    tobeUpdatedTask.createDate = parseISO(taskRecieved.createDate);
  }

  if (Object.keys(errors).length <= 0) {
    return res.status(200).json({ ...tobeUpdatedTask, ...taskRecieved });
  } else {
    return res.status(404).json({ errors });
  }
});

//get all tasks as well filter and soring using createDate and priority
taskRoutes.get("/", (req, res) => {
  const sortBy = req.query.sortBy;
  const filterBy = req.query.filterBycompleted;
  //const filterBy = req.query.filterBycompleted;
  let taskDetails = [...tasks];
  if (sortBy == "createDate") {
    if (isValidDate(sortBy))
      return res.status(404).json("Incorrect Date format");

    /*     let taskDateSort = taskDetails.sort((taskA, taskB) => {
      let dateA = new Date(taskA.createDate).getTime();
      let dateB = new Date(taskB.createDate).getTime();
      return dateA > dateB ? 1 : -1;
    }); */
    function sortTasksbyDate(a, b) {
      let dateA = new Date(a.createDate).getTime();
      let dateB = new Date(b.createDate).getTime();
      return dateA > dateB ? 1 : -1;
    }
    let DateSort = taskDetails.sort(sortTasksbyDate);
    /*  const sortByDate = (taskDetails) => {
      const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      };
      taskDetails.sort(sorter);
    };
    sortByDate(taskDetails); */
    return res.status(200).json(DateSort);
  }
  if (filterBy) {
    if (typeof filterBy !== "boolean") {
      return res.status(404).json("Incorrect format");
    }
    taskDetails = taskDetails.filter((task) => task.completed == filterBy);
  }
  return res.status(200).json(taskDetails);
});

//get tasks based on priority with specific endpoint
taskRoutes.get("/tasks/priority/:priority", (req, res) => {
  const priority = req.params.priority;
  if (!["high", "low", "medium"].includes(priority.toLowerCase())) {
    return res.status(404).json("Incorrect format");
  }
  const filteredTasks = tasks.filter((task) => {
    return task.priority.toLowerCase() === priority.toLowerCase();
  });
  return res.status(200).json(filteredTasks);
});

//Delete Task based on id
taskRoutes.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const istaskExist = tasks.filter((task) => task.id === parseInt(taskId));
  if (isNullOrUndefined(istaskExist)) {
    return res.status(404).json("Task requested does not exist.");
  }
  const deletedTask = tasks.filter((task) => task.id !== parseInt(taskId));
  return res.status(200).json("Task requested has been successfully deleted");
});

//get tasks based on id
taskRoutes.get("/:id", (req, res) => {
  let taskid = req.params.id;

  let resultTask = tasks.filter((task) => task.id === parseInt(taskid));
  if (istaskExist(resultTask)) {
    return res.status(404).json("Task requested does not exist.");
  }
  return res.status(200).json(resultTask);
});

module.exports = taskRoutes;
