import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from "react";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Author name is required"),
    num: Yup.number().required("ISBN Number is required"),
    date: Yup.date().required("Publication Date is required"),
});

export default function Dash() {
    const [book, setBook] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    const initialValues = {
        title: '',
        name: '',
        num: '',
        date: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        if (editIndex !== -1) {
            const updatedBook = [...book];
            updatedBook[editIndex] = values;
            setBook(updatedBook);
            setEditIndex(-1);
        } else {
            setBook([...book, values]);
        }
        resetForm();
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
    };

    const handleDelete = (indexToDelete) => {
        const updatedBook = [...book];
        updatedBook.splice(indexToDelete, 1);
        setBook(updatedBook);
    };

    let i = 0;

    return (
        <div className="a">
            <div>
                <h1>FORM</h1>
            </div>
            <Formik
                initialValues={editIndex !== -1 ? book[editIndex] : initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="b">
                    <div className="mb-3">
                        <label htmlFor="title"><h4>Title</h4></label>
                        <Field type="text" id="title" name="title" placeholder="Title Name" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name"><h4>Author</h4></label>
                        <Field type="text" id="name" name="name" placeholder="Author Name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="num"><h4>ISBN Number</h4></label>
                        <Field type="number" id="num" name="num" placeholder="Enter ISBN" />
                        <ErrorMessage name="num" component="div" className="error" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date"><h4>Publication Date</h4></label>
                        <Field type="date" id="date" name="date" placeholder="Enter publication date" />
                        <ErrorMessage name="date" component="div" className="error" />
                    </div>

                    <div className="mb-3" controlId="formBasicCheckbox">
                        <Field type="checkbox" name="checkbox" />
                        <label htmlFor="checkbox">Check me out</label>
                    </div>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Formik>

            <div className="c">
                <Table className="d" responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author Name</th>
                            <th>ISBN Number</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((data, index) => (
                            <tr key={index}>
                                <td>{i++}</td>
                                <td>{data.title}</td>
                                <td>{data.name}</td>
                                <td>{data.num}</td>
                                <td>{data.date}</td>
                                <td><button onClick={() => handleEditClick(index)}>Click here</button></td>
                                <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
