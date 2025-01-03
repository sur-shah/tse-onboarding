import React, { useEffect, useState } from "react";
import { getAllTasks } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

import type { Task } from "src/api/tasks";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log("Fetching tasks...");
    getAllTasks()
      .then((result) => {
        if (result.success) {
          console.log("Tasks fetched: " + result.data);
          setTasks(result.data);
        } else {
          console.log("An error occured: " + result.error);
          alert(result.error);
        }
      })
      .catch((reason) => alert(reason));
  }, []);

  return (
    <div className={styles.list}>
      <span className={styles.title}>{title}</span>
      <div className={styles.item}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
