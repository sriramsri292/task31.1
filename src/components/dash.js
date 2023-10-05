import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import Table from 'react-bootstrap/Table';

export default function Dash() {
    const [book, setBook] = useState([]);

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [date, setDate] = useState('');

    const [editIndex, setEditIndex] = useState(-1); // Initialize with -1

    const handleTitle = (e) => setTitle(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleNum = (e) => setNum(e.target.value);
    const handleDate = (e) => setDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== -1) {
            // If editIndex is not -1, it means we are editing an existing entry
            const updatedBook = [...book];
            updatedBook[editIndex] = { title, name, num, date };
            setBook(updatedBook);
            setEditIndex(-1); // Reset editIndex after editing
        } else {
            // Otherwise, it's a new entry
            const value = { title, name, num, date };
            setBook([...book, value]);
        }
        setTitle('');
        setName('');
        setNum('');
        setDate('');
    }

    const handleEditClick = (index) => {
        setEditIndex(index);
        const data = book[index];
        setTitle(data.title);
        setName(data.name);
        setNum(data.num);
        setDate(data.date);
    };

    const handleDelete = (indexToDelete) => {
        const updatedBook = [...book];
        updatedBook.splice(indexToDelete, 1);
        setBook(updatedBook);
    };
let i=0;
    return (
        <div className="a">
            <div>
                <h1>FORM</h1>
            </div>
            <Form className="b" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h4> Title</h4></Form.Label>
                    <Form.Control className="b" type="Text" value={title} onChange={handleTitle} placeholder="Title Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><h4>Author </h4></Form.Label>
                    <Form.Control className="b" type="Text" value={name} onChange={handleName} placeholder="Author Name" />
                </Form.Group>

                <Form.Label><h4> ISBN Number </h4></Form.Label>
                <Form.Control className="b" type="number" value={num} onChange={handleNum} placeholder="Enter ISBN" />

                <Form.Label><h4> Publication Date </h4></Form.Label>
                <Form.Control className="b" type="Date" value={date} onChange={handleDate} placeholder="Enter publication date" />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

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
        {book.map((data, index) =>(   
          <tr key={index}>
            <td>{i++}</td>
            <td>{data.title}</td>
            <td>{data.name}</td>
            <td>{data.num}</td>
            <td>{data.date}</td>
            <td > <button onClick={() => handleEditClick(index)}> click here  </button>    </td>
            <td> <button onClick={()=> handleDelete(index)}> delete </button>    </td>
           
          </tr>
           ))}
          </tbody>
      </Table> 
            </div>
        </div>
    );
}
