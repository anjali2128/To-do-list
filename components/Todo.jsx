import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  ListGroup,
  Card,
  Row,
  Col,
  ProgressBar,
  Badge,
  InputGroup,
} from 'react-bootstrap';
import { BsTrash, BsCheck2Circle } from 'react-icons/bs';
import './Todo.css';

function TaskNest() {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [category, setCategory] = useState('Work');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const categories = ['Work', 'Personal', 'Diet'];

  const handleAddTask = () => {
    if (task.trim() && taskDate && taskTime) {
      const newTask = {
        id: Date.now(),
        text: task,
        date: taskDate,
        time: taskTime,
        category,
        completed: false,
      };
      setTodos([newTask, ...todos]);
      setTask('');
      setTaskDate('');
      setTaskTime('');
      setCategory('Work');
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const markAllComplete = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  const clearAllTasks = () => {
    setTodos([]);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Work': return 'primary';
      case 'Personal': return 'warning';
      case 'Diet': return 'success';
      default: return 'secondary';
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress =
    todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <Container className="py-5">
      <Card
        className="p-4 shadow rounded-5 border-0"
        style={{ backgroundColor: '#FSEDEB' }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">🧠 TaskNest</h2>

        {/* Input */}
        <Row className="gy-3">
          <Col md={3}>
            <Form.Control
              placeholder="What do you need to do?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="rounded-4"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="rounded-4"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="rounded-4"
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-4"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              variant="info"
              className="w-100 rounded-4 fw-semibold"
              onClick={handleAddTask}
            >
              ➕ Add Task
            </Button>
          </Col>
        </Row>

        {/* Filter and Search */}
        <Row className="mt-4 align-items-center">
          <Col md={6}>
            <div className="d-flex">
              {['All', 'Completed', 'Pending'].map((f, idx) => (
                <Button
                  key={f}
                  variant={filter === f ? 'dark' : 'outline-dark'}
                  onClick={() => setFilter(f)}
                  className={`rounded-4 me-2 ${idx === 2 ? 'me-0' : ''}`}
                >
                  {f}
                </Button>
              ))}
            </div>
          </Col>

          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="rounded-4"
                style={{ marginRight: '10px' }}
              />
              <Button variant="outline-danger" onClick={clearAllTasks}>
                <BsTrash /> Clear All
              </Button>
              <Button variant="outline-success" onClick={markAllComplete}>
                <BsCheck2Circle /> Complete All
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Progress */}
        {todos.length > 0 && (
          <div className="mt-4">
            <ProgressBar
              now={progress}
              label={`${Math.round(progress)}%`}
              variant="success"
              className="rounded-pill"
            />
          </div>
        )}

        {/* Task Groups */}
        {categories.map((cat) => {
          const categoryTasks = todos.filter(
            (todo) =>
              todo.category === cat &&
              (filter === 'All' ||
                (filter === 'Completed' && todo.completed) ||
                (filter === 'Pending' && !todo.completed)) &&
              todo.text.toLowerCase().includes(searchText.toLowerCase())
          );

          if (categoryTasks.length === 0) return null;

          return (
            <div key={cat} className="mt-5">
              <h5 className="mb-3 fw-semibold text-capitalize">
                📂 {cat} Tasks
              </h5>
              <ListGroup>
                {categoryTasks.map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className={`rounded-4 my-2 px-4 py-3 d-flex justify-content-between align-items-center shadow-sm border-0 ${
                      todo.completed
                        ? 'bg-light text-muted text-decoration-line-through'
                        : 'bg-white'
                    }`}
                  >
                    <div
                      onClick={() => toggleCompleted(todo.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h5 className="mb-1">
                        {todo.text}{' '}
                        <Badge bg={getCategoryColor(todo.category)}>
                          {todo.category}
                        </Badge>
                      </h5>
                      <small>
                        📅 {todo.date} ⏰ {todo.time}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(todo.id)}
                        title="Delete"
                        className="rounded-circle"
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          );
        })}

        {/* No Tasks Fallback */}
        {todos.filter(todo =>
          (filter === 'All' ||
            (filter === 'Completed' && todo.completed) ||
            (filter === 'Pending' && !todo.completed)) &&
          todo.text.toLowerCase().includes(searchText.toLowerCase())
        ).length === 0 && (
          <p className="text-muted mt-5 text-center">No tasks found 💭</p>
        )}
      </Card>
    </Container>
  );
}

export default TaskNest;
