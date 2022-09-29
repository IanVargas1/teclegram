import db, { auth } from "../firebase";
import firebase from "firebase";
import { uploadFile } from "../firebase";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./UploadA.css";
import { v4 } from "uuid";

function UploadA() {
  const [load, setLoad] = useState(false);
  const [file, setfile] = useState(null);
  const { fileType, setFileType } = useState("");
  const { emailID } = useParams();
  const navigate = useNavigate();
  const changeS = (e) => {
    setLoad(e);
    var x = document.getElementById("btnSendA").style;
    console.log(x.display);
    if (x.display === "none") {
      x.display = "inline";
    } else {
      x.display = "none";
    }
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
    var x = document.getElementById("loadA").style;
    console.log(x.display);
    if (x.display === "none") {
      x.display = "inline";
    } else {
      x.display = "none";
    }
  };

  const nav = () => {
    if (emailID) {
      navigate(`/${emailID}`);
    }
  };

  function hide() {
    var x = document.getElementById("menu").style;
    console.log(x.display);
    if (x.display === "none") {
      x.display = "inline";
    } else {
      x.display = "none";
    }
  }
  const [chatUser, setChatUser] = useState({});
  const send = (e) => {
    e.preventDefault();
    if (emailID) {
      var cod = v4();
      let playload = {
        id: cod,
        text: load,
        senderEmail: auth?.currentUser?.email,
        reciverEmail: emailID,
        type: "audio",
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
                accept="wav, .wma, .aac, .mp3, .m4a"
                onChange={change}
                // style={{ display: "none" }}
              />
              {/* <label htmlFor="loadImg"><CameraAltIcon/></label> */}
            </form>
            <hr />

            {load ? (
              <audio
                controls
                className="preview-media"
                src={load}
                style={{ width: "400px" }}
              />
            ) : null}

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
              onClick={nav}
            >
              cancel
            </button>
            <button
              id="loadA"
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                marginBottom: "10px",
                marginRight: "20px",
                display: "none",
              }}
              onClick={handleSubmit}
            >
              Load Audio
            </button>
            <button
              id="btnSendA"
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                marginBottom: "10px",
                display: "none",
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
