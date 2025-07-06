import React, { useState } from 'react';
import { Container, InputGroup, Form, Button, ListGroup, Card } from 'react-bootstrap';

function TaskNest() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4 rounded-4 border-0" style={{ backgroundColor: '#fdf6e3' }}>
        <h3 className="mb-4 text-center text-primary">📋 Your Task List</h3>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="rounded-start-4"
          />
          <Button variant="success" onClick={handleAddTask} className="rounded-end-4">
            Add
          </Button>
        </InputGroup>

        {todos.length === 0 ? (
          <p className="text-muted text-center">No tasks yet. Add your first one! 🚀</p>
        ) : (
          <ListGroup className="mt-3">
            {todos.map((todo, index) => (
              <ListGroup.Item
                key={index}
                className="rounded-3 my-2 shadow-sm"
                style={{ backgroundColor: '#fffbe6' }}
              >
                {todo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
}

export default TaskNest;
