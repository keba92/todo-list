import React, {useState, useEffect} from 'react';
import './App.css';
import ReactGridLayout  from 'react-grid-layout';
import Box from './Box';
import firebase from './Firebase';
import 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {  MarkdownPreview  } from 'react-marked-markdown';

function useLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(snapshot => {
        const lists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setLists(lists);
      });
  }, []);

  return lists;
}


function App () {

    const lists = useLists();
    const [body, setBody] = useState('');
    const [text, setText] = useState('');
    const staticX = 0;
    const data = { i: '', x: staticX, y: 0, w: 1, h: 2, maxW: 2 };

    const add = (e) => {
      firebase
      .firestore()
      .collection("notes")
      .add({
        data,
        body
      });
      setBody("");
    };

    const layout = lists.map((el,index) => {
      el.data.i = `${index + 1}`;
      return el.data;
    })

    const deleteItem = (e) => {
      e.preventDefault()
      const id = e.target.name;
      e.stopPropagation();
      firebase
        .firestore()
        .collection("notes")
        .doc(id)
        .delete();
    };

    const saveText = (e) =>{
      if (text.text != ''){
        const newBody = text.text;
        let newData;
        lists.forEach((el) => {
          if(el.id == text.id){
            newData = el.data;
          }
        })

        if(newBody&&newData){
          firebase
          .firestore()
          .collection("notes")
          .doc(text.id)
          .update({
            'body': newBody,
            'data': newData
          })
          setText('');
        }
      }
    }

    const upItemBox = (e) =>{
      e.stopPropagation();
      lists.forEach((el)=>{
        if (el.id == e.target.id){
          el.data.y = 0;
        } else {
          el.data.y += 1;
        }
        firebase
        .firestore()
        .collection("notes")
        .doc(el.id)
        .update({
        'data': el.data
        })
      })
    }

    const typeText = (e)=>{
      e.stopPropagation();
      setText({id: e.target.title, text: e.target.value});
    }

    const changeColor = (e) =>{
      e.stopPropagation();
      e.preventDefault();
      document.querySelector(`#${e.target.name}`).style.backgroundColor = e.target.className;
    }

    const stopProp = (e) =>{
      e.stopPropagation();
    }

    return (
    <div className ='container' onClick ={add}>
      <div className ='todos' onClick={stopProp}>
      <ReactGridLayout  
        className="layout" 
        layout={layout}
        rowHeight={80}
        cols={1}
        width={800}
        margin={[1,10]}
        >
          {
            lists.map((el,index) => {
              return(
                <Box key={`${index+1}`} id={`${el.id}`} className ='blockShow' onClick = {upItemBox}>
                  <div className="changeColor show">
                    <span>
                      <button className="blue" onClick={changeColor} name={`${el.id}`}></button>
                      <button className="pink" onClick={changeColor} name={`${el.id}`}></button>
                      <button className="yellow" onClick={changeColor} name={`${el.id}`}></button>
                    </span>
                  </div>
                  <div className='close show'>
                  <button className = 'btn' name={`${el.id}`} onClick ={deleteItem}>X</button>
                  </div>
                  <div className='bodyItem' title={el.id}>
                    <div className='inputBlock show'>
                      <textarea rows="5" cols="15" name="text" className='inputText' title={`${el.id}`} onChange={typeText}>{el.body}</textarea>
                      <button name={`${el.id}`} onClick= {saveText}><FontAwesomeIcon icon={faCheck} /></button>
                    </div>
                    <div className={`textBlock  ${el.id}`}>
                      <MarkdownPreview value ={el.body} />
                    </div>
                  </div>
                </Box>
              )
            })
          }
      </ReactGridLayout >
      </div>
    </div>
    );
}
export default App;
