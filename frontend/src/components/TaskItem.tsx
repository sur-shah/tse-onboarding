import { l } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import React, { useState } from "react";
import {updateTask} from "src/api/tasks";

import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";


export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
    
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleToggleCheck = () => {
    setLoading(true);
    const updatedTask = {...task, isChecked: !task.isChecked};
    updateTask(updatedTask)
      .then((result) => {
        if(result.success){
          setTask(result.data);
        } else{
          alert(`Failed to update task: ${result.error}`);
        }
        setLoading(false);
      })
    
  };
  
  let className = styles.textContainer
    if (task.isChecked) {
        className += ` ${styles.checked}`;
    }
    return (
    <div className={styles.item}>
        <CheckButton 
        checked={task.isChecked}
        onPress ={handleToggleCheck}
        disabled = {isLoading}
        />
      <div className = {className}>
        <span className = {styles.title}>{task.title}</span>
        {task.description && <span className = {styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}