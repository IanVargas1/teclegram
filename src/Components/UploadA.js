import db, { auth } from "../firebase";
import firebase from "firebase";
import { uploadFile } from "../firebase";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./UploadA.css";

function UploadA() {
  const [load, setLoad] = useState(false);
  const [file, setfile] = useState(null);
  const {fileType,setFileType} = useState('');
  const { emailID } = useParams();
  const navigate = useNavigate();
  const changeS = (e) => {
    setLoad(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      console.log(emailID);
      changeS(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const change = (e) => {
    setfile(e.target.files[0]);
  };

  function hide() {
    var x = document.getElementById("menu").style;
    console.log(x.display);
    if (x.display === "none") {
      x.display = "flex";
    } else {
      x.display = "none";
    }
  }
  const [chatUser, setChatUser] = useState({});
  const send = (e) => {
    e.preventDefault();
    if (emailID) {
      let playload = {
        text: load,
        senderEmail: auth?.currentUser?.email,
        reciverEmail: emailID,
        type : 'audio',
        timeStamp: firebase.firestore.Timestamp.now(),
      };

      //data to the sender
      db.collection("chats")
        .doc(auth?.currentUser?.email)
        .collection("messages")
        .add(playload);

      //data to reciver
      db.collection("chats").doc(emailID).collection("messages").add(playload);
      console.log(emailID);
    //   setFileType("video");
      if (emailID) {
        navigate(`/${emailID}`);
      }
      
      db.collection("FriendList")
        .doc(auth?.currentUser?.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
        });

      db.collection("FriendList")
        .doc(emailID)
        .collection("list")
        .doc(auth?.currentUser?.email)
        .set({
          email: auth?.currentUser?.email,
          fullname: auth?.currentUser?.fullname,
          photoURL: auth?.currentUser?.photoURL,
        });
    }
    
  };
  return (
    <div className="chat-container">
      <div className="home-container">
        {/* Application logo */}
        <div className="home-bg">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                id="loadImg"
                accept=".mp3, .wav, .wma, .aac"
                onChange={change}
                // style={{ display: "none" }}
              />
              {/* <label htmlFor="loadImg"><CameraAltIcon/></label> */}
            </form>
            <hr />

            {load ? <audio src={load} /> : null}

            <div>
              {/* <p>
                {load ? (
                  <video controls src={load} width="640" height="480"></video>
                ) : (
                  // <audio controls>
                  //   <source src={load} type="audio/mp3"/>
                  // </audio>
                  <h1></h1>
                )}
              </p> */}
            </div>
            <button
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                marginBottom: "10px",
                marginRight: "20px",
              }}
              onClick={handleSubmit}
            >
              Load Video
            </button>
            <button
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={send}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadA;
