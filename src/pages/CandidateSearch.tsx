import { useState, useEffect, type FormEvent } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: '',
});

// add to saved potential candidates

const addPotentialCandidates = () => {
  let parsedCandidates: Candidate[] = [];
  const storedCandidates = localStorage.getItem('potentialCandidates');
  if (typeof storedCandidates === 'string') {
    parsedCandidates = JSON.parse(storedCandidates);
  }
  parsedCandidates.push(currentCandidate);
  localStorage.setItem('potentialCandidates', JSON.stringify(parsedCandidates))
}

// moves to next candidate and does not save info

// useEffect to display candidates on page load






  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
