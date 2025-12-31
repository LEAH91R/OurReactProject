import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//איסוף כל הרשימות לרשימה אחת
const ShoppingHandling = ({
    basicItems,
    firstMealItems,
    secondMealItems,
    thirdMealItems,
    mealItems,
    hostingItems
}) => {
    //משתנה לשמירת תוכן הcheckbox
    const [checked, setChecked] = useState({});
    //מעבר על כל רשימה ותיוגה לפי הקטגוריה המתאימה לה
    const allItems = [
        ...basicItems.map(item => ({ item, list: 'basic' })),
        ...firstMealItems.map(item => ({ item, list: 'firstMeal' })),
        ...secondMealItems.map(item => ({ item, list: 'secondMeal' })),
        ...thirdMealItems.map(item => ({ item, list: 'thirdMeal' })),
        ...mealItems.map(item => ({ item, list: 'meal' })),
        ...hostingItems.map(item => ({ item, list: 'hosting' }))
    ];
    //הפיכת מצב הcheckbox 
    const handleCheckboxChange = (item, checked) => {
        //מעתיק את המצב הקודם של הcheckbox ומשנה אותו לערך העכשוי
        setChecked(prev => ({ ...prev, [item]: checked }));
    };

    return (
        <div dir="rtl" style={{ padding: '20px', background: 'linear-gradient(to bottom, #d2eaf4ff, #ffffff)', minHeight: '100vh' }}>
            {/*כותרת ראשית*/}
            <h1 style={{ textAlign: 'center', color: '#446569ff', marginBottom: '30px' }}>ניהול רשימות קניות לשבת</h1>
            <div style={{
                backgroundColor: '#f0f8ff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                border: '1px solid #ddd'
            }}>
                {/*כותרת משנה*/}
                <h2 style={{ color: '#446569ff', marginBottom: '15px' }}>רשימת קניות מלאה</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {/*מעבר על הרשימה הכוללת*/}
                    {allItems.map(({ item, list }, index) => (
                        <li key={`${list}-${index}`} style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', backgroundColor: '#fafafa' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                {/*אפשרות לשינוי סטטוס הפריט*/}
                                <input
                                    type="checkbox"
                                    //השמת הcheckbox בערך הנכון 
                                    checked={checked[item] || false}
                                    //שינוי הסטטוס במקרה של לחיצה
                                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                    style={{ marginLeft: '10px' }}
                                />
                                {/*הצגת הפריט*/}
                                {item}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {/*מעבר לדף הקודם למקרה שירצו לערוך מחדש את הרשימות*/}
            <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '20px', textDecoration: 'none', fontSize: '18px' }}>חזרה לעריכת רשימות</Link>
        </div>
    );
};

export default ShoppingHandling;
