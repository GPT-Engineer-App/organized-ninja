import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isToday } from "date-fns";

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  useEffect(() => {
    // Filter tasks to show only today's tasks
    setTasks((prevTasks) => prevTasks.filter((task) => isToday(new Date(task.date))));
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { name: newTask, date: newTaskDate }]);
    setNewTask("");
    setNewTaskDate("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, name, date) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name, date } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div>
                <p>{task.name}</p>
                {task.date && <p className="text-sm text-muted-foreground">{format(new Date(task.date), "PPP")}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => editTask(index, prompt("Edit task name", task.name), prompt("Edit task date", task.date))}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-2 mt-4">
            <Input
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Today;