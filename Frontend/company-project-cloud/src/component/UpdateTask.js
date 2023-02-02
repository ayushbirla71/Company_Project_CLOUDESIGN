import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateTask = () => {
    let [demo, setDemo] = useState([])
    let navigate = useNavigate();

    const GetAllTasks = () => {
        axios.get("http://localhost:3001/gettask")
            .then((res) => { console.log(res.data); setDemo(res.data.data) })
            .catch((err) => { console.log(err.message); })
    }
    useEffect(() => {
        GetAllTasks()
    }, [])

    const dragstart = (e, Title, Status) => {
        console.log("drag has started")
        e.dataTransfer.setData("Title", Title)
        e.dataTransfer.setData("Status", Status)
    }

    const draggingOver = (e) => {
        e.preventDefault();
        console.log("Dragged Over now")
    }

    const dragDropped = (e, Status) => {
        console.log("You have Dropped")
        let Title = e.dataTransfer.getData("Title")
        let task = demo.filter((dem) => {
            if (dem.Title === Title) {
                dem.Status = Status
                axios.put("http://localhost:3001/updateTask", { Title, Status })
                    .then((res) => { console.log(res.data) })
                    .catch((err) => { console.log(err.message) })
            }
            return dem
        })
        setDemo(task)
    }

    const dragDroppedComp = (e, Status) => {
        console.log("You have Dropped")
        let Title = e.dataTransfer.getData("Title")
        let task = demo.filter((dem) => {
            if (dem.Title === Title) {
                dem.Status = Status
                axios.put("http://localhost:3001/updatetask", { Title, Status })
                    .then((res) => { console.log(res.data) })
                    .catch((err) => { console.log(err.message) })
            }
            return dem
        })
        setDemo(task)
    }

    return (
        <div style={{backgroundColor: "black", height: "590px", textAlign:"center"}}>
            <button className="btn btn-info" id="signup" onClick={() => { navigate("/") }}>CreateTask</button>
            <h1 style={{color:"white"}}> Task Status</h1>
            <div className="row" style={{ justifyContent:"center", display:"flex" ,backgroundColor:"black"}}>
                <div
                    className="center-block"
                    style={{overflow:"hidden", backgroundColor: "#00FFFF", height: "500px", width: "25%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center",  }}>
                        Open</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Open") {
                            return <div
                                key={index} style={{ border: "2px solid yellow", margin: '5px', background: "#FF4500", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title, Status)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>

                <div
                    className="center-block"
                    style={{overflow:"hidden", backgroundColor: "#00FFFF", height: "500px", width: "25%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}
                    onDragOver={(e) => draggingOver(e)}
                    onDrop={(e) => dragDropped(e, "Work-In-Progress")}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center" }}>
                        Work-In-Progress</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Work-In-Progress") {
                            return <div
                                key={index} style={{ border: "2px solid Lime", margin: '5px', background: "yellow", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>


                <div
                    className="center-block"
                    style={{ backgroundColor: "#00FFFF", height: "500px", width: "25%", margin: "10px", float: "center", border: "1.5px solid blue", borderRadius: "10px" }}
                    onDragOver={(e) => draggingOver(e)}
                    onDrop={(e) => dragDroppedComp(e, "Completed")}>
                    <label style={{ borderBottom: "2px solid black", width: "100%", background: "violet", textAlign: "center" }}>
                        Completed</label>
                    {demo.map((book, index) => {
                        let { Title, Status, Deadline } = book
                        if (Status === "Completed") {
                            return <div
                                key={index} style={{ border: "2px solid red", margin: '5px', background: "#7CFC00", borderRadius: "10px" }}
                                draggable onDragStart={(e) => dragstart(e, Title)}>
                                <p style={{ margin: "1px" }}>Title : {Title} <br /> Deadline :{Deadline.split("T")[0]}</p>
                            </div>
                        } else return ''
                    })}
                </div>
            </div>

        </div>

    )
}

export default UpdateTask;