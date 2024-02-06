import React, { useState } from 'react'
import axios from 'axios';

const DownloadHistory = ({premium}) => {
    const [click,setClick] = useState(false)
    const [downloadlist,setDownloadlist] = useState([])

    const downloadHistory = async()=>{
        const token = localStorage.getItem("token");
      try{
        setClick(!click)
        const history = await axios.get('api/expense/getDownload', {
            headers: { "Authorization": token },
          })
        console.log(history)
        setDownloadlist(history.data)
      }catch (err){
        alert('error getting the download history' ,err)
      }
    }
  return (
    <>
    <button onClick={downloadHistory}>Download History</button>
     <h3>Download History</h3>
      {click && premium && downloadlist.map((data,index)=>{
        return <p key={data.id}> {index} -- {data.downloadUrl}</p>
      })}

    
    </>
  )
}

export default DownloadHistory
