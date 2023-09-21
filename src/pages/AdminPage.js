import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  getFirestore,
  onSnapshot,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { FaBan, FaEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { useNavigate } from "react-router-dom";


function AdminPage() {
  const [confirmationCount, setConfirmationCount] = useState(0);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [status, setStatus] = useState(false);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);
  const [show4, setShow4] = React.useState(false);
  const [showMP, setShowMP] = React.useState(false);
  const [showIndvuna, setShowIndvuna] = React.useState(false);
  const [showBucopho, setShowBucopho] = React.useState(false);


  const [add, setAdd] = React.useState(false);
  const [tindvuna, setTindvuna] = React.useState([]);
  const [bucopho, setBucopho] = React.useState([]);
  const [turnout, setTurnout] = React.useState([]);
  const [turnoutMP, setTurnoutMP] = React.useState("");
  const [turnoutIndvuna, setTurnoutIndvuna] = React.useState([]);
  const [turnoutBucopho, setTurnoutBucopho] = React.useState([]);
  const [MP, setMP] = React.useState([]);
  const [openDateTime, setOpenDateTime] = useState(new Date());
  const [station, setStation] = React.useState("");
  // const [poll, setPoll] = React.useState("");
  const phone = localStorage.getItem("phone");

  const poll = localStorage.getItem("poll");
  const primary_poll = localStorage.getItem("primary_poll");
  const pollstation = localStorage.getItem("pollstation");
  const [hasVoted, setHasVoted] = useState(false);

  //pdf download action buttons
  const navigate = useNavigate();

  const getConfirmationMessage = () => {
    if (confirmationCount === 0) {
      return "Before submitting the vote, please ensure that you have entered the correct vote.";
    } else {
      return "Are you sure you want to submit the vote?";
    }
  };

  const handleVoteSubmission = async () => {
    const confirmationMessage = getConfirmationMessage();
    if (editedRecord) {
      const updatedMP = MP.filter((item) => item.id !== editedRecord.id);
      setMP(updatedMP);
      setEditedRecord(null); // Reset the edited record
      setStatus(true);
    }
    const isConfirmed = window.confirm(confirmationMessage);
    if (isConfirmed) {
      if (confirmationCount < 1) {
        setConfirmationCount(confirmationCount + 1);
      } else {
        // Call the function to submit the vote using a transaction
        await updateMP(product, pollstation);

        setConfirmationCount(0); // Reset the confirmation count after successful submission
        setVoteSubmitted(true); // Mark the vote as submitted
        setButtonDisabled(true); // Disable the "SAVE" button
      }
    }
  };

  const handleVoteSubmissionIndvuna = async () => {
    const confirmationMessage = getConfirmationMessage();
    if (editedRecord) {
      const updatetindvuna = tindvuna.filter(
        (item) => item.id !== editedRecord.id
      );
      setTindvuna(updatetindvuna);
      setEditedRecord(null); // Reset the edited record
      setStatus(true);
    }
    const isConfirmed = window.confirm(confirmationMessage);
    if (isConfirmed) {
      if (confirmationCount < 1) {
        setConfirmationCount(confirmationCount + 1);
      } else {
        // Call the function to submit the vote using a transaction
        await updatetindvuna(product, pollstation);

        setConfirmationCount(0); // Reset the confirmation count after successful submission
        setVoteSubmitted(true); // Mark the vote as submitted
        setButtonDisabled(true); // Disable the "SAVE" button
      }
    }
  };

  const handleVoteSubmissionBucopho = async () => {
    const confirmationMessage = getConfirmationMessage();
    if (editedRecord) {
      const updatebucopho = bucopho.filter(
        (item) => item.id !== editedRecord.id
      );
      setBucopho(updatebucopho);
      setEditedRecord(null); // Reset the edited record
      setStatus(true);
    }
    const isConfirmed = window.confirm(confirmationMessage);
    if (isConfirmed) {
      if (confirmationCount < 1) {
        setConfirmationCount(confirmationCount + 1);
      } else {
        // Call the function to submit the vote using a transaction
        await updateBucopho(product, pollstation);

        setConfirmationCount(0); // Reset the confirmation count after successful submission
        setVoteSubmitted(true); // Mark the vote as submitted
        setButtonDisabled(true); // Disable the "SAVE" button
      }
    }
  };

  const [product, setProduct] = useState({
    
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);
  const handleCloseMP = () => setShowMP(false);
  const handleCloseIndvuna = () => setShowIndvuna(false);
  const handleCloseBucopho = () => setShowBucopho(false);
  const handleShow2 = () => setShow2(true);
  console.log("Test Poll " + poll);

  async function getOrdersData() {
    try {
      setLoading(true);
      console.log("Test2 Poll " + poll);
      const product = await getDocs(collection(fireDB, `${poll}/MP/nominees`));

      const productsArray = [];
      product.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setMP(productsArray);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getPollingsData() {
    try {
      setLoading(true);
      console.log("Test2 Poll " + poll);
      console.log("Test3 Poll " + pollstation);
      const product2 = await getDocs(
        collection(fireDB, `${primary_poll}/Pollings/stations`)
      );

      const productsArray2 = [];
      product2.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray2.push(obj);
        setLoading(false);
      });
      setTurnout(productsArray2);
      console.log(productsArray2);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function getIndvunaData() {
    try {
      setLoading(true);

      let words = pollstation.toLowerCase().split(' ');
      const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      words= pascalCaseWords.join('_');


      console.log("Test2 Poll Lamgabhi_Primary_School " + poll);
      console.log("Test3 Polliing stash " + words.replace(/[\s,]/g, '_'));
  
      const docRef = doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count/Indvuna`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const mpData = {
          valid: data.valid,
          invalid: data.invalid,
          spoilt: data.spoilt,
          tendered: data.tendered,
        };

        setTurnoutIndvuna(mpData);
        console.log("From indvuna Data: ", data.valid);
      } else {
        console.log("Document does not exist for Indvuna");
      }
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getIndvunaData2() {
    try {
      setLoading(true);

      let words = pollstation.toLowerCase().split(' ');
      const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      words= pascalCaseWords.join('_');


      console.log("Test2 Poll Lamgabhi_Primary_School " + poll);
      console.log("Test3 Polliing stash " + words.replace(/[\s,]/g, '_'));
  
      const docRef = doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count/Bucopho`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const mpData = {
          valid: data.valid,
          invalid: data.invalid,
          spoilt: data.spoilt,
          tendered: data.tendered,
        };

        setTurnoutBucopho(mpData);
        console.log("From Bucopho Data: ", data.votes.valid);
      } else {
        console.log("Document does not exist for Indvuna");
      }
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  async function getMPData() {
    try {
      setLoading(true);
      console.log("Test2 Poll " + poll);
      console.log("Test3 Poll " + pollstation);
 

      let words = pollstation.toLowerCase().split(' ');
      const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      words= pascalCaseWords.join('_');
  
      const docRef = doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count/MP`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const mpData = {
          valid: data.valid,
          invalid: data.invalid,
          spoilt: data.spoilt,
          tendered: data.tendered,
        };

        setTurnoutMP(mpData);
        console.log("Data: ", data.votes.valid);
      } else {
        console.log("Document does not exist");
      }
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  async function getBucophoTurnData() {
    try {
      setLoading(true);
      console.log("Test2 Poll " + poll);
      console.log("Test3 Poll " + pollstation);



      let words = pollstation.toLowerCase().split(' ');
      const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      words= pascalCaseWords.join('_');
  
      const docRef = doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count/bucopho`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const mpData = {
          valid: data.votes.valid,
          invalid: data.votes.invalid,
          spoilt: data.votes.spoilt,
          tendered: data.votes.tendered,
        };

        setTurnoutBucopho(mpData);
        console.log("Data From Bucopho: ", data.votes.valid);
      } else {
        console.log("Document does not exist");
      }
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  async function getTinkhundlaData() {
    try {
      setLoading(true);
      const productData = await getDocs(
        collection(fireDB, `${poll}/Indvuna/nominees`)
      );
      const productsArray = [];
      productData.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setTindvuna(productsArray);
      setLoading(false);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getBucophoData() {
    try {
      setLoading(true);
      const productData = await getDocs(
        collection(fireDB, `${primary_poll}/Bucopho/nominees`)
      );
      const productsArray = [];
      productData.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setBucopho(productsArray);
      setLoading(false);
      console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const editHandler2 = (item) => {
    setProduct(item);
    setShow2(true);
  };

  const editHandler3 = (item) => {
    setProduct(item);
    setShow3(true);
  };
  const editHandlerMP = (item) => {
    setProduct(item);
    setShowMP(true);
  };

  const editHandlerIndvuna = (item) => {
    setProduct(item);
    setShowIndvuna(true);
  };

  const editHandlerBucopho = (item) => {
    setProduct(item);
    setShowBucopho(true);
  };

  const editHandler4 = (item) => {
    setProduct(item);
    setShow4(true);
  };

  const updateMP = async (product, pollstation) => {
    const mpDocRef = doc(fireDB, `${poll}/MP/nominees`, product.id);
    try {
      await runTransaction(fireDB, async (transaction) => {
        const mpDocSnapshot = await getDoc(mpDocRef, transaction);

        if (!mpDocSnapshot.exists()) {
          throw new Error("MP nominee document does not exist.");
        }

        const mpData = mpDocSnapshot.data();
        const updatedVotes = {
          ...mpData.secondary_votes,
          [pollstation]: product.secondary_votes[pollstation],
        };

        // Update the primary_votes field with the new votes
        transaction.update(mpDocRef, { secondary_votes: updatedVotes });
      });

      toast.success("MP Results captured successfully");
      window.location.reload();
      handleClose();
    } catch (error) {
      toast.error("Failed to vote: " + error.message);
    }
  };

  const updatetindvuna = async (product, pollstation) => {
    const indvunaDocRef = doc(fireDB, `${poll}/Indvuna/nominees`, product.id);
    try {
      await runTransaction(fireDB, async (transaction) => {
        const indvunaDocSnapshot = await getDoc(indvunaDocRef, transaction);

        if (!indvunaDocSnapshot.exists()) {
          throw new Error("Indvuna nominee document does not exist.");
        }

        const indvunaData = indvunaDocSnapshot.data();
        const updatedVotes = {
          ...indvunaData.secondary_votes,
          [pollstation]: product.secondary_votes[pollstation],
        };

        // Update the primary_votes field with the new votes
        transaction.update(indvunaDocRef, { secondary_votes: updatedVotes });
      });

      toast.success("Indvuna Results captured successfully");
      window.location.reload();
      handleClose();
    } catch (error) {
      toast.error("Failed to vote: " + error.message);
    }
  };

  const updateBucopho = async (product, pollstation) => {
    const mpDocRef = doc(
      fireDB,
      `${primary_poll}/Bucopho/nominees`,
      product.id
    );
    try {
      await runTransaction(fireDB, async (transaction) => {
        const mpDocSnapshot = await getDoc(mpDocRef, transaction);

        if (!mpDocSnapshot.exists()) {
          throw new Error("Bucopho nominee document does not exist.");
        }

        const mpData = mpDocSnapshot.data();
        const updatedVotes = {
          ...mpData.secondary_votes,
          [pollstation]: product.secondary_votes[pollstation],
        };

        // Update the primary_votes field with the new votes
        transaction.update(mpDocRef, { secondary_votes: updatedVotes });
      });

      toast.success("Bucopho Results captured successfully");
      window.location.reload();
      handleClose();
    } catch (error) {
      toast.error("Failed to vote: " + error.message);
    }
  };
  const updateturnout = async () => {
    try {
      setLoading(true);
  
      // Parse voters_count and total_registered as integers
      const votersCount = parseInt(product.voters_count);
      const totalRegistered = parseInt(product.total_registered);
  
      // Check if voters_count is less than or equal to total_registered
      if (!isNaN(votersCount) && !isNaN(totalRegistered) && votersCount <= totalRegistered) {
        // If the condition is met, create an object with the updated voters_count
        const updatedProduct = { ...product, voters_count: votersCount };
  
        // Update the Firestore document with the updated object
        await setDoc(
          doc(fireDB, `${primary_poll}/Pollings/stations`, product.id),
          product
        );
        toast.success("Turnout has successfully added");
        
        handleClose3();
        window.location.reload();
      } else {
        // If the condition is not met or parsing fails, show an error message
        toast.error("Voters count exceeds total registered or invalid numbers");
        setLoading(false);
        // window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add turnout");
      window.location.reload();
    }
  };

  useEffect(() => {
    getOrdersData();
    getTinkhundlaData();
    getPollingsData();
    getBucophoData();
    getMPData();
    getIndvunaData();
    getIndvunaData2();
    getBucophoTurnData();
  }, []);


  async function handleClick(item) {
    if (typeof item.tendered === 'undefined') {
      console.error('The `tendered` field is undefined.');
      return;
    }
  
    let words = pollstation.toLowerCase().split(' ');
    const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    words = pascalCaseWords.join('_');
  
    try {
      const voterCountRef = await setDoc(
        doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count`, "MP"),
        {
          tendered: parseInt(item.tendered, 10),
          spoilt: parseInt(item.spoilt, 10),
          invalid: parseInt(item.invalid, 10),
          valid: parseInt(item.valid, 10),
          // Add more key-value pairs as needed
        }
      );
  
      toast.success("MP Results captured successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  async function handleClick2(item) {
    if (typeof item.tendered === 'undefined') {
      console.error('The `tendered` field is undefined.');
      return;
    }
  
    let words = pollstation.toLowerCase().split(' ');
    const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    words = pascalCaseWords.join('_');
  
    try {
      const voterCountRef = await setDoc(
        doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count`, "Indvuna"),
        {
          tendered: parseInt(item.tendered, 10),
          spoilt: parseInt(item.spoilt, 10),
          invalid: parseInt(item.invalid, 10),
          valid: parseInt(item.valid, 10),
          // Add more key-value pairs as needed
        }
      );
  
      toast.success("MP Results captured successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  async function handleClick3(item) {
    if (typeof item.tendered === 'undefined') {
      console.error('The `tendered` field is undefined.');
      return;
    }
  
    let words = pollstation.toLowerCase().split(' ');
    const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    words = pascalCaseWords.join('_');
  
    try {
      const voterCountRef = await setDoc(
        doc(fireDB, `${primary_poll}/Pollings/stations/${words.replace(/[\s,]/g, '_')}/voter_count`, "Bucopho"),
        {
          tendered: parseInt(item.tendered, 10),
          spoilt: parseInt(item.spoilt, 10),
          invalid: parseInt(item.invalid, 10),
          valid: parseInt(item.valid, 10),
          // Add more key-value pairs as needed
        }
      );
  
      toast.success("MP Results captured successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  const tableStyles = {
    backgroundColor: "#fff",
    borderCollapse: "collapse",
    width: "100%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  };

  const actionIconsStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const smallfont = {
    fontSize: "90%",
    fontWeight: "80%",
  };

  const handleButtonClick = () => {
    // Navigate to the /test route
    navigate("/REPORT");
  };

  function DownloadButton() {
    const buttonStyles = {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "4px",
      fontSize: "16px",
    };
    return (
      <button onClick={handleButtonClick} style={buttonStyles}>
        GENERATE REPORT
      </button>
    );
  }

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="v_turnout"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
               <Tab eventKey="v_turnout" title="VOTER TURNOUT">
           
          <div className="d-flex justify-content-between"></div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>NAME</th>
                <th>OPEN-TIME</th>
                <th>CLOSE-TIME</th>
                <th>VOTING STATUS</th>
                <th>COUNTING-START</th>
                <th>COUNTING-END</th>
                <th>COUNT-STATUS</th>
                <th>TOTAL-REGISTERED</th>
                <th>VOTER TURNOUT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {turnout.map((item) => {
                const isVoted = item.name === pollstation;
                const statusText = item.status ? "Open" : "Closed"; 
                const statusText2 = item.countStatus ? "Open" : "Closed"; // Check the boolean value
                const status = item.status;
                const status2 = item.status;
                const dependancy =  item.name === pollstation;
                const CountStatus = item.countStatus;
                const handleStatusChange = async () => {
                  // Toggle the status when the checkbox is clicked
                  const updatedStatus = !status;
                  console.log("Updated Status:", updatedStatus);

                  try {
                    if (statusText === "Open") {
                      // Update the 'open_time' field to the current time
                      await updateDoc(
                        doc(fireDB, `${primary_poll}/Pollings/stations/${item.id}`),
                        {
                          status: updatedStatus,
                          close_time: openDateTime,
                          countStart: openDateTime,
                        }
                      );
                    } else if (statusText === "Closed") {
                      // Update the 'close_time' field to the current time
                      await updateDoc(
                        doc(fireDB, `${primary_poll}/Pollings/stations/${item.id}`),
                        {
                          status: updatedStatus,
                          open_time: openDateTime,
                        }
                      );
                    }

                    // Perform any other actions you need
                    console.log("Status updated successfully.");
                  } catch (error) {
                    console.error("Error updating status:", error);
                  }
                  window.location.reload();
                };

                const handleStatusChange2 = async () => {
                  // Toggle the status when the checkbox is clicked
                  const updatedStatus = !CountStatus;
                  console.log("Updated Status:", updatedStatus);

                  try {
                    if (statusText2 === "Open") {
                      // Update the 'open_time' field to the current time
                      await updateDoc(
                        doc(fireDB, `${primary_poll}/Pollings/stations/${item.id}`),
                        {
                          countStatus: updatedStatus,
                          countEnd: openDateTime,
                        }
                      );
                    } else if (statusText2 === "Closed") {
                      // Update the 'close_time' field to the current time
                      await updateDoc(
                        doc(fireDB, `${primary_poll}/Pollings/stations/${item.id}`),
                        {
                          countStatus: updatedStatus,
                          countStart: openDateTime,
                        }
                      );
                    }

                    // Perform any other actions you need
                    console.log("Status updated successfully.");
                  } catch (error) {
                    console.error("Error updating status:", error);
                  }
                  window.location.reload();
                };

                // CSS styles for the toggle button
                const toggleButtonStyles = {
                  display: "inline-block",
                  width: "50px",
                  height: "25px",
                  borderRadius: "25px",
                  backgroundColor: "#ccc",
                  position: "relative",
                  cursor: "pointer",
                };

                // CSS styles for the toggle indicator
                const toggleIndicatorStyles = {
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transition: "0.2s",
                };

                // CSS styles for the 'Open' and 'Closed' text
                const statusTextStyles = {
                  display: "inline-block",
                  marginLeft: "10px",
                };

                return (
                  <tr key={item.id}>
                    <td style={{ ...smallfont }}>{item.name.toUpperCase()}</td>
                    <td style={{ ...smallfont }}>{item.open_time && item.open_time.toDate().toLocaleTimeString().toUpperCase()}</td>
                    <td style={{ ...smallfont }}>{item.close_time && item.close_time.toDate().toLocaleTimeString().toUpperCase()}</td>

                    <td style={{ ...smallfont }}>
                      {isVoted ? (
                        
                        <div>
                          <button
                            onClick={handleStatusChange}
                            style={toggleButtonStyles}
                          >
                            <div
                              style={{
                                ...toggleIndicatorStyles,
                                left: status ? "25px" : "0",
                                backgroundColor: status ? "green" : "red",
                              }}
                            ></div>
                          </button>
                          <span
                            style={{
                              ...statusTextStyles,
                              color: status ? "green" : "red",
                            }}
                          >
                            {status ? "OPEN" : "CLOSED"}
                          </span>
                        </div>

                      ) : (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FaBan
                            color={editedRecord === item ? "gray" : "red"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                          <span
                            style={{
                              ...statusTextStyles,
                              color: "red",
                            }}
                          >
                            NON-APPLICABLE
                          </span>
                        </div>

                      
                      )}
                    </td>
                    
                    <td style={{ ...smallfont }}>{item.countStart && item.countStart.toDate().toLocaleTimeString().toUpperCase()}</td>
                    <td style={{ ...smallfont }}>{item.countEnd && item.countEnd.toDate().toLocaleTimeString().toUpperCase()}</td>
                    
                    <td style={{ ...smallfont }}>
                      {dependancy ? (
                        
                        <div>
                          <button
                            onClick={handleStatusChange2}
                            style={toggleButtonStyles}
                          >
                            <div
                              style={{
                                ...toggleIndicatorStyles,
                                left: CountStatus ? "25px" : "0",
                                backgroundColor: CountStatus ? "green" : "red",
                              }}
                            ></div>
                          </button>
                          <span
                            style={{
                              ...statusTextStyles,
                              color: CountStatus ? "green" : "red",
                            }}
                          >
                            {CountStatus ? "OPEN" : "CLOSED"}
                          </span>
                        </div>

                      ) : (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FaBan
                            color={editedRecord === item ? "gray" : "red"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                          <span
                            style={{
                              ...statusTextStyles,
                              color: "red",
                            }}
                          >
                            NON-APPLICABLE
                          </span>
                        </div>

                      
                      )}
                    </td>
                      <td style={{ ...smallfont }}>{item.total_registered}</td>      
                    <td style={{ ...smallfont }}>{item.voters_count}</td>
                    <td style={{ ...smallfont }}>
                      {dependancy ? (
                        <div style={actionIconsStyles}>
                                                    
                                                    <FaEdit

                            onClick={() => editHandler3(item)}
                            color={editedRecord === item ? "gray" : "blue"}
                            size={30}
                            disabled={editedRecord === item}
                        />
                       
                        </div>
                      ) : (
                        <div style={actionIconsStyles}>
                          <FaBan
                            color={editedRecord === item ? "gray" : "red"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show3} onHide={handleClose3}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD VOTER TURNOUT"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>

                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  readOnly={true}
                />

                {/* <input
                  type="text"
                  value={product.open_time}
                  className="form-control"
                  placeholder="surname"
                  readOnly={true}
                /> */}

                {/* <input
                  type="text"
                  value={product.close_time}
                  className="form-control"
                  placeholder="surname"
                  readOnly={true}
                /> */}

                {/* <input
                  type="text"
                  value={product.status}
                  className="form-control"
                  placeholder="price"
                  readOnly={true}
                /> */}

                <input
                  type="text"
                  value={product.total_registered}
                  className="form-control"
                  placeholder="category"
                  readOnly={true}
                  style={{ display: "none" }}
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="Add Voter Turnout"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      voters_count: e.target.value,
                    });
                  }}
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={updateturnout}>SAVE</button>
            </Modal.Footer>
          </Modal>

          <Modal show={showMP} onHide={handleCloseMP}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD MP TURNOUT"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>

                  <input
                    type="text"
                    value={product.tendered || ''} // Set a default empty string if product.tendered is undefined
                    className="form-control"
                    placeholder="Tendered"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        tendered: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.valid || ''}
                    className="form-control"
                    placeholder="Valid"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        valid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.invalid || ''}
                    className="form-control"
                    placeholder="Set aside"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        invalid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.spoilt || ''}
                    className="form-control"
                    placeholder="Spoilt"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        spoilt: e.target.value,
                      });
                    }}
                  />
                                

                {/* <input
                  type="text"
                  value={product.total_registered}
                  className="form-control"
                  placeholder="category"
                  // readOnly={true}
                  style={{ display: "none" }}
                /> */}

                {/* <input
                  type="number"
                  className="form-control"
                  placeholder="Add Voter Turnout"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      voters_count: e.target.value,
                    });
                  }}
                /> */}
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={() => handleClick(product)}>SAVE</button>
            </Modal.Footer>
          </Modal>


          <Modal show={showIndvuna} onHide={handleCloseIndvuna}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD INDVUNA TURNOUT"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>

                  <input
                    type="text"
                    value={product.tendered || ''} // Set a default empty string if product.tendered is undefined
                    className="form-control"
                    placeholder="Tendered"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        tendered: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.valid || ''}
                    className="form-control"
                    placeholder="Valid"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        valid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.invalid || ''}
                    className="form-control"
                    placeholder="Set aside"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        invalid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.spoilt || ''}
                    className="form-control"
                    placeholder="Spoilt"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        spoilt: e.target.value,
                      });
                    }}
                  />
                                

                {/* <input
                  type="text"
                  value={product.total_registered}
                  className="form-control"
                  placeholder="category"
                  // readOnly={true}
                  style={{ display: "none" }}
                /> */}

                {/* <input
                  type="number"
                  className="form-control"
                  placeholder="Add Voter Turnout"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      voters_count: e.target.value,
                    });
                  }}
                /> */}
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={() => handleClick2(product)}>SAVE</button>
            </Modal.Footer>
          </Modal>

          <Modal show={showBucopho} onHide={handleCloseBucopho}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD BUCOPHO TURNOUT"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>

                  <input
                    type="text"
                    value={product.tendered || ''} // Set a default empty string if product.tendered is undefined
                    className="form-control"
                    placeholder="Tendered"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        tendered: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.valid || ''}
                    className="form-control"
                    placeholder="Valid"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        valid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.invalid || ''}
                    className="form-control"
                    placeholder="Invalid"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        invalid: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    value={product.spoilt || ''}
                    className="form-control"
                    placeholder="Spoilt"
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        spoilt: e.target.value,
                      });
                    }}
                  />
                                

                {/* <input
                  type="text"
                  value={product.total_registered}
                  className="form-control"
                  placeholder="category"
                  // readOnly={true}
                  style={{ display: "none" }}
                /> */}

                {/* <input
                  type="number"
                  className="form-control"
                  placeholder="Add Voter Turnout"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      voters_count: e.target.value,
                    });
                  }}
                /> */}
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={() => handleClick3(product)}>SAVE</button>
            </Modal.Footer>
          </Modal>



          <div style={{ marginTop: '5%' }}></div>

          <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, marginRight: '10px' }}>
      <table className="table table-bordered">
                <thead>
                <tr>
                  <th>MEMBERS OF PARLIAMENT</th>
                  <th>VOTES</th>
                </tr>
                </thead>

                  <tbody className="table table-bordered">
                  <tr >
                    <td>VALID</td>
                    <td>{turnoutMP.valid}</td>
                  </tr>
                  <tr>
                    <td>INVALID</td>
                    <td>{turnoutMP.invalid}</td>
                  </tr>
                  <tr>
                    <td>SPOILT</td>
                    <td>{turnoutMP.spoilt}</td>
                  </tr>
                  <tr>
                    <td>TENDERED</td>
                    <td>{turnoutMP.tendered}</td>
                  </tr>
                </tbody>
        
     
              
              </table>

              <button
                onClick={editHandlerMP}
                size={30}
              >MP Turnout
              </button>
            </div>



            <div style={{ flex: 2, marginRight: '10px' }}>
              <table className="table table-bordered bg-info">
                <thead>
                  <tr>
                    <th>INDVUNA YENKHUNDLA</th>
                    <th>VOTES</th>
                  </tr>
                </thead>
              
                <tbody className="table table-bordered">
                  <tr >
                    <td>VALID</td>
                    <td>{turnoutIndvuna.valid}</td>
                  </tr>
                  <tr>
                    <td>INVALID</td>
                    <td>{turnoutIndvuna.invalid}</td>
                  </tr>
                  <tr>
                    <td>SPOILT</td>
                    <td>{turnoutIndvuna.spoilt}</td>
                  </tr>
                  <tr>
                    <td>TENDERED</td>
                    <td>{turnoutIndvuna.tendered}</td>
                  </tr>
                </tbody>
              </table>

              <button

                // onClick={() => editHandlerIndvuna()}
                onClick={editHandlerIndvuna}
                // color={editedRecord === item ? "gray" : "blue"}
                size={30}
                // disabled={editedRecord === item}
                >INDVUNA Turnout</button>

            </div>



            <div style={{ flex: 2, marginRight: '10px' }}>
              {/* <h5>BUCOPHO Turnout</h5> */}
              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>BUCOPHO</th>
                  <th>VOTES</th>
                </tr>
                </thead>
                
                <tbody className="table table-bordered">
                  <tr >
                    <td>VALID</td>
                    <td>{turnoutBucopho.valid}</td>
                  </tr>
                  <tr>
                    <td>INVALID</td>
                    <td>{turnoutBucopho.invalid}</td>
                  </tr>
                  <tr>
                    <td>SPOILT</td>
                    <td>{turnoutBucopho.spoilt}</td>
                  </tr>
                  <tr>
                    <td>TENDERED</td>
                    <td>{turnoutBucopho.tendered}</td>
                  </tr>
                </tbody>
               
              </table>

              <button
                onClick={editHandlerBucopho}
                size={30}
              >BUCOPHO Turnout
              </button>

            </div>
          </div>

          

        </Tab>
        
        <Tab eventKey="products" title="MEMBERS OF PARLIAMENTS">
        <DownloadButton />
          <div className="d-flex justify-content-between"></div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>CANDIDATE IMAGE</th>
                <th>NAME</th>
                <th>SURNAME</th>
                {/* <th>CHIEFDOM</th> */}
                <th>INKHUNDLA</th>
                <th>REGION</th>
                <th>VOTES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {MP.map((item) => {
                const isVoted =
                  item.secondary_votes && item.secondary_votes[pollstation];
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.img}
                        height="80"
                        width="80"
                        alt={item.name}
                      />
                    </td>

                    <td style={{ ...smallfont }}>{item.name.toUpperCase()}</td>
                    <td style={{ ...smallfont }}>
                      {item.surname.toUpperCase()}
                    </td>
                    {/* <td style={{ ...smallfont }}>
                      {item.chiefdom.toUpperCase()}
                    </td> */}
                    <td style={{ ...smallfont }}>
                      {item.inkhundla.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.region.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.secondary_votes instanceof Map ? (
                        Array.from(item.secondary_votes.keys()).map((key) => (
                          <div key={key}>
                            {key}: {item.secondary_votes.get(key)}
                          </div>
                        ))
                      ) : (
                        <div>
                          {Object.keys(item.secondary_votes).length > 0 ? (
                            // Attempt to get properties of the secondary_votes object
                            Object.keys(item.secondary_votes).map((key) => (
                              <div key={key}>
                                {key.toUpperCase()}: {item.secondary_votes[key].toUpperCase()}
                              </div>
                            ))
                          ) : (
                            // Handle the case where secondary_votes is not defined
                            <span style={{ color: "red", fontSize: "90%" }}>
                              RESULTS NOT CAPTURED
                            </span>
                          )}

                          {/* Conditionally render the "Total Captured" value */}
                          {Object.keys(item.secondary_votes).length > 0 && (
                            <div>
                              <span>
                                <br></br>
                                TOTAL CAPTURED: {" "}
                                {Object.values(item.secondary_votes).reduce(
                                  (acc, value) => acc + parseInt(value, 10),
                                  0
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    <td>
                      {isVoted ? (
                        <span style={{ color: "red", fontSize: "90%" }}>
                          RESULTS CAPTURED
                        </span> // Display "voted" if the user has voted for this MP
                      ) : (
                        <div style={actionIconsStyles}>
                          <FaEdit
                            onClick={() => editHandler(item)}
                            color={editedRecord === item ? "gray" : "blue"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD VOTE TO MP"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.img}
                    alt="Product Image"
                    className="img-fluid"
                    style={{ borderRadius: "50%" }}
                    width="35%"
                    height="auto"
                  />
                </div>

                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.surname}
                  className="form-control"
                  placeholder="surname"
                  onChange={(e) =>
                    setProduct({ ...product, surname: e.target.value })
                  }
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.inkhundla}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, inkhundla: e.target.value })
                  }
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.region}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setProduct({ ...product, region: e.target.value })
                  }
                  readOnly={true}
                  style={{ display: "none" }}
                />

                {voteSubmitted ? (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter vote"
                    value={product.primary_votes[station] || ""}
                    readOnly
                    disabled={status} // Set disabled based on status
                  />
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter vote"
                    min={1}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        secondary_votes: {
                          ...product.secondary_votes,
                          [pollstation]: e.target.value,
                        },
                      })
                    }
                    disabled={status} // Disable the input field if status is true
                  />
                )}
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleVoteSubmission}>SAVE</button>
            </Modal.Footer>
          </Modal>
        </Tab>

        <Tab eventKey="orders" title="INDVUNA YENKHUNDLA">
        <DownloadButton />
          <div className="d-flex justify-content-between"></div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>CANDIDATE IMAGE</th>
                <th>NAME</th>
                <th>SURNAME</th>
                {/* <th>CHIEFDOM</th> */}
                <th>INKHUNDLA</th>
                <th>REGION</th>
                <th>VOTES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {tindvuna.map((item) => {
                const isVoted =
                  item.secondary_votes && item.secondary_votes[pollstation];
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.img}
                        height="80"
                        width="80"
                        alt={item.name}
                      />
                    </td>

                    <td style={{ ...smallfont }}>{item.name.toUpperCase()}</td>
                    <td style={{ ...smallfont }}>
                      {item.surname.toUpperCase()}
                    </td>
                    {/* <td style={{ ...smallfont }}>
                      {item.chiefdom.toUpperCase()}
                    </td> */}
                    <td style={{ ...smallfont }}>
                      {item.inkhundla.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.region.toUpperCase()}
                    </td>

                    <td style={{ ...smallfont }}>
                      {item.secondary_votes instanceof Map ? (
                        Array.from(item.secondary_votes.keys()).map((key) => (
                          <div key={key}>
                            {key}: {item.secondary_votes.get(key)}
                          </div>
                        ))
                      ) : (
                        <div>
                          {Object.keys(item.secondary_votes).length > 0 ? (
                            // Attempt to get properties of the secondary_votes object
                            Object.keys(item.secondary_votes).map((key) => (
                              <div key={key}>
                                {key.toUpperCase()}: {item.secondary_votes[key].toUpperCase()}
                              </div>
                            ))
                          ) : (
                            // Handle the case where secondary_votes is not defined
                            <span style={{ color: "red", fontSize: "90%" }}>
                              RESULTS NOT CAPTURED
                            </span>
                          )}

                          {/* Conditionally render the "Total Captured" value */}
                          {Object.keys(item.secondary_votes).length > 0 && (
                            <div>
                              <span>
                                <br></br>
                                TOTAL CAPTURED: {" "}
                                {Object.values(item.secondary_votes).reduce(
                                  (acc, value) => acc + parseInt(value, 10),
                                  0
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    <td>
                      {isVoted ? (
                        <span style={{ color: "red", fontSize: "90%" }}>
                          RESULTS CAPTURED
                        </span> // Display "voted" if the user has voted for this MP
                      ) : (
                        <div style={actionIconsStyles}>
                          <FaEdit
                            onClick={() => editHandler2(item)}
                            color={editedRecord === item ? "gray" : "blue"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD VOTE TO INDVUNA"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.img}
                    alt="Product Image"
                    className="img-fluid"
                    style={{ borderRadius: "50%" }}
                    width="35%"
                    height="auto"
                  />
                </div>

                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.surname}
                  className="form-control"
                  placeholder="surname"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.inkhundla}
                  className="form-control"
                  placeholder="price"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.region}
                  className="form-control"
                  placeholder="category"
                  readOnly={true}
                  style={{ display: "none" }}
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="enter vote"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      secondary_votes: {
                        ...product.secondary_votes,
                        [pollstation]: e.target.value,
                      },
                    });
                  }}
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={handleVoteSubmissionIndvuna}>SAVE</button>
            </Modal.Footer>
          </Modal>
        </Tab>

        <Tab eventKey="bucopho" title="BUCOPHO">
        <DownloadButton />
          <div className="d-flex justify-content-between"></div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>NOMINEE IMAGE</th>
                <th>NAME</th>
                <th>SURNAME</th>
                <th>CHIEFDOM</th>
                <th>INKHUNDLA</th>
                <th>REGION</th>
                <th>VOTES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bucopho.map((item) => {
                const isVoted =
                  item.secondary_votes && item.secondary_votes[pollstation];
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.img}
                        height="80"
                        width="80"
                        alt={item.name}
                      />
                    </td>

                    <td style={{ ...smallfont }}>{item.name.toUpperCase()}</td>
                    <td style={{ ...smallfont }}>
                      {item.surname.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.chiefdom.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.inkhundla.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.region.toUpperCase()}
                    </td>
                    <td style={{ ...smallfont }}>
                      {item.secondary_votes instanceof Map ? (
                        Array.from(item.secondary_votes.keys()).map((key) => (
                          <div key={key}>
                            {key}: {item.secondary_votes.get(key)}
                          </div>
                        ))
                      ) : (
                        <div>
                          {Object.keys(item.secondary_votes).length > 0 ? (
                            // Attempt to get properties of the secondary_votes object
                            Object.keys(item.secondary_votes).map((key) => (
                              <div key={key}>
                                {key.toUpperCase()}: {item.secondary_votes[key].toUpperCase()}
                              </div>
                            ))
                          ) : (
                            // Handle the case where secondary_votes is not defined
                            <span style={{ color: "red", fontSize: "90%" }}>
                              RESULTS NOT CAPTURED
                            </span>
                          )}

                          {/* Conditionally render the "Total Captured" value */}
                          {Object.keys(item.secondary_votes).length > 0 && (
                            <div>
                              <span>
                                <br></br>
                                TOTAL CAPTURED: {" "}
                                {Object.values(item.secondary_votes).reduce(
                                  (acc, value) => acc + parseInt(value, 10),
                                  0
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      {isVoted ? (
                        <span style={{ color: "red", fontSize: "90%" }}>
                          RESULTS CAPTURED
                        </span> // Display "voted" if the user has voted for this BUCOPHO
                      ) : (
                        <div style={actionIconsStyles}>
                          <FaEdit
                            onClick={() => editHandler4(item)}
                            color={editedRecord === item ? "gray" : "blue"}
                            size={30}
                            disabled={editedRecord === item}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show4} onHide={handleClose4}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add a product" : "ADD VOTE TO BUCOPHO"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.img}
                    alt="Product Image"
                    className="img-fluid"
                    style={{ borderRadius: "50%" }}
                    width="35%"
                    height="auto"
                  />
                </div>

                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.surname}
                  className="form-control"
                  placeholder="surname"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.inkhundla}
                  className="form-control"
                  placeholder="price"
                  readOnly={true}
                />

                <input
                  type="text"
                  value={product.region}
                  className="form-control"
                  placeholder="category"
                  readOnly={true}
                  style={{ display: "none" }}
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="enter vote"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      secondary_votes: {
                        ...product.secondary_votes,
                        [pollstation]: e.target.value,
                      },
                    });
                  }}
                />
                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <button>Close</button> */}

              <button onClick={handleVoteSubmissionBucopho}>SAVE</button>
            </Modal.Footer>
          </Modal>
        </Tab>

 
      </Tabs>
    </Layout>
  );
}

export default AdminPage;
