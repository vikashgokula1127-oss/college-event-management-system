import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBCd9jgelyscNH8uht8s8nFsRfXkvK-eIbg",
    authDomain: "college-event-managment-b5d1b.firebaseapp.com",
    projectId: "college-event-managment-b5d1b",
    storageBucket: "college-event-managment-b5d1b.firebasestorage.app",
    messagingSenderId: "627227280897",
    appId: "1:627227280897:web:83f5c219c297188676e200"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// ===============================
// STUDENT REGISTRATION
// ===============================

const form = document.getElementById("registrationForm");

if (form) {

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const rollNumber = document.getElementById("rollNumber").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const department = document.getElementById("department").value;
        const eventName = document.getElementById("event").value;

        try {

            await addDoc(collection(db, "registrations"), {
                name: name,
                rollNumber: rollNumber,
                email: email,
                phone: phone,
                department: department,
                event: eventName
            });

            alert("Registration successful! ✅");

            form.reset();

        } catch (error) {

            console.error("Error:", error);
            alert("Registration failed! ❌");

        }

    });
}


// ===============================
// OLD STUDENT LOGIN
// ===============================

function loginUser(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (username === "student" && password === "1234") {

        message.innerHTML = "Login Successful! ✅";
        message.style.color = "green";

    } else {

        message.innerHTML = "Invalid Username or Password ❌";
        message.style.color = "red";

    }
}


// ===============================
// HOST ADD EVENT
// ===============================

const eventForm = document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const eventName =
            document.getElementById("eventName").value;

        const eventDate =
            document.getElementById("eventDate").value;

        const eventVenue =
            document.getElementById("eventVenue").value;

        


        try {

            await addDoc(collection(db, "events"), {

                name: eventName,
                date: eventDate,
                venue: eventVenue,
                

            });


            document.getElementById("eventMessage").innerHTML =
                "Event added successfully! ✅";

            document.getElementById("eventMessage").style.color =
                "green";

            eventForm.reset();


        } catch (error) {

            console.error(error);

            document.getElementById("eventMessage").innerHTML =
                "Failed to add event ❌";

            document.getElementById("eventMessage").style.color =
                "red";

        }

    });

}


// ===============================
// ===============================
// DISPLAY EVENTS
// ===============================

const eventContainer =
    document.getElementById("eventContainer");

if (eventContainer) {

    async function loadEvents() {

        try {

            const snapshot =
                await getDocs(collection(db, "events"));

            eventContainer.innerHTML = "";

            snapshot.forEach((eventDoc) => {

                const eventData = eventDoc.data();

                const eventCard =
                    document.createElement("div");

                eventCard.className = "event-card";

                eventCard.innerHTML = `
                    <h3>${eventData.name}</h3>

                    <p>
                        <b>Date:</b>
                        ${eventData.date}
                    </p>

                    <p>
                        <b>Venue:</b>
                        ${eventData.venue}
                    </p>

                    

                    <a href="register.html">
                        <button>Register Now</button>
                    </a>
                `;

                eventContainer.appendChild(eventCard);

            });

        } catch (error) {

            console.error(
                "Error loading events:",
                error
            );

        }
    }

    loadEvents();
}


// ===============================
// ===============================
// HOST LOGIN
// ===============================

const hostLoginForm = document.getElementById("hostLoginForm");

if (hostLoginForm) {

    hostLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("hostUsername").value;
        const password = document.getElementById("hostPassword").value;

        const message = document.getElementById("hostLoginMessage");

        // Host email and password
        if (email === "necn@college.com" && password === "12345") {

            message.innerHTML = "Host Login Successful! ✅";
            message.style.color = "green";

            setTimeout(function() {
                window.location.href = "host-dashboard.html";
            }, 1000);

        } else {

            message.innerHTML = "Invalid Host Email or Password ❌";
            message.style.color = "red";

        }

    });

}

}


// ===============================
// DISPLAY PARTICIPANTS
// ===============================

const participantsContainer =
    document.getElementById(
        "participantsContainer"
    );


if (participantsContainer) {

    async function loadParticipants() {

        try {

            const snapshot =
                await getDocs(
                    collection(db, "registrations")
                );


            participantsContainer.innerHTML = "";


            if (snapshot.empty) {

                participantsContainer.innerHTML =
                    "<p>No participants registered yet.</p>";

            } else {

                snapshot.forEach((participantDoc) => {

                    const participant =
                        participantDoc.data();


                    const participantCard =
                        document.createElement("div");


                    participantCard.className =
                        "event-card";


                    participantCard.innerHTML = `

                        <h3>${participant.name}</h3>

                        <p>
                        <b>Roll Number:</b>
        ${participant.rollNumber || "No Roll Number"}
    </p>
                            <b>Email:</b>
                            ${participant.email}
                        </p>

                        <p>
                            <b>Phone:</b>
                            ${participant.phone}
                        </p>

                        <p>
                            <b>Department:</b>
                            ${participant.department}
                        </p>

                        <p>
                            <b>Event:</b>
                            ${participant.event}
                        </p>

                    `;


                    participantsContainer.appendChild(
                        participantCard
                    );

                });

            }


        } catch (error) {

            console.error(
                "Error loading participants:",
                error
            );


            participantsContainer.innerHTML =
                "<p>Failed to load participants.</p>";

        }

    }


    loadParticipants();

}


// ===============================
// LOAD EVENTS INTO REGISTER DROPDOWN
// ===============================

const eventSelect =
    document.getElementById("event");


if (eventSelect) {

    async function loadEventOptions() {

        try {

            const snapshot =
                await getDocs(
                    collection(db, "events")
                );


            snapshot.forEach((eventDoc) => {

                const eventData =
                    eventDoc.data();


                const option =
                    document.createElement("option");


                option.value =
                    eventData.name;


                option.textContent =
                    eventData.name;


                eventSelect.appendChild(option);

            });


        } catch (error) {

            console.error(
                "Error loading event options:",
                error
            );

        }

    }


    loadEventOptions();

}