import { useState, useEffect} from 'react';
import { searchGithub, searchGithubUser} from '../api/API';
import  Candidate from '../interfaces/Candidate.interface';
import { IoMdRemoveCircle } from 'react-icons/io';
import { IoAddCircleSharp } from 'react-icons/io5';


const CandidateSearch = () => {
  // State to hold current candidate
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState<Array<Candidate>>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: '',
});

const handleButtonClick = () => {
  setCurrentIndex((index) => index + 1);
};

const nextCandidate = response.length > currentIndex;


// Fetch candidates from GitHub API 
useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const data = await searchGithub();
      // Map data to Candidate interface
      const fetchedCandidates: Candidate[] = data.map((user: Candidate) => ({
        name: user.name || null,
        login: user.login,
        location: user.location || 'No location available',
        avatar_url: user.avatar_url || 'No avatar available',
        email: user.email || 'No email available',
        html_url: user.html_url || 'No address available',
        company: user.company || 'No company available',
      }));
      setResponse(fetchedCandidates);
      setError(null); 
  } catch (error) {
    setError('Error fetching candidates');
  }
};

fetchCandidates();
}, []);

useEffect(() => {
  const fetchUserDetails = async () => {
    if (nextCandidate) {
      try {
        const login = response[currentIndex].login;
        if (login) {
        const user = await searchGithubUser(login);
        if (user) {
          setCurrentCandidate({
            name: user.name || 'No name available',
            login: user.login,
            location: user.location || 'No location available',
            avatar_url: user.avatar_url || 'No avatar available',
            email: user.email || 'No email available',
            html_url: user.html_url || 'No address available',
            company: user.company || 'No company available',
          });
        } else {
          setCurrentCandidate(null);
        }
      } else {
        setCurrentCandidate(null); // Handle case where login is null
      }
    } catch (error) {
      setError('Error fetching user details');
    }
  }
};

fetchUserDetails();
}, [currentIndex, nextCandidate, response]);

// Save candidate to local storage
const saveCandidate = () => {
  let parsedCandidates: Candidate[] = [];
  const storedCandidates = localStorage.getItem('candidates');
  if (typeof storedCandidates === 'string') {
    parsedCandidates = JSON.parse(storedCandidates);
  }
  if (currentCandidate) {
    parsedCandidates.push(currentCandidate);
    localStorage.setItem('candidates', JSON.stringify(parsedCandidates));
  }
  handleButtonClick();
};


return (
  <div className='main'>
    <h1> Candidate Search</h1>
    <div className="candidate">


      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Current Candidate */}
      {currentCandidate && (
        <div>
        <h2>{currentCandidate.name || currentCandidate.login}</h2>
        <img src={currentCandidate.avatar_url || "https://avatars.githubusercontent.com/u/302001?s=80&v=4"} alt="Avatar" className='candidate-photo'/>
        <div className='candidate-details'>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>GitHub URL: <a href={currentCandidate.html_url as string} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
        </div>
        </div>
      )}

      {/* Save Button */}
      <div className='candidate-buttons'>
      <div onClick={handleButtonClick}>
      <IoMdRemoveCircle className="button remove-button" /></div>
      <div onClick={saveCandidate}>
      <IoAddCircleSharp className="button add-button" /></div>

      </div>
      </div>
  </div>
);
}

export default CandidateSearch;