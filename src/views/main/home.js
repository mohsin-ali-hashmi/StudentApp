import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getAnnouncements,
  getResults,
  getStudentResult,
  getTotalAttendence,
} from "../../assets/api/AllApi";
import { Container, Col, Row, Progress } from "reactstrap";
import Left from "../../components/leftSideBar";

import Right from "../../components/rightAnnouncements";

import Dash from "../../assets/img/student-dashboard.png";
import myBackpack from "../../assets/img/backpack1.png";
import myStudent from "../../assets/img/student.png";
import myCalander from "../../assets/img/calendar.png";
import myBookshelf from "../../assets/img/bookshelf.png";
import exam from "../../assets/img/exam .png";
import { GrAnnounce } from "react-icons/gr";
import { BsFillCaretRightFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";
// import { TailSpin } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "../../assets/css/Calander.css";
import { format } from "date-fns";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


// 0VwDKbWKHidWSD9qqDyYdunpOcy2

const Home = () => {
  const history = useHistory();
  const student_id = "0VwDKbWKHidWSD9qqDyYdunpOcy2";
  const attendence_id = "DgJzVC2jkDTc0UTB5izXTwNom5U2";
  const class_id = "1582795663529";

  const mydate = new Date();

  const [date, setDate] = useState(mydate);
  const [presentStudents] = useState([]);
  const [absentStudents] = useState([]);
  const [leaveStudents] = useState([]);
  const [unmarkedStudents] = useState([]);

  // localStorage.getItem("StudentId")

  

  // first banners data
  const {
    data: firstData,
    isLoading: firstLoading,
    isError: firstError,
  } = useQuery("firstCard", () => getStudentResult(student_id), {
    onError: () => {
      toast.error("can't load the page internet is down");
    },
  });

  //result bannner data
  const {
    data: secondData,
    isLoading: secondLoading,
    isError: secondError,
  } = useQuery("secondCard", () => getResults(student_id), {
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("can't load the page internet is down");
    },
  });

  // for attendence of student

  const {
    data: thirdData,
    isLoading: thirdLoading,
    isError: thirdError,
  } = useQuery(
    ["thirdCard", date],
    () => getTotalAttendence(attendence_id, format(date, "MM-yyyy")),
    {
      refetchOnWindowFocus: false,
      cacheTime: 30 * 60 * 1000,
      onError: () => {
        toast.error("can't load the page internet is down");
      },
    }
  );

  // announcements banner data
  const {
    data: fourthData,
    isLoading: fourthLoading,
    isError: fourthError,
  } = useQuery("fourthCard", () => getAnnouncements(class_id), {
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("can't load the page internet is down");
    },
  });

  const activeCalander = (x) => {
    setDate(x.activeStartDate);
  };

  const attendance_func = (attendenceData) => {
    if (attendenceData.status === "1") {
      presentStudents.push(attendenceData.date);
    } else if (attendenceData.status === "0") {
      absentStudents.push(attendenceData.date);
    } else if (attendenceData.status === "2") {
      leaveStudents.push(attendenceData.date);
    } else if (attendenceData.status === "-1") {
      unmarkedStudents.push(attendenceData.date);
    } else console.log("i am in the else");
  };

  // const goToResult = () => {
  //   history.push("/student/result" , {
  //     state: result
  //   });
  // };
  return (
    <>
      <Container fluid className="mx-0 my-0 px-0 py-0">
        <Row className=" px-0 mx-0  my-0 py-0">
        <SkeletonTheme
                  
                    highlightColor="#96c7ff"
                    borderRadius="0.5rem"
                    duration={1}
          >
          <Col className="outerDiv  mx-0 my-0 px-0 py-0">
            {/* left sidebar */}

            <Left />

            {/* left sidebar ends */}

            <Row className="centerPart ">
              <Row className="d-flex flex-column px-0 py-0 mx-0 my-0">
                <Col>
                  <div>
                    <img
                      className="w-100 dashboardPic"
                      src={Dash}
                      alt="dashboard pic"
                    />
                  </div>
                </Col>

                <Col>
                  <Row className="contentParent px-0 py-0 mx-0 my-0">
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className="myDashboardLeftCards"
                    >
                      <div className="innerDashboardCards">
                      <div className="ourBanner">
                        <img
                          src={myBackpack}
                          className=" bannerImage"
                          alt="backpack pic"
                        />
                        <p className=" text-center mb-0 pt-2">Class Work</p>
                        <p className=" text-center mb-0">Types of work</p>
                      </div>
                      <div className="wholeContent">
                        {firstLoading ? (
                          <>

                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          
                          </>
                          // <div className=" d-flex justify-content-center align-items-center">
                          //   <TailSpin />
                            
                          // </div>
                        ) : 
                        firstError ? (
                          toast.error("tests are not loading")
                          ( <p>check your connection and try again</p>)
                         
                          
                        ) : (
                          firstData.response.data.student_tests.tests.map(
                            (myTest, index) => (
                              <div
                                key={index}
                                className="firstContent"
                                onClick={() => history.push("/student/test" ,{
                                  test: myTest,
                                }
                                )}
                              >
                                <div className="classWorkDataHead">
                                  <img
                                    className="classWorkDataIcon"
                                    src={myBookshelf}
                                    alt="bookshelf pic"
                                  />
                                  <p className="px-0 pt-2 mx-0 my-0">
                                    {myTest.title }
                                  </p>
                                  <p className="px-0 pt-2 mx-0 my-0">
                                    Subject: {myTest.subjectName}
                                  </p>
                                  <p className="px-0 pt-2 mx-0 my-0">
                                    Date: {myTest.date.slice(0, 10)}
                                  </p>
                                </div>

                                <div className="classWorkDataBody">
                                  <div
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                      borderRight: "1px solid #0E7886",
                                      padding: "10px",
                                      color: "#0E7886",
                                    }}
                                  >
                                    <p className="px-0 py-0 mx-0 my-0">M.C.Q</p>
                                    <p className="px-0 py-0 mx-0 my-0">
                                      {myTest.multiChoiceList === undefined
                                        ? "0"
                                        : myTest.multiChoiceList.length}
                                    </p>
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                      borderRight: "1px solid #0E7886",
                                      padding: "10px",
                                      color: "#0E7886",
                                    }}
                                  >
                                    <p className="px-0 py-0 mx-0 my-0">
                                      Short Questions
                                    </p>
                                    <p className="px-0 py-0 mx-0 my-0">
                                      {myTest.shortsList === undefined
                                        ? "0"
                                        : myTest.shortsList.length}
                                    </p>
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#0E7886",
                                    }}
                                  >
                                    <p className="px-0 py-0 mx-0 my-0">
                                      Content Questions
                                    </p>
                                    <div className="px-0 py-0 mx-0 my-0">
                                      {myTest.contentQuestionList === undefined
                                        ? "0"
                                        : myTest.contentQuestionList.map(
                                            (cont, index) => (
                                              <p key={index}>
                                                {cont.contents.length}
                                              </p>
                                            )
                                          )}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="classWorkDataFooter"
                                  style={{ color: "#0E7886" }}
                                >
                                  <p className="px-2 py-0 mx-0 my-0">
                                    Marks: {myTest.totalMarks}
                                  </p>
                                  <p className="px-0 py-0 mx-0 my-0">
                                    Duration: {myTest.testDuration}
                                  </p>
                                  <p className="px-0 py-0 mx-0 my-0">
                                    Type: {myTest.classWorkTpye}
                                  </p>
                                  <div className="px-0 py-0 mx-0 my-0">
                                    {myTest.testSolvedStatus === true
                                      ? <p className=" text-success">Solved</p>
                                      : <p className=" text-danger">unSolved</p>}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                      </div>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className="myDashboardRightCards"
                    >
                      <div className="innerDashboardCards">
                      <div className="ourBanner">
                        <img
                          src={myStudent}
                          className=" bannerImage"
                          alt="Student pic"
                        />
                        <div className=" text-center pt-4">
                          <p>Results</p>
                        </div>
                      </div>
                      <div className="wholeContent">
                        {secondLoading ? (
                          <>

                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          <div className="firstContent">
                          <Skeleton
                          height={100}
                          />
                          </div>
                          
                          </>
                          // <div className=" d-flex justify-content-center align-items-center">
                          //   <TailSpin />
                          // </div>
                        ) : secondError ? (
                          toast.error("result is not loading")
                        ) : (
                          secondData.response.data.student_results.map(
                            (result, index) => (
                              <div
                                key={index}
                                className="firstContent"
                                onClick={() =>
                                  history.push("/student/result", {
                                    result: result,
                                  })
                                }
                              >
                                <div className="resultHead">
                                  <img
                                    className="resultIcon"
                                    src={exam}
                                    alt="Result pic"
                                  ></img>

                                  <h5 className="mx-0 my-0">
                                    {result.testTitle}t
                                  </h5>
                                  <p className="mx-0 my-0">
                                    Total Marks : {result.totalMarks}
                                  </p>
                                </div>
                                <div className="resultBody">
                                  <Progress
                                    color="success"
                                    value={
                                      (result.obtainMarks / result.totalMarks) *
                                      100
                                    }
                                  />
                                </div>
                                <div className="resultFooter">
                                  <p>Obtained Marks: {result.obtainMarks}</p>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="contentParent px-0 py-0 mx-0 my-0">
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className="myDashboardLeftCards"
                    >
                      <div className="innerDashboardCards">
                      <div className="ourBanner">
                        <img
                          src={myCalander}
                          className=" bannerImage"
                          alt="backpack pic"
                        />
                        <p className=" text-center mb-0 pt-2">
                          Have a look at your Attendance
                        </p>
                        <p className=" text-center mb-0">Calender</p>
                      </div>
                      <div className=" padding-left">
                        {thirdLoading ? (
                       
                         <div className="firstContent">
                         <Skeleton
                         width={290}
                         
                         height={250}
                         />
                         <Skeleton
                         count={2}
                         width={290}
                         
                         height={50}
                         />
                         </div>
                         
                         
                         
                         
                        ) : thirdError ? (
                          toast.error("sorry the clander is not loading")
                        ) : (
                          <div>
                            {thirdData.response.data.monthlyAttendance.map(
                              (att) => (
                                attendance_func(att)
                              )
                            )}
                            <Calendar
                              value={date}
                              next2Label={null}
                              nextLabel={
                                <BsFillCaretRightFill color="#0E7886" />
                              }
                              prevLabel={
                                <BsFillCaretLeftFill color="#0E7886" />
                              }
                              prev2Label={null}
                              minDetail="year"
                              tileClassName={({ date }) => {
                                if (
                                  absentStudents.find(
                                    (x) => x === format(date, "dd-MM-yyyy")
                                  )
                                ) {
                                  return "absentStyle";
                                }
                                if (
                                  presentStudents.find(
                                    (x) => x === format(date, "dd-MM-yyyy")
                                  )
                                ) {
                                  return "presentStyle";
                                }
                                if (
                                  leaveStudents.find(
                                    (x) => x === format(date, "dd-MM-yyyy")
                                  )
                                ) {
                                  return "leaveStyle";
                                }
                                if (
                                  unmarkedStudents.find(
                                    (x) => x === format(date, "dd-MM-yyyy")
                                  )
                                ) {
                                  return "unmarkedStyle";
                                }
                              }}
                              onActiveStartDateChange={activeCalander}
                            />
                            <div className="calendar-down-color">
                              <div className="d-flex  justify-content-center align-items-center">
                                <div
                                  className=" p-1 h-25 "
                                  style={{
                                    borderRadius: "50px",
                                    backgroundColor: "#0FCF3C80",
                                  }}
                                ></div>
                                Present
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div
                                  className=" p-1 h-25 "
                                  style={{
                                    borderRadius: "50px",
                                    backgroundColor: "#EB132980",
                                  }}
                                ></div>
                                Absent
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div
                                  className=" p-1 h-25 "
                                  style={{
                                    borderRadius: "50px",
                                    backgroundColor: "#F4B00899",
                                  }}
                                ></div>
                                Late
                              </div>
                              <div className="d-flex justify-content-center align-items-center">
                                <div
                                  className="p-1 h-25 "
                                  style={{
                                    borderRadius: "50px",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  }}
                                ></div>
                                Not Marked
                              </div>
                            </div>
                            <div className="calendar-summary">
                              <p className="text-center">Attendence Summary</p>
                              <div className="d-flex justify-content-between">
                                <div>
                                  Total Present :{" "}
                                  {
                                    thirdData.response.data.totalAttendance
                                      .presents
                                  }
                                </div>
                                <div>
                                  Total Leaves :{" "}
                                  {
                                    thirdData.response.data.totalAttendance
                                      .leaves
                                  }
                                </div>
                              </div>
                              <div className="d-flex justify-content-between">
                                <div>
                                  Total Absent:{" "}
                                  {
                                    thirdData.response.data.totalAttendance
                                      .absents
                                  }
                                </div>
                                <div>
                                  Un marked:{" "}
                                  {
                                    thirdData.response.data.totalAttendance
                                      .not_marked
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      </div>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      className="myDashboardRightCards"
                    >
                      <div className="innerDashboardCards">
                      <div className="ourBanner">
                        <div className=" text-center pt-4">
                          <p>Announcement For Students</p>
                        </div>
                      </div>
                      <div className="wholeContent">
                        {fourthLoading ? (
                          <>
                           <div className="firstContent">
                           <Skeleton
                           
                           height={100}
                           />
                           </div>
                           <div className="firstContent">
                           <Skeleton
                           
                           height={100}
                           />
                           </div>
                           <div className="firstContent">
                           <Skeleton
                           
                           height={100}
                           />
                           </div>
                           <div className="firstContent">
                           <Skeleton
                           
                           height={100}
                           />
                           </div>
                           
                           </>
                          // <div className=" d-flex justify-content-center align-items-center">
                          //   <TailSpin />
                          // </div>
                        ) : fourthError ? (
                          toast.error("announcements are not loading")
                        ) : (
                          fourthData.response.data.announcements.map(
                            (announce, index) => (
                              <div key={index} className="announcementContent">
                                <div className="announcementHeader">
                                  {announce.announDescription}
                                </div>
                                <div className="announcementFooter">
                                  <div className="px-3">
                                    <GrAnnounce />
                                  </div>

                                  <div className="px-3 py-0 mx-0 my-0">
                                    <p className="px-0 py-0 mx-0 my-0">
                                      {announce.teacherName}
                                    </p>
                                    <p className="px-0 py-0 mx-0 my-0">
                                      {announce.announcDate}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>

            {/* right side bar */}

            <Right />

            {/* right side bar ends */}
          </Col>
          </SkeletonTheme>
        </Row>
      </Container>
    </>
  );
};

export default Home;
