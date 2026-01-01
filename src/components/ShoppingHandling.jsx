import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//איסוף כל הרשימות לרשימה אחת
const ShoppingHandling = ({
    basicItems, firstMealItems, secondMealItems, thirdMealItems, mealItems, hostingItems
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
    const handleCheckboxChange = (item, isChecked) => {
        //מעתיק את המצב הקודם של הcheckbox ומשנה אותו לערך העכשוי
        setChecked(prev => ({ ...prev, [item]: isChecked }));
    };

    return (
        <div className="container" dir="rtl">
            {/*כותרת ראשית*/}
            <h1 className="main-title">ניהול רשימות קניות לשבת</h1>
            <div className="section-card">
                {/*כותרת משנה*/}
                <h2 className="section-title">רשימת קניות מלאה</h2>
                <ul className="item-list">
                    {/*מעבר על הרשימה הכוללת*/}
                    {allItems.map(({ item, list }, index) => (
                        <li key={`${list}-${index}`} className="item-row" style={{ opacity: checked[item] ? 0.6 : 1 }}>
                            <label className="checkbox-container">
                                {/*אפשרות לשינוי סטטוס הפריט*/}
                                <input
                                    type="checkbox"
                                    //השמת הcheckbox בערך הנכון 
                                    checked={checked[item] || false}
                                    //שינוי הסטטוס במקרה של לחיצה
                                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                />
                                {/*הצגת הפריט עם עיצוב מותנה*/}
                                <span style={{ textDecoration: checked[item] ? 'line-through' : 'none' }}>
                                    {item}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {/*מעבר לדף הקודם למקרה שירצו לערוך מחדש את הרשימות*/}
            <div style={{ textAlign: 'center' }}>
                <Link to="/" className="footer-link">חזרה לעריכת רשימות</Link>
            </div>
        </div>
    );
};

export default ShoppingHandling;