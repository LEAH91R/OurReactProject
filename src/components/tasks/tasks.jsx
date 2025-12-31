

import React, { useState } from 'react';

const Task = ({ task, onToggle, onDelete }) => {
    // Helper function to format the duration
    const formatDuration = (duration) => {
        if (duration >= 60) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            return `${hours} שעות${minutes > 0 ? ' ו' + minutes + ' דקות' : ''}`;
        }
        return `${duration} דקות`;
    };

    return (
        <div className="task-container">
            <input 
                type="checkbox" 
                checked={task.isCompleted} 
                onChange={() => onToggle(task.id)} 
            />
            <span>{task.name} - {formatDuration(task.duration)} ( יום {task.day})</span>
            <button onClick={() => onDelete(task.id)}>מחק</button>
        </div>
    );
};

const AddTask = ({ onAdd, day }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const handleAddTask = () => {
        if (name && duration) {
            onAdd({ id: Date.now(), name, duration: parseFloat(duration), day, isCompleted: false });
            setName('');
            setDuration('');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="שם המשימה" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="משך בדקות" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
            />
            <button onClick={handleAddTask}>הוסף משימה</button>
        </div>
    );
};

const Tasks = () => {
    const [homeTasks, setHomeTasks] = useState([//שבת בבית
        { id: 1, name: 'ניקוי סלון', duration: 120, day: 'שישי', isCompleted: false },
        { id: 2, name: 'עוף', duration: 90, day: 'שישי', isCompleted: false },
        { id: 3, name: 'דגים', duration: 50, day: 'שישי', isCompleted: false },
        { id: 4, name: 'ביצים', duration: 30, day: 'שישי', isCompleted: false },
    ]);

    const [hostingTasks, setHostingTasks] = useState([//שבת עם אורחים
        { id: 3, name: 'לקנות עוגות לאורחים', duration: 60, day: 'חמישי', isCompleted: false },
        { id: 4, name: 'להכין את חדר האורחים', duration: 180, day: 'חמישי', isCompleted: false }
    ]);

    const [saturdayHostingTasks, setSaturdayHostingTasks] = useState([//שבת שבה מתארחים
        { id: 5, name: 'להכניס בגדי שבת לילדים', duration: 90, day: 'חמישי', isCompleted: false },
        { id: 6, name: 'עוגות ', duration: 800, day: 'חמישי ', isCompleted: false }
    ]);

    const toggleTaskCompletion = (id, type) => {
        if (type === 'home') {
            setHomeTasks(homeTasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            ));
        } else if (type === 'hosting') {
            setHostingTasks(hostingTasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            ));
        } else {
            setSaturdayHostingTasks(saturdayHostingTasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            ));
        }
    };

    const deleteTask = (id, type) => {
        if (type === 'home') {
            setHomeTasks(homeTasks.filter(task => task.id !== id));
        } else if (type === 'hosting') {
            setHostingTasks(hostingTasks.filter(task => task.id !== id));
        } else {
            setSaturdayHostingTasks(saturdayHostingTasks.filter(task => task.id !== id));
        }
    };

    const totalDuration = (tasks) =>
        tasks.reduce((total, task) => task.isCompleted ? total : total + task.duration, 0);

    const addTask = (task, type) => {
        if (type === 'home') {
            setHomeTasks([...homeTasks, task]);
        } else if (type === 'hosting') {
            setHostingTasks([...hostingTasks, task]);
        } else {
            setSaturdayHostingTasks([...saturdayHostingTasks, task]);
        }
    };

    return (
        <div>
            <h1>משימות לסופשבוע</h1>

            <h2>משימות בית</h2>
            {homeTasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onToggle={(id) => toggleTaskCompletion(id, 'home')} 
                    onDelete={(id) => deleteTask(id, 'home')} 
                />
            ))}
            <AddTask onAdd={(task) => addTask(task, 'home')} day="שישי" />

            <h2>משימות אירוח ביום שישי</h2>
            {hostingTasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onToggle={(id) => toggleTaskCompletion(id, 'hosting')} 
                    onDelete={(id) => deleteTask(id, 'hosting')} 
                />
            ))}
            <AddTask onAdd={(task) => addTask(task, 'hosting')} day="שישי" />

            <h2>משימות אירוח ביום שבת</h2>
            {saturdayHostingTasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onToggle={(id) => toggleTaskCompletion(id, 'saturdayHosting')} 
                    onDelete={(id) => deleteTask(id, 'saturdayHosting')} 
                />
            ))}
            <AddTask onAdd={(task) => addTask(task, 'saturdayHosting')} day="שבת" />

            <h3>סה"כ שעות למשימות בית שנותרו: {totalDuration(homeTasks)} דקות</h3>
            <h3>סה"כ שעות למשימות אירוח ביום שישי שנותרו: {totalDuration(hostingTasks)} דקות</h3>
            <h3>סה"כ שעות למשימות אירוח ביום שבת שנותרו: {totalDuration(saturdayHostingTasks)} דקות</h3>
        </div>
    );
};

export default Tasks;
