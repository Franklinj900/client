import { Link } from 'react-router-dom'
function Navbar(){
    return(
      <header className='text-white py-4 flex justify-between px-10 items-center my-7'>
          <Link to="/"><h1 className='text-3xl font-bold'>Task App</h1></Link>
          <Link to="/task/new"><button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
                  New Task
                </button></Link>
      </header>
    )
}

export default Navbar