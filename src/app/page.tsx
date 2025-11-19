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
        <div className="navbar-full-width max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Ícone circular branco */}
            <div className="w-12 h-12 rounded-full bg-white"></div>
            
            <div className={`text-2xl font-bold ${syneMono.className}`} style={{ color: '#6F2DBD' }}>
              <GlitchText
                speed={5}
                enableShadows={false}
                enableOnHover={false}
              >
                Igor Gianeri
              </GlitchText>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#hero">
              <button className="navbar-button">
                <span className="button-text">Início</span>
              </button>
            </a>
            <a href="#about">
              <button className="navbar-button">
                <span className="button-text">Sobre</span>
              </button>
            </a>
            <div className="relative">
              <button 
                className="navbar-button flex items-center gap-2"
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
              >
                <span className="button-text">Projetos</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-500 ${showProjectsDropdown ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
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
              <button className="navbar-button">
                <span className="button-text">Contato</span>
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
        <div className="hero-center relative z-20 flex flex-col items-center justify-center text-center h-full">
          <div className={`transition-all duration-700 flex flex-col items-center justify-center ${scrolled ? 'opacity-0 -translate-y-10' : 'opacity-100'}`}>
            <div className={`${syneMono.className} mb-6`}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <DecryptedText
                  text="Igor"
                  speed={19}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                  className="text-white font-bold text-7xl md:text-8xl"
                  parentClassName="decrypted-parent"
                  encryptedClassName="decrypted-encrypted"
                  animateOn="view"
                  revealDirection="center"
                />
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-white font-bold text-7xl md:text-8xl"
                >
                  Gianeri
                </GlitchText>
                <DecryptedText
                  text="Vieira"
                  speed={19}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                  className="text-white font-bold text-7xl md:text-8xl"
                  parentClassName="decrypted-parent"
                  encryptedClassName="decrypted-encrypted"
                  animateOn="view"
                  revealDirection="center"
                />
              </div>
            </div>

            <div>
              <DecryptedText
                text="Desenvolvedor Mobile/Front-End em Formação"
                speed={10}
                maxIterations={18}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                className="text-white font-light whitespace-nowrap text-2xl md:text-3xl"
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
    { name: 'React', icon: '⚛️' },
    { name: 'React Native', icon: '📱' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' }
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center" style={{ background: 'transparent', padding: '4rem 1.5rem' }}>
      <div className="w-full px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sobre Mim</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center text-center lg:text-left">
          <div className="space-y-8 lg:text-left text-center">
            <p className="text-white text-xl leading-relaxed">
              Desenvolvedor apaixonado por tecnologia e inovação. Especializado em criar 
              experiências digitais excepcionais usando as mais modernas tecnologias do mercado.
            </p>
            <p className="text-white text-xl leading-relaxed">
              Focado em desenvolvimento mobile e front-end, sempre buscando aprender novas 
              tecnologias e implementar soluções criativas para problemas complexos.
            </p>
            
            <div className="pt-6">
              <button className="btn-primary text-lg px-8 py-4">
                Download CV
              </button>
            </div>
          </div>
          
          <div className="space-y-6 flex flex-col items-center">
            {technologies.map((tech) => (
              <div 
                key={tech.name} 
                className="flex items-center space-x-6 transition-all duration-300 hover:translate-x-2"
              >
                <span className="text-4xl">{tech.icon}</span>
                <h3 className="text-white font-semibold text-2xl">{tech.name}</h3>
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

  const handleImageChange = (projectIndex: number, imageIndex: number) => {
    setSelectedImages(prev => prev.map((v, i) => (i === projectIndex ? imageIndex : v)));
  };

  return (
    <div id="projects">
      {projects.map((project, projectIndex) => (
        <section
          key={project.id}
          id={`project-${projectIndex}`}
          className="h-screen flex items-center relative overflow-hidden"
          style={{ background: 'transparent' }}
        >

          <div className="absolute left-4 lg:left-12 top-1/2 transform -translate-y-1/2 z-10">
            <span className="text-6xl lg:text-9xl font-black" style={{ color: 'rgba(195, 15, 69, 0.2)' }}>
              {String(projectIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center px-8 relative z-10">
            <div className="max-w-7xl w-full grid lg:grid-cols-3 gap-12 items-center">
              <div className="flex flex-col items-center justify-center space-y-6 lg:col-span-2">
                <div className="w-full max-w-2xl mx-auto">
                  <div className="relative overflow-hidden rounded-3xl aspect-video shadow-2xl border border-transparent transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl lg:text-4xl font-bold text-white">
                        {project.images[selectedImages[projectIndex]].placeholder}
                      </span>
                    </div>

                    <button
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === 0 ? project.images.length - 1 : selectedImages[projectIndex] - 1)}
                      className="nav-arrow absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleImageChange(projectIndex, (selectedImages[projectIndex] + 1) % project.images.length)}
                      className="nav-arrow absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10"
                      style={{ background: 'rgba(0,0,0,0.4)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-2xl mx-auto">
                  <div className="grid grid-cols-4 gap-4">
                    {project.images.map((image, imageIndex) => {
                      const selected = selectedImages[projectIndex] === imageIndex;
                      return (
                        <button
                          key={image.id}
                          onClick={() => handleImageChange(projectIndex, imageIndex)}
                          className={`aspect-video rounded-xl flex items-center justify-center transition-all duration-500 ${selected ? 'scale-105' : ''}`}
                          style={{
                            background: selected ? 'linear-gradient(135deg, #C30F45 0%, #d41450 100%)' : 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)',
                            borderColor: selected ? '#C30F45' : 'transparent'
                          }}
                        >
                          <span className="text-sm lg:text-base font-semibold text-white">
                            {imageIndex + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6 px-4 flex flex-col justify-center">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Tecnologias</h4>
                  <div className="flex flex-wrap gap-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="p-4 text-white rounded-lg text-xs font-medium" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <button className="border border-transparent text-white text-sm px-8 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}>
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

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/igor-vieira-103706304/', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/igorgianeri', '_blank');
  };

  return (
    <section className="flex flex-col items-center justify-center relative" style={{ background: 'transparent', padding: '2rem 1.5rem', minHeight: '30vh' }}>
      {/* Profile - Ícone no canto esquerdo */}
      <div className="absolute left-8 md:left-16 transition-all duration-500 ease-out hover:scale-110">
        <img 
          src="/icons/profile.png" 
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center w-full">
        <h2 className="text-2xl font-semibold mb-8" style={{ color: '#6F2DBD' }}>Contato</h2>
        
        <div className="flex justify-center items-center gap-8">
          {/* GitHub */}
          <div 
            className="cursor-pointer transition-all duration-700 ease-out hover:scale-125 hover:rotate-12"
            onClick={handleGitHubClick}
            style={{ 
              transform: showEmail ? 'translateX(-30px)' : 'translateX(0)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <img 
              src="/icons/github.png" 
              alt="GitHub"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Gmail com hover */}
          <div 
            className="relative cursor-pointer transition-all duration-1000 ease-out"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            {showEmail ? (
              <div 
                className="text-white font-semibold text-base whitespace-nowrap"
                style={{
                  animation: 'fade-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                }}
              >
                gianeri.vieira@gmail.com
              </div>
            ) : (
              <img 
                src="/icons/gmail.png" 
                alt="Gmail"
                className="w-12 h-12 object-contain"
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
              transform: showEmail ? 'translateX(30px)' : 'translateX(0)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <img 
              src="/icons/linkedin.png" 
              alt="LinkedIn"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


