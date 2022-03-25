import React from 'react';
import { Container, Row, Col, Progress } from 'reactstrap';
import Left from '../../components/leftSideBar';
import Polygon3 from "../../assets/img/Polygon4.png"
import Polygon2 from "../../assets/img/Polygon3.png"
import Polygon1 from "../../assets/img/Polygon5.png"
import { useLocation } from 'react-router-dom';

const StudentResult = () => {
  
 const location = useLocation();

 const result = location.state.result;
 
  return (
    
      
      <Container fluid className="mx-0 my-0 px-0 py-0">
          <Row className=" px-0 mx-0  my-0 py-0">
            <Col className="outerDiv  mx-0 my-0 px-0 py-0">
              <Left />
              <Row className="centerPart d-flex flex-column px-0 py-0  mx-0 my-0">
                <Row className='d-flex flex-column px-0 py-0 mx-0 my-0'>
                <Col className='pt-2'>
                  <div className='myResultHeader text-center pt-5'>
                    <h2 className=' '>Test Records for Students</h2>
                  </div>
                </Col>

                <Col  className='d-flex justify-content-center pt-3 mx-0 my-0'>
                  <div  className='myResultBody'>
                    <div className='myResultBody1'>
                      <h4>{result.testTitle}</h4>
                    </div>
                    <div className='myResultBody2'>
                      <div>Total Marks: {result.totalMarks}</div>
                      <div>Obtained Marks: {result.obtainMarks}</div>
                      
                    </div>
                    <div className='myResultBody3'>
                      
                    <Progress value={((result.obtainMarks)/(result.totalMarks)*100)}>{result.obtainMarks}</Progress>
                    </div>
                    <div className='myResultBody4 '>
                      
                        <div className='myResultBody4one'>
                            <p className='paddingName'>Total M.C.Q</p>
                            <p style={{fontWeight:"bold" , color:"#0FCF3C" , fontSize:"18px"}}>{result.totalMCQues}</p>
                            <div style={{position: "relative"}}>
                              <img className="myResultPic" src={Polygon1} alt="hah" />
                              <div className='resultContents'>
                                <p className="label-1 " >{result.multiChoiceTotalCorrect}</p>
                                <p className="label-2">Correct</p>
                              
                                <p className="label-3">{result.multiChoiceTotalWrong}</p>
                                <p className="label-4">Wrong</p>
                              </div>
                            </div>
                        </div>
                        <div className='myResultBody4one'>
                            <p className=''> Total Short Questions</p>
                            <p style={{fontWeight:"bold" , color:"#2D91CB" , fontSize:"18px"}}>{result.totalShortQues}</p>
                            <div style={{position: "relative"}}>
                              <img className="myResultPic" src={Polygon2} alt="hah" />
                              <div className='resultContents'>
                                <p className="label-5 " >{result.shortQueTotalMarks}</p>
                                <p className="label-6">Total</p>
                              
                                <p className="label-7">{result.shortQueObtianMarks}</p>
                                <p className="label-8">Obtained</p>
                              </div>
                            </div>
                        </div>
                        <div className='myResultBody4one'>
                          <p className=' '>Total Content Questions</p>
                          <p style={{fontWeight:"bold", color:"#FF5B61" , fontSize:"18px"}}>{result.totalContentQues}</p>
                          <div style={{position: "relative"}}>
                            <img className="myResultPic" src={Polygon3} alt="hah" />
                            <div className='resultContents'>
                                <p className="label-5 " >{result.contentQueTotalMarks}</p>
                                <p className="label-6">Total</p>
                                
                                <p className="label-7">{result.contentQueObtainMarks}</p>
                                <p className="label-8">Obtained</p>
                              </div>
                          </div>
                        </div>
                     
                    </div>
                    <div>
                      <h4 className='text-center pt-4'>Remarks</h4>
                      <h5 className='text-center '>Good</h5>
                    </div>
                  </div>
                </Col>
                </Row>
              
            
              </Row>
            </Col>
          </Row>
      </Container>
  );
};

export default StudentResult;
