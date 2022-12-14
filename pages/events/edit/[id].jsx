import { useState } from 'react';
import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css';
import moment from 'moment';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';
import defaultImage from '../../../public/images/event-default.png'

export default function EditEventPage({ evt }) {
  console.log('EVT DETAILS: ', evt);
  const { name, performers, venue, address, date, time, description } =
    evt.data.attributes;
  const [values, setValues] = useState({
    name: name,
    performers: performers,
    venue: venue,
    address: address,
    date: date,
    time: time,
    description: description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.data.attributes.image.data 
      ? evt.data.attributes.image.data.attributes.formats.thumbnail.url
      : defaultImage
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }
    const data = { data: { ...values } };
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
      console.log('RESONSE: ', res);
    } else {
      const evt = await res.json();
      console.log('EVENT RESPONSE: ', evt);
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, ': ', value);
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    console.log('IMAGE UPLOADED EVENT: ', e);
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`);
    const evtData = await res.json();
    console.log('RESPONSE DATA: ', evtData);
    setImagePreview(evtData.data.attributes.image.data.attributes.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout>
      <Link href={'/events'}>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Save Edit Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();

  return {
    props: {
      evt,
      // token,
    },
  };
}
