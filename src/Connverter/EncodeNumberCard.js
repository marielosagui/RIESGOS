import React, {useState} from 'react';
import Crypro from 'text-cryptography'

const EncodeNumberCard = ({text,clave}) => {
    const translate = ["a","b","c","d","e","f","h","i","j","k"]

    const numberToLetter=(text)=>{
        let result = ""
        for (let l of text){
            if(l.toString().match("[0-9]")){
                result = result + translate[parseInt(l)]
            }else{
                result = result + "z"
            }
        }
        return result
    }

    const encode=(text,key) =>{
        let vigenere = new Crypro.Vigenere(key)
        return vigenere.encrypt(text)
    }
    return (
        <>
            <span>{encode(numberToLetter(text),clave)}</span>
        </>
    );
}

export default EncodeNumberCard
