import "./pages.css";
import logoSvg from "../assets/images/Logo.svg";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  OKShareButton,
  OKIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  VKShareButton,
  VKIcon,
} from "react-share";
import { useState } from "react";

const shareURL = "http://localhost:5174/";

interface IFormFields {
  email: string;
}

function Start() {
  const [isShared, setIsShared] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<IFormFields>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
  };

  const shareHandler = (event: any) => {
    event.preventDefault();

    if (isShared === 0) {
      setIsShared(2);
    }
    if (isShared === 1) {
      setIsShared(3);
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    }
  };

  const restart = () => {
    reset();
    setIsShared(0);
    setIsComplete(false);
  };

  return isComplete ? (
    <div className="container">
      <div className="header__logo">
        <img src={logoSvg} alt="AviaSales" />
      </div>
      <div className="content">
        <div className="content__title">
          <h1>
            класс! теперь ты <br />
            <span>участвуешь в конкурсе</span>
          </h1>
        </div>
        <div className="content__description">
          <h3>
            Ты прошел все наши карты, но ты всегда можешь вызвать inDriver
            по-настоящему, для этого переходи по ссылке!
          </h3>
        </div>
      </div>
      <button onClick={() => restart()} className="refresh__button">
        Пройти заново
      </button>
    </div>
  ) : (
    <div className="container">
      <div className="header__logo">
        <img src={logoSvg} alt="AviaSales" />
      </div>
      <div className="content">
        <div className="content__title">
          <h1>
            все круто! теперь <br />
            <span>выигрывай путешествие</span>
          </h1>
        </div>
        <div className="content__description">
          <h3>
            Чтобы участвовать в розыгрыше <br /> путешествия, оставь актуальную
            почту и поделись с друзьями
          </h3>
        </div>
      </div>
      <div className="form-container">
        <form
          className={`form ${isSubmitSuccessful ? "form--disabled" : ""}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form__step">
            <div className="step__number">1</div>
            <span className="step__title">Оставь актуальный email</span>
          </div>

          <input
            {...register("email", {
              required: "Вы забыли ввести email",
              pattern: {
                value:
                  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: "Неверный формат почты",
              },
            })}
            placeholder="Ввести Email"
            className={`form__input ${errors.email ? "error" : ""}`}
            type="text"
            disabled={isSubmitSuccessful}
          />

          <div className="error__message">
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>
          <button className="form__button" disabled={isSubmitSuccessful}>
            Я оставил
          </button>
        </form>

        {/* ВТОРАЯ ФОРМА */}

        <form
          className={
            !isSubmitSuccessful
              ? "form__social form--disabled"
              : "form__social" && isShared === 3
              ? "form__social form--disabled done"
              : "form__social"
          }
        >
          <div className="form__social__step">
            <div
              className={`form__social-step__number ${
                isShared === 3 ? "done" : ""
              }`}
            >
              2
            </div>
            <span className="step__title">Поделись с друзьями</span>
          </div>
          <div onClick={() => setIsShared(1)} className="social--links">
            <LinkedinShareButton url={shareURL}>
              <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <VKShareButton url={shareURL}>
              <VKIcon size={50} round={true} />
            </VKShareButton>
            <TwitterShareButton url={shareURL}>
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
            <OKShareButton url={shareURL}>
              <OKIcon size={50} round={true} />
            </OKShareButton>
          </div>
          <div className="error__message">
            {isShared === 2 && (
              <p style={{ color: "red" }}>Надо все же поделится</p>
            )}
          </div>
          <button
            onClick={(event) => shareHandler(event)}
            className="form__social__button"
          >
            Я поделился
          </button>
        </form>
      </div>
    </div>
  );
}

export default Start;
