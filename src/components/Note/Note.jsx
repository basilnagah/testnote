import axios from 'axios'
import React, { useContext, useState } from 'react'
import { userContext } from '../../context/user.context'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';

export default function Note({ note, getNotes }) {
    const { token, setToken } = useContext(userContext)
    const [notes, setNotes] = useState(null);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function test() {
        handleShow()
        formik.values.title = note.title
        formik.values.content = note.content
    }

    async function updateNote(values) {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
            method: 'PUT',
            data: values,
            headers: {
                token: `3b8ny__${token}`
            }
        }

        const data = await axios.request(options)
        handleClose()
        getNotes()
    }

    async function deleteNote(id) {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            method: 'DELETE',
            headers: {
                token: `3b8ny__${token}`
            }
        }

        const data = await axios.request(options)
        getNotes()
    }
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        onSubmit: updateNote,
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
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="col-md-4 p-3">
                <div className="inner bg-white shadow-sm border rounded-3 px-4 py-2">
                    <h4 className='fs-3'>{note.title}</h4>
                    <h6 className='fs-4'>{note.content}</h6>
                    <i onClick={() => { test() }} className="fa-regular fa-pen-to-square me-2 fs-4"></i>
                    <i onClick={() => { deleteNote(note._id) }} className='fa-solid fa-trash  fs-4'></i>
                </div>
            </div>
        </>
    )
}
