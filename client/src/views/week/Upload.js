import React, {useRef} from 'react';
import ICAL from "ical.js";
import moment from "moment";
import styled from 'styled-components';

const UploadButton = styled.button`
  background-color: red;
  height: 60px;
  width: 120px;
`;

let classMap = new Map();
let weekArr = []
for (let i = 0; i < 7; i++){
    weekArr.push(moment().add(i, 'days').format('dddd'));
}

const startOfWeek = moment().add(0, 'days').format();
const endOfWeek = moment().add(6, 'days').format();


const Upload = () => {

    let fileReader;
    const hiddenFileInput = useRef(null);

    const parseEvent = (e) => {
        //passed in a single vevent
        //event being returned needs to have the summary's title, dtend's date
        //check if location contains the word zoom, in that case dont add 
        let event = {};
        // let location=[]; //will act like a stack

        for (let i= 0; i < e[1].length; i++){
            let prop = e[1][i];
            // console.log("prop: " + prop);
            if (prop[0] === "location" && prop[3].includes("Zoom")){ // if it has a location that means it's on zoom and I don't want it
                return -1;
            }
            if (prop[0] === "dtend"){
                let date = moment(prop[3]).format();
                if (date >= startOfWeek && date <= endOfWeek){
                    event[prop[0]] = prop[3];
                }else{
                    console.log("end of week is: " + endOfWeek);
                    console.log("assignment date is: " + date)
                    return -1;
                }
            }
            if(prop[0] === "summary"){
                event[prop[0]] = prop[3];
            }
        }
        // console.log(event);
        return event;
    }


    const handleFileRead = e => {
        const content = fileReader.result;
        //parse the content with ical.js

        let fileData = ICAL.parse(content);
        let events = fileData[2]; // the 2 index contains all the vevents
        let result = []; //will contain all the event objects that I will then need to sort

        let brackets = [];
        // let classMap = new Map();

        events.forEach(e => result.push(parseEvent(e))); 
        // console.log("result of parse: " + result);
        const len = Object.keys(result).length;

        //creates a map with key = class name and value = array of all assignments in class
        for(let i = 0; i < len; i++){
            let summary = result[i].summary;
            let dateEnd = result[i].dtend;
            let sumLen;
            let className = "";

            if (result[i] !== -1){ //not on zoom

                for(let j = 0; j < summary.length-1; j++){ //star
                    if(brackets.includes("[")){
                        className += summary.charAt(j);
                    }
                    if(summary.charAt(j) === "["){
                        brackets.push("[");
                        sumLen = j-1;
                    }
                }
                brackets.pop();
                let parsedSum = summary.substr(0,sumLen); //removes the className
                let assignmentArr = [parsedSum, dateEnd];
    
                if (!classMap.has(className)){
                    classMap.set(className, [assignmentArr]);
                    // numClasses++;
                }else{
                    let arr = classMap.get(className) ;
                    arr.push(assignmentArr);
                    classMap.set(className, arr);
                }

            }

        }
        console.log(classMap);
        // console.log(classMap.size);
        console.log("moment week: " + weekArr);
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }


    // const handleClick = (e) => {
    //     hiddenFileInput.current.click();
    // }

    // const success = () => {
    //     return (
    //         <div>
    //             File uploaded Successfully
    //         </div>

    //     );
    // }

    // const diplayWeek =()=> {
    //     return(
    //         <div>




    //         </div>


    //     );


    // }

    

    return (
        <div>
            <div className='upload-expense' style={{textAlign: 'center'}}>

                {/* <UploadButton onClick={handleClick}>Upload a File</UploadButton> */}
                <input
                    type='file'
                    id = 'file'
                    className = 'input-file'
                    accept='.ics'
                    ref={hiddenFileInput}
                    onChange={e => handleFileChosen(e.target.files[0])}
                    // style={{display:'none'}}
                />
            </div>
            {/* {classMap.size !== 0 ? success() : null} */}
            <div style={{paddingTop: 3,paddingBottom: 10, textAlign:'center', color: '#907163'}}>*upload an ical file (.ics)</div>
    
        </div>
    );
}

export default Upload;
