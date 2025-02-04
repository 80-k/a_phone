import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebGiViewer from "./components/WebgiViewer";
import { useRef } from "react";
import Loader from "./components/Loader";

function App() {
  const webGiViewerRef = useRef(null);
  const contentRef = useRef(null);

  const handlePreview = () => {
    webGiViewerRef.current.triggerPreview();
  }

  return (
    <div className="App">
      <Loader />
      <div ref={contentRef} id='content'>
        <Nav />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview}/>
      </div>
      <WebGiViewer contentRef={contentRef} ref={webGiViewerRef}/>
    </div>
  );
}

export default App;
