import React, { useState, useEffect } from 'react';
import { Gallery } from "react-grid-gallery";
import deleteIcon from '../Images/deleteIcon.png';

function ImageUpload() {

  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState([]);
  const [imageReady, setImageReady] = useState(false);

  // for moodboard 
  const [popUp, setPopUp] = useState(false)
  const [poppedImage, setPoppedImage] = useState()

  const fetchImages = async () => {
    try{
      const response = await fetch('/api/getImages')
      const data = await response.json();
      console.log('from data: ',data)
   
      const formatPhotoData = [];
      data.forEach(el => {
        const elkey = el.imageid;
        const elurl = el.imageurl;
        formatPhotoData.push({src: elurl})
      })

      await setPhotos(formatPhotoData)
      setImageReady(true);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if(!imageReady){
      fetchImages();
    }
  },[]);


  console.log('photos: ', photos)




  const submit = async event => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    setCaption('')
  
    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Upload successful:", responseData);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  const handleClick = (e, { src } ) => {
    setPoppedImage(src)
    setPopUp(true)
  };

  const closeModal = () => {
    setPopUp(false)
  }


  const deleteImgFunc = async () => {
    try{
      const imgSrc = poppedImage;
      await fetch('/api/deleteImage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imgSrc }),
    })
    window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      <h1>image upload</h1>

      <form onSubmit={submit}>
        <input onChange={e => setFile(e.target.files[0])} type="file" accept='image/*'></input>
        <input value={caption} onChange={e => setCaption(e.target.value)} type='text' placeholder='caption' />
        <button type='submit'>Submit</button>
      </form>

      <div>
        <h1>moodboard</h1>

        <div id='moodboard-container' style={{width: '900px', height: '200px'}}>
          <Gallery images={photos} onClick={handleClick}/>
        </div>
      </div>
      {popUp && (
        <div className='pop-up'>
          <div className='pop-up-overlay' onClick={closeModal}></div>
          <div className='pop-up-content'>
            <img src={poppedImage} alt="" />
            <button onClick={closeModal}>Close</button>
            <button onClick={deleteImgFunc}>Delete Img</button>
          </div>
        </div>
      )}

    </>
  )
}

export default ImageUpload;