import "./pages.css";
import logoSvg from "../assets/images/Logo.svg";

function Start() {
  return (
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
    </div>
  );
}

export default Start;
