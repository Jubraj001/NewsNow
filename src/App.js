import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';


function App() {
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress,setProgress] = useState(0);

  const showProgress=(progress)=>{
    setProgress(progress);
  }
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      /> 
        <Routes>
          <Route exact path="/"  element={<News key="general" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="general"/>} />
          <Route exact path="/business" element={<News key="business" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News key="entertainment" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="entertainment"/>} />
          <Route exact path="/health" element={<News key="health" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="health"/>} />
          <Route exact path="/science" element={<News  key="science" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News key="sports" apiKey={apiKey} showProgress={showProgress} pageSize={pageSize} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News key="technology"  apiKey={apiKey}showProgress={showProgress} pageSize={pageSize} country="in" category="technology"/>} />
        </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
