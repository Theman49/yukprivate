const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const upload = require('./helper/fileUpload');
const passport = require("passport");
const path = require("path");

require("dotenv").config();
require("./helper/passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// ------------------------- Public File Access ------------------------- //

// app.use("/public/files", express.static(path.join(__dirname, "storages")));
app.use("/storages", express.static(path.join(__dirname, "storages")));

// ------------------------- End Public File Access ------------------------- //


/* ====================== Import Controller ====================== */

const authController = require("./controllers/authController");
const usersController = require("./controllers/usersController");
const studentsController = require("./controllers/studentsController");
const tentorsController = require("./controllers/tentorsController");
const loginController = require("./controllers/loginController");
const utilsController = require("./controllers/utilsController");
const bookingsController = require("./controllers/bookingsController");

/* ====================== End Import Controller ====================== */


/* ====================== Import Middlewares ====================== */

const middlewares = require("./middlewares/auth");

/* ====================== End Import Middlewares ====================== */



/* ====================== Define API ====================== */

/* ---------- Auth Endpoint ----------*/

app.post("/api/yukprivate/register", authController.handleRegister);
app.put("/api/yukprivate/register/verify", middlewares.authenticate, authController.handleVerifyEmail);
app.put("/api/yukprivate/register/verify/resend", middlewares.authenticate, authController.handleResendOTP);
app.put("/api/yukprivate/forgotpassword", authController.handleForgotPassword);
app.put("/api/yukprivate/forgotpassword/verify", authController.handleVerifyForgotPassword);
app.put("/api/yukprivate/forgotpassword/verify/resend", authController.handleForgotPasswordResendOTP);
app.put("/api/yukprivate/resetpassword", authController.handleResetPassword);
app.post("/api/yukprivate/login", loginController.handleLogin);
app.get("/api/yukprivate/auth/me", middlewares.authenticate, loginController.handleCurrentUser);

/* ---------- End Auth Endpoint ----------*/


/* ---------- Google Oauth Endpoint ----------*/

app.post("/api/yukprivate/auth/login-google", loginController.handleLoginGoogle);

// app.get(
//     "/api/yukprivate/auth/login-google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//         prompt: "consent",
//         session: false,
//     })
// );

// app.get(
//     "/",
//     passport.authenticate("google", {
//         session: false,
//         // successRedirect: "/api/yukprivate/loginGoogle",
//         failureRedirect: "/fail",
//     }), loginController.handleLoginGoogle
// );

// app.get("/api/yukprivate/loginGoogle", (req, res) => {
//     res.send("halo")
// });

// app.get("/fail", (req, res) => {
//     res.send("Login failed");
// });

/* ---------- End Google Oauth Endpoint ----------*/


/* ---------- User Endpoint ----------*/

app.get("/api/yukprivate/users/:id", middlewares.authenticate, usersController.handleGetUserById);
app.get("/api/yukprivate/users/students/:id", middlewares.authenticate, usersController.handleGetStudentsById);
app.get("/api/yukprivate/users/tentors/:id", middlewares.authenticate, usersController.handleGetTentorsByIdAfterLogin);
app.get("/api/yukprivate/tentors/search", usersController.handleGetAllTentors);
app.get("/api/yukprivate/tentors/:id", usersController.handleGetTentorByIdBeforeLogin);
app.put("/api/yukprivate/users/changepassword", middlewares.authenticate, usersController.handleUsersChangePassword);

/* ---------- End User Endpoint ----------*/



/* ---------- Student Endpoint ----------*/

app.post("/api/yukprivate/students/biodata/1", middlewares.authenticate, studentsController.handleStudentsBiodataSection1);
app.put("/api/yukprivate/students/biodata/2", middlewares.authenticate, studentsController.handleStudentsBiodataSection2);
app.put("/api/yukprivate/students/biodata/3", middlewares.authenticate, studentsController.handleStudentsBiodataSection3);
app.put("/api/yukprivate/students/biodata/update", middlewares.authenticate, upload.single('url_picture'), studentsController.handleUpdateDataStudentsByUserId);

/* ---------- End Student Endpoint ----------*/



/* ---------- Tentor Endpoint ----------*/

app.post("/api/yukprivate/tentors/biodata/1", middlewares.authenticate, tentorsController.handleTentorsBiodataSection1);
app.put("/api/yukprivate/tentors/biodata/2", middlewares.authenticate, tentorsController.handleTentorsBiodataSection2);
app.put("/api/yukprivate/tentors/biodata/3", middlewares.authenticate, tentorsController.handleTentorsBiodataSection3);
app.post("/api/yukprivate/tentors/biodata/4", middlewares.authenticate, tentorsController.handleTentorsBiodataSection4);
app.delete("/api/yukprivate/tentors/biodata/4/:id", middlewares.authenticate, tentorsController.handleDeleteTentorsBiodataSection4);
app.post("/api/yukprivate/tentors/biodata/5", middlewares.authenticate, upload.single('url_certificate'), tentorsController.handleTentorsBiodataSection5);
app.delete("/api/yukprivate/tentors/biodata/5/:id", middlewares.authenticate, tentorsController.handleDeleteTentorsBiodataSection5);
app.post("/api/yukprivate/tentors/biodata/6", middlewares.authenticate, upload.single('url_esay'), tentorsController.handleTentorsBiodataSection6);
app.post("/api/yukprivate/tentors/biodata/7Schedule",middlewares.authenticate, tentorsController.handleTentorsBiodataSection7Schedule);
app.put("/api/yukprivate/tentors/biodata/finish", middlewares.authenticate, tentorsController.handleTentorsBiodataSectionFinish);
app.put("/api/yukprivate/tentors/biodata/update", middlewares.authenticate, upload.single('url_picture'), tentorsController.handleUpdateBiodataTentorsByTentorId);
app.put("/api/yukprivate/tentors/education/update", middlewares.authenticate, tentorsController.handleUpdateEducationTentorsByTentorId);
app.get("/api/yukprivate/tentors/reviews/:tentor_id",  tentorsController.handleGetReviewsByTentorId);
app.get("/api/yukprivate/tentors/galery/:tentor_id",  tentorsController.handleGetGaleryByTentorId);

/* ---------- End Tentor Endpoint ----------*/


/* ---------- Utils Endpoint ----------*/

app.get("/api/yukprivate/last-education", utilsController.getLastEducations);
app.get("/api/yukprivate/generate-unique-code", utilsController.generateUniqueCode);

/* ---------- End Utils Endpoint ----------*/



/* ---------- Booking Endpoint ----------*/

app.post("/api/yukprivate/booking/generate-token-snap", bookingsController.generateTokenSnap);
app.post("/api/yukprivate/booking", bookingsController.handleBooking);
app.get("/api/yukprivate/booking/finish", bookingsController.handleBookingFinish);
app.post("/api/yukprivate/booking/notification/handling", bookingsController.handleBookingNotification);

app.put("/api/yukprivate/booking/confirm", bookingsController.handleBookingConfirm);
app.get("/api/yukprivate/booking/students", middlewares.authenticate, bookingsController.handleGetBookingByStudentId);
app.get("/api/yukprivate/booking/tentors", middlewares.authenticate, bookingsController.handleGetBookingByTentorId);
app.get("/api/yukprivate/booking/tentors/today", middlewares.authenticate, bookingsController.handleGetBookingTodayByTentorId)

app.put("/api/yukprivate/booking/start/:booking_id", middlewares.authenticate, bookingsController.handleStartClass);
app.put("/api/yukprivate/booking/end/:booking_id", middlewares.authenticate, upload.single('url_activity_picture'), bookingsController.handleEndClass);
app.put("/api/yukprivate/booking/validate/:booking_id", middlewares.authenticate, bookingsController.handleValidateClass)
app.put("/api/yukprivate/booking/expired/:booking_id", middlewares.authenticate, bookingsController.handleExpiredClass)


/* ---------- End Booking Endpoint ----------*/

/* ---------- Transaction Endpoint ----------*/
app.get("/api/yukprivate/transaction/students", middlewares.authenticate, bookingsController.handleGetTransactionByStudentId);
/* ---------- End Transaction Endpoint ----------*/






/* ====================== End Define API ====================== */


/* ====================== Listen PORT ====================== */

app.listen(PORT, () => {
    console.log(`Server running successfully on port http://localhost:${PORT}`);
});

/* ====================== End Listen PORT ====================== */