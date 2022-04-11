import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditTodo({ todo }) {
  console.log(todo);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description,setDescription]=useState(todo["description"])

  async function UpdateDescription(e){
    e.preventDefault()
    setShow(false)
    try{
        const body={description}
        const response=await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        });
        console.log(response)
        window.location="/"
    }catch(err){
        console.error(err.message)
    }
  }
  

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
          type="text" 
          className="form-control" 
          value={description}
          onChange={(e)=>{
              setDescription(e.target.value)
          }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateDescription}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default EditTodo;
