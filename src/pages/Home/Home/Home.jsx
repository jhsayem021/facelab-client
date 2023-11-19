
import HomeMiddle from "../HomeMiddle/HomeMiddle";


const Home = () => {
 
     
   
    return (
      
     <>
   <div className="grid grid-cols-12 ">
    <div className="col-span-3 h-full bg-blue-600 lg:inline-block hidden">
      {/* code for Active */}
    </div>
    <div className="lg:col-span-6 col-span-12 lg:px-10  ">
 
      <HomeMiddle></HomeMiddle>
    </div>
    <div className="col-span-3 h-full bg-blue-600 hidden lg:inline-block ">
    {/* code for side post */}
    </div>
   </div>
     </>
    );
};

export default Home;