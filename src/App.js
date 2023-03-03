import React, { useEffect, useCallback, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useConnection from "./components/hooks/use-connection";

function App() {
  const [tasks, setTasks] = useState([]);

    const urlConfig =
        {
            url: 'https://react-http-app-9d66f-default-rtdb.firebaseio.com/tasks.json',
        }

  const transformTasks = useCallback(taskObj => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, [])

  const {isLoading, error, sendRequest: fetchTasks} = useConnection();


  useEffect(() => {
    fetchTasks(urlConfig, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
