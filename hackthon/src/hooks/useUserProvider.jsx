/* eslint-disable indent */
import { useState } from "react";

function useUserProvider() {
    const [openModal, setOpenModal] = useState(false);

    return [
        openModal, setOpenModal,
    ];
}

export default useUserProvider;
