import {useCallback} from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useConnection from "../hooks/use-connection";

const NewTask = (props) => {

  const transformTasks = (taskText, data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest: sendTaskRequest} = useConnection();

  const enterTaskHandler = async (taskText) => {
      const urlConfig =
          {
              url: 'https://react-http-app-9d66f-default-rtdb.firebaseio.com/tasks.json',
              method: 'POST',
              body: JSON.stringify({ text: taskText }),
              headers: {
                  'Content-Type': 'application/json',
              },
          }

      sendTaskRequest(urlConfig, transformTasks.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
