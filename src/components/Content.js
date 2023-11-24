import React, { useState, useRef } from "react";
import Header from "./Header";
import InputTextComponent from "./InputTextComponent";
import ImagePanel from "./ImagePanel";
import Footer from "./Footer";
import Loader from "./Loader";
import { jsPDF } from "jspdf";

function Content() {
    const [dataList, setDataList] = useState([]);
    const [error, setError] = useState(null);
    const [inputText, setInputText] = useState("");
    const [loaded, setLoaded] = useState(true);
    const [queries, setQueries] = useState([]);
    const pdfRef = useRef();

    async function query(data) {
        try {
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        Accept: "image/png",
                        Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong, Retry!");
            }

            const result = await response.arrayBuffer();
            const base64String = btoa(new Uint8Array(result).reduce((data, byte) => data + String.fromCharCode(byte), ""));
            return `data:image/png;base64,${base64String}`;
        } catch (error) {
            setError(error);
            return null;
        }
    }

    async function handleSubmit() {
        try {
            const queries = inputText.split(",").map((query) => ({ inputs: query.trim() }));
            setQueries(queries)
            setDataList(Array(queries.length).join(".").split("."))
            setLoaded(false);
            let completionCount = 0;
            queries.forEach(async (queryInput, index) => {
                const result = await query(queryInput);
                if(result){
                    dataList[index] = result;
                    setDataList(dataList)
                }
                completionCount++;
                if(completionCount === queries.length){
                    setLoaded(true);
                }
            })
        } catch (error) {
            setError(error.message);
        }
    }

    const downloadComicStrip = () => {
        if (pdfRef.current) {
            const pdf = new jsPDF();
            const copyList = dataList.filter(data => data.length>0)
            copyList.forEach((data, index) => {
                if (index !== 0) {
                    pdf.addPage();
                }
                pdf.addImage(data, "PNG", 0, 0, 210, 297);
            });
            pdf.save("comic_strip.pdf");
        }
    };

    return (
        <div className="content">
            <Header />
            <InputTextComponent value={inputText} onChange={setInputText} onSubmit={handleSubmit} />

            {!loaded ? (
                <Loader />
            ) : error ? (
                <p>Something went <span>wrong,</span> Try again!</p>
            ) : (
                <></>
            )}
            <div className="comic-strip" ref={pdfRef}>
                {dataList?.filter(data=>data.length>0).length > 0 && !error && (
                    <button onClick={downloadComicStrip} style={{ marginBottom: "5vh" }}>
                        Download Comic Strip
                    </button>
                )}

                {dataList.map((data, index) => (data &&
                    <ImagePanel key={index} src={data} alt={`Image ${index}`} desc={queries[index]['inputs']} />
                ))}
            </div>
            <p><span>NOTE:</span> You need to describe exactly 10 comma-separated storylines to generate a 10-panel comic strip.</p>
            <Footer />
        </div>
    );
}

export default Content;