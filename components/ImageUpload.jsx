import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({ evtId, imageUploaded }) {
  console.log('EVENT ID: ', evtId)
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('SUBMIT EVENT: ', e)
    const formData = new FormData();

    formData.append('files', image);
    formData.append('ref', 'api::event.event');
    formData.append('refId', evtId);
    formData.append('field', 'image');    

    console.log('FORM DATA: ', formData);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        body: formData,
      });
      
    console.log('FORM DATA AFTER FETCH: ', formData);
    console.log('UPLOAD RES: ', res);

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    console.log('FILE CHANGE: ', e.target.files);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
