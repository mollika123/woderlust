import DestinationCard from "@/components/DestinationCard";


const DestinationPage = async() => {
  const res = await fetch('http://localhost:5000/destination');
  const destinations = await res.json();
  console.log(destinations);
  return (
    <div className="w-11/12  mx-auto space-y-8">
      <h1 className="text-5xl font-bold">All destinations</h1>
     <div className="grid grid-cols-3 gap-4 "> {destinations.map(destination => <DestinationCard key={destination._id} destination={destination}></DestinationCard>)}</div>
    </div>
  );
};

export default DestinationPage;