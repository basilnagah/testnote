import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup'
import { userContext } from '../../context/user.context';
import Note from '../../components/Note/Note';


export default function Home() {
  const { token, setToken } = useContext(userContext)
  const [notes, setNotes] = useState(null);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function addNote(values) {
    try {
      const options = {
        url: 'https://note-sigma-black.vercel.app/api/v1/notes',
        method: 'POST',
        data: values,
        headers: {
          token: `3b8ny__${token}`
        }
      }

      const { data } = await axios.request(options)
      if (data.msg == 'done') {
        console.log('eshta');
        getNotes()
        handleClose()
      }

    } catch (err) {
      console.log(err);
      // setError('email or password is incorrect')
    }
  }
  async function getNotes() {
    const options = {
      url: 'https://note-sigma-black.vercel.app/api/v1/notes',
      method: 'GET',
      headers: {
        token: `3b8ny__${token}`
      }
    }

    const { data } = await axios.request(options)
    setNotes(data.notes)
  }


  function test(title,content){
  formik.values.title = title    
  formik.values.content = content    
    handleShow()
  }

  useEffect(() => {
    getNotes()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit:addNote,
  });
  return (
    <>





      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control my-2 fw-semibold"
              placeholder="Enter your title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              type="text"
              className="form-control my-2 fw-semibold"
              placeholder="Enter your content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>



      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button variant="primary" onClick={handleShow} className="btn btn-info text-white">
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">
              {notes?.map((note)=>{
                return <Note key={note._id} note={note} getNotes={getNotes}></Note>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
