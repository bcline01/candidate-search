// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    readonly name: string | null;
    readonly login: string | null; // GitHub username
    readonly location: string | null;
    readonly avatar_url: string | null;
    readonly email: string | null;
    readonly html_url: string | null;
    readonly company: string | null;
}

export default Candidate