import Footer from "./components/Footer";
import GenreSidebar from "./components/GenreSidebar";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <div className=" bg-linear-180 from-[#390f8a] from-10% via-[#160138] via-30% to-[#090017] to-95%">
        <div className="text-amber-50 z-50 p-4 sticky top-0 h-15 rounded-b-lg drop-shadow-[#1e1532c9] grid items-center header ">
          <Header></Header>
        </div>
        <div className="mx-2 text-amber-50 mt-1.5 min-h-screen gap-2 grid grid-cols-10">
          <div className="rounded-2xl max-h-fit backdrop-blur-sm bg-[#0d01214b] shadow-inner pb- col-span-2 z-20">
            <GenreSidebar></GenreSidebar>
          </div>
          <div className="p-4 backdrop-blur-sm shadow-inner bg-[#0d01214b] rounded-2xl col-span-8">
            <HomePage></HomePage>
          </div>
        </div>
        <div className=" mt-2 bg-[url('/sand.jpg')] bg-cover bg-no-repeat bg-center  text-amber-50 rounded-2xl">
          <div className="h-60  backdrop-blur-xl rounded-t-2xl">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
//
export default App;
