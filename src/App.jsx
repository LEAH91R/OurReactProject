import './App.css'
import Shopping from './components/Shopping.jsx'
import ShoppingHandling from './components/ShoppingHandling.jsx'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  //משתנים המכילים פריטים לקניה לכל קטגוריה המאפשרים לממשק להתעדכן ע"י שינויים
  const [basicItems, setBasicItems] = useState(['נרות שבת', 'יין קידוש', 'חלות', 'תבלינים (מלח, פלפל, פפריקה)', 'משקאות מתוקים', 'חומרים לעוגות']);
  const [firstMealItems, setFirstMealItems] = useState(['עוף או בשר', 'ירקות למרק (תפוחי אדמה, גזר, בצל)', 'שקדי מרק', 'אורז או תוספת אחרת']);
  const [secondMealItems, setSecondMealItems] = useState(['ביצים לסלט ביצים או כבד', 'עוגות לקידוש', 'ירקות עליים לסלט']);
  const [thirdMealItems, setThirdMealItems] = useState(['סלטים', 'קוגל תפוחי אדמה', 'קוגל אטריות', 'מלפפון חמוץ']);
  const [mealItems, setMealItems] = useState(['פיצוחים', 'משקאות קלים', 'ממתקים וחטיפים', 'חלות נוספות כמספר הנפשות', 'קינוח מיוחד']);
  const [hostingItems, setHostingItems] = useState(['מתנה למארחים + שוקולד']);

  return (
    <BrowserRouter>
    {/*הגדרת ניתוב  הדפים*/}
      <Routes>
        <Route path="/" element={
          <Shopping 
          //הצגת הרשימות ע"י העברתם בצורת props
            basicItems={basicItems} setBasicItems={setBasicItems}
            firstMealItems={firstMealItems} setFirstMealItems={setFirstMealItems} 
            secondMealItems={secondMealItems} setSecondMealItems={setSecondMealItems}
            thirdMealItems={thirdMealItems} setThirdMealItems={setThirdMealItems}
            mealItems={mealItems} setMealItems={setMealItems}
            hostingItems={hostingItems} setHostingItems={setHostingItems}
          />
        } />
        <Route path="/save" element={
          <ShoppingHandling 
           //הצגת הרשמה ע"י העברתה בצורת props
            basicItems={basicItems}
            firstMealItems={firstMealItems}
            secondMealItems={secondMealItems}
            thirdMealItems={thirdMealItems}
            mealItems={mealItems}
            hostingItems={hostingItems}
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
