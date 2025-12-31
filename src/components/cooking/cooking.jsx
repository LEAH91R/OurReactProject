import React, { useState } from 'react';
import './Cooking.css'; 

const initialDishes = {
    shabbatBread: { name: "חלה", time: 120 },
    firstCourse: [
        { name: "עוף", time: 90, prepared: false },
        { name: "בשר", time: 70, prepared: false },
        { name: "מרק", time: 45, prepared: false },
        { name: "כבד", time: 30, prepared: false },
    ],
    secondCourse: [
        { name: "טשולנט", time: 300, prepared: false },
    ],
    thirdCourse: [
        { name: "טונה", time: 10, prepared: false },
        { name: "סלומון", time: 20, prepared: false },
    ],
};

const Cooking = () => {
    const [dishes, setDishes] = useState(initialDishes);
    const [newDish, setNewDish] = useState({ name: '', time: '', type: 'first' });

    const togglePrepared = (course, index) => {
        const updatedMeals = [...dishes[course]];
        updatedMeals[index].prepared = !updatedMeals[index].prepared;
        setDishes({ ...dishes, [course]: updatedMeals });
    };

    const addDish = () => {
        if (newDish.name && newDish.time) {
            const newDishObject = { name: newDish.name, time: parseInt(newDish.time), prepared: false };
            const updatedCourse = [...dishes[newDish.type + 'Course'], newDishObject];
            setDishes({ ...dishes, [newDish.type + 'Course']: updatedCourse });
            setNewDish({ name: '', time: '', type: 'first' });
        }
    };

    const removeDish = (course, index) => {
        const updatedMeals = dishes[course].filter((_, i) => i !== index);
        setDishes({ ...dishes, [course]: updatedMeals });
    };

    return (
        <div className="container">
            <h1>בישולים לשבת</h1>
            <h2>בישולים בסיסיים לשבת</h2>
            <p>{dishes.shabbatBread.name} - משך זמן הכנה: {dishes.shabbatBread.time} דקות</p>
            
            {['first', 'second', 'third'].map((course) => (
                <div key={course}>
                    <h2>בישולים לסעודה {course === 'first' ? 'ראשונה' : course === 'second' ? 'שניה' : 'שלישית'}</h2>
                    <ul>
                        {dishes[`${course}Course`].map((meal, index) => (
                            <li key={index} className={meal.prepared ? "prepared" : ""}>
                                {meal.name} - {meal.time} דקות 
                                <input 
                                    type="checkbox" 
                                    checked={meal.prepared} 
                                    onChange={() => togglePrepared(`${course}Course`, index)} 
                                />
                                {meal.prepared ? " - הוכן" : " - לא הוכן"}
                                <button onClick={() => removeDish(`${course}Course`, index)}>מחק</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <h2>הוסף תבשיל חדש</h2>
            <input 
                type="text" 
                placeholder="שם תבשיל" 
                value={newDish.name} 
                onChange={(e) => setNewDish({...newDish, name: e.target.value})} 
            />
            <input 
                type="number" 
                placeholder="משך זמן הכנה" 
                value={newDish.time} 
                onChange={(e) => setNewDish({...newDish, time: e.target.value})} 
            />
            <select 
                value={newDish.type} 
                onChange={(e) => setNewDish({...newDish, type: e.target.value})}
            >
                <option value="first">ראשונה</option>
                <option value="second">שנייה</option>
                <option value="third">שלישית</option>
            </select>
            <button onClick={addDish}>הוסף תבשיל</button>
        </div>
    );
};

export default Cooking;
