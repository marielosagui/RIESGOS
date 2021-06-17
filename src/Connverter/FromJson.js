import React, {useEffect, useState} from 'react';
import EncodeNumberCard from "./EncodeNumberCard";

const FromJson = ({csv,dataset,onRender,clave}) => {

    return (
        <div className="App">
            <div className="sections-wrapper">
                <div className="section-json">
                    <h3 className="section-title">CSV Data</h3> <br/>
                    <div className="csv-string">
                        <p style={{
                            overflow:"break-word"
                        }}>{csv}</p>
                    </div>
                </div>
                <div className="section-xml">
                    <h3 className="section-title">XML Data</h3>
                    <div className="xml-string">
                        {"<clientes>"}
                        {
                            dataset !== null && dataset.map((data, index) => {
                                if (dataset[0][index] !== "document") {
                                    return (
                                        <span key={index} className="xml-internal-node">
                                            <br/>
                                            {"<cliente>"}
                                            <br/>
                                            {data.map((inf, j) => {
                                                return (
                                                    <span className="xml-data-node" key={j}>
                                                        <span className="dataset-json-title">{`<${dataset[0][j]}>`}</span>
                                                            {dataset[0][j] !== "card" ?
                                                            <span className="dataset-json-value">{inf}</span> :
                                                            <EncodeNumberCard clave={clave} text={inf}/>}
                                                        <span className="dataset-json-title">{`</${dataset[0][j]}>`}</span>
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

export default FromJson
