import { useState, useEffect } from 'react';
import Candidate from "../interfaces/Candidate.interface";
import { HiX } from "react-icons/hi";


const SavedCandidates = () => {
  // State to store the parsed candidates
  const [parsedCandidates, setParsedCandidates] = useState<Candidate[]>([]);

  // Load candidates from localStorage when the component mounts
  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (typeof storedCandidates === 'string') {
      setParsedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Function to remove a user
  const removeUser = (html_url: string | null) => {
    if (!html_url) return; 

    const updatedCandidates = parsedCandidates.filter(candidate => candidate.html_url !== html_url);

    // Update the state
    setParsedCandidates(updatedCandidates);

    // Update localStorage
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
  
      {parsedCandidates.length > 0 ? (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>GitHub URL</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parsedCandidates.map((candidate: Candidate) => (
              <tr key={candidate.login || candidate.name}>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.login || 'N/A'}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>
                  <img 
                    src={candidate.avatar_url || 'https://avatars.githubusercontent.com/u/302001?s=80&v=4'} 
                    alt="Avatar" 
                    style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white' }} 
                  />
                </td>
                <td>{candidate.email || 'N/A'}</td>
                <td>
                  <a href={candidate.html_url || '#'} target="_blank" rel="noopener noreferrer">
                    {candidate.html_url || 'N/A'}
                  </a>
                </td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <button onClick={() => removeUser(candidate.html_url || '')}>
                    <HiX />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </>
  )};
  
  
export default SavedCandidates;



