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
    { id: 1, name: 'Projeto Cordel' },
    { id: 2, name: 'Projeto CERNE' },
    { id: 3, name: 'Simpliza' }
  ];

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 40);
      // Mostra navbar quando chegar na seção "sobre"
      const shouldShow = scrollPosition > window.innerHeight * 0.7;
      setShowNavbar(shouldShow);

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
      {/* NOVA NAVBAR - Recriada do zero */}
      <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-purple-500/20 transition-all duration-500 ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="/images/Perfil.jpg" 
                alt="Igor Gianeri"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
              />
              <div className={`text-xl font-bold text-purple-400 ${syneMono.className}`}>
                <GlitchText
                  speed={5}
                  enableShadows={false}
                  enableOnHover={false}
                >
                  Igor Gianeri
                </GlitchText>
              </div>
            </div>

            {/* Desktop Navigation - Minimalista */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '32px',
              visibility: 'visible',
              opacity: 1
            }}>
                
                <a href="#hero" style={{ textDecoration: 'none' }}>
                  <div 
                    style={{
                      color: '#ffffff',
                      padding: '8px 16px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#C30F45';
                      target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#ffffff';
                      target.style.transform = 'translateX(0px)';
                    }}
                  >
                    Início
                  </div>
                </a>

                <a href="#about" style={{ textDecoration: 'none' }}>
                  <div 
                    style={{
                      color: '#ffffff',
                      padding: '8px 16px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#C30F45';
                      target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#ffffff';
                      target.style.transform = 'translateX(0px)';
                    }}
                  >
                    Sobre
                  </div>
                </a>

                <div style={{ position: 'relative' }}>
                  <div
                    onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                    style={{
                      color: '#ffffff',
                      padding: '8px 16px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#C30F45';
                      target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#ffffff';
                      target.style.transform = 'translateX(0px)';
                    }}
                  >
                    Projetos
                    <span style={{ 
                      fontSize: '12px',
                      transition: 'transform 0.3s ease',
                      transform: showProjectsDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      ▼
                    </span>
                  </div>
                  
                  {showProjectsDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '12px',
                      width: '240px',
                      backgroundColor: 'rgba(0, 0, 0, 0.95)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(195, 15, 69, 0.3)',
                      borderRadius: '12px',
                      padding: '8px 0',
                      zIndex: 1000,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                    }}>
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          onClick={() => {
                            handleProjectClick(project.id);
                            setShowProjectsDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.backgroundColor = 'rgba(195, 15, 69, 0.1)';
                            target.style.color = '#C30F45';
                            target.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.backgroundColor = 'transparent';
                            target.style.color = '#ffffff';
                            target.style.transform = 'translateX(0px)';
                          }}
                        >
                          <span style={{ 
                            color: '#C30F45', 
                            fontWeight: 'bold', 
                            fontSize: '16px',
                            opacity: '0.7'
                          }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span style={{ fontSize: '14px' }}>{project.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <a href="#contact" style={{ textDecoration: 'none' }}>
                  <div 
                    style={{
                      color: '#ffffff',
                      padding: '8px 16px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#C30F45';
                      target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#ffffff';
                      target.style.transform = 'translateX(0px)';
                    }}
                  >
                    Contato
                  </div>
                </a>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
                <button className="text-white hover:text-purple-300 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                  Início
                </button>
              </a>

              <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                <button className="text-white hover:text-purple-300 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                  Sobre
                </button>
              </a>

              <div className="px-3 py-2">
                <button 
                  onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                  className="text-white hover:text-purple-300 flex items-center justify-between w-full"
                >
                  <span>Projetos</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showProjectsDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProjectsDropdown && (
                  <div className="mt-2 space-y-1">
                    {projects.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => {
                          handleProjectClick(project.id);
                          setMobileMenuOpen(false);
                          setShowProjectsDropdown(false);
                        }}
                        className="text-gray-300 hover:text-purple-300 hover:bg-white/10 block px-4 py-2 rounded-md text-sm w-full text-left flex items-center space-x-2"
                      >
                        <span className="text-purple-400 font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{project.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="text-white hover:text-purple-300 hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                  Contato
                </button>
              </a>

            </div>
          </div>
        )}
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
              <a href="/curriculo-igor-vieira.pdf" download="Igor_Vieira_Curriculo.pdf">
                <button className="btn-primary text-base md:text-lg px-6 py-3 md:px-8 md:py-4">
                  Download CV
                </button>
              </a>
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
      title: 'Projeto Cordel',
      description: 'Projeto criado durante o curso de HTML5 e CSS3 do CursoEmVídeo. É um projeto de estudo criado em HTML como um cordel digital contendo poemas do autor Milton Duarte. Um projeto simples para estudos de background e organização de página.',
      images: [
        { id: 0, src: '/images/Cordel1.jpg', alt: 'Página inicial do Cordel' },
        { id: 1, src: '/images/Cordel2.jpg', alt: 'Seção dos poemas' },
        { id: 2, src: '/images/Cordel3.jpg', alt: 'Design responsivo' },
        { id: 3, src: '/images/Cordel4.jpg', alt: 'Efeitos visuais' }
      ],
      technologies: ['HTML5', 'CSS3', 'Design Responsivo'],
      repositoryUrl: 'https://github.com/igorgianeri/projeto-cordel'
    },
    {
      id: 2,
      title: 'Projeto CERNE',
      description: 'Projeto criado durante o curso técnico de Desenvolvimento de Sistemas. Criado como um projeto mobile, o CERNE é um bloco de notas simples com a função de criar notas desenhadas. O Aplicativo foi criado com o intuíto de estudar tecnologias Tailwind e testar novas funções do React Native.',
      images: [
        { id: 0, src: '/images/Cerne1.jpg', alt: 'Tela de login' },
        { id: 1, src: '/images/Cerne2.jpg', alt: 'Lista de notas' },
        { id: 2, src: '/images/Cerne3.jpg', alt: 'Editor de desenhos' },
        { id: 3, src: '/images/Cerne4.jpg', alt: 'Configurações' }
      ],
      technologies: ['React Native', 'TailwindCSS', 'Canvas API'],
      repositoryUrl: 'https://github.com/igorgianeri/projeto-blocodenotas'
    },
    {
      id: 3,
      title: 'Simpliza',
      description: 'Trabalho de Conclusão de Curso para o curso técnico de Desenvolvimento de Sistemas. Um aplicativo Mobile criado em React com o objetivo de auxiliar microempreendedores a fazer gestão de finanças. Projeto mais complexo e detalhado até o momento.',
      images: [
        { id: 0, src: '/images/Simpliza1.jpg', alt: 'Dashboard principal' },
        { id: 1, src: '/images/Simpliza2.jpg', alt: 'Histórico de transações' },
        { id: 2, src: '/images/Simpliza3.jpg', alt: 'Calculadora DAS' },
        { id: 3, src: '/images/Simplzia4.jpg', alt: 'Configurações' }
      ],
      technologies: ['React Native', 'Firebase', 'Chart.js', 'AsyncStorage'],
      repositoryUrl: 'https://github.com/DanielAzeved0/Simpliza-TCC'
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
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-transparent transition-all duration-300 select-none hover:scale-105 hover:shadow-3xl" 
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)',
                      cursor: isDragging ? 'grabbing' : 'grab',
                      aspectRatio: '4/3'
                    }}
                    onMouseDown={(e) => handleDragStart(e)}
                    onMouseMove={(e) => handleDragMove(e)}
                    onMouseUp={(e) => handleDragEnd(e, projectIndex)}
                    onMouseLeave={(e) => dragStart && handleDragEnd(e, projectIndex)}
                    onTouchStart={(e) => handleDragStart(e)}
                    onTouchMove={(e) => handleDragMove(e)}
                    onTouchEnd={(e) => handleDragEnd(e, projectIndex)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-1">
                      <img 
                        src={project.images[selectedImages[projectIndex]].src}
                        alt={project.images[selectedImages[projectIndex]].alt}
                        className="max-w-full max-h-full object-contain rounded-xl md:rounded-2xl shadow-lg transition-transform duration-300"
                      />
                    </div>

                    <button
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === 0 ? project.images.length - 1 : selectedImages[projectIndex] - 1)}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:bg-opacity-80"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-200 hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleImageChange(projectIndex, (selectedImages[projectIndex] + 1) % project.images.length)}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:bg-opacity-80"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-200 hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          className={`rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden relative hover:scale-110 hover:shadow-lg ${
                            selected 
                              ? 'scale-105 ring-4 ring-red-500 ring-opacity-80 border-2 border-red-500' 
                              : 'border-2 border-transparent hover:border-purple-400 hover:border-opacity-50'
                          }`}
                          style={{
                            aspectRatio: '4/3',
                            background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)'
                          }}
                        >
                          <img 
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-300 rounded-md md:rounded-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                            {imageIndex + 1}
                          </div>
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
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <button className="group relative overflow-hidden border-2 border-transparent text-white text-sm px-6 py-2 md:px-8 md:py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:border-purple-400 hover:scale-105 hover:shadow-purple-500/25 hover:shadow-xl cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
                      <span className="relative z-10 group-hover:text-purple-200 transition-colors duration-300">Ver repositório</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                    </button>
                  </a>
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


