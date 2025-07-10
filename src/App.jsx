import "./App.css"
import { useState } from "react";
import Header from "./components/Header";
import FormSection from "./components/FormSection";
import TicketSection from "./components/TicketSection";
import Attribution from "./components/Attribution";
function App() {
  const [ticketData, setTicketData] = useState(null);

  return (
    <main className="font-mono relative w-full h-auto min-h-screen 
flex flex-col items-center overflow-x-hidden overflow-y-auto z-1
bg-[url('/assets/images/background-mobile.png')] bg-no-repeat bg-cover
bg-neutral-900 md:bg-[url('/assets/images/background-desktop.png')]">
      <Header hasTicket={!!ticketData} />
      {/* FORM OR TICKET */}
      {!ticketData ? (
        <div id="form-container" className="w-full relative z-20 px-4">
          <FormSection
  onGenerate={(data) => {
    setTicketData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
/>
        </div>
      ) : (
        <div id="ticket-container" className="w-full max-w-lg px-4">
          <TicketSection
  data={ticketData}
  onReset={() => {
    setTicketData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
/>
        </div>
      )}

      {/* Squiggly bottom pattern */}
     <div className=" absolute z-1 bottom-0 left-0 max-w-full h-auto pointer-events-none">
       <img
  id="pattern-s-bottom"
  src="/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
  alt="pattern-s-bottom"
/>
     </div>


      <Attribution />
    </main>
  );
}

export default App;
