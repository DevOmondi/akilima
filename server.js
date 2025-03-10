import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users =[
        {
          id: 1,
          img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
          lastName: "Hubbawe",
          firstName: "Ebula",
          email: "kewez@@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 2,
          img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Manning",
          firstName: "Stella",
          email: "comhuhmit@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 3,
          img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Greer",
          firstName: "Mary",
          email: "ujudokon@hottmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 4,
          img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Williamson",
          firstName: "Mildred",
          email: "tinhavabe@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 5,
          img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Gross",
          firstName: "Jose",
          email: "gobtagbes@yahoo.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 6,
          img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Sharp",
          firstName: "Jeremy",
          email: "vulca.eder@mail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 7,
          img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Lowe",
          firstName: "Christina",
          email: "reso.bilic@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 8,
          img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Dean",
          firstName: "Garrett",
          email: "codaic@mail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 9,
          img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Parsons",
          firstName: "Leah",
          email: "uzozor@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 10,
          img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Reid",
          firstName: "Elnora",
          email: "tuhkabapu@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 11,
          img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Dunn",
          firstName: "Gertrude",
          email: "gibo@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
          verified: true,
        },
        {
          id: 12,
          img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Williams",
          firstName: "Mark",
          email: "tic.harvey@hotmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 13,
          img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Cruz",
          firstName: "Charlotte",
          email: "ceuc@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 14,
          img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
          lastName: "Harper",
          firstName: "Sara",
          email: "bafuv@hotmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
        {
          id: 15,
          img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
          lastName: "Griffin",
          firstName: "Eric",
          email: "ubi@gmail.com",
          phone: "123 456 789",
          createdAt: "01.02.2023",
        },
      ];

//GET USERS
app.get('/api/users',(req,res)=>{
    res.json(users);
})

//GET USER
app.get('/api/users/:id',(req,res)=>{
const user = users.find((user)=> user.id === parseInt(req.params.id))
res.json(user);
});

//ADD USER
app.post('/api/users',(req,res)=>{
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.json(newUser);
});

//DELETE USER
app.delete("/api/user/:id",(req,res)=>{
  users = users.filter(user => user.id !== parseInt(req.params.id));
      res.json("User deleted");
});

app.listen(8800,()=>{
    console.log("Server running on port 8800");
})


