import React, { useState, useEffect } from 'react';
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
import './Todo.css';
import { BsTrash, BsCheck2Circle, BsPencil, BsClock } from 'react-icons/bs';

function TaskNest() {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const categories = ['Work', 'Personal', 'Diet'];
  const priorities = ['High', 'Medium', 'Low'];

  const newTask = {
  id: Date.now(),
  text: task,
  date: taskDate,
  time: taskTime,
  category,
  priority,
  completed: false,
  notified: false,
  repeat: 'None',
};

  const buildTimeString = (hour, minute, meridiem) => {
    let h = parseInt(hour, 10);
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    return `${h.toString().padStart(2, '0')}:${minute}`;
  };

  const parseTime = (timeStr) => {
    if (!timeStr) return ['12', '00', 'AM'];
    let [hour, minute] = timeStr.split(':');
    hour = parseInt(hour, 10);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return [h12.toString().padStart(2, '0'), minute, meridiem];
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('tasknestTodos'));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasknestTodos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTodos = todos.map((todo) => {
        if (!todo.completed && !todo.notified) {
          const taskTime = new Date(`${todo.date}T${todo.time}`);
          const diff = Math.abs(taskTime - now);
          if (diff <= 60000) {
            if (Notification.permission === 'granted') {
              new Notification('⏰ Task Reminder', {
                body: `${todo.text} (${todo.category}) at ${todo.time}`,
              });
            }
            return { ...todo, notified: true };
          }
        }
        return todo;
      });
      setTodos(updatedTodos);
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  const handleAddTask = () => {
    if (task.trim() && taskDate && taskTime) {
      const newTask = {
        id: Date.now(),
        text: task,
        date: taskDate,
        time: taskTime,
        category,
        priority,
        completed: false,
        notified: false,
      };
      setTodos([newTask, ...todos]);
      setTask('');
      setTaskDate('');
      setTaskTime('');
      setCategory('Work');
      setPriority('Medium');
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

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const saveEditedTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      )
    );
    setEditingId(null);
    setEditedText('');
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Work': return 'primary';
      case 'Personal': return 'warning';
      case 'Diet': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (level) => {
    switch (level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';        
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow rounded-5 border-0" style={{ backgroundColor: '#FSEDEB' }}>
        <h2 className="text-center mb-4 text-dark fw-bold">🧠 TaskNest</h2>

        <Row className="gy-3">
          <Col md={2}>
            <Form.Control
              placeholder="Agenda"
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


          {/* ✅ Updated Time Input */}
          <Col md={2}>
            <InputGroup className="rounded-4">
              

              <Form.Select
                value={parseTime(taskTime)[0]}
                onChange={(e) => {
                  const [_, minute, meridiem] = parseTime(taskTime);
                  setTaskTime(buildTimeString(e.target.value, minute, meridiem));
                }}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 1;
                  return (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour}
                    </option>
                  );
                })}
              </Form.Select>

              <Form.Select
                value={parseTime(taskTime)[1]}
                onChange={(e) => {
                  const [hour, _, meridiem] = parseTime(taskTime);
                  setTaskTime(buildTimeString(hour, e.target.value, meridiem));
                }}
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = i.toString().padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </Form.Select>

              <Form.Select
                value={parseTime(taskTime)[2]}
                onChange={(e) => {
                  const [hour, minute] = parseTime(taskTime);
                  setTaskTime(buildTimeString(hour, minute, e.target.value));
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </Form.Select>
            </InputGroup>
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
          <Col md={2}>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-4"
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="info" className="w-100 rounded-4 fw-semibold" onClick={handleAddTask}>
              ➕ Add Task
            </Button>
          </Col>
        </Row>

        {/* Filter & Search */}
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
              <h5 className="mb-3 fw-semibold text-capitalize">📂 {cat} Tasks</h5>
              <ListGroup>
                {categoryTasks.map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className={`rounded-4 my-2 px-4 py-3 d-flex justify-content-between align-items-center shadow-sm border-0 ${
                      todo.completed ? 'bg-light text-muted text-decoration-line-through' : 'bg-white'
                    }`}
                  >
                    <div style={{ flex: 1 }}>
                      {editingId === todo.id ? (
                        <Form.Control
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          onBlur={() => saveEditedTask(todo.id)}
                          autoFocus
                        />
                      ) : (
                        <div onClick={() => toggleCompleted(todo.id)} style={{ cursor: 'pointer' }}>
                          <h5 className="mb-1">
                            {todo.text}{' '}
                            <Badge bg={getCategoryColor(todo.category)}>{todo.category}</Badge>{' '}
                            <Badge bg={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
                          </h5>
                          <small>
                            📅 <strong>{todo.date}</strong>{' '}
                            <Badge bg="light" text="dark" className="ms-2">
                              🕒 {formatTime(todo.time)}
                            </Badge>
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        title="Edit"
                        className="rounded-circle"
                        onClick={() => startEditing(todo.id, todo.text)}
                      >
                        <BsPencil />
                      </Button>
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

        {/* No Tasks Message */}
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
