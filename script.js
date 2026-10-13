const API_BASE_URL = 'http://localhost:3000/users';
const STORAGE_KEY = 'salvador.notes';
const placeholderImage = 'https://via.placeholder.com/800x450/161b22/e6edf3?text=Insert+Local+Asset';
const assetsPath = 'assets/';

// [LESSON IMPLEMENTED: Arrays & Data Structures]
// Storing your CV projects as an array of objects. We will iterate over this array later using .map() and .forEach() to render HTML.
const projects = [
  { name: 'JustiFi', description: 'Mobile 3D Visual Novel integrating Google Firebase, Cloud Firestore, and offline syncing.', detailedDescription: 'Engineered a cloud-synchronized system architecture utilizing Google Firebase and Cloud Firestore to ensure seamless data syncing between online and offline gameplay. Configured technical elements within Unity, structuring the narrative flow using Ink scripting.', technologies: ['Unity', 'Firebase', 'C#', 'Ink'], image: `${assetsPath}JustiFi.png`, link: '#' },
  { name: 'DocuVault', description: 'Digital Document Management startup combining a mobile app, cloud storage, and NFC tech.', detailedDescription: 'Co-developed a secure digital document management platform combining a mobile application, cloud storage services, and NFC-enabled smart card technology. Integrated biometric authentication, offline accessibility, and AES-256 encryption to protect user data.', technologies: ['Mobile App', 'NFC', 'AES-256'], image: `${assetsPath}DocuVault.jpg`, link: '#' },
  { name: 'NU Shop Mobile App', description: 'Cross-platform mobile e-commerce application for university students.', detailedDescription: 'Built a cross-platform mobile application using Flutter designed for the university student body to seamlessly browse merchandise. Developed an intuitive mobile user interface ensuring optimal performance across varying devices.', technologies: ['Flutter', 'Dart'], image: `${assetsPath}NUShop.jpg`, link: '#' },
  { name: 'PawCart', description: 'E-commerce & Pet Adoption Platform with inventory management.', detailedDescription: 'Spearheaded back-end development using PHP to manage database interactions for inventory and pet adoption listings. Designed UI wireframes based on core Human-Computer Interaction (HCI) principles.', technologies: ['PHP', 'HCI', 'UI/UX'], image: `${assetsPath}PawCart.jpg`, link: '#' }
];

const seedNotes = [
  { name: 'state-management', title: 'Thoughts on State Management', image: placeholderImage, moreInfoLink: '#', content: ['Managing state across a large application can be tricky. Using context APIs or external libraries often simplifies the data flow.', 'Always try to keep state as local as possible before lifting it up.'], status: 'active' },
  { name: 'firebase-offline', title: 'Offline First with Firebase', image: placeholderImage, moreInfoLink: '#', content: ['In my Capstone project, JustiFi, configuring offline persistence in Cloud Firestore was crucial.', 'It allows users to continue seamless interactions even when network connectivity drops.'], status: 'active' }
];

// [LESSON IMPLEMENTED: Object-Oriented Programming (OOP)]
// We use an ES6 class to act as a blueprint for our projects.
// Private fields (using #) ensure that data cannot be altered from outside the class (Encapsulation).
class ProjectCard {
  #projectName;
  #description;
  #technologies;
  #image;

  constructor(project) { 
    this.#projectName = project.name; 
    this.#description = project.description; 
    this.#technologies = project.technologies; 
    this.#image = project.image; 
  }
  
  // Getter method to safely access private data
  get name() { return this.#projectName; }
  
  // [LESSON IMPLEMENTED: DOM Manipulation (Creating Elements)]
  // Building HTML entirely in memory using document.createElement, adding classes, and assigning text content before putting it on the screen.
  render() {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.classList.add('card-link');
    trigger.dataset.action = 'open-project-modal';
    trigger.dataset.project = this.name;
    
    const card = document.createElement('article'); card.classList.add('site-section');
    
    const image = document.createElement('img'); image.classList.add('project-art'); image.src = this.#image; image.alt = `${this.name} mockup`; image.loading = 'lazy';
    
    const title = document.createElement('h2'); title.classList.add('card-title'); title.textContent = this.name;
    const desc = document.createElement('p'); desc.classList.add('card-copy'); desc.textContent = this.#description;
    
    const typeRow = document.createElement('div'); typeRow.classList.add('type-row');
    this.#technologies.forEach((tech) => { 
      const badge = document.createElement('span'); badge.classList.add('type-badge'); badge.textContent = tech; 
      typeRow.append(badge); // Assembling elements
    });
    
    card.append(image, title, desc, typeRow); 
    trigger.append(card); 
    return trigger;
  }
}

function openProjectModal(project) {
  const overlay = el('div', 'modal-overlay');
  overlay.dataset.action = 'close-project-modal';
  const modal = el('section', 'modal-content');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'project-modal-title');

  const close = el('button', 'modal-close', '×');
  close.type = 'button';
  close.dataset.action = 'close-project-modal';
  close.setAttribute('aria-label', 'Close project details');
  const image = document.createElement('img');
  image.classList.add('modal-image');
  image.src = project.image;
  image.alt = `${project.name} project preview`;
  const title = el('h2', 'modal-title', project.name);
  title.id = 'project-modal-title';
  const description = el('p', 'modal-description', project.detailedDescription);
  const technologies = el('div', 'type-row');
  project.technologies.forEach((technology) => technologies.append(el('span', 'type-badge', technology)));

  modal.append(close, image, title, description, technologies);
  overlay.append(modal);
  document.body.append(overlay);
}

// Basic App Setup & Helper Functions
const app = document.getElementById('app');
const route = () => window.location.hash.replace(/^#/, '') || '/';
const navigate = (path) => { window.location.hash = path; };
const getNotes = () => { try { const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(stored) && stored.length ? stored : seedNotes; } catch { return seedNotes; } };
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.classList.add(...className.split(' ')); if (text !== undefined) node.textContent = text; return node; };

function shell(content, dashboard = false) {
  const root = document.createElement('div'); root.classList.add(dashboard ? 'dashboard-shell' : 'site-shell');
  if (dashboard) root.append(dashboardNav(), content); else { root.append(publicNav()); const main = el('main', 'site-main site-content'); if (content.classList.contains('auth-shell')) main.classList.add('auth-main'); main.append(content); root.append(main, footer()); }
  return root;
}

function publicNav() { 
  const header = el('header', 'navbar-wrap'); const nav = el('nav', 'navbar site-main'); 
  const brand = el('a', 'brand'); brand.href = '#/'; brand.innerHTML = '<span class="brand-mark">Q</span><span>Qjuin Salvador<small>Dev Portfolio</small></span>'; 
  const links = el('div', 'nav-links'); 
  [['Home','/'],['About','/about'],['Notes','/notes'],['Admin','/auth/signin']].forEach(([label, path]) => { 
    const a = el('a', 'nav-link', label); a.href = `#${path}`; a.dataset.route = path; links.append(a); 
  }); 
  nav.append(brand, links); header.append(nav); return header; 
}

function footer() { return el('footer', 'site-main footer-note', `Qjuin Dominic Salvador | Mobile & Web Application Developer | ${new Date().getFullYear()}`); }
function pageFrame(eyebrow, title, copy) { const section = el('section', 'site-section'); section.append(el('p','pill',eyebrow), el('h1','hero-title',title), el('p','hero-subtitle',copy)); return section; }

function homePage() {
  const wrapper = document.createElement('div'); 
  const hero = pageFrame('Portfolio', "Qjuin Dominic Salvador", "Highly motivated IT student specializing in Mobile and Web Application development. Experienced in full-cycle development utilizing modern frameworks to build cross-platform apps and dynamic web interfaces.");
  const cvLink = el('a', 'btn', 'Download CV');
  cvLink.href = 'https://drive.google.com/file/d/1NzXx5W6upRDIEY7TTImDRrMhiW2KNj_N/view?usp=sharing';
  cvLink.target = '_blank';
  cvLink.rel = 'noopener noreferrer';
  hero.append(cvLink);
  
  const split = el('div','site-grid cols-2'); 
  const identity = el('article','site-section trainer-panel'); 
  identity.append(el('h2','card-title','Technical Skills'), el('p','card-copy','A strong foundation in backend databases, system architecture, and front-end interface design.'));
  
  const points = el('ul','battle-points'); 
  ['Frameworks: Flutter, React, Unity', 'Programming: Java, Dart, JavaScript, PHP, C#', 'Cloud & DB: MongoDB, Firebase, MySQL, MSSQL', 'Tools: Git, Figma, GitHub Copilot'].forEach((item) => points.append(el('li',null,item))); 
  identity.append(points);
  
  const banner = el('img','feature-image'); banner.src = `${assetsPath}HomePageImage.jpg`; banner.alt = 'Developer workspace banner'; 
  split.append(identity, banner); hero.append(split); wrapper.append(hero);
  
  // [LESSON IMPLEMENTED: Array Iteration (.map and .forEach)]
  // We map over our project data, instantiate our OOP class, call the render method, and append it to the DOM.
  const grid = el('div','team-grid'); 
  projects.map((project) => new ProjectCard(project).render()).forEach((card) => grid.append(card)); 
  
  wrapper.append(grid, contactSection()); return wrapper;
}

function contactSection() { 
  const section = el('section','site-section contact-form'); section.id = 'contact'; 
  section.append(el('p','eyebrow','Contact'), el('h2',null,'Let\'s Connect'), el('p','hero-text','Looking for a Mobile App Developer? Send me a message below.'));
  const form = document.createElement('form'); form.id = 'contact-form'; form.noValidate = true; form.classList.add('auth-form'); 
  const name = inputField('contact-name','Name','text','name',true); 
  const email = inputField('contact-email','Email','email','email',true); 
  const message = inputField('contact-message','Message','textarea','message',true); 
  form.append(name,email,message,el('button','button','Send message'),el('p','form-message')); 
  section.append(form); return section; 
}

function inputField(id,label,type,name,required=false) { 
  const wrap = el('div','field'); const labelNode = el('label',null,label); labelNode.htmlFor=id; 
  let input; if (type === 'textarea') input = document.createElement('textarea'); else { input = document.createElement('input'); input.type=type; } 
  input.id=id; input.name=name; input.required=required; wrap.append(labelNode,input,el('small','field-error')); return wrap; 
}

function aboutPage() { 
  const wrapper = document.createElement('div'); 
  const hero = pageFrame('Background','Education & Activities','My academic journey and extracurricular engagements.'); 
  const grid=el('div','site-grid cols-2'); 
  
  const story=el('article','site-section'); 
  const image=el('img','profile-image'); image.src=`${assetsPath}Profile.jpg`; image.alt='Qjuin Salvador profile photo'; story.append(image); 
  ['Pursuing a Bachelor of Science in Information Technology (Mobile and Web Application) at National University Manila. Expected Graduation: September 2027.', 'Served on the CCIT Student Council as a Committee member under the Secretary and Business Manager.', 'Passionate about leveraging hands-on programming skills to create seamless, user-centric applications.'].forEach((text)=>story.append(el('p','card-copy',text))); 
  
  const certs=el('article','site-section'); 
  certs.append(el('h2','card-title','Certifications & Seminars'), el('p','card-copy','Continuous learning through industry programs.'));
  const certList = el('ul', 'battle-points');
  ['Identity Stack - Google Developer Groups', 'Zero to One with Firebase Studio', 'Cisco Networking Basics', 'Build-a-Block: Blockchain Jungle'].forEach(cert => certList.append(el('li',null,cert)));
  certs.append(certList);
  
  grid.append(story,certs); hero.append(grid); wrapper.append(hero, statsSection()); return wrapper; 
}

function statsSection() { 
  const section=el('section','site-section'); 
  section.append(el('h2',null,'GitHub Activity'),el('p','hero-text','Fetching live data.')); 
  const result=el('p','stat-result','Loading Github stats...'); result.id='github-stats'; section.append(result); 
  fetchGithubStats(result); 
  return section; 
}

// [LESSON IMPLEMENTED: Asynchronous JavaScript (HTTP/Fetch API)]
// We use `async/await` to wait for the network request without freezing the browser.
// We wrap it in a `try...catch` block to handle errors gracefully if the API fails or is offline.
async function fetchGithubStats(target) { 
  try { 
    const response = await fetch('https://api.github.com/users/Qjuin'); 
    if(!response.ok) throw new Error('Stats unavailable'); // Error handling
    const data = await response.json(); // Parsing the JSON payload
    target.textContent=`${data.public_repos ?? 0} public repositories for ${data.login}.`; // Updating the DOM
  } catch { 
    target.textContent='Github stats are unavailable right now, but feel free to check out my projects above.'; 
  } 
}

// Rest of the UI generation logic (Notes, Auth, Dashboard)...
function articlesPage() { const wrapper= document.createElement('div'); const hero=pageFrame('Tech Notes','Development insights','Short write-ups on application development and coding.'); const back=el('a','btn','Back Home'); back.href='#/'; hero.append(back); wrapper.append(hero); const section=el('section','section'); section.append(el('p','eyebrow','Featured Notes')); const grid=el('div','article-grid'); getNotes().filter((n)=>n.status==='active').forEach((note,index)=>grid.append(articleCard(note,index))); section.append(grid); wrapper.append(section); return wrapper; }
function articleCard(article,index) { const card=el('article','article-card'); const link=el('a','btn','Read More'); link.href=`#/notes/${article.name}`; card.append(el('p','article-card__label',`Note ${String(index+1).padStart(2,'0')}`),el('h3','article-card__title',article.title),el('p','article-excerpt',`${article.content?.[0]?.substring(0,120) || ''}...`),link); return card; }
function articlePage(name) { const article=getNotes().find((item)=>item.name===name && item.status!=='inactive'); if(!article) return notFound('Note not found'); const wrapper=document.createElement('div'); const header=el('section','section article-header'); const back=el('a','btn','Back to Notes'); back.href='#/notes'; header.append(back,el('div','article-header__meta')); header.querySelector('.article-header__meta').append(el('p','eyebrow','Dev Guide'),el('h1',null,article.title),el('p','muted',article.name.split('-').map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(' '))); const body=el('section','section'); const paragraphs=el('div','article-body'); article.content.forEach((paragraph)=>paragraphs.append(el('p',null,paragraph))); body.append(paragraphs); wrapper.append(header,body); return wrapper; }
function notFound(text='Page not found') { const section=el('section','section'); section.append(el('h1',null,text)); const link=el('a','btn','Back to Home'); link.href='#/'; section.append(link); return section; }
function authPage(mode) { /* Kept original auth structure */ const isSignup=mode==='signup'; const wrapper=el('div','auth-shell'); const showcase=el('aside','auth-showcase'); const image=el('img'); image.src=`${assetsPath}LoginPageImage.jpg`; image.alt='Secure login illustration'; showcase.append(image); const panel=el('main','auth-form-panel'); const form=el('form','auth-form'); form.noValidate = true; form.id=isSignup?'signup-form':'signin-form'; form.append(el('p','eyebrow',isSignup?'Get Started':'Welcome Back'),el('h1',null,isSignup?'Create account':'Welcome back'),el('p','hero-text','Please enter your details')); if(isSignup) { form.append(inputField('signup-email','Email address','email','email',true),inputField('signup-password','Password','password','password',true)); } else { form.append(inputField('signin-email','Email address','email','email',true),inputField('signin-password','Password','password','password',true)); } const message=el('p','form-message'); message.id='auth-message'; const submit=el('button','button',isSignup?'Sign up':'Sign in'); submit.type='submit'; form.append(message,submit); const home=el('a','auth-link','Back to home'); home.href='#/'; form.append(home); panel.append(form); wrapper.append(showcase,panel); return wrapper; }
function dashboardNav() { const aside=el('aside','dashboard-sidebar'); const toggle=el('button','button secondary','☰ Menu'); toggle.classList.add('dash-toggle'); toggle.dataset.action='toggle-sidebar'; aside.append(toggle); const nav=el('nav','dash-nav'); [['▦','Dashboard','/dashboard']].forEach(([icon,label,path])=>{ const link=el('a',null,`${icon} `); link.href=`#${path}`; link.dataset.route=path; link.append(el('span','dash-label',label)); nav.append(link); }); aside.append(nav); return aside; }
function dashboardPage(path) { const main=el('main','dashboard-main'); const top=el('header','dash-topbar'); const title=el('h1',null,'Dashboard'); const logout=el('button','button secondary','Logout'); logout.dataset.action='logout'; top.append(title,logout); main.append(top, el('section','site-section', 'Welcome to the admin panel.')); return main; }

// [LESSON IMPLEMENTED: Event Handling & Delegation]
// Added one listener to the whole document, instead of adding an event listener to every button.
// We then check what was clicked using `event.target.closest()`. This is highly efficient memory-wise.
function bindEvents() { 
  document.addEventListener('click', (event) => { 
    const modalTrigger = event.target.closest('[data-action="open-project-modal"]');
    if (modalTrigger) {
      const project = projects.find((item) => item.name === modalTrigger.dataset.project);
      if (project) openProjectModal(project);
      return;
    }

    const closeModal = event.target.closest('[data-action="close-project-modal"]');
    if (closeModal && (closeModal.classList.contains('modal-overlay') || closeModal.classList.contains('modal-close'))) {
      closeModal.closest('.modal-overlay').remove();
      return;
    }

    // Example of routing via delegation
    const routeLink = event.target.closest('[data-route]'); 
    if(routeLink){ 
      event.preventDefault(); 
      navigate(routeLink.dataset.route); 
      event.stopPropagation(); // Stops the event from bubbling further up the DOM
    } 
    
    // Example of actions via delegation
    const action = event.target.closest('[data-action]')?.dataset.action; 
    if(action === 'toggle-sidebar') event.target.closest('.dashboard-sidebar').classList.toggle('collapsed'); 
    if(action === 'logout'){ localStorage.removeItem('token'); navigate('/'); } 
  }); 

  // [LESSON IMPLEMENTED: Form Handling & Validation]
  // Listen to form submissions globally.
  document.addEventListener('submit', (event) => { 
    if(event.target.id === 'contact-form'){
      event.preventDefault(); // Stops the page from reloading, which is default browser behavior.
      const form = event.target; 
      const message = form.querySelector('.form-message'); 
      const email = form.email.value.trim(); 
      
      message.className = 'form-message error'; 
      
      // Client-side validation: checking if empty or missing '@'
      if(!email || !email.includes('@')){
        message.textContent = 'Please enter a valid email address.'; 
        form.email.closest('.field').classList.add('has-error'); // Real-time CSS visual feedback
        return;
      } 
      
      message.className = 'form-message success'; 
      message.textContent = 'Message sent. Thanks for reaching out!'; 
      form.reset(); 
    } 
    
    if(event.target.id === 'signin-form'){
      event.preventDefault(); 
      localStorage.setItem('token','demo-token');
      navigate('/dashboard');
    } 
  }); 
}

function render() { 
  const current = route(); let content; 
  if(current === '/') content = homePage(); 
  else if(current === '/about') content = aboutPage(); 
  else if(current === '/notes') content = articlesPage(); 
  else if(current.startsWith('/notes/')) content = articlePage(current.split('/')[2]); 
  else if(current === '/auth/signin') content = authPage('signin'); 
  else if(current.startsWith('/dashboard')) { app.replaceChildren(shell(dashboardPage(current), true)); return; } 
  else content = notFound(); 
  app.replaceChildren(shell(content)); 
  document.querySelectorAll('.nav-link').forEach((link)=>link.classList.toggle('active',link.dataset.route===current)); 
}

window.addEventListener('hashchange', render); 
bindEvents(); 
render();