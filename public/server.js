const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send('ReuBot server is running!');
});

// --- Socket.io connection handler ---
io.on('connection', (socket) => {
  console.log('A user connected');

  // Anonymous random peer logic
  if (!global.waitingUser) {
    global.waitingUser = socket; // wait for someone
  } else {
    const peer = global.waitingUser;
    global.waitingUser = null;

    socket.peer = peer.id;
    peer.peer = socket.id;

    // notify both clients
    socket.emit('connected');
    peer.emit('connected');
  }

  socket.on('chat message', (msg) => {
    if (socket.peer) {
      io.to(socket.peer).emit('chat message', msg);
    }
  });

  socket.on('disconnect', () => {
    if (socket.peer) {
      io.to(socket.peer).emit('peer disconnected');
    }
    if (global.waitingUser === socket) global.waitingUser = null;
    console.log('A user disconnected');
  });
});

const DATABASE = [
  { adviser: "Karleen R. Dumangas", students: ["AQUINO, RAZZEL V.","CAYABAN, CEDEE T.","DOLLETE, DANIEL LOUIS F.","DOMACENA, MICO ANGELO M.","ENRIQUEZ, THOMIE HENBERTSON C.","ESPAÑOL, JUNES IAN D.","LINGUAJE, REYNALDO JR. C.","QUILAB, JHAYE ANDRIE D.","RETIRADO, TJ CHARLS D.","TUGADE, ALFRED A.","VERMUG, EL CIV D.","VILLAREY, MATT EDREI D.","ANOCHE, ARIA MIEL D.","ANOCHE, DANA FAITH L.","AQUINO, MADILYN D.","ARIMAS, FAYE R.","BALUYOT, JHEMAICA C.","BASA, FRAN LUIZA E.","BAUTISTA, LEIGH ANN D.","BAYANI, JEYAN D.","BERGONIA, VENISSE NICOLE D.","DAYO, DAPHINE MAE D.","DELIQUIÑA, EUNICE S.","DITAPAT, AUBREY D.","ENCINARES, TIFFANY ZEA S.","FAMANILA, PHOEMELA ROSE A.","FEDERE, KRYSTLE ANNE D.","FERRER, JULIENNE NICOLE D.","FULGENCIO, KATHLEEN V.","GUIANG, KRYZ PAULA N.","LUNA, DONITA FE A.","MACAALAY, LOVELY MAY B.","OMAY, FLORENCE B.","QUINTO, JAZMINE JOY L.","RAMOS, DIANNE S.","RAYALA, EUREKA MAE V.","TAN, CLARISSE M.","VILLANUEVA, CHARM JILLIAN B."] },
  { adviser: "Jeff Aaron D. Reytomas", students: ["ACUAVERA, LLOYD M.","ANASTACIO, ZERWYANE JADE A.","BETON, RAMON EXEQUIEL E.","BLANCO, WILLIAM JEFF V.","CABIDO, VRAYXON P.","DANTES, FERNANDO KARLO D.","DEJUMO, RODEL JR. D.","DELA CRUZ, RANNUEL P.","DEVERA, LOVERN G.","DOLANDOLAN, RINZEL R.","DOYANAN, ARWIN F.","ENCARNACION, BRIAN JOEL D.","GALLARDO, CHARLES ANTHONY D.","JUANICO, JOSE MIGUEL M.","NESPEROS, MHELMAR D.","ANGELES, ALLYSSA D.","ARAUCTO, MARY SALVACION D.","BALANGON, IRISH COLEEN D.","BALAURO, KRIZEL LHYNE P.","DANTE, EIRRENE CLEO F.","DAYAP, ZYNETH REXIE S.","DEDICATORIA, JESSICA","DELA CRUZ, JANNEL M.","DEVERA, AMANDA SYMONE V.","DEVERA, ANGEL N.","DEVILLAS, JASMIN R.","DIAL, ALTHEA LOREEN D.","DIMASACUPAN, KATRINA R.","DOLFO, APRIL DANE M.","DUAVE, MARY ANGEL R.","JUSTO, JESIAH MAE A.","MANLICLIC, ERICKA P.","SUNGA, KIM AIZABEL D.","TAPADO, ALEXA ARRIANE Q."] },
  { adviser: "Edgar B. Pangilinan", students: ["APOLONA, FRANCIS P.","BALDUEZA, JOHN JOSHUA D.","DULLON, CARL DAVE R.","FARILLON, ZEDRICK G.","GONZALES, RAVEN N.","LATT, MCKELL AUNG O.","OSBORNE, JESSE RAFAEL E.","ROMANBAN, KURT JULIAN C.","SERIAL, JUSTINE JEREL E.","YAP, TRIBERSAN D.","ABALLA, ANNA MAE D.","ABION, CHERRY ANNE D.","ABUJEN, SHA-YNA D.","ACRAMAN, HAYANI A.","ARAUCTO, ASHLEY ARIANNA F.","BACANI, CHARMAINE ANNE B.","BUNGLO, JANELLE B.","DESUNIA, EDELYN D.","DEVERA, ANGELINE A.","DIMALANTA, MARY SAN A.","DOLLETE, KATE MARLEY D.","DURON, ANGEL ROSE D.","FRONDARINA, LOUREN JOY D.","GUANGA, LIAN NICOLE P.","LLANES, JACQUELENE FAITH R.","MACANDOG, JANELLA ROSE L.","MANALO, EINA KLAYRE D.","MANILA, PRINCESS MICAH R.","MAYA, NATHALIE D.","PONCE, ANDREA MAE I.","SALAZAR, JANNAH D.","SUBONG, WINNIE CLAIRE M.","TANDOC, MICHAELLA MARIE P.","TELEBRICO, MADELLINE"] },
  { adviser: "Lanie L. Fabrigas", students: ["AGAGAS, JOHN LEE C.","BALANGON, ANDREW B.","BALUYOT, ZEDRIK JOHN F.","DACLISON, NATHANIEL F.","DAOS, HARVY F.","DIAZ, AREN FRANZ D.","DIMAANO, LANCE H.","DOBLE, JAN NATHAN B.","DOYANAN, JEREMY D.","EDUCALAN, HALE D.","EUGENIO, MICHAEL JAY G.","FERNANDEZ, JOHN CRIS B.","LABASAN, JEROME B.","PANES, DAVID CARL M.","BAUTISTA, ANGELICA MAY D.","BENEDICTO, LARAH JANELLE G.","BESA, MARIELLE FEBIE G.","BUGARIN, GELLIAN PEARL E.","BUGARIN, KIM R.","DELIDELI, LEA D.","DIAGO, GERLYN M.","DIESTA, HAZELLE MAE D.","DIMAANO, TRISHA MAE F.","DIVINO, LHARIAN LAVIGNE E.","ENCARNACION, ANRE FHEY A.","EVANGELISTA, MARLYN M.","GAEN, IZAH FRANCHESKA A.","MALVEDA, JEMIMAH PATRICIA M.","MANGOHIG, PRECIOUS LEAJ M.","MIWA, SHIKI B.","MORA, PRECIOUS JOSEPHINE C.","PACHECO, PRINCESS FATIMA G.","PAGAR, MARIA JANEIL D.","PALISOC, LADY KIANA A.","PUZON, KIARA MIA R."] },
  { adviser: "Monna Liza T. Cruzado", students: ["BALUYOT, LUCKY JB D.","CRUZ, JHEREZ AIZEN C.","DOCUYANAN, CARLIE JAMES N.","ESCASURA, KENNETH D.","ESMELO, REYMUND A.","LAUREL, BRYLLE ANDRE J.","LOGATOC, JAMES LARRENCE V.","PANES, CEPHT ADRIAN M.","RIBO, REYJAN M.","ROMERO, JOHN DARYLL D.","SARMIENTO, KARL D.","BULATAO, PRECIOUS REYNN R.","DACER, HERSHEY A.","DANTAY, JAMUEL M.","DANTE, YELENA BEATRICE A.","DAQUINAG, LERA JOY P.","DEVESFRUTO, XYLLENNE D.","DIMAANO, MABEL S.","DIZON, LORRINE NICOLE E.","DOMINGO, TRIXIE JOY M.","DORIO, KIMBERLY JANE A.","FALLORIA, MARGIELYN D.","FELICITAS, JHENRIL C.","JAVIER, APRIL ANNE J.","MEJIA, DANICA MAE D.","MENDOZA, JAIRA JAHEIL F.","PANGILINAN, EURIKA R.","PASAG, ANGEL FAYE D.","RABACA, KRISHA MIEL B.","SABERON, ALTHEA JOY G.","SAN JOSE, YASMINE GAYLE M.","TORRES, AIZELLE MAE P.","VALDEZ, ALYSSA MAY C.","VALLENTE, SHEKINAH ZIMNEL B.","VICTORIA, JESSY MAE C.","VISCA, CZARINA DOMINIQUE A."] },
  { adviser: "Diana Rose M. Torres", students: ["ALIBIADO, MICHAEL P.","BAYANI, HERALD D.","CABANLIG, JOHN EARL R.","CERVANTES, JENCINTH ALFARL R.","DORDE, ADOLF HITLER G.","DORIG, KRIS MIKAEL C.","DULLON, DANIEL DAVE B.","EPAN, RODOLFO CESAR A.","FERRER, VINCE JUSTINE D.","GALANG, ABRAHAM PAUL","GANTANG, JAMES JASTER L.","GOMEZ, WAYNE ACHILLES D.","LAPINIG, EDRIAN L.","MALLARI, JERAMHEEL C.","YABUT, AIZEN DAVE P.","YANIG, ANGELO D.","ABUJEN, FEBIE ANGELIE B.","AGBUYA, ANGEL ANN P.","ASLAM, BISMA A.","AYTONA, SHEILA MAE","BALINTAY, KRISTEL C.","CABANGON, KHATE COLLYNE","CALUGAY, GAIL HAYDEN M.","CORTEZANO, JAY-ZEE D.","DACLISON, MARY CATHERINE T.","DAPITIN, KYLIE MARIE T.","DEVILLENA, MELISSA ANN B.","DIAGO, JENNY B.","DIAL, JEN ANDREA D.","FLORES, ALLYANA MARIE B.","FONTANILLA, JHAZMINE F.","GABO, ANGEL ANNE","GOLEZ, JHASSEZ D.","IDOS, CHRISTINE JOY A.","ISIDRO, SHANE D.","LESACA, ZYAMILLAH XYKE E.","PINEDA, AZALIA C.","RIAZA, CHRISTINE MAE S.","SERIAL, DARLENE JOY L.","TONGOL, DANNA ROSE C."] },
  { adviser: "Jayson R. Cayaga", students: ["ARANDIA, JOHN NICO D.","BALUYOT, JANSEN ERA M.","BAUSA, SEANN WILLIAM D.","CORTEZ, KIRBY ANGELO C.","DEGOLLADO, SEBASTIAN ETHAN R.","DEL ROSARIO, IEL IVAN D.","DIMAQUIBO, RUBEN JR. M.","DOLANDOLAN, LEXTER R.","ESCOBAL, REYSTER KLEIN D.","ESTACION, JOHN VINCENT D.","FAMANILA, JOHN PAZ D.","GONZALES, HUE D.","MORANTE, JOHN CHARLE MAGNE D.","NALICAT, AINSLEE XYRONE S.","RAFAEL, MARK ANGELO R.","SALAZAR, JAMES D.","ABUJEN, LESLIE G.","ARCALA, JULLIE DIVINE E.","BADAR, ALEXA MAE D.","BALANGON, TATZ MILDRED N.","CORTEZ, BERLYN RUTH D.","DAOS, ANGELA FAITH P.","DEGOLLADO, ANDREA SAMANTHA A.","DIMAANO, AERIELLE FAYE M.","DOLLUERAS, MELONA JOY L.","ELBO, DENNISE A.","EVANGELISTA, DANICA F.","FAMULARCANO, ANDREA E.","FERNANDEZ, ANN LYN DIANE","GALIN, KC G.","GOBALANI, RIZA NICOLE G.","INIGO, LINDSAY G.","PACHECO, VERONICA","PANLAQUE, JENELYN P.","PLOMANTES, ALLYN M.","REMULLA, TRISHA MAE R.","TANDOC, RACHEL LARIT T."] }
];

function validateUser(schoolYear, studentName, adviserName) {
  if (schoolYear !== "2023-2024") return null;
  const name = studentName.toUpperCase().trim();
  const section = DATABASE.find(d => d.students.some(s => s.toUpperCase() === name));
  if (!section) return null;
  if (section.adviser.toLowerCase() !== adviserName.trim().toLowerCase()) return null;
  return true;
}

// State
const users = new Map(); // socketId -> userObj
let anonQueue = [];
const anonRooms = new Map();   // roomId -> [sid1, sid2]
const socketToAnonRoom = new Map();
const namedConvos = new Map(); // "sid1__sid2" -> { messages: [] }

function getKey(a, b) { return [a,b].sort().join('__'); }

io.on("connection", (socket) => {

  socket.on("verify_user", ({ schoolYear, studentName, adviserName }) => {
    if (!validateUser(schoolYear, studentName, adviserName)) { socket.emit("auth_error"); return; }
    users.set(socket.id, { studentName: studentName.toUpperCase().trim(), nickname: "", gender: "", aboutMe: "", username: "", verified: true });
    socket.emit("auth_ok");
  });

  socket.on("update_profile", (data) => {
    const u = users.get(socket.id);
    if (!u) return;
    Object.assign(u, data);
    socket.emit("profile_updated", u);
  });

  // ANONYMOUS CHAT
  socket.on("anon_find", () => {
    const user = users.get(socket.id);
    if (!user?.verified) { socket.emit("auth_error"); return; }
    leaveAnon(socket);
    const idx = anonQueue.findIndex(id => io.sockets.sockets.get(id));
    if (idx >= 0) {
      const partnerId = anonQueue.splice(idx, 1)[0];
      const partnerSock = io.sockets.sockets.get(partnerId);
      const roomId = `anon_${Date.now()}`;
      anonRooms.set(roomId, [socket.id, partnerId]);
      socketToAnonRoom.set(socket.id, roomId);
      socketToAnonRoom.set(partnerId, roomId);
      socket.join(roomId); partnerSock.join(roomId);
      const partnerUser = users.get(partnerId);
      socket.emit("anon_matched", { partnerGender: partnerUser?.gender || "unknown" });
      partnerSock.emit("anon_matched", { partnerGender: user.gender || "unknown" });
    } else {
      anonQueue.push(socket.id);
      socket.emit("anon_searching");
    }
  });

  socket.on("anon_message", ({ text }) => {
    const roomId = socketToAnonRoom.get(socket.id);
    if (!roomId) return;
    const time = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    socket.to(roomId).emit("anon_receive", { text, time });
  });

  socket.on("anon_typing", () => { const r=socketToAnonRoom.get(socket.id); if(r) socket.to(r).emit("anon_partner_typing"); });
  socket.on("anon_stop_typing", () => { const r=socketToAnonRoom.get(socket.id); if(r) socket.to(r).emit("anon_partner_stop_typing"); });

  // Reveal name — creates a named convo entry and notifies partner
  socket.on("anon_reveal", () => {
    const roomId = socketToAnonRoom.get(socket.id);
    if (!roomId) return;
    const members = anonRooms.get(roomId);
    if (!members) return;
    const partnerId = members.find(id => id !== socket.id);
    if (!partnerId) return;
    const user = users.get(socket.id);
    const key = getKey(socket.id, partnerId);
    if (!namedConvos.has(key)) namedConvos.set(key, { messages: [] });
    // Notify partner of reveal request
    const partnerSock = io.sockets.sockets.get(partnerId);
    if (partnerSock) {
      partnerSock.emit("anon_reveal_request", {
        fromId: socket.id,
        nickname: user?.nickname || user?.studentName?.split(",")[0] || "Someone",
        gender: user?.gender || "unknown"
      });
    }
    socket.emit("reveal_sent");
  });

  // Partner accepts reveal
  socket.on("anon_reveal_accept", ({ fromId }) => {
    const myUser = users.get(socket.id);
    const theirUser = users.get(fromId);
    const fromSock = io.sockets.sockets.get(fromId);
    const key = getKey(socket.id, fromId);
    if (!namedConvos.has(key)) namedConvos.set(key, { messages: [] });
    // Both sides get each other's info
    socket.emit("reveal_complete", {
      partnerId: fromId,
      partnerNickname: theirUser?.nickname || theirUser?.studentName?.split(",")[0] || "Batch mate",
      partnerGender: theirUser?.gender || "unknown"
    });
    if (fromSock) fromSock.emit("reveal_complete", {
      partnerId: socket.id,
      partnerNickname: myUser?.nickname || myUser?.studentName?.split(",")[0] || "Batch mate",
      partnerGender: myUser?.gender || "unknown"
    });
  });

  socket.on("anon_leave", () => leaveAnon(socket));

  // NAMED MESSAGING (Batchmates tab)
  socket.on("get_convos", () => {
    const list = [];
    namedConvos.forEach((convo, key) => {
      if (!key.includes(socket.id)) return;
      const partnerId = key.split('__').find(id => id !== socket.id);
      const pu = users.get(partnerId);
      const last = convo.messages[convo.messages.length-1];
      list.push({
        partnerId,
        partnerNickname: pu?.nickname || pu?.studentName?.split(",")[0] || "Batch mate",
        partnerGender: pu?.gender || "unknown",
        lastMsg: last?.text || "start the convo",
        lastTime: last?.time || ""
      });
    });
    socket.emit("convos_list", list);
  });

  socket.on("named_message", ({ partnerId, text }) => {
    const key = getKey(socket.id, partnerId);
    if (!namedConvos.has(key)) namedConvos.set(key, { messages: [] });
    const time = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    namedConvos.get(key).messages.push({ from: socket.id, text, time });
    const ps = io.sockets.sockets.get(partnerId);
    if (ps) ps.emit("named_receive", { fromId: socket.id, text, time });
    socket.emit("named_sent", { text, time });
  });

  socket.on("named_typing", ({ partnerId }) => { const ps=io.sockets.sockets.get(partnerId); if(ps) ps.emit("named_partner_typing"); });
  socket.on("named_stop_typing", ({ partnerId }) => { const ps=io.sockets.sockets.get(partnerId); if(ps) ps.emit("named_partner_stop_typing"); });

  socket.on("get_convo_history", ({ partnerId }) => {
    const key = getKey(socket.id, partnerId);
    socket.emit("convo_history", { messages: namedConvos.get(key)?.messages || [], partnerId });
  });

  socket.on("disconnect", () => {
    leaveAnon(socket);
    anonQueue = anonQueue.filter(id => id !== socket.id);
    users.delete(socket.id);
  });

  function leaveAnon(sock) {
    const roomId = socketToAnonRoom.get(sock.id);
    if (!roomId) return;
    sock.to(roomId).emit("anon_partner_left");
    sock.leave(roomId);
    socketToAnonRoom.delete(sock.id);
    const members = anonRooms.get(roomId);
    if (members) { members.filter(id=>id!==sock.id).forEach(id=>socketToAnonRoom.delete(id)); anonRooms.delete(roomId); }
  }
});

// --- SERVER LISTEN --- 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
