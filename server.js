const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── DATABASE ──
const DATABASE = [
  { adviser: "Karleen R. Dumangas", students: ["AQUINO, RAZZEL V.","CAYABAN, CEDEE T.","DOLLETE, DANIEL LOUIS F.","DOMACENA, MICO ANGELO M.","ENRIQUEZ, THOMIE HENBERTSON C.","ESPAÑOL, JUNES IAN D.","LINGUAJE, REYNALDO JR. C.","QUILAB, JHAYE ANDRIE D.","RETIRADO, TJ CHARLS D.","TUGADE, ALFRED A.","VERMUG, EL CIV D.","VILLAREY, MATT EDREI D.","ANOCHE, ARIA MIEL D.","ANOCHE, DANA FAITH L.","AQUINO, MADILYN D.","ARIMAS, FAYE R.","BALUYOT, JHEMAICA C.","BASA, FRAN LUIZA E.","BAUTISTA, LEIGH ANN D.","BAYANI, JEYAN D.","BERGONIA, VENISSE NICOLE D.","DAYO, DAPHINE MAE D.","DELIQUIÑA, EUNICE S.","DITAPAT, AUBREY D.","ENCINARES, TIFFANY ZEA S.","FAMANILA, PHOEMELA ROSE A.","FEDERE, KRYSTLE ANNE D.","FERRER, JULIENNE NICOLE D.","FULGENCIO, KATHLEEN V.","GUIANG, KRYZ PAULA N.","LUNA, DONITA FE A.","MACAALAY, LOVELY MAY B.","OMAY, FLORENCE B.","QUINTO, JAZMINE JOY L.","RAMOS, DIANNE S.","RAYALA, EUREKA MAE V.","TAN, CLARISSE M.","VILLANUEVA, CHARM JILLIAN B."] },
  { adviser: "Jeff Aaron D. Reytomas", students: ["ACUAVERA, LLOYD M.","ANASTACIO, ZERWYANE JADE A.","BETON, RAMON EXEQUIEL E.","BLANCO, WILLIAM JEFF V.","CABIDO, VRAYXON P.","DANTES, FERNANDO KARLO D.","DEJUMO, RODEL JR. D.","DELA CRUZ, RANNUEL P.","DEVERA, LOVERN G.","DOLANDOLAN, RINZEL R.","DOYANAN, ARWIN F.","ENCARNACION, BRIAN JOEL D.","GALLARDO, CHARLES ANTHONY D.","JUANICO, JOSE MIGUEL M.","NESPEROS, MHELMAR D.","ANGELES, ALLYSSA D.","ARAUCTO, MARY SALVACION D.","BALANGON, IRISH COLEEN D.","BALAURO, KRIZEL LHYNE P.","DANTE, EIRRENE CLEO F.","DAYAP, ZYNETH REXIE S.","DEDICATORIA, JESSICA","DELA CRUZ, JANNEL M.","DEVERA, AMANDA SYMONE V.","DEVERA, ANGEL N.","DEVILLAS, JASMIN R.","DIAL, ALTHEA LOREEN D.","DIMASACUPAN, KATRINA R.","DOLFO, APRIL DANE M.","DUAVE, MARY ANGEL R.","JUSTO, JESIAH MAE A.","MANLICLIC, ERICKA P.","SUNGA, KIM AIZABEL D.","TAPADO, ALEXA ARRIANE Q."] },
  { adviser: "Edgar B. Pangilinan", students: ["APOLONA, FRANCIS P.","BALDUEZA, JOHN JOSHUA D.","DULLON, CARL DAVE R.","FARILLON, ZEDRICK G.","GONZALES, RAVEN N.","LATT, MCKELL AUNG O.","OSBORNE, JESSE RAFAEL E.","ROMANBAN, KURT JULIAN C.","SERIAL, JUSTINE JEREL E.","YAP, TRIBERSAN D.","ABALLA, ANNA MAE D.","ABION, CHERRY ANNE D.","ABUJEN, SHA-YNA D.","ACRAMAN, HAYANI A.","ARAUCTO, ASHLEY ARIANNA F.","BACANI, CHARMAINE ANNE B.","BUNGLO, JANELLE B.","DESUNIA, EDELYN D.","DEVERA, ANGELINE A.","DIMALANTA, MARY SAN A.","DOLLETE, KATE MARLEY D.","DURON, ANGEL ROSE D.","FRONDARINA, LOUREN JOY D.","GUANGA, LIAN NICOLE P.","LLANES, JACQUELENE FAITH R.","MACANDOG, JANELLA ROSE L.","MANALO, EINA KLAYRE D.","MANILA, PRINCESS MICAH R.","MAYA, NATHALIE D.","PONCE, ANDREA MAE I.","SALAZAR, JANNAH D.","SUBONG, WINNIE CLAIRE M.","TANDOC, MICHAELLA MARIE P.","TELEBRICO, MADELLINE"] },
  { adviser: "Lanie L. Fabrigas", students: ["AGAGAS, JOHN LEE C.","BALANGON, ANDREW B.","BALUYOT, ZEDRIK JOHN F.","DACLISON, NATHANIEL F.","DAOS, HARVY F.","DIAZ, AREN FRANZ D.","DIMAANO, LANCE H.","DOBLE, JAN NATHAN B.","DOYANAN, JEREMY D.","EDUCALAN, HALE D.","EUGENIO, MICHAEL JAY G.","FERNANDEZ, JOHN CRIS B.","LABASAN, JEROME B.","PANES, DAVID CARL M.","BAUTISTA, ANGELICA MAY D.","BENEDICTO, LARAH JANELLE G.","BESA, MARIELLE FEBIE G.","BUGARIN, GELLIAN PEARL E.","BUGARIN, KIM R.","DELIDELI, LEA D.","DIAGO, GERLYN M.","DIESTA, HAZELLE MAE D.","DIMAANO, TRISHA MAE F.","DIVINO, LHARIAN LAVIGNE E.","ENCARNACION, ANRE FHEY A.","EVANGELISTA, MARLYN M.","GAEN, IZAH FRANCHESKA A.","MALVEDA, JEMIMAH PATRICIA M.","MANGOHIG, PRECIOUS LEAJ M.","MIWA, SHIKI B.","MORA, PRECIOUS JOSEPHINE C.","PACHECO, PRINCESS FATIMA G.","PAGAR, MARIA JANEIL D.","PALISOC, LADY KIANA A.","PUZON, KIARA MIA R."] },
  { adviser: "Monna Liza T. Cruzado", students: ["BALUYOT, LUCKY JB D.","CRUZ, JHEREZ AIZEN C.","DOCUYANAN, CARLIE JAMES N.","ESCASURA, KENNETH D.","ESMELO, REYMUND A.","LAUREL, BRYLLE ANDRE J.","LOGATOC, JAMES LARRENCE V.","PANES, CEPHT ADRIAN M.","RIBO, REYJAN M.","ROMERO, JOHN DARYLL D.","SARMIENTO, KARL D.","BULATAO, PRECIOUS REYNN R.","DACER, HERSHEY A.","DANTAY, JAMUEL M.","DANTE, YELENA BEATRICE A.","DAQUINAG, LERA JOY P.","DEVESFRUTO, XYLLENNE D.","DIMAANO, MABEL S.","DIZON, LORRINE NICOLE E.","DOMINGO, TRIXIE JOY M.","DORIO, KIMBERLY JANE A.","FALLORIA, MARGIELYN D.","FELICITAS, JHENRIL C.","JAVIER, APRIL ANNE J.","MEJIA, DANICA MAE D.","MENDOZA, JAIRA JAHEIL F.","PANGILINAN, EURIKA R.","PASAG, ANGEL FAYE D.","RABACA, KRISHA MIEL B.","SABERON, ALTHEA JOY G.","SAN JOSE, YASMINE GAYLE M.","TORRES, AIZELLE MAE P.","VALDEZ, ALYSSA MAY C.","VALLENTE, SHEKINAH ZIMNEL B.","VICTORIA, JESSY MAE C.","VISCA, CZARINA DOMINIQUE A."] },
  { adviser: "Diana Rose M. Torres", students: ["ALIBIADO, MICHAEL P.","BAYANI, HERALD D.","CABANLIG, JOHN EARL R.","CERVANTES, JENCINTH ALFARL R.","DORDE, ADOLF HITLER G.","DORIG, KRIS MIKAEL C.","DULLON, DANIEL DAVE B.","EPAN, RODOLFO CESAR A.","FERRER, VINCE JUSTINE D.","GALANG, ABRAHAM PAUL","GANTANG, JAMES JASTER L.","GOMEZ, WAYNE ACHILLES D.","LAPINIG, EDRIAN L.","MALLARI, JERAMHEEL C.","YABUT, AIZEN DAVE P.","YANIG, ANGELO D.","ABUJEN, FEBIE ANGELIE B.","AGBUYA, ANGEL ANN P.","ASLAM, BISMA A.","AYTONA, SHEILA MAE","BALINTAY, KRISTEL C.","CABANGON, KHATE COLLYNE","CALUGAY, GAIL HAYDEN M.","CORTEZANO, JAY-ZEE D.","DACLISON, MARY CATHERINE T.","DAPITIN, KYLIE MARIE T.","DEVILLENA, MELISSA ANN B.","DIAGO, JENNY B.","DIAL, JEN ANDREA D.","FLORES, ALLYANA MARIE B.","FONTANILLA, JHAZMINE F.","GABO, ANGEL ANNE","GOLEZ, JHASSEZ D.","IDOS, CHRISTINE JOY A.","ISIDRO, SHANE D.","LESACA, ZYAMILLAH XYKE E.","PINEDA, AZALIA C.","RIAZA, CHRISTINE MAE S.","SERIAL, DARLENE JOY L.","TONGOL, DANNA ROSE C."] },
  { adviser: "Jayson R. Cayaga", students: ["ARANDIA, JOHN NICO D.","BALUYOT, JANSEN ERA M.","BAUSA, SEANN WILLIAM D.","CORTEZ, KIRBY ANGELO C.","DEGOLLADO, SEBASTIAN ETHAN R.","DEL ROSARIO, IEL IVAN D.","DIMAQUIBO, RUBEN JR. M.","DOLANDOLAN, LEXTER R.","ESCOBAL, REYSTER KLEIN D.","ESTACION, JOHN VINCENT D.","FAMANILA, JOHN PAZ D.","GONZALES, HUE D.","MORANTE, JOHN CHARLE MAGNE D.","NALICAT, AINSLEE XYRONE S.","RAFAEL, MARK ANGELO R.","SALAZAR, JAMES D.","ABUJEN, LESLIE G.","ARCALA, JULLIE DIVINE E.","BADAR, ALEXA MAE D.","BALANGON, TATZ MILDRED N.","CORTEZ, BERLYN RUTH D.","DAOS, ANGELA FAITH P.","DEGOLLADO, ANDREA SAMANTHA A.","DIMAANO, AERIELLE FAYE M.","DOLLUERAS, MELONA JOY L.","ELBO, DENNISE A.","EVANGELISTA, DANICA F.","FAMULARCANO, ANDREA E.","FERNANDEZ, ANN LYN DIANE","GALIN, KC G.","GOBALANI, RIZA NICOLE G.","INIGO, LINDSAY G.","PACHECO, VERONICA","PANLAQUE, JENELYN P.","PLOMANTES, ALLYN M.","REMULLA, TRISHA MAE R.","TANDOC, RACHEL LARIT T."] }
];

function validate(schoolYear, name, adviser) {
  if (schoolYear !== "2023-2024") return false;
  const n = name.toUpperCase().trim();
  const sec = DATABASE.find(d => d.students.some(s => s.toUpperCase() === n));
  if (!sec) return false;
  return sec.adviser.toLowerCase() === adviser.trim().toLowerCase();
}

// ── SOCKET STATE ──
let waitingQueue = [];
const rooms = new Map();
const socketToRoom = new Map();
const socketToUser = new Map();
const roomMsgCount = new Map();
const revealAccepted = new Map();

io.on("connection", (socket) => {

  // Find match
  socket.on("find_match", ({ schoolYear, studentName, adviserName }) => {
    if (!validate(schoolYear, studentName, adviserName)) {
      socket.emit("auth_error", { message: "Not in batch list." });
      return;
    }
    socketToUser.set(socket.id, { studentName: studentName.toUpperCase().trim(), username: "" });
    leaveRoom(socket);

    if (waitingQueue.length > 0) {
      const partnerId = waitingQueue.shift();
      const partnerSocket = io.sockets.sockets.get(partnerId);
      if (!partnerSocket) {
        waitingQueue.push(socket.id);
        return;
      }
      const roomId = "room_" + Date.now();
      rooms.set(roomId, [socket.id, partnerId]);
      socketToRoom.set(socket.id, roomId);
      socketToRoom.set(partnerId, roomId);
      roomMsgCount.set(roomId, 0);
      socket.join(roomId);
      partnerSocket.join(roomId);
      socket.emit("matched");
      partnerSocket.emit("matched");
    } else {
      waitingQueue.push(socket.id);
    }
  });

  // Send message
  socket.on("send_message", ({ text }) => {
    const roomId = socketToRoom.get(socket.id);
    if (!roomId) return;
    const count = (roomMsgCount.get(roomId) || 0) + 1;
    roomMsgCount.set(roomId, count);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    socket.to(roomId).emit("receive_message", { text, time });
    if (count === 10) {
      io.to(roomId).emit("prompt_reveal");
    }
  });

  // Accept reveal
  socket.on("accept_reveal", ({ username }) => {
    const roomId = socketToRoom.get(socket.id);
    if (!roomId) return;
    if (!revealAccepted.has(roomId)) revealAccepted.set(roomId, {});
    revealAccepted.get(roomId)[socket.id] = username;
    socket.to(roomId).emit("partner_accepted_reveal", { username });
  });

  // Typing
  socket.on("typing", () => {
    const r = socketToRoom.get(socket.id);
    if (r) socket.to(r).emit("partner_typing");
  });
  socket.on("stop_typing", () => {
    const r = socketToRoom.get(socket.id);
    if (r) socket.to(r).emit("partner_stop_typing");
  });

  // Leave
  socket.on("leave_chat", () => leaveRoom(socket));
  socket.on("disconnect", () => {
    leaveRoom(socket);
    waitingQueue = waitingQueue.filter(id => id !== socket.id);
    socketToUser.delete(socket.id);
  });

  function leaveRoom(sock) {
    const roomId = socketToRoom.get(sock.id);
    if (!roomId) return;
    sock.to(roomId).emit("partner_left");
    sock.leave(roomId);
    socketToRoom.delete(sock.id);
    const members = rooms.get(roomId);
    if (members) {
      members.filter(id => id !== sock.id).forEach(id => socketToRoom.delete(id));
      rooms.delete(roomId);
    }
    roomMsgCount.delete(roomId);
    revealAccepted.delete(roomId);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("ReuBot running on port " + PORT));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✅ ReuBot running on port ${PORT}`));
