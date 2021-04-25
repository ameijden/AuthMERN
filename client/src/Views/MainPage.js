import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../Components/modal";
import UserDetailsForm from "../Components/userDetailsForm";

export default function MainPage() {
  const user = useSelector((state) => state.auth.user);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    let details = {
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      street: user.street,
      city: user.city,
      zipcode: user.zipcode,
    };

    let detailsCheck = hasNull(details);
    // console.log(detailsCheck);
    setModalShow(detailsCheck);
  }, [user]);

  function hasNull(target) {
    for (var member in target) {
      if (target[member] === null) return true;
    }
    return false;
  }

  const toggleModal = () => {
    setModalShow(modalShow);
  };

  return (
    <div className='h-full w-full'>
      <div className="h-full flex items-center justify-center text-4xl">
        Home Screen
      </div>
      <Modal
        open={modalShow}
        onClose={toggleModal}
        closeButtonShow={false}
        outSideTouchClose={false}>
        <UserDetailsForm></UserDetailsForm>
      </Modal>
    </div>
  );
}
