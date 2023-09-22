import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import InfoTooltipPopup from "./InfoTooltipPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [status, setStatus] = React.useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards(
        cards.filter((item) => {
          return item._id !== card._id;
        })
      );
    });
  }

  function handleUpdateUser(name, about) {
    api.setUserInfo(name, about).then((data) => {
      setCurrentUser(data);
      handleClosePopup();
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar: avatar }).then((data) => {
      setCurrentUser(data);
      handleClosePopup();
    });
  }

  function handleAddPlace(name, link) {
    api.addCard({ name, link }).then((data) => {
      setCards([data, ...cards]);
      handleClosePopup();
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleClosePopup() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setTooltipOpen(false);
  }

  const onRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res.data._id) {
          console.log("res OK");
          setStatus("success");
          navigate("/signin");
        } else {
          console.log("Something went wrong");
          setStatus("failed");
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("One of the fields was filled in incorrectly");
        } else {
          console.log(err);
        }
        setStatus("failed");
      })
      .finally(() => {
        setTooltipOpen(true);
      });
  };

  const handleLoginSubmit = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          handleLogin();
          setEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("One or more of the fields were not provided");
        } else if (err === 401) {
          console.log(
            "the user with the specified email or password was not found"
          );
        }
        setStatus("failed");
        setTooltipOpen(true);
      });
  };

  useEffect(() => {
    function handleTokenCheck() {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        getContent(jwt)
          .then((res) => {
            if (res) {
              handleLogin();
              setEmail(res.data.email);
              navigate("/");
              setIsLoggedIn(true);
            }
          })
          .catch((err) => {
            if (err === 400) {
              console.log("Token not provided or provided in the wrong format");
            } else if (err === 401) {
              console.log("The provided token is invalid ");
            }
          });
      }
    }
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} handleLogOut={handleLogout} />
      <Routes>
        <Route
          path="/signin"
          element={<Login handleLoginSubmit={handleLoginSubmit} />}
        ></Route>
        <Route
          path="/signup"
          element={<Register onRegister={onRegister} />}
        ></Route>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                isImagePopupOpen={isImagePopupOpen}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <AddPlacePopup
        name=""
        onClose={handleClosePopup}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlace}
      ></AddPlacePopup>
      <EditAvatarPopup
        onClose={handleClosePopup}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        onClose={handleClosePopup}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />
      <InfoTooltipPopup
        isOpen={isTooltipOpen}
        status={status}
        onClose={handleClosePopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
