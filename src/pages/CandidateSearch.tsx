import { useState, useEffect} from 'react';
import { searchGithub, searchGithubUser} from '../api/API';
import  Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to hold current candidate
 
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: '',
});

// fetch data from API
useEffect(() => {
const fetchCandidates = async () => {
  try {
    const users = await searchGithub();
    console.log(users);
    if (users.length > 0) {
      const username = users[0].login;
      const userDetails = await searchGithubUser(username);
      setCurrentCandidate({
        avatar_url: userDetails.avatar_url,
        name: userDetails.name,
        location: userDetails.location,
        email: userDetails.email,
        company: userDetails.company,
        html_url: userDetails.html_url,
        login: userDetails.login,
      });
    }
  } catch (err) {
    console.log('Error fetching Candidates', err);
  }
};
fetchCandidates();
}, []);




// save fetched data to local storage

const addToStorage = () => {
  let storage = localStorage.getItem('candidates');
  if (storage) {
    let candidates = JSON.parse(storage);
    candidates.push(currentCandidate);
    localStorage.setItem('candidates', JSON.stringify(candidates));
  } else {
    localStorage.setItem('candidates', JSON.stringify([currentCandidate]));
  }
};

// click the add button and save candidate to potential candidates

// click next button to move to the next profile. 










return (
  <section>
    <h1> Candidate Search</h1>


    

      {/* Display Current Candidate */}
      {currentCandidate && (
        <div>
          <h2>{currentCandidate.name} {currentCandidate.login}</h2>
          <img src={currentCandidate.avatar_url as string} alt="Avatar" />
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>GitHub URL: <a href={currentCandidate.html_url as string} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
        </div>
      )}

      {/* Save Button */}
      <button className='btn' id='btn2' onClick={addToStorage}></button>
  </section>
);
}

export default CandidateSearch;