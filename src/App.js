import React, { useState, useEffect } from 'react';

import './App.css';

import master from './assets/images/mastercard.png'
import visa from './assets/images/visa.png'
import american from './assets/images/american.png'
import discover from './assets/images/discover.png'
import blank from './assets/images/blank.png'
import close from './assets/images/close.png'




function App() {


  const [getCardType, setGetCardType] = useState(blank);
  const [cardNumber, setCardNumber] = useState("");
  const [errors, setErrors] = useState();
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [maxLength, setMaxLength] = useState(15)


  



  const validate = (cardNumber) => {
    let errors = {}


    if (!cardNumber) {
      setErrorMsg("Please Enter Card Number");
      setIsValid(false)
      return errorMsg;
    }

    let parceCard = parseInt(cardNumber.replace(/\s/g, ''))
    var cardDigits = parceCard.toString().split('');
    for (var i = 0; i < cardDigits.length; i++) {
      cardDigits[i] = parseInt(cardDigits[i], 10);
    }
    var cardTotal = 0;
    var tempNo = false;
    for (i = cardDigits.length - 1; i >= 0; i--) {
      if (tempNo) {
        cardDigits[i] *= 2;
        if (cardDigits[i] > 9) {
          cardDigits[i] = ((cardDigits[i] - 1) % 9) + 1;
        }
      }
      cardTotal += cardDigits[i];
      tempNo = !tempNo;
    }

    if (cardTotal % 10 == 0) {

      errors = ""
      setIsValid(true)
    } else {
      errors = "Invalid Card Number"
      //setErrorMsg("Invalid Card Number")
      setIsValid(false)

    }
    return errors;
  }

  const creditCardType = (cardNumber) => {


    let cardName = `${blank}`;



    if (cardNumber.startsWith(4)) {
      cardName = `${visa}`;
      setMaxLength(19)
    }
    else if (cardNumber.startsWith(34) || cardNumber.startsWith(37)) {
      cardName = `${american}`;
      setMaxLength(18)
    }
    else if (cardNumber.startsWith(6011)) {
      cardName = `${discover}`;
      setMaxLength(19)
    }
    else if (cardNumber.startsWith(51) || cardNumber.startsWith(52) || cardNumber.startsWith(53) || cardNumber.startsWith(54) || cardNumber.startsWith(55)) {
      cardName = `${master}`;
      setMaxLength(19)
    }



    return cardName;
  }

  const handleCardNumber = (e) => {
    let cardNumber = e.target.value;
    cardNumber = cardNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();

    //console.log(cardNumber);

    setCardNumber(cardNumber);
    setGetCardType(creditCardType(cardNumber))

  }
  useEffect(() => {
    handleSubmit();

  }, [cardNumber])

  const handleSubmit = (e) => {
    
    if (cardNumber.length > 13) {
      setErrors(validate(cardNumber));
    }
    else{
      setErrors("")
    }
  }
  const handleClear = () => {
    setCardNumber("");
    setIsValid(false);
    setErrorMsg("")
  }

  return (
    <div className="App">
      <form className="card-box">
        <div className="input-group">

          <input type="tel"
            maxLength={maxLength}
            className="card-input"
            onChange={handleCardNumber}
            value={cardNumber}

            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />



          <>
            <span className="card-icon">
              <img
                src=
                {getCardType}
                alt={getCardType} />
            </span>
          </>

          {errors &&
            <a href="#!" onClick={handleClear} className="clearTextbox" >
              <img src={close} alt="" />
            </a>

          }

        </div>
        {errors && <p className='error'>{errors}</p>}

        {isValid &&
          <p className='success'>Valid Card Number</p>
         
        }


      </form>
    </div>
  );
}

export default App;
