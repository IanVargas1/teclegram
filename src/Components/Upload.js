import db, { auth } from "../firebase";
import firebase from "firebase";
import { uploadFile } from "../firebase";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./Upload.css";
import { v4 } from "uuid";
function Upload() {
  const [load, setLoad] = useState(false);
  const [file, setfile] = useState(null);
  const { fileType, setFileType } = useState("");
  const { emailID } = useParams();
  const navigate = useNavigate();
  const changeS = (e) => {
    setLoad(e);
    var x = document.getElementById("btnSendI").style;
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
    var x = document.getElementById("loadI").style;
    console.log(x.display);
    if (x.display === "none") {
      x.display = "inline";
    } else {
      x.display = "none";
    }
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
      var cod = v4();
      let playload = {
        id: cod,
        text: load,
        senderEmail: auth?.currentUser?.email,
        reciverEmail: emailID,
        type: "imagen",
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
      // setFileType("");
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
          lastMessage: "",
        });

      db.collection("FriendList")
        .doc(emailID)
        .collection("list")
        .doc(auth?.currentUser?.email)
        .set({
          email: auth?.currentUser?.email,
          fullname: auth?.currentUser?.fullname,
          photoURL: auth?.currentUser?.photoURL,
          lastMessage: "",
        });
    }
  };

  const nav = () => {
    if (emailID) {
      navigate(`/${emailID}`);
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
                accept=".png, .jpg, .jpge "
                onChange={change}
                // style={{ display: "none" }}
              />
              {/* <label htmlFor="loadImg"><CameraAltIcon/></label> */}
            </form>
            <hr />

            {load ? <img className="preview-media" src={load} /> : null}

            <div></div>
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
              id="loadI"
              style={{
                borderRadius: "20px",
                cursor: "pointer",
                marginBottom: "10px",
                marginRight: "20px",
                display: "none",
              }}
              onClick={handleSubmit}
            >
              Load Image
            </button>
            <button
              id="btnSendI"
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

export default Upload;
