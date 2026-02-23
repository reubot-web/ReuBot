const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── STATE ──
let searchingUsers = []; // { userId, socketId }
const activeRooms = {};  // roomId → { users: [userId1, userId2], revealed: { userId: bool } }
const userRooms = {};    // userId → roomId
const userSockets = {};  // userId → socketId

// ── DATABASE ──
const DATABASE = [
  { adviser: "Karleen R. Dumangas", students: ["AQUINO, RAZZEL V.","CAYABAN, CEDEE T.","DOLLETE, DANIEL LOUIS F.","DOMACENA, MICO ANGELO M.","ENRIQUEZ, THOMIE HENBERTSON C.","ESPAÑOL, JUNES IAN D.","LINGUAJE, REYNALDO JR. C.","QUILAB, JHAYE ANDRIE D.","RETIRADO, TJ CHARLS D.","TUGADE, ALFRED A.","VERMUG, EL CIV D.","VILLAREY, MATT EDREI D.","ANOCHE, ARIA MIEL D.","ANOCHE, DANA FAITH L.","AQUINO, MADILYN D.","ARIMAS, FAYE R.","BALUYOT, JHEMAICA C.","BASA, FRAN LUIZA E.","BAUTISTA, LEIGH ANN D.","BAYANI, JEYAN D.","BERGONIA, VENISSE NICOLE D.","DAYO, DAPHINE MAE D.","DELIQUIÑA, EUNICE S.","DITAPAT, AUBREY D.","ENCINARES, TIFFANY ZEA S.","FAMANILA, PHOEMELA ROSE A.","FEDERE, KRYSTLE ANNE D.","FERRER, JULIENNE NICOLE D.","FULGENCIO, KATHLEEN V.","GUIANG, KRYZ PAULA N.","LUNA, DONITA FE A.","MACAALAY, LOVELY MAY B.","OMAY, FLORENCE B.","QUINTO, JAZMINE JOY L.","RAMOS, DIANNE S.","RAYALA, EUREKA MAE V.","TAN, CLARISSE M.","VILLANUEVA, CHARM JILLIAN B."] },
  { adviser: "Jeff Aaron D. Reytomas", students: ["ACUAVERA, LLOYD M.","ANASTACIO, ZERWYANE JADE A.","BETON, RAMON EXEQUIEL E.","BLANCO, WILLIAM JEFF V.","CABIDO, VRAYXON P.","DANTES, FERNANDO KARLO D.","DEJUMO, RODEL JR. D.","DELA CRUZ, RANNUEL P.","DEVERA, LOVERN G.","DOLANDOLAN, RINZEL R.","DOYANAN, ARWIN F.","ENCARNACION, BRIAN JOEL D.","GALLARDO, CHARLES ANTHONY D.","JUANICO, JOSE MIGUEL M.","NESPEROS, MHELMAR D.","ANGELES, ALLYSSA D.","ARAUCTO, MARY SALVACION D.","BALANGON, IRISH COLEEN D.","BALAURO, KRIZEL LHYNE P.","DANTE, EIRRENE CLEO F.","DAYAP, ZYNETH REXIE S.","DEDICATORIA, JESSICA","DELA CRUZ, JANNEL M.","DEVERA, AMANDA SYMONE V.","DEVERA, ANGEL N.","DEVILLAS, JASMIN R.","DIAL, ALTHEA LOREEN D.","DIMASACUPAN, KATRINA R.","DOLFO, APRIL DANE M.","DUAVE, MARY ANGEL R.","JUSTO, JESIAH MAE A.","MANLICLIC, ERICKA P.","SUNGA, KIM AIZABEL D.","TAPADO, ALEXA ARRIANE Q."] },
  { adviser: "Edgar B. Pangilinan", students: ["APOLONA, FRANCIS P.","BALDUEZA, JOHN JOSHUA D.","DULLON, CARL DAVE R.","FARILLON, ZEDRICK G.","GONZALES, RAVEN N.","LATT, MCKELL AUNG O.","OSBORNE, JESSE RAFAEL E.","ROMANBAN, KURT JULIAN C.","SERIAL, JUSTINE JEREL E.","YAP, TRIBERSAN D.","ABALLA, ANNA MAE D.","ABION, CHERRY ANNE D.","ABUJEN, SHA-YNA D.","ACRAMAN, HAYANI A.","ARAUCTO, ASHLEY ARIANNA F.","BACANI, CHARMAINE ANNE B.","BUNGLO, JANELLE B.","DESUNIA, EDELYN D.","DEVERA, ANGELINE A.","DIMALANTA, MARY SAN A.","DOLLETE, KATE MARLEY D.","DURON, ANGEL ROSE D.","FRONDARINA, LOUREN JOY D.","GUANGA, LIAN NICOLE P.","LLANES, JACQUELENE FAITH R.","MACANDOG, JANELLA ROSE L.","MANALO, EINA KLAYRE D.","MANILA, PRINCESS MICAH R.","MAYA, NATHALIE D.","PONCE, ANDREA MAE I.","SALAZAR, JANNAH D.","SUBONG, WINNIE CLAIRE M.","TANDOC, MICHAELLA MARIE P.","TELEBRICO, MADELLINE"] },
  { adviser: "Lanie L. Fabrigas", students: ["AGAGAS, JOHN LEE C.","BALANGON, ANDREW B.","BALUYOT, ZEDRIK JOHN F.","DACLISON, NATHANIEL F.","DAOS, HARVY F.","DIAZ, AREN FRANZ D.","DIMAANO, LANCE H.","DOBLE, JAN NATHAN B.","DOYANAN, JEREMY D.","EDUCALAN, HALE D.","EUGENIO, MICHAEL JAY G.","FERNANDEZ, JOHN CRIS B.","LABASAN, JEROME B.","PANES, DAVID CARL M.","BAUTISTA, ANGELICA MAY D.","BENEDICTO, LARAH JANELLE G.","BESA, MARIELLE FEBIE G.","BUGARIN, GELLIAN PEARL E.","BUGARIN, KIM R.","DELIDELI, LEA D.","DIAGO, GERLYN M.","DIESTA, HAZELLE MAE D.","DIMAANO, TRISHA MAE F.","DIVINO, LHARIAN LAVIGNE E.","ENCARNACION, ANRE FHEY A.","EVANGELISTA, MARLYN M.","GAEN, IZAH FRANCHESKA A.","MALVEDA, JEMIMAH PATRICIA M.","MANGOHIG, PRECIOUS LEAJ M.","MIWA, SHIKI B.","MORA, PRECIOUS JOSEPHINE C.","PACHECO, PRINCESS FATIMA G.","PAGAR, MARIA JANEIL D.","PALISOC, LADY KIANA A.","PUZON, KIARA MIA R."] },
  { adviser: "Monna Liza T. Cruzado", students: ["BALUYOT, LUCKY JB D.","CRUZ, JHEREZ AIZEN C.","DOCUYANAN, CARLIE JAMES N.","ESCASURA, KENNETH D.","ESMELO, REYMUND A.","LAUREL, BRYLLE ANDRE J.","LOGATOC, JAMES LARRENCE V.","PANES, CEPHT ADRIAN M.","RIBO, REYJAN M.","ROMERO, JOHN DARYLL D.","SARMIENTO, KARL D.","BULATAO, PRECIOUS REYNN R.","DACER, HERSHEY A.","DANTAY, JAMUEL M.","DANTE, YELENA BEATRICE A.","DAQUINAG, LERA JOY P.","DEVESFRUTO, XYLLENNE D.","DIMAANO, MABEL S.","DIZON, LORRINE NICOLE E.","DOMINGO, TRIXIE JOY M.","DORIO, KIMBERLY JAY D."] },
];

// ── HELPERS ──
function generateRoomId() {
  return "room_" + Math.random().toString(36).substr(2, 9);
}

function getAnonymousLabel(roomId, userId) {
  const room = activeRooms[roomId];
  if (!room) return "Stranger";
  const index = room.users.indexOf(userId);
  return index === 0 ? "Anonymous A" : "Anonymous B";
}

// ── REST: Find Match ──
// NOTE: Matching is now handled entirely via Socket.io below.
// This endpoint is kept for backward compatibility but socket-based matching is preferred.
app.post("/find-match", (req, res) => {
  res.json({ message: "Use socket.io for matching. Emit 'start-search' after connecting." });
});

// ── SOCKET.IO ──
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Register user with their userId (send from client after login/session)
  socket.on("register", (userId) => {
    userSockets[userId] = socket.id;
    socket.userId = userId;
    console.log(`User registered: ${userId} → socket ${socket.id}`);
  });

  // ── START SEARCHING FOR A MATCH ──
  socket.on("start-search", (userId) => {
    socket.userId = userId;
    userSockets[userId] = socket.id;

    // Don't add duplicates
    const alreadySearching = searchingUsers.find((u) => u.userId === userId);
    if (alreadySearching) return;

    searchingUsers.push({ userId, socketId: socket.id });
    socket.emit("searching", { message: "Looking for a match..." });

    // Try to match
    if (searchingUsers.length >= 2) {
      const user1 = searchingUsers.shift();
      const user2 = searchingUsers.shift();

      const roomId = generateRoomId();

      // Save room state
      activeRooms[roomId] = {
        users: [user1.userId, user2.userId],
        revealed: { [user1.userId]: false, [user2.userId]: false },
        identities: { [user1.userId]: null, [user2.userId]: null }, // filled on reveal
      };
      userRooms[user1.userId] = roomId;
      userRooms[user2.userId] = roomId;

      // Join socket room
      const socket1 = io.sockets.sockets.get(user1.socketId);
      const socket2 = io.sockets.sockets.get(user2.socketId);
      if (socket1) socket1.join(roomId);
      if (socket2) socket2.join(roomId);

      // Notify both
      io.to(roomId).emit("match-found", {
        roomId,
        message: "You've been matched! Start chatting anonymously 🎭",
      });

      console.log(`Matched: ${user1.userId} & ${user2.userId} → ${roomId}`);
    }
  });

  // ── SEND ANONYMOUS MESSAGE ──
  socket.on("send-message", ({ roomId, userId, text }) => {
    const room = activeRooms[roomId];
    if (!room) return socket.emit("error", { message: "Room not found." });

    const senderLabel = getAnonymousLabel(roomId, userId);
    const isRevealed = room.revealed[userId];
    const displayName = isRevealed && room.identities[userId]
      ? room.identities[userId]
      : senderLabel;

    io.to(roomId).emit("new-message", {
      senderId: userId,
      senderLabel: displayName,
      text,
      isRevealed,
      timestamp: new Date().toISOString(),
    });
  });

  // ── TYPING INDICATOR ──
  socket.on("typing", ({ roomId, userId }) => {
    const room = activeRooms[roomId];
    if (!room) return;
    const label = getAnonymousLabel(roomId, userId);
    socket.to(roomId).emit("partner-typing", { label });
  });

  socket.on("stop-typing", ({ roomId }) => {
    socket.to(roomId).emit("partner-stop-typing");
  });

  // ── REVEAL IDENTITY ──
  // Client sends: { roomId, userId, name } — name is the real identity to reveal
  socket.on("reveal-identity", ({ roomId, userId, name }) => {
    const room = activeRooms[roomId];
    if (!room) return socket.emit("error", { message: "Room not found." });

    room.revealed[userId] = true;
    room.identities[userId] = name;

    // Notify the OTHER user that this user wants to reveal
    socket.to(roomId).emit("partner-reveal-request", {
      message: `Your chat partner wants to reveal their identity! Do you want to reveal yours too?`,
    });

    // Notify the revealer
    socket.emit("reveal-pending", {
      message: "Waiting for your partner to also reveal...",
    });

    // Check if BOTH have revealed
    const [u1, u2] = room.users;
    if (room.revealed[u1] && room.revealed[u2]) {
      io.to(roomId).emit("both-revealed", {
        identities: {
          [u1]: room.identities[u1],
          [u2]: room.identities[u2],
        },
        message: "Both identities revealed! 🎉",
      });
    }
  });

  // ── LEAVE / DISCONNECT ──
  socket.on("leave-chat", ({ roomId, userId }) => {
    cleanupUser(userId, roomId, socket);
  });

  socket.on("disconnect", () => {
    const userId = socket.userId;
    if (!userId) return;

    const roomId = userRooms[userId];
    if (roomId) {
      socket.to(roomId).emit("partner-disconnected", {
        message: "Your partner has left the chat.",
      });
      cleanupUser(userId, roomId, socket);
    }

    // Remove from searching queue if still there
    searchingUsers = searchingUsers.filter((u) => u.userId !== userId);
    delete userSockets[userId];
    console.log(`Socket disconnected: ${socket.id} (${userId})`);
  });
});

function cleanupUser(userId, roomId, socket) {
  socket.leave(roomId);
  delete userRooms[userId];

  const room = activeRooms[roomId];
  if (room) {
    // Remove room if both users are gone
    const otherUserId = room.users.find((u) => u !== userId);
    if (!otherUserId || !userRooms[otherUserId]) {
      delete activeRooms[roomId];
    }
  }
}

// ── START SERVER ──
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
