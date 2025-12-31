import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//משתנים שישנו את הרשימות בעת רינדור
const Shopping = ({
    basicItems, setBasicItems,
    firstMealItems, setFirstMealItems,
    secondMealItems, setSecondMealItems,
    thirdMealItems, setThirdMealItems,
    mealItems, setMealItems,
    hostingItems, setHostingItems
}) => {
    // :משתנים שישתנו בעת רינדור 
    //משתנה לעריכת פריט ע"י אינדקס ורשימה
    const [editingItem, setEditingItem] = useState(null);
    //משתנה לעריכת תוכן פריט
    const [editValue, setEditValue] = useState('');
    //משתנה להוספת פריט
    const [newItem, setNewItem] = useState({});

    //ניהול העריכה-קבלת הפריט החדש והשמתו 
    const handleEdit = (list, index, item) => {
        //עדכון הפריט ע"י שליחת הרשימה והאינדקס לעדכון
        setEditingItem({ list, index });
        //עדכון תוכן הפריט
        setEditValue(item);
    };

    //פונקציה לשמירת הערך החדש
    const handleSave = () => {
        //אם במשתנה העריכה יש ערך- כלומר יש מה לעדכן
        if (editingItem) {
            const { list, index } = editingItem;
            //משתנה המחזיק את אפשרות עדכון הפריט
            const setter = getSetter(list);
            //מעבר על הרשימה-רק הפריט המבוקש מתעדכן
            setter(prev => prev.map((item, i) => i === index ? editValue : item));
            //מאפסים בחזרה את משתנה העריכה
            setEditingItem(null);
            //תוכן הפריט לעדכון מתאפס
            setEditValue('');
        }
    };

    //ביטול העריכה
    const handleCancel = () => {
        //איפוס משתנה העריכה
        setEditingItem(null);
        //איפוס תוכן הפריט לעדכון
        setEditValue('');
    };
    //ניהול מחיקת פריט
    const handleDelete = (list, index) => {
        {/*משתנה המחזיק את אפשרות שינוי הרשימה הנדרשת למחיקה*/ }
        const setter = getSetter(list);
        {/*מחיקת הפריט מהרשימה- ע"י שליפת כל הפריטים האחרים בלבד*/ }
        setter(prev => prev.filter((_, i) => i !== index));
    };
    //הוספת פריט חדש
    const addItem = (list) => {
        //בדיקה האם המשתמש באמת הזין פריט
        if (newItem[list] && newItem[list].trim()) {
            //משתנה המחזיק את אפשרות שינוי הרשימה
            const setter = getSetter(list);
            //שינוי הרשימה ע"י העתקת הפריטים הקודמים + הפריט החדש והסרת רווחים מיותרים
            setter(prev => [...prev, newItem[list].trim()]);
            //אתחול הפריט הבא אחרי העתקת הפריטים הקודמים
            setNewItem(prev => ({ ...prev, [list]: '' }));
        }
    };
    //פונקציה המחזירה את פונקצית שינוי הרשימה המבוקשת ע"י קבלת שמה
    const getSetter = (list) => {
        switch (list) {
            case 'basic': return setBasicItems;
            case 'firstMeal': return setFirstMealItems;
            case 'secondMeal': return setSecondMealItems;
            case 'thirdMeal': return setThirdMealItems;
            case 'meal': return setMealItems;
            case 'hosting': return setHostingItems;
            default: return () => { };
        }
    };
    //פונקציה המחזירה את הרשימה המבוקשת ע"י קבלת שמה
    const getItems = (list) => {
        switch (list) {
            case 'basic': return basicItems;
            case 'firstMeal': return firstMealItems;
            case 'secondMeal': return secondMealItems;
            case 'thirdMeal': return thirdMealItems;
            case 'meal': return mealItems;
            case 'hosting': return hostingItems;
            default: return [];
        }
    };

    const colors = ['#fdffe5ff', '#fff4eeff', '#f0f8ff', '#defaecff', '#fff4f2ff', '#e0ffff'];
    //פונקציה המחזירה את הרשימה המתאימה לכותרת
    const renderList = (listName) => {
        //משתנה המחזיק את הרשימה המבוקשת
        const items = getItems(listName);
        return (
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {/*מעבר על הרשימה*/}
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {editingItem && editingItem.list === listName && editingItem.index === index ? (
                            //אם לחצו על עריכה
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <input
                                    type="text"
                                    //השמת תוכן ההקלדה הנוכחי של המשתמש
                                    value={editValue}
                                    //כל הקלדה של המשתמש תשנה את מצב הinput ע"י שליחת התו הנוכחי 
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={{ flex: 1, marginRight: '10px', padding: '5px' }}
                                />
                                {/*כפתור לשמירת הפריט החדש*/}
                                <button onClick={handleSave} style={{ margin: '0px 5px', padding: '5px 10px', backgroundColor: '#6e9ea4ff', color: 'white', border: 'none', borderRadius: '3px' }}>שמור</button>
                                {/*כפתור ביטול*/}
                                <button onClick={handleCancel} style={{ padding: '5px 10px', backgroundColor: '#e17a73ff', color: 'white', border: 'none', borderRadius: '3px' }}>ביטול</button>
                            </div>
                        ) : (      //מה שיוצג באופן רגיל
                            <>
                                <span>{item}</span>
                                <div>
                                    {/*כפתור העריכה*/}
                                    <button onClick={() => handleEdit(listName, index, item)} style={{ margin: '0px 5px', padding: '5px 10px', backgroundColor: '#6e9ea4ff', color: 'white', border: 'none', borderRadius: '3px' }}>ערוך</button>
                                    {/*כפתור המחיקה*/}
                                    <button onClick={() => handleDelete(listName, index)} style={{ padding: '5px 10px', backgroundColor: '#e17a73ff', color: 'white', border: 'none', borderRadius: '3px' }}>מחק</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    //מערך השומר את כותרות הרשימות
    const sections = [
        { title: 'רשימת קניות בסיסית לשבת', name: 'basic' },
        { title: 'רשימת קניות לסעודה ראשונה', name: 'firstMeal' },
        { title: 'רשימת קניות לסעודה שניה', name: 'secondMeal' },
        { title: 'רשימת קניות לסעודה שלישית', name: 'thirdMeal' },
        { title: 'רשימת קניות עבור ארוח', name: 'meal' },
        { title: 'רשימת קניות עבור התארחות', name: 'hosting' }
    ];

    return (
        <div dir="rtl" style={{ padding: '20px', background: 'linear-gradient(to bottom, #d2eaf4ff, #ffffff)', minHeight: '100vh' }}>
            {/*כותרת כללית*/}
            <h1 style={{ textAlign: 'center', color: '#446569ff', marginBottom: '30px' }}>רשימות קניות לשבת</h1>
            {/*שליפת הרשימות ע"י מעבר על מערך הכותרות*/}
            {sections.map((section, index) => (
                <div key={section.name} style={{
                    backgroundColor: colors[index % colors.length],
                    padding: '20px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #ddd'
                }}>
                    {/*הצגת כותרת הרשימה*/}
                    <h2 style={{ color: '#446569ff', marginBottom: '15px' }}>{section.title}</h2>
                    {/*הצגת הרשימות המתאימות לכותרת*/}
                    {renderList(section.name)}
                    {/*אפשרות הוספה*/}
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="הוסף פריט חדש"
                           //הגדרת קטגורית הפריט החדש
                            value={newItem[section.name] || ''}
                            //בלחיצה יתווסף הפריט החדש ע"י שליחת ערכו כתוכן הקטגוריה שלו
                            onChange={(e) => setNewItem(prev => ({ ...prev, [section.name]: e.target.value }))}
                            style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button
                            //הוספת הפריט המבוקש לרשימה
                            onClick={() => addItem(section.name)}
                            style={{ padding: '8px 15px', backgroundColor: '#7a7a7aff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            הוסף
                        </button>
                    </div>
                </div>
            ))}
            {/*שמירת הנתונים ומעבר לדף שבו תוצג הרשימה המלאה*/}
            <Link to="/save">שמירת הנתונים</Link>
        </div>
    );
};

export default Shopping;