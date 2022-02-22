import React, {useState} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { Row, Container  } from "react-bootstrap"

const UploadProducts = ({user}) => {
    const [file, setFile] = useState(null);
    const [inputContainsFile, setInputContainsFile] = useState(false);
    const [currentlyUploading, setCurrentlyUploading] = useState(false);
    const [progress, setProgress] = useState(null);

    const fileUploadHandler = () =>{
        const fd = new FormData();
        fd.append('file', file, file.name);
        axios.post("/shop/uploadFile", fd, {
            onUploadProgress: (progressEvent)=>{
                setProgress((progressEvent.loaded/progressEvent.total)*100);
                console.log('upload progress: ', Math.round(progress))
            }
        }).then(({data}) =>{
            setFile(null);
            setInputContainsFile(false);
            setCurrentlyUploading(false);
        }).catch(err=>{
            console.log(err);
            if(err.response.status === 400){
                if(err.response.data.msg) toast.error(err.response.data.msg);
                else{
                    console.log("other error");
                    setInputContainsFile(false);
                    setCurrentlyUploading(false)
                }
            }
        })
    }

    const handleClick = () =>{
        if(inputContainsFile){
            setCurrentlyUploading(true);
            fileUploadHandler();
        }
    }

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
        setInputContainsFile(true);
    }
    return (
        <div className="px-4 py-3">
            <h5 className="mb-0">Upload Product File to Update your products</h5>
            <div className="p-4 rounded shadow-sm bg-light">
                {
                    !currentlyUploading &&
                    <Container >
                        <Row className="d-flex justify-content-center">
                            <label className="mt-4"></label>
                            <input className="form-control" type="file" onChange={handleFile} id="file" name="file"/>
                            <h3 htmlFor="file" className="border" onClick={handleClick}>{file? <>Submit</>:<></> }</h3>
                        </Row>
                    </Container>
                }
            </div>
        </div>
    )
}

export default UploadProducts