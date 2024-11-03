import { useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom'
import {fetchTask, createTask, updateTask, deleteTask} from '../api/tasks'
function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          if (!params.id){
            const res = await createTask({
              title,
              description
            })
            console.log(res);
          } else {
            const res = await updateTask(params.id, {
              title,
              description
            })
            console.log(res);
            
          }
          navigate('/');
        } catch (error) {
          console.log(error)
        }
        e.target.reset();
    }
    useEffect(() => {
        if (params.id) {
           fetchTask(params.id).then((res) => {
            setTitle(res.data.title);
            setDescription(res.data.description);
          })
          .catch((err) => console.log(err));
        }
    }, []);

    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-white mb-4 my-4" >{params.id ? "Update Task": "Create Task"}</h1>
            <input type="text"
             placeholder="title" 
            className="block py-2 px-3 w-full mb-4 text-black rounded-md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
            />
            <textarea 
            placeholder="description"
             rows="3"
            className="block py-2 px-3 w-full mb-4 text-black rounded-md"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            ></textarea>
            {
              params.id ? (
                <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Create
                </button>
              )
            }
        </form>
        {
          params.id && (
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow-transparent mt-5"
            onClick={async () => {
            try {
              const res = await deleteTask(params.id);
              console.log(res);
              navigate('/');
              } catch (error) {
                console.log(error)
              }
            }}>
            delete
          </button>
          )
        }
        </div>
      </div>
    )
  }
  
  export default TaskForm