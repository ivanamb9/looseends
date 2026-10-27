
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase";

const projectTypes = [
  { name: "Blanket", image: "/images/blanket.jpg", kind: "Blanket" },
  { name: "Granny Square Bag", image: "/images/bag.jpg", kind: "Bag" },
  { name: "Shoulder Bag", image: "/images/bag2.jpg", kind: "Bag" },
  { name: "Tote Bag", image: "/images/bag3.jpg", kind: "Bag" },
  { name: "Cardigan", image: "/images/cardigan.jpg", kind: "Cardigan" },
  { name: "Vest", image: "/images/vest.jpg", kind: "Vest" },
  { name: "Pillow", image: "/images/pillow.jpg", kind: "Pillow" }
];

const patterns = [
  {
    name: "Classic Granny Square",
    image: "/images/square1.jpg",
    level: "Beginner",
    yarn: "Drops Merino Extra Fine, 4 colors",
    hook: "4.5 mm",
    description: "The classic granny square is made with little groups of double crochet stitches. It's a good one to start with.",
    steps: [
      "Make a slipknot. Chain 4 and join with a slip stitch to make a ring.",
      "Round 1: Chain 3, then make 2 double crochets into the ring. Chain 2. Make three more groups of 3 double crochets with chain-2 spaces between them.",
      "Round 2: Change yarn color. Work (3 double crochets, chain 2, 3 double crochets) in each corner space.",
      "Round 3: Make the same corner groups, and work 3 double crochets into each side space.",
      "Round 4: Continue working corner groups and adding double crochet groups along the sides.",
      "Fasten off and weave in the ends."
    ],
    link: "https://sarahmaker.com/crochet-a-granny-square/"
  },
  {
    name: "Daisy Granny Square",
    image: "/images/square2.jpg",
    level: "Intermediate",
    yarn: "Aran weight yarn, 3 colors",
    hook: "5 mm",
    description: "A little daisy in the middle of a solid square. Nice for blankets, bags and pillows.",
    steps: [
      "Round 1: Use your first color to make a magic ring. Chain 3 and crochet 11 double crochets into the ring.",
      "Round 2: Change to your petal color. Make 12 treble crochet petal clusters, with chain-2 spaces between them.",
      "Round 3: Join the background yarn and work around the petals, creating four corners.",
      "Round 4: Work double crochets along each side. Add corner increases with (2 double crochets, chain 2, 2 double crochets).",
      "Fasten off, weave in the ends and block the square if needed."
    ],
    link: "https://youtu.be/KpE1jbC5QSQ"
  },
  {
    name: "Sunburst Granny Square",
    image: "/images/square3.jpg",
    level: "Intermediate",
    yarn: "Drops Merino Extra Fine, 4 colors",
    hook: "4.5 mm",
    description: "This square has a round flower center made with puff and cluster stitches.",
    steps: [
      "Round 1: Make a small ring and crochet 16 double crochets into it.",
      "Round 2: Change color. Make 16 puff stitches separated by chain spaces.",
      "Round 3: Change color again. Crochet 16 cluster stitches around the center.",
      "Round 4: Join your final color. Use taller stitches at the corners to turn the flower into a square.",
      "Fasten off and weave in the ends."
    ],
    link: "https://www.marchingnorth.com/sunburst-granny-square-pattern/"
  },
  {
    name: "Solid Granny Square",
    image: "/images/square4.jpg",
    level: "Beginner",
    yarn: "Drops Big Merino",
    hook: "5.5 mm",
    description: "A simple square with hardly any gaps. It works nicely for bags and other things that need a firmer fabric.",
    steps: [
      "Chain 5 and join into a ring.",
      "Round 1: Work four groups of double crochets into the ring, separated by chain-2 corners.",
      "Round 2: Work double crochets into every stitch along the sides.",
      "In every corner space, work (2 double crochets, chain 2, 2 double crochets).",
      "Keep repeating the side stitches and corner increases until the square is big enough.",
      "Fasten off and weave in the ends."
    ],
    link: "https://yeezhee.com/pages/granny-square-patterns"
  },
  {
    name: "African Flower Square",
    image: "/images/square5.jpg",
    level: "Intermediate",
    yarn: "Hobbii Friends Cotton 8/6",
    hook: "4 mm",
    description: "A flower with eight petals and a neat square border.",
    steps: [
      "Round 1: Crochet a center with eight chain-1 spaces.",
      "Round 2: Make eight shell groups around the center.",
      "Round 3: Change color and make eight petals.",
      "Round 4: Crochet single stitches around the petals, with longer stitches between them.",
      "Round 5: Work stitches of different heights to create four corners.",
      "Round 6: Add a border and weave in the ends."
    ],
    link: "https://thecaffeinatedsnail.com/african-flower-granny-square-pattern/"
  },
  {
    name: "Heart Granny Square",
    image: "/images/square6.jpg",
    level: "Intermediate",
    yarn: "DK cotton in 2 colors",
    hook: "4 mm",
    description: "A heart in the middle of a crochet square.",
    steps: [
      "Round 1: Make a magic ring. Crochet 1 half-double crochet and 11 double crochets into it.",
      "Round 2: Use double and treble crochet stitches to make the heart shape.",
      "Fasten off the heart and join your background yarn.",
      "Round 3: Crochet around the heart using different stitch heights to make four corners.",
      "Round 4: Work a border of double crochets with corner increases.",
      "Weave in the ends and block if needed."
    ],
    link: "https://yeezhee.com/pages/granny-square-patterns"
  },
  {
    name: "Willow Granny Square",
    image: "/images/square7.jpg",
    level: "Intermediate",
    yarn: "DK cotton",
    hook: "4 mm",
    description: "A delicate, vintage-looking square with open lace details.",
    steps: [
      "Round 1: Make a magic ring and crochet 16 double crochets.",
      "Round 2: Work 16 double crochets with chain-1 spaces between them.",
      "Round 3: Increase until there are 48 double crochets.",
      "Round 4: Make chain loops to start the open lace design.",
      "Round 5: Work double crochet groups and form the corners.",
      "Round 6: Crochet decorative chain arches between the groups.",
      "Round 7: Finish the outside edge following the full pattern."
    ],
    link: "https://grannysquare.me/willow-granny-square/"
  },
  {
    name: "Sunflower Granny Square",
    image: "/images/square8.jpg",
    level: "Intermediate",
    yarn: "Chunky acrylic in brown, yellow and green",
    hook: "6 mm",
    description: "A sunflower with a textured center and raised petals.",
    steps: [
      "Start by crocheting a circular center using brown yarn.",
      "Change to yellow and crochet the sunflower petals around the center.",
      "Make sure the petals are evenly spaced.",
      "Join your background yarn and start forming the square.",
      "Crochet four corners and add the final border.",
      "Weave in the ends."
    ],
    link: "https://www.cosyrosieuk.co.uk/sunflower-granny-square-free-crochet-pattern-tutorial/"
  },
  {
    name: "Pinwheel Granny Square",
    image: "/images/square9.jpg",
    level: "Intermediate",
    yarn: "Two contrasting yarn colors",
    hook: "Use the hook recommended for your yarn",
    description: "A geometric square with a rotating pinwheel design.",
    steps: [
      "Begin with a small center ring.",
      "Work four sections around the center.",
      "Increase the stitches to create a turning effect.",
      "Change colors between sections to make the pattern stand out.",
      "Continue until the square is the size you want.",
      "Finish with a border."
    ],
    link: "https://grannysquare.me/pinwheel-granny-square/"
  },
  {
    name: "Star Granny Square",
    image: "/images/square10.jpg",
    level: "Intermediate",
    yarn: "Lightweight yarn in 2 colors",
    hook: "3 mm",
    description: "A five-point star surrounded by a square background.",
    steps: [
      "Start with a circular center.",
      "Work five points around the center.",
      "Shape the star using increases and decreases.",
      "Join your background yarn around the star.",
      "Fill the spaces around the points to make a square.",
      "Finish with a border."
    ],
    link: "https://yeezhee.com/pages/granny-square-patterns"
  },
  {
    name: "Puff Flower Granny Square",
    image: "/images/square11.jpg",
    level: "Intermediate",
    yarn: "Medium weight yarn in 4 colors",
    hook: "5.5 mm",
    description: "A soft raised flower made with puff stitches.",
    steps: [
      "Make a magic ring.",
      "Crochet the flower center.",
      "Work puff stitches evenly around the center to make petals.",
      "Add chain spaces between the puff stitches.",
      "Join the background yarn and make four corners.",
      "Finish the border and weave in the ends."
    ],
    link: "https://hopecornerfarm.com/puff-flower-granny-square-crochet-pattern-free-written-pattern-with-photo-video-tutorial/"
  },
  {
    name: "Checkerboard Granny Square",
    image: "/images/square12.jpg",
    level: "Intermediate",
    yarn: "Worsted acrylic in 2 colors",
    hook: "5.5 mm",
    description: "A textured square with a checkerboard pattern.",
    steps: [
      "Choose two contrasting yarn colors.",
      "Start the square using the first round in the tutorial.",
      "Work alternating sections of stitches and color changes.",
      "Use front-post double crochets to make the textured pattern.",
      "Continue the checkerboard design through seven rounds.",
      "Finish the border and weave in the ends."
    ],
    link: "https://www.crochetforyoublog.com/2020/05/crochet-checkerboard-granny-square/"
  }
];

const finishing = {
  Blanket: [
    "Lay out the squares in the order you want.",
    "Join the squares in each row.",
    "Join all the rows together.",
    "Crochet a border around the blanket.",
    "Weave in the loose ends."
  ],
  Bag: [
    "Arrange the squares into the front and back of your bag.",
    "Join the squares together.",
    "Join the sides and bottom, leaving the top open.",
    "Crochet a strap or handles and attach them securely.",
    "Finish the opening and weave in the ends."
  ],
  Cardigan: [
    "Lay out the squares for the front, back and sleeves.",
    "Check the measurements before joining.",
    "Join the shoulders and sides, leaving armholes.",
    "Attach the sleeves.",
    "Crochet borders around the cuffs, neckline and bottom."
  ],
  Vest: [
    "Make a front and back panel from the squares.",
    "Join the shoulders and sides, leaving armholes.",
    "Crochet a border around the neckline and armholes.",
    "Weave in the ends."
  ],
  Pillow: [
    "Join the squares to make the pillow front.",
    "Make a matching back panel.",
    "Join three sides together.",
    "Insert your pillow.",
    "Close the last side."
  ]
};


const examples = [
  {
    id: -1,
    name: "Daisy Blanket",
    type: "Blanket",
    rows: 4,
    columns: 6,
    square: 1,
    completed: [0, 1, 2, 3]
  },
  {
    id: -2,
    name: "Market Bag",
    type: "Granny Square Bag",
    rows: 3,
    columns: 4,
    square: 0,
    completed: [0, 1]
  },
  {
    id: -3,
    name: "Crochet Vest",
    type: "Vest",
    rows: 4,
    columns: 4,
    square: 6,
    completed: []
  }
];


function ProjectCard({ project, onOpen }) {
  const total = project.rows * project.columns;
  const percent = Math.round(project.completed.length / total * 100);
  const picture = projectTypes.find(item => item.name === project.type);

  return (
    <button className="project-card" onClick={() => onOpen(project.id)}>
      <img src={picture?.image || "/images/blanket.jpg"} alt={project.name} />
      <div className="project-info">
        <h3>{project.name}</h3>
        <p>{project.completed.length} of {total} squares</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: percent + "%" }}></div>
        </div>
      </div>
    </button>
  );
}

function App() {

useEffect(() => {
  async function connect() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      const { error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.log("Supabase error:", error.message);
      } else {
        console.log("Connected to Supabase!");
      }
    } else {
      console.log("Connected to Supabase!");
    }
  }

  connect();
}, []);


const navigate = useNavigate();
const location = useLocation();

const page = location.pathname.slice(1) || "home";

function setPage(nextPage) {
  navigate(nextPage === "home" ? "/" : "/" + nextPage);
}
  const [selectedProject, setSelectedProject] = useState(1);
  const [selectedPattern, setSelectedPattern] = useState(0);

  
const [projects, setProjects] = useState([]);

useEffect(() => {
  async function loadProjects() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      const { error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.log(error.message);
        return;
      }
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id");

    if (error) {
      console.log(error.message);
    } else {
      setProjects(data);
    }
  }

  loadProjects();
}, []);

  const [name, setName] = useState("");
  const [type, setType] = useState("Blanket");
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(4);
  const [square, setSquare] = useState(0);

  function openProject(id) {
    setSelectedProject(id);
    setPage("tracker");
  }

  function openPattern(index) {
    setSelectedPattern(index);
    setPage("pattern");
  }

 
async function createProject(event) {
  event.preventDefault();

  if (!name.trim() || rows < 1 || columns < 1 || rows > 12 || columns > 12) {
    alert("Please enter a name and choose 1 to 12 rows and columns.");
    return;
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: name.trim(),
      type: type,
      rows: rows,
      columns: columns,
      square: square,
      completed: []
    })
    .select()
    .single();

  if (error) {
    alert("Couldn't save project: " + error.message);
    return;
  }

  setProjects([...projects, data]);
  setSelectedProject(data.id);
  setName("");
  setPage("tracker");
}

 
async function toggleSquare(number) {
  const project = projects.find(
    project => project.id === selectedProject
  );

  if (!project) return;

  let completed = [...project.completed];

  if (completed.includes(number)) {
    completed = completed.filter(item => item !== number);
  } else {
    completed.push(number);
  }

  const { error } = await supabase
    .from("projects")
    .update({ completed: completed })
    .eq("id", project.id);

  if (error) {
    alert("Couldn't save progress: " + error.message);
    return;
  }

  setProjects(projects.map(item =>
    item.id === project.id
      ? { ...item, completed: completed }
      : item
  ));
}

  const currentProject = projects.find(
    project => project.id === selectedProject
  );

  const currentPattern = patterns[selectedPattern];

  return (
    <div className="app">
      <header>
        <button onClick={() => setPage("home")}>
          <img src="/images/logo.png" alt="Loose Ends" />
        </button>
      </header>

      <main>
        {page === "home" && (
          <div>
            <div className="welcome">
              <h1>Hi there!</h1>
              <p>What would you like to do today?</p>
            </div>

            <button className="blue-button" onClick={() => setPage("new")}>
              + New project
            </button>

            <div className="quick-links">
              <button onClick={() => setPage("library")}>
                ♡ <span>Browse patterns</span>
              </button>
              <button onClick={() => setPage("projects")}>
                ▦ <span>My projects</span>
              </button>
            </div>

            <h2>Continue working on</h2>

            {projects.length > 0 && (
              <ProjectCard project={projects[0]} onOpen={openProject} />
            )}

            <h2>Recent projects</h2>

            {projects.slice(1, 3).map(project => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>
        )}

        {page === "projects" && (
          <div>
            <h1>Your Projects</h1>
            <p>Small squares. Big plans.</p>

            <button className="blue-button" onClick={() => setPage("new")}>
              + New project
            </button>

            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>
        )}

        {page === "new" && (
          <div>
            <h1>Create a new project</h1>

            <form onSubmit={createProject}>
              <label>Project name</label>
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="My crochet project"
                required
              />

              <label>Project type</label>

              <div className="type-grid">
                {projectTypes.map(item => (
                  <button
                    type="button"
                    key={item.name}
                    className={type === item.name ? "chosen" : ""}
                    onClick={() => setType(item.name)}
                  >
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>

              <label>Rows</label>
              <input
                type="number"
                min="1"
                max="12"
                value={rows}
                onChange={event => setRows(Number(event.target.value))}
              />

              <label>Columns</label>
              <input
                type="number"
                min="1"
                max="12"
                value={columns}
                onChange={event => setColumns(Number(event.target.value))}
              />

              <label>Choose your granny square</label>

              <div className="square-options">
                {patterns.map((pattern, index) => (
                  <button
                    type="button"
                    key={index}
                    className={square === index ? "chosen" : ""}
                    onClick={() => setSquare(index)}
                  >
                    <img src={pattern.image} alt={pattern.name} />
                  </button>
                ))}
              </div>

              <p>{rows * columns} squares in total</p>

              <button className="blue-button" type="submit">
                Create project
              </button>
            </form>
          </div>
        )}

        {page === "tracker" && currentProject && (
          <div>
            <button className="back-button" onClick={() => setPage("projects")}>
              ← Back
            </button>

            <img
              className="tracker-photo"
              src={projectTypes.find(item => item.name === currentProject.type)?.image || "/images/blanket.jpg"}
              alt={currentProject.name}
            />

            <h1>{currentProject.name}</h1>

            <p>
              {currentProject.completed.length} of{" "}
              {currentProject.rows * currentProject.columns} squares completed
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    (currentProject.completed.length /
                      (currentProject.rows * currentProject.columns)) *
                      100 + "%"
                }}
              ></div>
            </div>

            <div
              className="square-grid"
              style={{
                gridTemplateColumns:
                  "repeat(" + currentProject.columns + ", 1fr)"
              }}
            >
              {Array.from(
                { length: currentProject.rows * currentProject.columns },
                (_, number) => (
                  <button
                    key={number}
                    onClick={() => toggleSquare(number)}
                    aria-pressed={currentProject.completed.includes(number)}
                    aria-label={"Square " + (number + 1)}
                  >
                    {currentProject.completed.includes(number) ? (
                      <img
                        src={patterns[currentProject.square]?.image || patterns[0].image}
                        alt=""
                      />
                    ) : (
                      "+"
                    )}
                  </button>
                )
              )}
            </div>

            <p className="hint">Tap a square when you finish crocheting it.</p>

            <button
              className="outline-button"
              onClick={() => openPattern(currentProject.square || 0)}
            >
              View granny square pattern →
            </button>

            <h2>Putting it all together</h2>
            <p>Once you've made all your squares:</p>

            <ol className="instructions">
              {(finishing[projectTypes.find(
                item => item.name === currentProject.type
              )?.kind] || []).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {page === "library" && (
          <div>
            <h1>Granny Square Library</h1>
            <p>Find a square and learn how to make it.</p>

            <div className="pattern-grid">
              {patterns.map((pattern, index) => (
                <button key={index} onClick={() => openPattern(index)}>
                  <img src={pattern.image} alt={pattern.name} />
                  <h3>{pattern.name}</h3>
                  <p>{pattern.level}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === "pattern" && (
          <div>
            <button className="back-button" onClick={() => setPage("library")}>
              ← Back to library
            </button>

            <img
              className="pattern-photo"
              src={currentPattern.image}
              alt={currentPattern.name}
            />

            <h1>{currentPattern.name}</h1>
            <p>{currentPattern.level}</p>
            <p>{currentPattern.description}</p>

            <h2>Materials</h2>
            <p><strong>Yarn:</strong> {currentPattern.yarn}</p>
            <p><strong>Hook:</strong> {currentPattern.hook}</p>
            <p><strong>Other:</strong> Scissors and a yarn needle</p>

            <h2>Abbreviations</h2>
            <p>ch = chain · sl st = slip stitch</p>
            <p>sc = single crochet · hdc = half-double crochet</p>
            <p>dc = double crochet · tr = treble crochet</p>
            <p className="hint">US crochet terms</p>

            <h2>Pattern overview</h2>

            <ol className="instructions">
              {currentPattern.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <p className="hint">
              Follow the full tutorial for exact stitch counts and placement.
            </p>

            <a
              className="blue-button tutorial-link"
              href={currentPattern.link}
              target="_blank"
              rel="noreferrer"
            >
              View full tutorial →
            </a>
          </div>
        )}

        {page === "profile" && (
          <div className="profile-page">
            <div className="profile-circle">♡</div>
            <h1>Your Profile</h1>
            <p>Crochet enthusiast</p>

            <div className="stats">
              <div>
                <h2>{projects.length}</h2>
                <p>Projects</p>
              </div>
              <div>
                <h2>
                  {projects.filter(project =>
                    project.completed.length ===
                    project.rows * project.columns
                  ).length}
                </h2>
                <p>Finished</p>
              </div>
            </div>

            <button
              className="outline-button"
              onClick={() => setPage("library")}
            >
              Explore granny square patterns →
            </button>
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setPage("home")}>
          <span>⌂</span>Home
        </button>
        <button onClick={() => setPage("projects")}>
          <span>▦</span>Projects
        </button>
        <button onClick={() => setPage("new")}>
          <span>＋</span>Create
        </button>
        <button onClick={() => setPage("library")}>
          <span>♡</span>Library
        </button>
        <button onClick={() => setPage("profile")}>
          <span>♙</span>Profile
        </button>
      </nav>
    </div>
  );
}

export default App;