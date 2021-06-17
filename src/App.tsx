import React from 'react';
import './App.css';
import {useDropzone} from 'react-dropzone'
import Papa from 'papaparse'

import Converter from './Converter';

function App() {

    const [fileType, setFileType] = React.useState<string | null>(null)
    const [file, setFile] = React.useState()
    const [dataset, setDataset] = React.useState(null)
    const [delimitador, setDelimitador] = React.useState(',')
    const [clave, setClave] = React.useState("")
    const [ok, setOk] = React.useState(false)

    const [csv,setCsv] = React.useState("")

    const onCsvParseComplete = ({data}: any) => {
        setDataset(data)
    }

    const onDrop = (files: File[]) => {
        if (["text/plain", "text/xml", "application/json"].includes(files[0].type)) {
            setFile(files[0])
            setFileType(files[0].type)
        } else {
            alert("Formato no permitido")
        }
    }
    const handleClick=()=>{
        if(fileType==="text/plain"){
            Papa.parse(file, {
                delimiter:delimitador.charAt(0),
                complete: onCsvParseComplete,
            })
            setOk(true)
        }
        if(fileType==="application/json"){
            let jsonContent = ""
            let reader = new FileReader()
            reader.addEventListener('load', function(e) {
                // contents of file in variable
                // @ts-ignore
                let text = e.target.result;
                if (typeof text === "string") {
                    let jsonContent = JSON.parse(text)
                    const csvData =  Papa.unparse({
                        "fields":["document","name","lastname","card","type","phone"],
                        "data": jsonContent
                    })
                    Papa.parse(csvData, {
                        delimiter:delimitador.charAt(0),
                        complete: onCsvParseComplete,
                    })
                    setCsv(csvData)
                    setOk(true)

                }

            });
            reader.readAsText(file)

        }
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div className="App">
            <header className="App-header">
                <p>PROYECTO RIESGOS </p>
            </header>
            <div {...getRootProps()} className="App-Dropzone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Suelte su archivo ...</p> :
                        <p>Seleccione un archivo </p>
                }
            </div>
            <div style={{marginTop: "1em"}}>
                <div>
                    <div>
                        <div>
                            <label>Delimitador</label>
                        </div>
                        <div>
                            <input type={"text"} value={delimitador} onChange={(e)=>setDelimitador(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Clave cifrado vigenere</label>
                        </div>
                        <div>
                            <input type={"text"} value={clave} onChange={(e)=>setClave(e.target.value)}/>
                            <button disabled={!fileType} onClick={handleClick}>Generar</button>

                        </div>
                    </div>

                </div>
            </div>
            {ok? <Converter fileType={fileType} dataset={dataset} clave={clave} csv={csv} /> :<></>}
        </div>
    );
}

export default App;
