import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/apiFunctions";


export default function RoomTypeSelector({handleRoomInputChange,newRoom}) {
  const [roomTypes, setRoomTypes] = useState({});
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setnewRoomType] = useState("");
  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data)
    })
  }, [])

  const handleNewRoomInputChange = (e) => {
    setnewRoomType(e.target.value);
  }
  const handleAddnewRoomType = () => {
    if (newRoomType != "") {
      setRoomTypes([...roomTypes, newRoomType])
      setnewRoomType("")
      setShowNewRoomTypeInput(false)
    }
  }
  
  return (
    <>
      {roomTypes.length > 0 && (
        
        <div>
          <select name="roomType" id="roomType" value={newRoom.roomType} onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true)
            } else {
              handleRoomInputChange()
            }
          }}>
            <option value="">select a room type</option>
            <option value={"Add New"}>Add new</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type }</option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input type="text"  className="form-control" placeholder="Enter a new room type" onChange={handleNewRoomInputChange}/>
              <button className="btn btn-hotel" type="button" onClick={handleAddnewRoomType}>Add</button>
            </div>
          )}
        </div>
    )}
    </>
  )
}
