import React,{useState} from 'react';
import './App.css';
import FromText from './Connverter/FromText';
// @ts-ignore
import Crypro from 'text-cryptography'
import FromJson from "./Connverter/FromJson";

const jwt = require('jsonwebtoken');

interface IConverterProps {
    fileType: string | null,
    dataset: any | null,
    clave:string,
    csv:string | null
}

function Converter({fileType, dataset,clave,csv}: IConverterProps) {
    const [json,setJson] = useState("")
    const [dt,setDt] = useState([])
    const [token,setToken] = useState("")
    const [secretToken, setSecretToken] = React.useState("")

    const translate = ["a","b","c","d","e","f","h","i","j","k"]

    const csvToJsonXmlButtons=
        (
            <div>
                <button onClick={()=>{exportFile("JsonData",".json")}}>Exportar JSON</button>
                {"\t"}
                <button onClick={()=>{exportFile("XMLData",".xml")}}>Exportar XML</button>
            </div>
        )

    const JsonToPlainXmlButtons=
        (
            <div>
                <button onClick={()=>{exportFile("CSVData",".csv")}}>Exportar CSV</button>
                {"\t"}
                <button onClick={()=>{exportFile("XMLData",".xml")}}>Exportar XML</button>
            </div>
        )

    const LetterToNumber=(text:string)=>{
        let result = ""
        for (let l of text){
            if(l.toString() !== "z"){
                result = result + translate.indexOf(l)
            }else{
                result = result + "-"
            }
        }
        return result
    }
    const decode=(text:string) =>{
        let vigenere = new Crypro.Vigenere(clave)
        return vigenere.decrypt(text)
    }

    const exportFile = (name: string, ext: string) => {
        let file
        const element = document.createElement("a");
        // @ts-ignore
        let textContent = document.getElementsByClassName(ext===".json"?"json-string":ext===".xml"?"xml-string":"csv-string")[0].textContent
        // @ts-ignore
        let decodeText = manipuleString(textContent)
        if(ext===".json" || ext===".csv"){
            // @ts-ignore
            file = new Blob([textContent], {type: 'text/plain'});
        }if(ext===".xml") {
            // @ts-ignore
            file = new Blob([decodeText], {type: 'text/plain'});
        }

        element.href = URL.createObjectURL(file);
        element.download = name+ext;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    const manipuleString= (text: string | null)=>{
        let parser = new DOMParser();
        if (text != null) {
            let xmlDoc = parser.parseFromString(text, "text/xml");
            let cardNodes = xmlDoc.getElementsByTagName("card")
            // @ts-ignore
            for (let node of cardNodes){
                let crypho = node.textContent
                node.textContent =  LetterToNumber(decode(crypho))
            }
            return new XMLSerializer().serializeToString(xmlDoc)
        }
        return false
    }
    const createToken=()=>{
        setToken(jwt.sign(json, secretToken));
    }
    const decodeToken= async ()=>{
        const data = await jwt.verify( token,secretToken);
        setDt(data)
    }

    const dataConverted = () => {
        if (fileType === "text/plain") {
            return (
                <FromText dataset={dataset} onRender={setJson} clave={clave}/>
            )

        } if (fileType === "application/json") {
            return (
                <FromJson csv={csv} dataset={dataset} onRender={setJson} clave={clave} />
            )

        }


    }


    return (
        <div className="App">
            <p>Formato del Archivo Cargado: <b>{fileType}</b></p>
            {fileType==="text/plain"?csvToJsonXmlButtons:fileType==="application/json"?JsonToPlainXmlButtons:""}
            {dataConverted()}
            <div>
                <h4>JWT Token</h4>
                <div>
                    <div>
                        <label>Clave</label>
                    </div>
                    <div>
                        <input placeholder={"Clave"} onChange={(e)=>setSecretToken(e.target.value)} />
                        <button onClick={createToken}>Generar token</button>
                    </div>
                </div>
                <div style={{
                    marginLeft:"3em",
                    marginRight:"3em",
                }}>
                    <span style={{
                        width:"100px",
                        overflowWrap: "break-word"
                    }}
                    >{token}</span>
                </div>
            </div>
            <div>
                <h4>JWT Decode:Token</h4>
                <button onClick={decodeToken}>Decodificar</button>
                <div style={{
                    marginLeft:"3em",
                    marginRight:"3em",
                }}>
                    <span style={{
                        width:"100px",
                        overflowWrap: "break-word"
                    }}
                    >
                        {dt.map((item:any, index:number)=>{
                            return(
                                <p>{JSON.stringify(item)}</p>
                            )
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Converter;
