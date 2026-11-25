import {useState} from "react";
function About() {
  const [providers, setProviders] = useState(() => {
    const saved = localStorage.getItem("aboutProviders");
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState(""); 
  const [aboutInfo, setAboutInfo] = useState("");

  const handleAddProvider = (e) => {
    e.preventDefault();
    if (!name.trim() || !service.trim() || !location.trim()) return;
    
    const newProvider = {
      id: Date.now(),
      name,
      service,
      location,
      phone,
      aboutInfo,
    };
    const updatedProviders = [...providers, newProvider];
    setProviders(updatedProviders);
    localStorage.setItem("aboutProviders", JSON.stringify(updatedProviders));

    setName("");
    setService("");
    setLocation("");
    setPhone("");
    setAboutInfo("");
  };

  const handleDeleteProvider = (id) => {
    const filteredProviders = providers.filter((item) => item.id !== id);
    setProviders(filteredProviders);
    localStorage.setItem("aboutProviders", JSON.stringify(filteredProviders));
  };
  return (
    <div id="about" className="about-page">
      <div className="container">
        <h1>About Us</h1>
        <p>Welcome to the About page. Add your content here.</p>
        <form onSubmit={handleAddProvider}>
          <input
            type="text"
            placeholder="Your Name / Teaching or Service Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Service (e.g. Tutor, Beautician)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address / Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            />
          <textarea
            placeholder="About you / what you teach or offer"
            value={aboutInfo}
            onChange={(e) => setAboutInfo(e.target.value)}
          />
          <button type="submit">Add Details</button>
        </form>
        <div>
          {providers.map((item) => (
            <div key={item.id} style={{background: "#fff",padding: "12px", borderRadius: "8px", marginTop: "10px"}}>
              <h3>{item.name} — {item.service}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p>{item.aboutInfo}</p>
              <button type="button" onClick={() => handleDeleteProvider(item.id)} style={{ background: "#ef4444", color: "#fff", border:"none", padding:"4px 10px", borderRadius:"5px"}}>Delete</button>
            </div> 
          ))}
        </div>
        {/* Add your about content below */}
        
      </div>
    </div>
  );
}

export default About;
