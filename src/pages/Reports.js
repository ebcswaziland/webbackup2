import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "../components/Loader";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDns625k8bwUuNxw8f9mLVz_pH2956fWL8",
  authDomain: "ebc-app-aead3.firebaseapp.com",
  databaseURL: "https://ebc-app-aead3-default-rtdb.firebaseio.com",
  projectId: "ebc-app-aead3",
  storageBucket: "ebc-app-aead3.appspot.com",
  messagingSenderId: "789710588741",
  appId: "1:789710588741:web:b5b19e63a97625bada4c2c",
  measurementId: "G-YPVE7EW8HK",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const MyPDF = ({ data, titles }) => {
  // Sort data in descending order of totalSecondaryVotes
  data.sort((a, b) => b.totalSecondaryVotes - a.totalSecondaryVotes);

  return (
    <Page size="A3">
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Surname</Text>
          <Text style={styles.headerCell}>Chiefdom</Text>
          <Text style={styles.headerCell}>Inkhundla</Text>
          <Text style={styles.headerCell}>Region</Text>
          <Text style={styles.headerCell}>INMATES</Text>
          <Text style={styles.headerCell}>DIASPORA</Text>
          <Text style={styles.headerCell}>SPECIAL</Text>
          <Text style={styles.headerCell}>Secondary</Text>
          <Text style={styles.headerCell}>Total</Text>
        </View>

        {titles.map((title, index) => (
          <React.Fragment key={index}>
            <Text style={styles.title}>{title}</Text>
            {data[index].map((nominee, i) => {
              // Calculate the total secondary votes for the nominee
              const secondaryVotes = nominee.secondary_votes || {};
              const inmates = parseInt(secondaryVotes.INMATE) || 0;
              const diaspora = parseInt(secondaryVotes.DIASPORA) || 0;
              const special = parseInt(secondaryVotes.SPECIAL) || 0;
              const totalSecondaryVotes = Object.values(
                nominee.secondary_votes || {}
              ).reduce((total, votes) => total + parseInt(votes || 0), 0);

              const SecondaryVotesTotal = Object.entries(secondaryVotes).reduce(
                (total, [key, votes]) => {
                  if (
                    key !== "INMATE" &&
                    key !== "DIASPORA" &&
                    key !== "SPECIAL"
                  ) {
                    return total + parseInt(votes || 0);
                  }
                  return total;
                },
                0
              );

              return (
                <View key={i} style={styles.nominee}>
                  <Text style={styles.cell}>{nominee.name || "N/A"}</Text>
                  <Text style={styles.cell}>{nominee.surname || "N/A"}</Text>
                  <Text style={styles.cell}>{nominee.chiefdom || "N/A"}</Text>
                  <Text style={styles.cell}>{nominee.inkhundla || "N/A"}</Text>
                  <Text style={styles.cell}>{nominee.region || "N/A"}</Text>
                  <Text style={styles.cell}>{inmates || "0"}</Text>
                  <Text style={styles.cell}>{diaspora || "0"}</Text>
                  <Text style={styles.cell}>{special || "0"}</Text>
                  <Text style={styles.cell}>{SecondaryVotesTotal || "0"}</Text>
                  <Text style={styles.cell}>{totalSecondaryVotes || "0"}</Text>
                </View>
              );
            })}
          </React.Fragment>
        ))}
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    fontSize: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0074e4",
    color: "#ffffff",
    padding: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    // textAlign: "center",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  nominee: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    flex: 1,
  },
});

function Reports() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const poll = localStorage.getItem("poll");
  const primary_poll = localStorage.getItem("primary_poll");

  useEffect(() => {
    const fetchNomineeData = async () => {
      try {
        const urls = [
          `${poll}/MP/nominees`,
          `${poll}/Indvuna/nominees`,
          `${primary_poll}/Bucopho/nominees`,
        ];

        const dataPromises = urls.map(async (url) => {
          const querySnapshot = await getDocs(collection(firestore, url));
          const nominees = querySnapshot.docs.map((doc) => doc.data());

          // Simulate a delay for demonstration purposes
          await new Promise((resolve) => setTimeout(resolve, 1000));

          nominees.forEach((nominee) => {
            const secondaryVotes = nominee.secondary_votes || {};
            const inmates = parseInt(secondaryVotes.INMATE) || 0;
            const diaspora = parseInt(secondaryVotes.DIASPORA) || 0;
            const special = parseInt(secondaryVotes.SPECIAL) || 0;
            const SecondaryVotesTotal = Object.entries(secondaryVotes).reduce(
              (total, [key, votes]) => {
                if (
                  key !== "INMATE" &&
                  key !== "DIASPORA" &&
                  key !== "SPECIAL"
                ) {
                  return total + parseInt(votes || 0);
                }
                return total;
              },
              0
            );

            const totalSecondaryVotes =
              inmates + diaspora + special + SecondaryVotesTotal;

            nominee.totalSecondaryVotes = totalSecondaryVotes;
          });

          return nominees;
        });

        const nomineesData = await Promise.all(dataPromises);

        setData(nomineesData);
        setIsLoading(false);

        console.log("Fetched Data:", nomineesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Simulate a 3-second delay before starting to fetch data
    const delay = 3000;
    const interval = 100;
    let currentProgress = 0;

    const loadingInterval = setInterval(() => {
      currentProgress += (interval / delay) * 100;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(loadingInterval);
        fetchNomineeData();
      }
    }, interval);

    return () => {
      clearInterval(loadingInterval);
    };

    // fetchNomineeData();
  }, []);


  const data1 = []; // Your data array
  const titles = ['MP', 'INDVUNA', 'BUCOPHO']; // Your titles array

  const handleButtonClick = () => {
    // Create a new window to display the PDF
    const newWindow = window.open();
    if (newWindow) {
      // Render the PDF in the new window
      newWindow.document.body.innerHTML = `
        <html>
          <head>
            <title>Report</title>
          </head>
          <body>
            <iframe src="/REPORT.pdf" width="100%" height="100%"></iframe>
          </body>
        </html>
      `;

      // Generate the PDF file
      const pdfContent = (
        <MyPDF data={data} titles={titles} />
      );

      // Convert the PDF content to a data URL
      const pdfDataUrl = `data:application/pdf;base64,${btoa(
        pdfContent.props.children
      )}`;

      // Open the PDF in a new tab
      newWindow.location.href = pdfDataUrl;
    }
  };


  return (
    <div className="App">
      <ErrorBoundary>
        {isLoading ? (
          // Show loading indicator or message
          Loader()
        ) : (
          <div className="App">
          <button onClick={handleButtonClick}>Open PDF</button>
          <PDFViewer width="100%" height="700px">
            <MyPDF data={data1} titles={titles} />
          </PDFViewer>
        </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default Reports;
