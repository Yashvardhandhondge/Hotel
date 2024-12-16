import { configureStore } from "@reduxjs/toolkit";

import ModalReducer from "../ReduxSlices/ModalSlice";
import AuthReducer from "../ReduxSlices/AuthSlice";
import NFTReducer from "../ReduxSlices/NFTSlice";
import CommunicationReducer from "../ReduxSlices/CommunicationSlice";
import TimeReducer from "../ReduxSlices/TimeSlice";
import ReservationReducer from "../ReduxSlices/ReservationSlice";
import NotificationReducer from "../ReduxSlices/NotificationSlice";
import SearchReducer from "../ReduxSlices/SearchSlice";
import YieldReducer from "../ReduxSlices/PropertySlice";
import PerpsReducer from "../ReduxSlices/PerpSlice";

export const Store = configureStore({
  reducer: {
    modal: ModalReducer,
    auth: AuthReducer,
    nft: NFTReducer,
    communication: CommunicationReducer,
    time: TimeReducer,
    reservation: ReservationReducer,
    notification: NotificationReducer,
    search: SearchReducer,
    yield: YieldReducer,
    perps: PerpsReducer,
  },
});
