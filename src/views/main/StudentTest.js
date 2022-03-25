import React from "react";
import { Container, Row, Col } from "reactstrap";
import Left from "../../components/leftSideBar";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const Test = () => {
  const location = useLocation();

  const test = location.state.test;
  console.log(test);
  const { register, handleSubmit } = useForm();

  const onHandleSubmit = (x) => {
    console.log(x);
  };

  return (
    <Container fluid className="mx-0 my-0 px-0 py-0">
      <Row className=" px-0 mx-0  my-0 py-0">
        <Col style={{backgroundColor: '#f1f1f1'}} className="outerDiv  mx-0 my-0 px-0 py-0">
          {/* left sidebar */}

          <Left />

          {/* left sidebar ends */}

          <Row className="centerPart d-flex flex-column px-0 py-0 mx-0 my-0">
            {/* <Row className=""> */}
            <Col>
              <div className="myTestHeader ">
                <div className="submitT
                estBtn">
                  <button
                    onClick={handleSubmit(onHandleSubmit)}
                    
                  >
                    Submit
                  </button>
                </div>
                <h5 className="text-center">Create Question For Students</h5>

                <div className="myTestHeader1">
                  <div >
                    <div className="d-flex">
                      <p>Work Title</p>
                      <p className=" border-bottom">: {test.title}</p>
                    </div>
                    <div className="d-flex">
                      <p>Work Type :</p> <p>{test.classWorkTpye}</p>
                    </div>
                    <div className="d-flex">
                      <p>Subject Name :</p>
                      <p> {test.subjectName}</p>
                    </div>
                    <div className="d-flex">
                      <p>Teacher Name :</p>
                      <p className=" border-bottom">{test.teacherName}</p>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <p>Total Marks :</p>
                      <p className=" border-bottom"> {test.totalMarks} </p>
                    </div>
                    <div className="d-flex">
                      <p>Date : </p>
                      <p className=" border-bottom">
                        {" "}
                        {test.date.slice(0, 10)}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p>Test Time :</p>
                      <p className=" border-bottom"> {test.testDuration}</p>
                    </div>
                  </div>
                </div>
              </div>

                { test.multiChoiceList ? (
                   test.multiChoiceList.map((multi , index)=>(
               <div key={index} className="myTestBody">
                <div className="myMCQBody1">
                  <div className="myMCQBody2">
                    <p style={{color: '#707070', fontWeight: "bold"}} className="my-0">Question No {multi.id}</p>
                    <p>Multiple Choice Questions</p>
                    <p className="my-0">Marks : {multi.marks}</p>
                  </div>
                  <div className="myMCQBody3">
                    <div  className="myMCQBody4">
                      <div className="myMCQBody5">{multi.question}</div>
                    </div>
                  </div>
                  <div className="myMCQBody6">
                    <form>
                      {multi.options.map((myoption, index)=>(
                      <div key={index} className="myMCQBody7">
                        <label
                          htmlFor={myoption.id}
                          style={{ paddingRight: "15px" }}
                        >
                          <input
                            {...register(`MCQss.${multi.id}`)}
                            type="radio"
                            
                            value={myoption.option}
                            id={myoption.id}
                          />
                          {myoption.option}
                        </label>
                        
                      </div>
                      ))}
                      
                    </form>
                  </div>
                </div>
              
              </div>))
              ) : (<></>)}

                {test.shortsList ? (
                  test.shortsList.map((short , index)=>(
              <div key={index} className="myTestBody ">
                <div className="myMCQBody1">
                <div className="myMCQBody2">
                    <p style={{color: '#707070', fontWeight: "bold"}} className="my-0">Question No {short.id}</p>
                    <p className="my-0">Marks : {short.marks}</p>
                  </div>
                  <div className="myMCQBody3">
                    <div  className="myMCQBody4">
                      <div className="myMCQBody5">{short.question} 
                      </div>
                    </div>
                  </div>
                  <div className="myShortBody1">
                  <form>
                    <input
                    id="shortID"
                      type="text"
                      // className=" border-0"
                      {...register(`Shortss.${short.id}`)}
                      placeholder="Please Enter Your Answer here ...."
                    />
                  </form>
                  </div>
                </div>
              </div>))
               ) : (<></>)
              }

              {/* <div className="myTestBody ">
                <div className="myMCQBody1">
                  <p>hello world</p>
                  <form>
                    <input
                      type="text"
                      {...register("yesinput")}
                      placeholder="enter something"
                    />
                  </form>
                </div>
              </div> */}
            </Col>
            {/* </Row> */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Test;
