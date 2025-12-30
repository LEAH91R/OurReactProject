import React, { useState } from 'react';

const Shopping = () => {
    const [basicChecked, setBasicChecked] = useState({});
    const [firstMealChecked, setFirstMealChecked] = useState({});
    const [secondMealChecked, setSecondMealChecked] = useState({});
    const [thirdMealChecked, setThirdMealChecked] = useState({});
    const [mealChecked, setMealChecked] = useState({});
    const [hostingChecked, setHostingChecked] = useState({});

    const basicItems = ['נרות שבת', 'יין קידוש', 'חלות', 'תבלינים (מלח, פלפל, פפריקה)', 'משקאות מתוקים', 'חומרים לעוגות'];
    const firstMealItems = ['עוף או בשר', 'ירקות למרק (תפוחי אדמה, גזר, בצל)', 'שקדי מרק', 'אורז או תוספת אחרת'];
    const secondMealItems = ['ביצים לסלט ביצים או כבד', 'עוגות לקידוש', 'ירקות עליים לסלט'];
    const thirdMealItems = ['סלטים', 'קוגל תפוחי אדמה', 'קוגל אטריות', 'מלפפון חמוץ'];
    const mealItems = ['פיצוחים', 'משקאות קלים', 'ממתקים וחטיפים', 'חלות נוספות כמספר הנפשות', 'קינוח מיוחד'];
    const hostingItems = ['מתנה למארחים + שוקולד'];

    const handleCheckboxChange = (list, item, checked) => {
        switch (list) {
            case 'basic':
                setBasicChecked(prev => ({ ...prev, [item]: checked }));
                break;
            case 'firstMeal':
                setFirstMealChecked(prev => ({ ...prev, [item]: checked }));
                break;
            case 'secondMeal':
                setSecondMealChecked(prev => ({ ...prev, [item]: checked }));
                break;
            case 'thirdMeal':
                setThirdMealChecked(prev => ({ ...prev, [item]: checked }));
                break;
            case 'meal':
                setMealChecked(prev => ({ ...prev, [item]: checked }));
                break;
            case 'hosting':
                setHostingChecked(prev => ({ ...prev, [item]: checked }));
                break;
            default:
                break;
        }
    };

    const renderList = (items, checkedState, listName) => (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map(item => (
                <li key={item} style={{ marginBottom: '10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={checkedState[item] || false}
                            onChange={(e) => handleCheckboxChange(listName, item, e.target.checked)}
                        />
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>רשימות קניות לשבת</h1>

            <h2>רשימת קניות בסיסית לשבת</h2>
            {renderList(basicItems, basicChecked, 'basic')}

            <h2>רשימת קניות לסעודה ראשונה</h2>
            {renderList(firstMealItems, firstMealChecked, 'firstMeal')}

            <h2>רשימת קניות סעודה שניה</h2>
            {renderList(secondMealItems, secondMealChecked, 'secondMeal')}

            <h2>רשימת קניות לסעודה שלישית</h2>
            {renderList(thirdMealItems, thirdMealChecked, 'thirdMeal')}

            <h2>רשימת קניות עבור ארוח</h2>
            {renderList(mealItems, mealChecked, 'meal')}

            <h2>רשימת קניות עבור התארחות</h2>
            {renderList(hostingItems, hostingChecked, 'hosting')}
        </div>
    );
};

export default Shopping;