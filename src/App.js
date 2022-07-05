import { useState, useEffect } from "react";
function App() {
  const [selected, setSelected] = useState("users")
  const [contents, setContents] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const BASE_URL = 'https://jsonplaceholder.typicode.com'
  useEffect(() => {
    const fetchItems = async () => {
      try{
        const apiUrl = `${BASE_URL}/${selected}`
        const response = await fetch(apiUrl)
        if(!response.ok) throw Error('Did not recive expected data');
        const listContents = await response.json();
        setContents(listContents)
        setFetchError(null)
      } catch(err){
        setFetchError(err.message)
      }
    }
    fetchItems()
  }, [selected])
  return (
    <div className="App">
      <button className='usersBtn'
        onClick={() => setSelected("users")}
        style={{backgroundColor: selected === "users" ? 'green' : ""}}
      >users</button>
      <button className='postsBtn'
        style={{backgroundColor: selected === "posts" ? 'green' : ""}}
        onClick={() => setSelected("posts")}
      >posts</button>
      <button className='commentsBtn'
       onClick={() => setSelected("comments")}
       style={{backgroundColor: selected === "comments" ? 'green' : ""}}
      >comments</button>
      <div>
        <ul>
          {
            contents && contents.length? contents.map((content) => (
              <li key={content.id}>{JSON.stringify(content)}</li>
            )) : "nothig"
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
