'use client';

import { useEffect, useState } from 'react';
import PixelBlast from '@/components/PixelBlast';
import GlitchText from '@/components/GlitchText';
import DecryptedText from './DecryptedText';
import { Syne_Mono } from 'next/font/google';

const syneMono = Syne_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    { id: 1, name: 'App Mobile E-commerce' },
    { id: 2, name: 'Dashboard Analytics' },
    { id: 3, name: 'Plataforma de Streaming' },
    { id: 4, name: 'App Fitness Tracker' }
  ];

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 40);
      // Mostra navbar após passar da seção hero (aproximadamente 100vh)
      setShowNavbar(scrollPosition > window.innerHeight * 0.8);

      // Detecta se chegou ao final da página
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = windowHeight + scrollPosition >= documentHeight - 100;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Detecta a seção ativa
      const heroElement = document.getElementById('hero');
      const aboutElement = document.getElementById('about');
      const projectsElement = document.getElementById('projects');
      const contactElement = document.getElementById('contact');
      
      // Verifica contact primeiro
      if (contactElement) {
        const rect = contactElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.6) {
          setActiveSection('contact');
          return;
        }
      }

      // Verifica projects
      if (projectsElement) {
        const rect = projectsElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= 0) {
          setActiveSection('projects');
          return;
        }
      }

      // Verifica about
      if (aboutElement) {
        const rect = aboutElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3) {
          setActiveSection('about');
          return;
        }
      }

      // Verifica hero
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= 0) {
          setActiveSection('hero');
          return;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleProjectClick = (projectId: number) => {
    const element = document.getElementById(`project-${projectId - 1}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowProjectsDropdown(false);
    }
  };

  return (
    <>
      {/* Navbar fixa - aparece apenas após a seção inicial */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-all duration-500 ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`} 
        style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(111, 45, 189, 0.2)' }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Ícone circular branco */}
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white flex-shrink-0"></div>
            
            <div className={`text-base md:text-2xl font-bold ${syneMono.className} whitespace-nowrap`} style={{ color: '#6F2DBD' }}>
              <GlitchText
                speed={5}
                enableShadows={false}
                enableOnHover={false}
              >
                Igor Gianeri
              </GlitchText>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-4 items-center">
            <a href="#hero">
              <button className="navbar-button px-4">
                <span className="button-text" style={{ color: activeSection === 'hero' ? '#C30F45' : '' }}>Início</span>
              </button>
            </a>
            <a href="#about">
              <button className="navbar-button px-4">
                <span className="button-text" style={{ color: activeSection === 'about' ? '#C30F45' : '' }}>Sobre</span>
              </button>
            </a>
            <div className="relative">
              <button 
                className="navbar-button flex items-center gap-2 px-4"
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
              >
                <span className="button-text" style={{ color: activeSection === 'projects' ? '#C30F45' : '' }}>Projetos</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-500 ${showProjectsDropdown ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke={activeSection === 'projects' ? '#C30F45' : 'currentColor'}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-out ${
                  showProjectsDropdown 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(111, 45, 189, 0.3)' }}
              >
                <div className="flex gap-6 px-6 py-4">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectClick(project.id)}
                      className="flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300 group"
                    >
                      <span 
                        className="text-4xl font-black transition-all duration-300"
                        style={{ color: 'rgba(111, 45, 189, 0.3)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white text-xs whitespace-nowrap group-hover:text-purple-400 transition-colors">
                        {project.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <a href="#contact">
              <button className="navbar-button px-4">
                <span className="button-text" style={{ color: activeSection === 'contact' ? '#C30F45' : '' }}>Contato</span>
              </button>
            </a>
          </div>

          {/* Botão Hambúrguer Mobile */}
          <button 
            className="md:hidden p-2 flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className="flex flex-col py-4 px-6 gap-4">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-left py-2 px-4 rounded">
                <span className="text-white text-sm" style={{ color: activeSection === 'hero' ? '#C30F45' : '' }}>Início</span>
              </button>
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-left py-2 px-4 rounded">
                <span className="text-white text-sm" style={{ color: activeSection === 'about' ? '#C30F45' : '' }}>Sobre</span>
              </button>
            </a>
            <div>
              <button 
                className="w-full text-left py-2 px-4 rounded flex items-center justify-between"
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
              >
                <span className="text-white text-sm" style={{ color: activeSection === 'projects' ? '#C30F45' : '' }}>Projetos</span>
                <svg 
                  className={`w-4 h-4 text-white transition-transform duration-300 ${showProjectsDropdown ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke={activeSection === 'projects' ? '#C30F45' : 'currentColor'}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  showProjectsDropdown ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <div className="flex flex-col gap-2 pl-4">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        handleProjectClick(project.id);
                        setMobileMenuOpen(false);
                        setShowProjectsDropdown(false);
                      }}
                      className="flex items-center gap-3 py-2 px-4 rounded hover:bg-white/10 transition-colors"
                    >
                      <span 
                        className="text-lg font-black"
                        style={{ color: 'rgba(111, 45, 189, 0.5)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white text-xs">
                        {project.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-left py-2 px-4 rounded">
                <span className="text-white text-sm" style={{ color: activeSection === 'contact' ? '#C30F45' : '' }}>Contato</span>
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* PixelBlast Background - apenas na seção hero e parte superior do about */}
      <div className="absolute top-0 left-0 w-full z-0" style={{ height: '150vh', pointerEvents: 'none' }}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#6F2DBD"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          className=""
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <section id="hero" className="h-screen relative overflow-hidden">
        <div className="hero-center relative z-20 flex flex-col items-center justify-center text-center h-full px-4">
          <div className={`transition-all duration-700 flex flex-col items-center justify-center ${scrolled ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
            <div className={`${syneMono.className} mb-4 md:mb-6`}>
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <DecryptedText
                  text="Igor"
                  speed={19}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                  className="text-white font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl"
                  parentClassName="decrypted-parent"
                  encryptedClassName="decrypted-encrypted"
                  animateOn="view"
                  revealDirection="center"
                />
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-white font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl"
                >
                  Gianeri
                </GlitchText>
                <DecryptedText
                  text="Vieira"
                  speed={19}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                  className="text-white font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl"
                  parentClassName="decrypted-parent"
                  encryptedClassName="decrypted-encrypted"
                  animateOn="view"
                  revealDirection="center"
                />
              </div>
            </div>

            <div className="max-w-full overflow-hidden px-2">
              <DecryptedText
                text="Desenvolvedor Mobile/Front-End em Formação"
                speed={10}
                maxIterations={18}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                className="text-white font-light text-sm sm:text-base md:text-2xl lg:text-3xl whitespace-nowrap"
                parentClassName="decrypted-parent-sub"
                encryptedClassName="decrypted-encrypted-sub"
                animateOn="view"
                revealDirection="center"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <section id="about">
          <AboutSection />
        </section>

        <ProjectSections />

        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </>
  );
}

function AboutSection() {
  const technologies = [
    { name: 'HTML', icon: '/icons/html.png' },
    { name: 'CSS', icon: '/icons/css.png' },
    { name: 'TypeScript', icon: '/icons/ts.png' },
    { name: 'React', icon: '/icons/react.png' }
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center" style={{ background: 'transparent', padding: '2rem 1rem md:padding-4rem 1.5rem' }}>
      <div className="w-full px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Sobre Mim</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center text-center lg:text-left">
          <div className="space-y-6 md:space-y-8 lg:text-left text-center">
            <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed px-4 md:px-0">
              Desenvolvedor focado em Desenvolvimento Web e Mobile em processo de aprendizado. 
              Por enquanto estou aprendendo programação e desenvolvimento enquanto crio alguns projetos, 
              mas meu objetivo é trabalhar na área de Segurança Cibernética, mais especificamente na área de Pentest e Forense Digital.
            </p>
            
            <div className="pt-4 md:pt-6">
              <button className="btn-primary text-base md:text-lg px-6 py-3 md:px-8 md:py-4">
                Download CV
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name} 
                className="transition-all duration-500 hover:scale-125 hover:rotate-12"
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <img src={tech.icon} alt={tech.name} className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSections() {
  const projects = [
    {
      id: 1,
      title: 'App Mobile E-commerce',
      description: 'Aplicativo completo de e-commerce desenvolvido em React Native com integração de pagamentos, carrinho de compras e sistema de avaliações. Interface moderna e experiência de usuário otimizada.',
      images: [
        { id: 0, placeholder: 'Tela Principal' },
        { id: 1, placeholder: 'Carrinho' },
        { id: 2, placeholder: 'Pagamento' },
        { id: 3, placeholder: 'Perfil' }
      ],
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase']
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos em tempo real, filtros avançados e exportação de relatórios.',
      images: [
        { id: 0, placeholder: 'Dashboard' },
        { id: 1, placeholder: 'Gráficos' },
        { id: 2, placeholder: 'Relatórios' },
        { id: 3, placeholder: 'Filtros' }
      ],
      technologies: ['Next.js', 'Chart.js', 'TailwindCSS', 'API REST']
    },
    {
      id: 3,
      title: 'Plataforma de Streaming',
      description: 'Plataforma completa de streaming com player personalizado, sistema de favoritos e busca avançada.',
      images: [
        { id: 0, placeholder: 'Player' },
        { id: 1, placeholder: 'Catálogo' },
        { id: 2, placeholder: 'Busca' },
        { id: 3, placeholder: 'Perfis' }
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io']
    },
    {
      id: 4,
      title: 'App Fitness Tracker',
      description: 'Aplicativo de acompanhamento fitness com tracking de exercícios, metas personalizadas e integração com wearables.',
      images: [
        { id: 0, placeholder: 'Treinos' },
        { id: 1, placeholder: 'Estatísticas' },
        { id: 2, placeholder: 'Social' },
        { id: 3, placeholder: 'Metas' }
      ],
      technologies: ['React Native', 'HealthKit', 'GraphQL', 'AWS']
    }
  ];

  const [selectedImages, setSelectedImages] = useState(() => projects.map(() => 0));
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (projectIndex: number, imageIndex: number) => {
    setSelectedImages(prev => prev.map((v, i) => (i === projectIndex ? imageIndex : v)));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragStart) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = Math.abs(clientX - dragStart.x);
    if (deltaX > 5) {
      setIsDragging(true);
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent, projectIndex: number) => {
    if (!dragStart) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStart.x;
    
    // Só processa o swipe se o movimento foi maior que 50px
    if (Math.abs(deltaX) > 50 && isDragging) {
      if (deltaX > 0) {
        // Swipe para direita - imagem anterior
        const newIndex = selectedImages[projectIndex] === 0 
          ? projects[projectIndex].images.length - 1 
          : selectedImages[projectIndex] - 1;
        handleImageChange(projectIndex, newIndex);
      } else {
        // Swipe para esquerda - próxima imagem
        const newIndex = (selectedImages[projectIndex] + 1) % projects[projectIndex].images.length;
        handleImageChange(projectIndex, newIndex);
      }
    }
    
    setDragStart(null);
    setIsDragging(false);
  };

  return (
    <div id="projects">
      {projects.map((project, projectIndex) => (
        <section
          key={project.id}
          id={`project-${projectIndex}`}
          className="min-h-screen py-12 md:py-0 md:h-screen flex items-center relative overflow-hidden"
          style={{ background: 'transparent' }}
        >

          <div className="absolute left-4 md:left-8 lg:left-12 top-12 md:top-1/2 transform md:-translate-y-1/2 z-10">
            <span className="text-4xl md:text-6xl lg:text-9xl font-black" style={{ color: 'rgba(195, 15, 69, 0.2)' }}>
              {String(projectIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center px-4 md:px-8 relative z-10">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 lg:col-span-2 order-2 lg:order-1">
                <div className="w-full max-w-2xl mx-auto">
                  <div 
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-video shadow-2xl border border-transparent transition-all duration-300 select-none" 
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)',
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    onMouseDown={(e) => handleDragStart(e)}
                    onMouseMove={(e) => handleDragMove(e)}
                    onMouseUp={(e) => handleDragEnd(e, projectIndex)}
                    onMouseLeave={(e) => dragStart && handleDragEnd(e, projectIndex)}
                    onTouchStart={(e) => handleDragStart(e)}
                    onTouchMove={(e) => handleDragMove(e)}
                    onTouchEnd={(e) => handleDragEnd(e, projectIndex)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                        {project.images[selectedImages[projectIndex]].placeholder}
                      </span>
                    </div>

                    <button
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === 0 ? project.images.length - 1 : selectedImages[projectIndex] - 1)}
                      className="nav-arrow absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleImageChange(projectIndex, (selectedImages[projectIndex] + 1) % project.images.length)}
                      className="nav-arrow absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-2xl mx-auto">
                  <div className="grid grid-cols-4 gap-2 md:gap-4">
                    {project.images.map((image, imageIndex) => {
                      const selected = selectedImages[projectIndex] === imageIndex;
                      return (
                        <button
                          key={image.id}
                          onClick={() => handleImageChange(projectIndex, imageIndex)}
                          className={`aspect-video rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 ${selected ? 'scale-105' : ''}`}
                          style={{
                            background: selected ? 'linear-gradient(135deg, #C30F45 0%, #d41450 100%)' : 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)',
                            borderColor: selected ? '#C30F45' : 'transparent'
                          }}
                        >
                          <span className="text-xs md:text-sm lg:text-base font-semibold text-white">
                            {imageIndex + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6 px-4 flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-sm lg:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-white">Tecnologias</h4>
                  <div className="flex flex-wrap gap-3 md:gap-5 justify-center lg:justify-start">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-2 md:p-4 text-white rounded-lg text-xs font-medium" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <button className="border border-transparent text-white text-sm px-6 py-2 md:px-8 md:py-3 rounded-lg transition-all duration-300 font-medium shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
                    Ver repositório
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function ContactSection() {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/igor-vieira-103706304/', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/igorgianeri', '_blank');
  };

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('gianeri.vieira@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar email:', err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center relative" style={{ background: 'transparent', padding: '2rem 1rem md:padding-2rem 1.5rem', minHeight: '30vh' }}>
      {/* Profile - Ícone no canto esquerdo */}
      <div className="absolute left-4 md:left-8 lg:left-16 transition-all duration-500 ease-out hover:scale-110">
        <img 
          src="/icons/profile.png" 
          alt="Profile"
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8" style={{ color: '#6F2DBD' }}>Contato</h2>
        
        <div className="flex justify-center items-center gap-6 md:gap-8">
          {/* GitHub */}
          <div 
            className="cursor-pointer transition-all duration-700 ease-out hover:scale-125 hover:rotate-12"
            onClick={handleGitHubClick}
            style={{ 
              transform: showEmail ? 'translateX(-20px) md:translateX(-30px)' : 'translateX(0)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <img 
              src="/icons/github.png" 
              alt="GitHub"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>

          {/* Gmail com hover */}
          <div 
            className="relative cursor-pointer transition-all duration-1000 ease-out"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
            onClick={handleEmailClick}
          >
            {showEmail ? (
              <div 
                className="text-white font-semibold text-sm md:text-base whitespace-nowrap"
                style={{
                  animation: 'fade-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                }}
              >
                {copied ? 'Copiado! ✓' : 'gianeri.vieira@gmail.com'}
              </div>
            ) : (
              <img 
                src="/icons/gmail.png" 
                alt="Gmail"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                style={{
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            )}
          </div>

          {/* LinkedIn */}
          <div 
            className="cursor-pointer transition-all duration-700 ease-out hover:scale-125 hover:-rotate-12"
            onClick={handleLinkedInClick}
            style={{ 
              transform: showEmail ? 'translateX(20px) md:translateX(30px)' : 'translateX(0)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <img 
              src="/icons/linkedin.png" 
              alt="LinkedIn"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


