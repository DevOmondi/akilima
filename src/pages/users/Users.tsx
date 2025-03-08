import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/datatable/DataTable"
import "./users.scss"
import { userRows } from "../../data";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
      field: "img",
      headerName: "Avatar",
      width: 50,
      renderCell: (params) => {
          return <img src={params.row.img || "./noavatar.png"} alt="" />
      }
  },

  {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
  },
  {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
  },
  {
      field: 'email',
      headerName: 'email',
      type: 'string',
      width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 100,
},
{
  field: 'created_at',
  headerName: 'created_At',
  type: 'string',
  width: 90,
  
},
{
  field: 'verified',
  headerName: 'Verified',
  type:'boolean',
  width: 100,
},

];

const Users = () => {
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ['allusers'],
    queryFn: () =>
      fetch('http://localhost:8800/api/users').then(
        (res) => res.json(),
      ),
  })


  return (
    <div className="users">
    <div className="info">
      <h1>Users</h1>
      <button onClick={()=>setOpen(true)}>Add New user</button>
    </div>
{   isLoading? "loading ....": <DataTable slug ="user" columns={columns} rows={userRows}/>}    {open && <Add  slug="user" columns={columns}setOpen={setOpen}/>}
  </div>
  )
}

export default Users