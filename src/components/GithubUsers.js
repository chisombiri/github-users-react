import {useState, useEffect} from 'react';

const url = "https://api.github.com/users";

const GithubUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    //request for github user data
    const getUsers = async() => {
        setIsLoading(true);
        setError(false);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Something went Wrong...')
            }
            const data = await res.json();
            setUsers(data);
            setIsLoading(false);
        } catch (error) {
            setError(true);
            setIsLoading(false);
        }
        
    };

    //avoid infinite re-render
    useEffect(() => {
        getUsers();
    }, []);
    

  return (
    <div className='--bg-primary --py2'>
        <div className="container">
            <header>
                <h1 className='--text-center --text-light'>Github Users List</h1>
                <div className="--line"></div>
            </header>

            {isLoading && (
                <div className="--center-all --p">
                    <h3 className='--text-light'>Loading Users...</h3>
                </div>
            )}

            <div className="--grid-25 --py">
                {/* rendering each indivdual user fetched from data, if no error */}
                {error ? (<h4 className='--text-light'>Something went wrong in getting users...</h4>) 
                    : 
                    (
                        users.map((user) => {
                            const {id, login, avatar_url, html_url} = user;
        
                            return(
                                <div key={id} className="--card --flex-start --bg-light --p">
                                    <img src={avatar_url} alt={login} className='--mx --profile-img' />
                                    <span>
                                        <h4>{login}</h4>
                                        <a href={html_url}>View Profile</a>
                                    </span>
                                </div>
                            )
                        })
                    )
                }

            </div>
        </div>
    </div>
  )
}

export default GithubUsers;