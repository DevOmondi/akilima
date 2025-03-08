import "./topBox.scss"
import {topDealUsers} from "../../data.ts"
import { useState } from "react"
import AudioBox from "../audio/audioBox.tsx"
import audio from "../../songs/audio.mp3"
const TopBox = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className="topBox">
      <h1> Recordings</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="listen" onClick={()=>setOpen(true)}>
              Audio
            </span>
          </div>
        ))}
      </div>
      {open && <AudioBox setOpen={setOpen} audioSrc={audio}/>}
    </div>
  )
}

export default TopBox