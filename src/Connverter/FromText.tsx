import React, {useEffect} from 'react';
import '../App.css';
import EncodeNumberCard from "./EncodeNumberCard";

interface IFromTextProps {
  dataset: any | null,
  onRender:any | null,
  clave:string
}

function FromText({dataset,onRender,clave}: IFromTextProps) {
  useEffect(()=>{
    onRender(document.getElementsByClassName("json-string")[0].textContent)
  })
  return (
    <div className="App">
      <div className="sections-wrapper">
        <div className="section-json">
          <h3 className="section-title">JSON Data</h3> <br />
          <div className="json-string" >
            [
            {
              dataset!== null && dataset.map((data: any, index: number) => {
                if(dataset[0][index]!=="document"){
                  return(
                    <span key={index} className="json-internal-node">
                      {"{"}
                        <br />
                        {data.map((inf: any, j: number) => {
                          return (
                            <span className="json-data-node" key={j}>
                              <span className="dataset-title">{ '"'+dataset[0][j]+'"' }:</span>
                              <span className="dataset-value">{ '"'+inf+'"' }</span>{j!==data.length-1?",":""}
                            </span>
                          )
                        })}

                      {index!==dataset.length-1?"},":"}"}
                    </span>
                  )
                }
              })
            }
            ]
            </div>
        </div>
        <div className="section-xml">
          <h3 className="section-title">XML Data</h3>
          <div className="xml-string" >
          {"<clientes>"}
            {
              dataset!== null && dataset.map((data: any, index: number) => {
                if(dataset[0][index]!=="document"){
                  return(
                    <span key={index} className="xml-internal-node">
                      <br />
                      {"<cliente>"}
                        <br />
                        {data.map((inf: any, j: number) => {
                          return (
                            <span className="xml-data-node" key={j}>
                              <span className="dataset-json-title">{ `<${dataset[0][j]}>` }</span>
                              {dataset[0][j]!=="card"? <span className="dataset-json-value">{ inf }</span>:<EncodeNumberCard clave={clave} text={inf}/>}
                              <span className="dataset-json-title">{ `</${dataset[0][j]}>` }</span>
                            </span>
                          )
                        })}
                      {"</cliente>"}
                    </span>
                  )
                }
              })
            }
            {"</clientes>"}
            </div>
        </div>
      </div>
    </div>
  );
}

export default FromText;
