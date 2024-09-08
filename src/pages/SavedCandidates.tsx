import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  let parsedCandidates: Candidate[] = [];
  const storedCandidates = localStorage.getItem('candidates');
  
  if (typeof storedCandidates === 'string') {
    parsedCandidates = JSON.parse(storedCandidates);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {parsedCandidates.map((candidate: Candidate) => (
        <p key={candidate.login}>{candidate.name}</p>
      ))}
    </>
  );
};

export default SavedCandidates;

