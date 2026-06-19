/* ============================================================
   BANCO DE PREGUNTAS Y RESPUESTAS
   - Section 1: completar verbos (auto-calificable)
   - Section 2A: corregir el error (auto-calificable, comparación flexible)
   - Section 2B: ordenar la oración (auto-calificable, acepta ambos órdenes del condicional)
   - Section 3: lectura / respuesta abierta (NO se autocalifica: se guarda y se revisa en grupo)
   ============================================================ */

const EXAM = {
  /* ---------------- SECCIÓN 1 ---------------- */
  section1: {
    id: "s1",
    title: "Section 1 — Complete with the correct form of the verbs",
    instructions:
      "Completa los espacios usando <b>will</b>, <b>be going to</b>, <b>Zero Conditional</b> o <b>First Conditional</b> según el contexto. Atención a las expresiones con “get”.",
    items: [
      {
        n: 1, tag: "Zero Conditional",
        parts: [
          { t: "If the server " },
          { id: "s1_1a", verb: "get", accept: ["gets", "gets too hot"], wide: true },
          { t: " too hot, the automated safety system " },
          { id: "s1_1b", verb: "shut", accept: ["shuts"] },
          { t: " it down immediately." }
        ]
      },
      {
        n: 2, tag: "Will / Going to",
        parts: [
          { t: "Look at the loading bar! The system " },
          { id: "s1_2", verb: "install", accept: ["is going to install"], wide: true },
          { t: " the update in a few seconds." }
        ]
      },
      {
        n: 3, tag: "First Conditional",
        parts: [
          { t: "If the developer " },
          { id: "s1_3a", verb: "not fix", accept: ["doesn't fix", "does not fix"], wide: true },
          { t: " the core bug tonight, the users " },
          { id: "s1_3b", verb: "get", accept: ["will get", "'ll get"] },
          { t: " frustrated tomorrow." }
        ]
      },
      {
        n: 4, tag: "Will / Going to",
        parts: [
          { t: "I forgot to optimize the main database! Don't worry, I " },
          { id: "s1_4", verb: "do", accept: ["will do", "'ll do"] },
          { t: " it right now." }
        ]
      },
      {
        n: 5, tag: "Zero Conditional",
        parts: [
          { t: "If you " },
          { id: "s1_5a", verb: "work", accept: ["work"] },
          { t: " on rendering high-resolution videos for hours without a break, your laptop " },
          { id: "s1_5b", verb: "get", accept: ["gets", "gets warm"], wide: true },
          { t: " warm." }
        ]
      },
      {
        n: 6, tag: "Will / Going to",
        parts: [
          { t: "We have already scheduled the meeting: we " },
          { id: "s1_6", verb: "design", accept: ["are going to design"], wide: true },
          { t: " the new multimedia interface next Tuesday." }
        ]
      },
      {
        n: 7, tag: "First Conditional",
        parts: [
          { id: "s1_7a", verb: "(aux)", accept: ["will"] },
          { t: " the client approve the deployment if the QA team " },
          { id: "s1_7b", verb: "finish", accept: ["finishes"] },
          { t: " the tests on time?" }
        ]
      },
      {
        n: 8, tag: "Zero Conditional",
        parts: [
          { t: "If code editors " },
          { id: "s1_8a", verb: "not have", accept: ["don't have", "do not have"], wide: true },
          { t: " a dark mode option, programmers' eyes " },
          { id: "s1_8b", verb: "get", accept: ["get", "get tired"], wide: true },
          { t: " tired very fast." }
        ]
      },
      {
        n: 9, tag: "Will / Going to",
        parts: [
          { t: "Why " },
          { id: "s1_9a", verb: "am/is/are", accept: ["are"] },
          { t: " you " },
          { id: "s1_9b", verb: "download", accept: ["going to download"], wide: true },
          { t: " that specific Java framework later this afternoon?" }
        ]
      },
      {
        n: 10, tag: "First Conditional",
        parts: [
          { t: "If the server " },
          { id: "s1_10a", verb: "crash", accept: ["crashes"] },
          { t: ", we " },
          { id: "s1_10b", verb: "lose", accept: ["will lose", "'ll lose"] },
          { t: " all the unsaved data." }
        ]
      }
    ]
  },

  /* ---------------- SECCIÓN 2 - PARTE A ---------------- */
  section2a: {
    id: "s2a",
    title: "Section 2 · Part A — Correct the Error",
    instructions:
      "Identifica y corrige el error gramatical. Escribe la oración completa y corregida.",
    items: [
      {
        n: 1, id: "s2a_1",
        prompt: "If the application will crash, the developers lose all the un-deployed progress.",
        model: "If the application crashes, the developers lose all the un-deployed progress.",
        accept: [
          "if the application crashes the developers lose all the undeployed progress",
          "if the system crashes the users lose all the undeployed progress"
        ]
      },
      {
        n: 2, id: "s2a_2",
        prompt: "We are going to debugging the software as soon as the terminal shows the error log.",
        model: "We are going to debug the software as soon as the terminal shows the error log.",
        accept: [
          "we are going to debug the software as soon as the terminal shows the error log"
        ]
      },
      {
        n: 3, id: "s2a_3",
        prompt: "If you don't wear sunscreen when you work outside on the antennas, you get burn.",
        model: "If you don't wear sunscreen when you work outside on the antennas, you get burned.",
        accept: [
          "if you dont wear sunscreen when you work outside on the antennas you get burned"
        ]
      },
      {
        n: 4, id: "s2a_4",
        prompt: "I think the multimedia video is looking amazing after they will add the special effects.",
        model: "I think the multimedia video is looking amazing after they add the special effects.",
        accept: [
          "i think the multimedia video is looking amazing after they add the special effects"
        ]
      },
      {
        n: 5, id: "s2a_5",
        prompt: "What happens if the database will get full during the platform launch?",
        model: "What happens if the database gets full during the platform launch?",
        accept: [
          "what happens if the database gets full during the platform launch"
        ]
      }
    ]
  },

  /* ---------------- SECCIÓN 2 - PARTE B ---------------- */
  section2b: {
    id: "s2b",
    title: "Section 2 · Part B — Unscramble the Sentences",
    instructions:
      "Ordena las palabras para formar una oración lógica. Los condicionales pueden escribirse en cualquiera de sus dos órdenes.",
    items: [
      {
        n: 6, id: "s2b_6",
        scrambled: "if / client / interface / the / will / modern / like / the / updates / designer / it / .",
        model: "If the designer updates the interface, the client will like it.",
        accept: [
          "if the designer updates the interface the client will like it",
          "the client will like the interface if the designer updates it",
          "if the designer updates the modern interface the client will like it",
          "the client will like the modern interface if the designer updates it"
        ]
      },
      {
        n: 7, id: "s2b_7",
        scrambled: "going / program / are / you / to / when / API / backend / the / ?",
        model: "When are you going to program the backend API?",
        accept: [
          "when are you going to program the backend api"
        ]
      },
      {
        n: 8, id: "s2b_8",
        scrambled: "they / code / get / if / complex / confused / write / don't / developers / .",
        model: "If developers write complex code, they get confused.",
        accept: [
          "developers get confused if they write complex code",
          "if developers write complex code they get confused",
          "if developers dont write complex code they get confused",
          "developers get confused if they dont write complex code"
        ]
      },
      {
        n: 9, id: "s2b_9",
        scrambled: "system / help / worry / debug / don't / I / the / will / you / , / .",
        model: "Don't worry, I will help you debug the system.",
        accept: [
          "dont worry i will help you debug the system"
        ]
      },
      {
        n: 10, id: "s2b_10",
        scrambled: "sprint / finish / team / updates / the / deploy / will / if / they / the / .",
        model: "If the team finishes the sprint, they will deploy the updates.",
        accept: [
          "if the team finish the sprint they will deploy the updates",
          "the team will deploy the updates if they finish the sprint",
          "if the team finishes the sprint they will deploy the updates",
          "the team will deploy the updates if they finishes the sprint"
        ]
      }
    ]
  },

  /* ---------------- SECCIÓN 3 - LECTURA (ABIERTA) ---------------- */
  section3: {
    id: "s3",
    title: "Section 3 — Reading Comprehension & Technical Situations",
    instructions:
      "Lee el caso y responde con oraciones completas basándote SOLO en el texto. Esta sección no se autocalifica: tus respuestas se guardan y se revisan en grupo con la instructora.",
    caseTitle: "Case Study: The Launch of “MediaStream API”",
    caseText: [
      "The tech development team at the agency is preparing to deploy a new platform called “MediaStream API”. According to the official roadmap, they <b>are going to migrate</b> the database to a cloud server next Monday, and the multimedia team <b>is going to export</b> all the interactive animations on Friday morning. The project manager confirmed that these actions are already scheduled.",
      "However, tech environments are unpredictable. The lead engineer explains a permanent rule of their infrastructure: <i>“If the processor executes high-resolution rendering for more than two hours, the server hardware automatically <b>gets hot</b>. When that happens, the automated cooling system <b>turns on</b> immediately to prevent a crash.”</i>",
      "Yesterday, during a pre-test session, a critical error appeared on the dashboard. The senior developer looked at the monitor and made a sudden decision: <i>“I see a memory leak. I <b>will debug</b> the backend code right now.”</i> Another programmer added: <i>“Great, if you fix that bug, I <b>will update</b> the user permissions interface.”</i>",
      "The team knows that client satisfaction depends on their work. If the client <b>approves</b> the beta version tomorrow, they <b>will release</b> the platform to the public next week. On the other hand, the deployment has risks: if they <b>do not optimize</b> the code before the deadline, the application <b>will run</b> slowly on mobile devices.",
      "Finally, the instructor reminded the team about physical well-being during long coding sessions: <i>“If programmers <b>work</b> for 12 hours without drinking water, they always <b>get thirsty</b> and <b>get tired</b>, which reduces their concentration.”</i>"
    ],
    items: [
      { n: 1, id: "s3_1", q: "What is the scheduled plan for the development team next Monday? <i>(Be Going to, affirmative)</i>", model: "Next Monday, they are going to migrate the database to a cloud server." },
      { n: 2, id: "s3_2", q: "What permanent consequence happens if the processor executes high-resolution rendering for more than two hours? <i>(Zero Conditional, “get hot”)</i>", model: "If the processor executes high-resolution rendering for more than two hours, the server hardware automatically gets hot." },
      { n: 3, id: "s3_3", q: "According to the text, what occurs automatically when the server hardware gets hot? <i>(Zero Conditional)</i>", model: "When the server hardware gets hot, the automated cooling system turns on immediately to prevent a crash." },
      { n: 4, id: "s3_4", q: "What spontaneous decision did the senior developer make when he saw the memory leak? <i>(Will)</i>", model: "He said, “I will debug the backend code right now.”" },
      { n: 5, id: "s3_5", q: "What will the other programmer do if the senior developer fixes the memory leak bug? <i>(First Conditional)</i>", model: "If the senior developer fixes that bug, the other programmer will update the user permissions interface." },
      { n: 6, id: "s3_6", q: "What is the scheduled plan for the multimedia team on Friday morning? <i>(Be Going to)</i>", model: "On Friday morning, the multimedia team is going to export all the interactive animations." },
      { n: 7, id: "s3_7", q: "What will happen if the client approves the beta version tomorrow? <i>(First Conditional)</i>", model: "If the client approves the beta version tomorrow, they will release the platform to the public next week." },
      { n: 8, id: "s3_8", q: "What will happen if the team does not optimize the code before the deadline? <i>(First Conditional, negative condition)</i>", model: "If they do not optimize the code before the deadline, the application will run slowly on mobile devices." },
      { n: 9, id: "s3_9", q: "What happens to programmers if they work for 12 hours without drinking water? <i>(Zero Conditional, “get thirsty” / “get tired”)</i>", model: "If programmers work for 12 hours without drinking water, they always get thirsty and get tired." },
      { n: 10, id: "s3_10", q: "Write a complete Wh- Question in First Conditional to ask about the public release of the platform. <i>(e.g. When will they release...?)</i>", model: "When will they release the platform to the public if the client approves the beta version tomorrow?" }
    ]
  }
};
