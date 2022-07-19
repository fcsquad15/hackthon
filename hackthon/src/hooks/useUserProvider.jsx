/* eslint-disable indent */
import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openDetailPerson, setOpenDetailPerson] = useState(false);
  const [currentPerson, setCurrentPerson] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  return {
    openModal,
    setOpenModal,
    openDetailPerson,
    setOpenDetailPerson,
    currentPerson,
    setCurrentPerson,
    errorMesage,
    setErrorMessage,
    open,
    setOpen,
  };
}

export default useUserProvider;
