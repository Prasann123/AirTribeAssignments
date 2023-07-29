const tasks = require("../tasks");
const { isValid, parseISO } = require("date-fns");

const validateTasks = ({
  id,
  title,
  description,
  completed,
  createDate,
  priority,
}) => {
  if (!id || !title || !description || !createDate || !priority) {
    return { status: false, message: "All fields are required" };
  }

  if (tasks.some((task) => task.id === id)) {
    return { status: false, message: "Task with the same id already exists" };
  }

  if (!["high", "low", "medium"].includes(priority.toLowerCase())) {
    return { status: false, message: "Invalid priority" };
  }
  if (typeof completed !== "boolean") {
    return { status: false, message: "Invalid completion status" };
  }
};
function isNullOrUndefined(value) {
  return value === null || value === undefined || value.length === 0;
}
function isValidDate(dateString) {
  const parsedDate = parseISO(dateString);
  const isValidDate = isValid(parsedDate);
  console.log(isValidDate);
  return isValidDate;
}
module.exports = { validateTasks, isValidDate, isNullOrUndefined };
