
function iniciarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sec = link.dataset.section;
            if(sec) showSection(sec);
        });
    });

    document.getElementById("verProductosBtn")?.addEventListener("click", () => {
        showSection("productos");
    });

    document.getElementById("verRegistroBtnHome")?.addEventListener("click", () => {
        showSection("registro");
    });

    const menuToggle = document.getElementById("menuToggle");
    const navLinksUl = document.getElementById("navLinks");

    menuToggle?.addEventListener("click", () => {
        navLinksUl.classList.toggle("show");
    });

    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sec = link.dataset.section;
            if(sec) showSection(sec);
        });
    });

    const lastSection = localStorage.getItem("currentSection");
    if(lastSection && document.getElementById(lastSection))
        showSection(lastSection);
    else
        showSection("home");

    //modo oscuro
    let toggle=document.getElementById("toggle");
    let labelDarkMode=document.getElementById("labelDarkMode");
    //guardamos el modo oscuro en localStorage para mantener la preferencia del usuario
    const darkModeGuardado = localStorage.getItem("darkMode") === "true";

    if(darkModeGuardado && toggle && labelDarkMode){
        toggle.checked = true;
        document.body.classList.add("dark-mode");
        labelDarkMode.innerHTML='<i class="fa-solid fa-sun"></i>';
        labelDarkMode.style.color="#c7a55b";

    }

    toggle?.addEventListener("change",(event)=>{
        let checked=event.target.checked;
        document.body.classList.toggle("dark-mode");

        //guardamos el estado en el LocalStorage
        localStorage.setItem("darkMode", checked);

        if(checked==true){
            labelDarkMode.innerHTML='<i class="fa-solid fa-sun"></i>';
            labelDarkMode.style.color="#c7a55b";
        }else{
            labelDarkMode.innerHTML='<i class="fa-solid fa-moon"></i>';
            labelDarkMode.style.color="#053B05";
        }
    })
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active-section'));
    const activeSec = document.getElementById(sectionId);
    if(activeSec) activeSec.classList.add('active-section');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkSection = link.dataset.section;
        if(linkSection === sectionId) link.classList.add('active');
        else link.classList.remove('active');
    });
    
    localStorage.setItem("currentSection", sectionId);
}

// Alerta de promocion apenas se entra a la pagina
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active-section'));
    const activeSec = document.getElementById(sectionId);
    if(activeSec) activeSec.classList.add('active-section');
    
    // Si el usuario entra a la sección de productos, le mostramos un aviso
    if (sectionId === "productos") {
        alert("¡Aprovecha! Solo por hoy tenemos 10% de descuento usando el código: TextilNova");
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkSection = link.dataset.section;
        if(linkSection === sectionId) link.classList.add('active');
        else link.classList.remove('active');
    });
        
    localStorage.setItem("currentSection", sectionId);
}