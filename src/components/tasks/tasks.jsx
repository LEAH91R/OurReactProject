import './Tasks.css';
import React, { useState } from 'react';

// רכיב משימה בודדת עם מצב עריכה
const Task = ({ task, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(task.name);
    const [newTime, setNewTime] = useState(task.time);

    const formatTime = (time) => {
        if (time >= 60) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return `${hours} שעות${minutes > 0 ? ' ו' + minutes + ' דקות' : ''}`;
        }
        return `${time} דקות`;
    };

    const handleSave = () => {
        onUpdate(task.id, newName, parseFloat(newTime));
        setIsEditing(false);
    };

    return (
        <div className={`task-container ${task.isCompleted ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                checked={task.isCompleted} 
                onChange={() => onToggle(task.id)} 
            />
            
            {isEditing ? (
                <div className="edit-mode">
                    <input 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        value={newTime} 
                        onChange={(e) => setNewTime(e.target.value)} 
                    />
                    <button onClick={handleSave}>שמור ✅</button>
                    <button onClick={() => setIsEditing(false)}>ביטול ❌</button>
                </div>
            ) : (
                <>
                    <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                        {task.name} - {formatTime(task.time)} (יום {task.day})
                    </span>
                    <button onClick={() => setIsEditing(true)}>ערוך ✏️</button>
                </>
            )}
            <button onClick={() => onDelete(task.id)}>מחק 🗑️</button>
        </div>
    );
};

// רכיב להוספת משימה חדשה
const AddTask = ({ onAdd, day }) => {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');

    const handleAddTask = () => {
        if (name && time) {
            onAdd({ id: Date.now(), name, time: parseFloat(time), day, isCompleted: false });
            setName('');
            setTime('');
        }
    };

    return (
        <div className="add-task">
            <input 
                type="text" 
                placeholder="שם המשימה" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="משך בדקות" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
            />
            <button onClick={handleAddTask}>הוסף משימה +</button>
        </div>
    );
};

const Tasks = () => {
    const [homeTasks, setHomeTasks] = useState([
        { id: 1, name: 'ניקוי סלון', time: 120, day: 'שישי', isCompleted: false },
        { id: 2, name: 'בישול עוף', time: 90, day: 'שישי', isCompleted: false },
    ]);

    const [hostingTasks, setHostingTasks] = useState([
        { id: 3, name: 'קניית עוגות', time: 60, day: 'חמישי', isCompleted: false },
    ]);

    const [saturdayHostingTasks, setSaturdayHostingTasks] = useState([
        { id: 5, name: 'סידור בגדי שבת', time: 90, day: 'חמישי', isCompleted: false },
    ]);

    // פונקציה גנרית לניהול שינויים ברשימות השונות
    const updateList = (id, type, action, newData = {}) => {
        const lists = {
            home: { state: homeTasks, setter: setHomeTasks },
            hosting: { state: hostingTasks, setter: setHostingTasks },
            saturday: { state: saturdayHostingTasks, setter: setSaturdayHostingTasks }
        };

        const { state, setter } = lists[type];

        if (action === 'toggle') {
            setter(state.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
        } else if (action === 'delete') {
            setter(state.filter(t => t.id !== id));
        } else if (action === 'update') {
            setter(state.map(t => t.id === id ? { ...t, name: newData.name, time: newData.time } : t));
        } else if (action === 'add') {
            setter([...state, newData]);
        }
    };

    // תיקון פונקציית סך הכל (שימוש ב-task.time במקום task.duration)
    const totalDuration = (tasks) =>
        tasks.reduce((total, task) => (!task.isCompleted ? total + task.time : total), 0);

    return (
        <div className="main-container">
            <h1>ניהול משימות לשבת</h1>

            <section>
                <h2>🏠 משימות לשבת בבית</h2>
                {homeTasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onToggle={(id) => updateList(id, 'home', 'toggle')} 
                        onDelete={(id) => updateList(id, 'home', 'delete')}
                        onUpdate={(id, name, time) => updateList(id, 'home', 'update', { name, time })}
                    />
                ))}
                <AddTask onAdd={(task) => updateList(null, 'home', 'add', task)} day="שישי" />
                <p>נותר: {totalDuration(homeTasks)} דקות</p>
            </section>

            <hr />

            <section>
                <h2> 🍽️ משימות לאירוח</h2>
                {hostingTasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onToggle={(id) => updateList(id, 'hosting', 'toggle')} 
                        onDelete={(id) => updateList(id, 'hosting', 'delete')}
                        onUpdate={(id, name, time) => updateList(id, 'hosting', 'update', { name, time })}
                    />
                ))}
                <AddTask onAdd={(task) => updateList(null, 'hosting', 'add', task)} day="שישי" />
                <p>נותר: {totalDuration(hostingTasks)} דקות</p>
            </section>

            <hr />

            <section>
                <h2>🚗 משימות כשמתארחים</h2>
                {saturdayHostingTasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onToggle={(id) => updateList(id, 'saturday', 'toggle')} 
                        onDelete={(id) => updateList(id, 'saturday', 'delete')}
                        onUpdate={(id, name, time) => updateList(id, 'saturday', 'update', { name, time })}
                    />
                ))}
                <AddTask onAdd={(task) => updateList(null, 'saturday', 'add', task)} day="חמישי" />
                {/* <p>נותר: {totalDuration(saturdayHostingTasks)} דקות</p> */}
            </section>
        </div>
    );
};

export default Tasks;

