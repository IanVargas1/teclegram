import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./CalendarContainer.css";
import { Button, Icon } from "@mui/material";
import db, { auth } from "../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 } from "uuid";

import EditIcon from "@mui/icons-material/Edit";

{
  /*TODO  NUEVOOO */
}

function CalendarContainer({ currentUser, signOut }) {
  const [descripcion, setMessage] = useState("");
  const [fecha, setDate] = useState("");
  const [hora, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [friendList, setFriendList] = useState([]);
  const enviar = (e) => {
    e.preventDefault();
    var cod = v4();
    let playload = {
      id: cod,
      usuario: currentUser.email,
      date: fecha,
      time: hora,
      description: descripcion,
      titulo: title,
    };

    if (!!descripcion && fecha !== " " && hora !== " " && !!title) {
      db.collection("schedule")
        .doc(currentUser.email)
        .collection("reminder")
        .add(playload);
    } else {
      alert("Algunos campos estan vacios");
    }

    let date = document.getElementById("date");
    date.value = " ";
    let hor = document.getElementById("hor");
    hor.value = " ";
    let desc = document.getElementById("desc");
    desc.value = " ";
    let area = document.getElementById("area");
    area.value = " ";
  };

  useEffect(() => {
    const getFriends = async () => {
      await db
        .collection("schedule")
        .doc(currentUser.email)
        .collection("reminder")
        .onSnapshot((snapshot) => {
          let reminders = snapshot.docs.map((doc) => doc.data());
          setFriendList(reminders);
        });
    };
    getFriends();
  }, []);

  const searchEvent = async (id) => {
    //* Delete from sender
    if (window.confirm("Estas seguro que deseas eliminar el mensaje?")) {
      const data = await db
        .collection("schedule")
        .doc(auth?.currentUser?.email)
        .collection("reminder")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === id) {
              console.log('si',doc.data().id,' - ',id);
              deleteEvent(doc);
            }
          });
        });
    }
  };
  const deleteEvent = async (doc) => {
    await db
      .collection("schedule")
      .doc(auth?.currentUser?.email)
      .collection("reminder")
      .doc(doc.id)
      .delete();
  };

  const onDeleteLink = (id) => {
    console.log("a ver : ", id);
  };
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar currentUser={currentUser} signOut={signOut} />
        <div className="calendar">
          <div class="encabezado">
            Calendario
            <label>{currentUser.id}</label>
          </div>

          <div class="container">
            <form class="form">
              <div>
                <label class="text1">Seleccione una fecha:</label>
                <input
                  id="date"
                  class="date"
                  type="date"
                  value={fecha}
                  onChange={(e) => setDate(e.target.value.trimStart())}
                ></input>
              </div>
              <div>
                <label class="text1">Seleccione una hora:</label>
                <input
                  id="hor"
                  class="date"
                  type="time"
                  value={hora}
                  onChange={(e) => setTime(e.target.value.trimStart())}
                ></input>
              </div>
              <div>
                <label class="text1">Descripcion del Mensaje:</label>
                <input
                  id="desc"
                  class="date1"
                  type="text"
                  placeholder="Titulo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value.trimStart())}
                ></input>
              </div>

              <textarea
                class="textarea"
                id="area"
                value={descripcion}
                onChange={(e) => setMessage(e.target.value.trimStart())}
              ></textarea>
            </form>
            <div>
              <img class="imagen" src="./login.png" alt="" />
            </div>
          </div>
          <button id="env" class="agendar" onClick={enviar}>
            AGENDAR
          </button>
          <div class="linea"></div>
          <div class="eventos">
            {friendList.map((list) => (
              <div>
                <table style={{ width: "90%" }}>
                  <tr>
                    <th>Titulo:</th>
                    <th>Fecha:</th>
                    <th>Hora:</th>
                    <th>Descripcion:</th>
                  </tr>

                  <tr>
                    <td>{list.titulo}</td>
                    <td>{list.date}</td>
                    <td>{list.time}</td>
                    <td>{list.description}</td>
                  </tr>
                </table>
                <button class="Crud crud">
                  {" "}
                  <EditIcon />
                </button>

                <button class="Crud" onClick={() => searchEvent(list.id)}>
                  <DeleteIcon></DeleteIcon>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarContainer;
