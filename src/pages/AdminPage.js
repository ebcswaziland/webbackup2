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

  const [add, setAdd] = React.useState(false);
  const [tindvuna, setTindvuna] = React.useState([]);
  const [bucopho, setBucopho] = React.useState([]);
  const [turnout, setTurnout] = React.useState([]);
  const [MP, setMP] = React.useState([]);
  const [openDateTime, setOpenDateTime] = useState(new Date());
  const [station, setStation] = React.useState("");
  // const [poll, setPoll] = React.useState("");
  const phone = localStorage.getItem("phone");

  const poll = localStorage.getItem("poll");
  const primary_poll = localStorage.getItem("primary_poll");
  const pollstation = localStorage.getItem("pollstation");
  const [hasVoted, setHasVoted] = useState(false);

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
    name: "",
    price: 0,
    imageUrl: "",
    category: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);
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
      await setDoc(
        doc(fireDB, `${primary_poll}/Pollings/stations`, product.id),
        product
      );
      toast.success("Turnout has successfully added");
      window.location.reload();
      handleClose3();
    } catch (error) {
      setLoading(false);
      toast.error("failed to add");
    }
  };

  useEffect(() => {
    getOrdersData();
    getTinkhundlaData();
    getPollingsData();
    getBucophoData();
  }, []);

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
                <th>STATUS</th>
                <th>TOTAL-REGISTERED</th>
                <th>VOTER TURNOUT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {turnout.map((item) => {
                const isVoted = item.name === pollstation;
                const statusText = item.status ? "Open" : "Closed"; // Check the boolean value
                const status = item.status;
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

                    <td style={{ display: "flex", alignItems: "center" }}>
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

                    <td>{item.total_registered}</td>
                    <td>{item.voters_count}</td>
                    <td>
                      {isVoted ? (
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
        </Tab>
        
        <Tab eventKey="products" title="MEMBERS OF PARLIAMENTS">
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
