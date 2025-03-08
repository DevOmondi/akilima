import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { QueryClient, useMutation } from "@tanstack/react-query";
type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

}
const Add = (props: Props) => {

  const queryClient = new QueryClient();
    console.log("deleting");
    
    const mutation = useMutation({
        mutationFn:()=>{
            return fetch(`http://localhost:8800/api/${props.slug}s`, {
                method: "post",
                headers:{
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id:20,
                  img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
                  lastName: "Kindiki",
                  firstName: "Mwansss",
                  email: "kindsnwv@hotmail.com",
                  phone: "123 456 789",
                  createdAt: "12.08.2023"
                })
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries([`all${props.slug}`])
            
        }
    })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //add new item
    mutation.mutate()

  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>X</span>
        <h1>Add new{props.slug}</h1>
        <form onSubmit={handleSubmit} >
          {
            props.columns
              .filter((item) => item.field !== "id" && item.field !== "img")
              .map(column => (
                <div className="item">
                  <label>{column.headerName}</label>
                  <input type={column.type} placeholder={column.field} />
                </div>
              ))
          }
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add