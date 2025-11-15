'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200;
      setScrolled(isScrolled);

      // Detectar projeto ativo baseado no scroll
      const projectSections = [0, 1, 2, 3]; // 4 projetos
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calcular qual projeto está visível
      const heroHeight = windowHeight;
      const aboutHeight = windowHeight * 0.8;
      
      if (scrollPosition > heroHeight + aboutHeight) {
        const projectScrollPosition = scrollPosition - heroHeight - aboutHeight;
        const projectIndex = Math.floor(projectScrollPosition / windowHeight);
        if (projectIndex >= 0 && projectIndex < projectSections.length) {
          setActiveProject(projectIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProject = (projectIndex: number) => {
    const element = document.getElementById(`project-${projectIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowProjectsMenu(false); // Fecha o menu após clicar
  };

  const handleProjectsClick = () => {
    setShowProjectsMenu(!showProjectsMenu);
  };

  return (
    <>
      {/* Header fixo ocupando 100% da tela */}
      <header className={`header-full-width transition-all duration-500 ${
        scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        {/* Container unificado com blur */}
        <div className="w-full backdrop-blur-md" style={{ background: 'rgba(35, 17, 35, 0.1)' }}>
          {/* Título Principal com mais padding */}
          <div className="w-full shadow-2xl" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="text-center py-6 px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                Portfólio Igor Vieira
              </h2>
            </div>
          </div>
          
          {/* Navbar ocupando 100vw */}
          <nav className="w-full">
            <div className="w-full flex justify-evenly items-center px-4 py-8">
              {/* Menu Principal */}
              <button
                onClick={() => scrollToSection('hero')}
                className="navbar-button"
              >
                <span className="button-text">Início</span>
              </button>
              
              <button
                onClick={() => scrollToSection('about')}
                className="navbar-button"
              >
                <span className="button-text">Sobre</span>
              </button>
              
              {/* Botão Projetos com dropdown */}
              <button
                onClick={handleProjectsClick}
                className="navbar-button relative"
                style={{ color: showProjectsMenu ? '#C30F45' : '' }}
              >
                <span className="button-text">Projetos</span>
                <span className={`ml-2 transition-transform duration-300 ${showProjectsMenu ? 'rotate-180' : 'rotate-0'}`}>
                  ▼
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="navbar-button"
                style={{ color: '#C30F45' }}
              >
                <span className="button-text">Contato</span>
              </button>
            </div>
          </nav>

          {/* Menu Dropdown dos Projetos - Simplificado */}
          <div className={`w-full transition-all duration-500 overflow-hidden ${
            showProjectsMenu ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="navbar-full-width py-4">
              <div className="flex justify-center space-x-20">
                {[
                  { index: 0, label: 'E-commerce' },
                  { index: 1, label: 'Analytics' },
                  { index: 2, label: 'Streaming' },
                  { index: 3, label: 'Fitness' }
                ].map((project) => (
                  <button
                    key={project.index}
                    onClick={() => scrollToProject(project.index)}
                    className="flex items-center space-x-4 px-6 py-3 rounded-xl bg-transparent border border-transparent transition-all duration-300 group"
                    style={{ 
                      borderColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(195, 15, 69, 0.15) 0%, rgba(212, 20, 80, 0.15) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <span className="text-sm font-bold group-hover:text-white transition-colors" style={{ color: '#C30F45' }}>
                      P{project.index + 1}
                    </span>
                    <span className="text-sm text-white group-hover:text-white transition-colors">
                      {project.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Seção Hero - Centralizada */}
      <section id="hero" className="h-screen relative overflow-hidden" style={{ background: 'transparent' }}>
        {/* Efeitos de fundo sutis */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(195, 15, 69, 0.05)' }}></div>
          <div className="absolute bottom-32 right-24 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(195, 15, 69, 0.05)' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-2xl" style={{ background: 'rgba(35, 17, 35, 0.2)' }}></div>
        </div>

        {/* Conteúdo centralizado */}
        <div className="hero-center relative z-10">
          {/* Nome e Subtítulo */}
          <div className={`transition-all duration-700 ${
            scrolled ? 'opacity-0 -translate-y-10' : 'opacity-100'
          }`}>
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-12 tracking-tight" style={{ paddingBottom: '3rem' }}>
              Igor Gianeri Vieira
            </h1>
            <p className="text-2xl md:text-4xl text-white font-light tracking-wide max-w-4xl mx-auto">
              Desenvolvedor Mobile/Front-End em Formação
            </p>
          </div>

          {/* Indicador de Scroll */}
          <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="animate-bounce">
              <div className="w-8 h-14 border-2 border-purple-accent rounded-full flex justify-center bg-purple-primary/10 backdrop-blur-sm">
                <div className="w-2 h-6 bg-purple-accent rounded-full mt-2 animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre - Melhorada */}
      <AboutSection />

      {/* Seções de Projetos - Nova Estrutura */}
      <ProjectSections />

      {/* Seção de Contato - Centralizada */}
      <ContactSection />
    </>
  );
}

// Componente Sobre Melhorado
function AboutSection() {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'React Native', icon: '📱' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' }
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-8" style={{ padding: '10px', background: 'transparent' }}>
      <div className="w-full px-6" style={{ padding: '10px' }}>
        {/* Título centralizado com a página */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sobre Mim</h2>
        </div>
        
        {/* Layout lado a lado */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* Texto à esquerda */}
          <div className="space-y-8" style={{ padding: '10px' }}>
            <p className="text-white text-xl leading-relaxed" style={{ padding: '10px' }}>
              Desenvolvedor apaixonado por tecnologia e inovação. Especializado em criar 
              experiências digitais excepcionais usando as mais modernas tecnologias do mercado.
            </p>
            <p className="text-white text-xl leading-relaxed" style={{ padding: '10px' }}>
              Focado em desenvolvimento mobile e front-end, sempre buscando aprender novas 
              tecnologias e implementar soluções criativas para problemas complexos.
            </p>
            
            <div className="pt-6" style={{ padding: '10px' }}>
              <button className="btn-primary text-lg px-8 py-4" style={{ padding: '10px' }}>
                Download CV
              </button>
            </div>
          </div>
          
          {/* Tecnologias à direita - sem boxes */}
          <div className="space-y-6" style={{ padding: '10px' }}>
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

// Componente de Projetos com Scroll Contínuo
function ProjectSections() {
  const projects = [
    {
      id: 1,
      title: 'App Mobile E-commerce',
      description: 'Aplicativo completo de e-commerce desenvolvido em React Native com integração de pagamentos, carrinho de compras e sistema de avaliações. Interface moderna e experiência de usuário otimizada.',
      mainImage: 0,
      images: [
        { id: 0, placeholder: 'Tela Principal' },
        { id: 1, placeholder: 'Carrinho' },
        { id: 2, placeholder: 'Pagamento' },
        { id: 3, placeholder: 'Perfil' }
      ],
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
      gradient: '#C30F45 to #d41450'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos em tempo real, filtros avançados e exportação de relatórios. Desenvolvido com foco na experiência do usuário e performance.',
      mainImage: 0,
      images: [
        { id: 0, placeholder: 'Dashboard' },
        { id: 1, placeholder: 'Gráficos' },
        { id: 2, placeholder: 'Relatórios' },
        { id: 3, placeholder: 'Filtros' }
      ],
      technologies: ['Next.js', 'Chart.js', 'TailwindCSS', 'API REST'],
      gradient: '#C30F45 to #d41450'
    },
    {
      id: 3,
      title: 'Plataforma de Streaming',
      description: 'Plataforma completa de streaming com player personalizado, sistema de favoritos, busca avançada e controle parental. Interface responsiva e otimizada para todas as telas.',
      mainImage: 0,
      images: [
        { id: 0, placeholder: 'Player' },
        { id: 1, placeholder: 'Catálogo' },
        { id: 2, placeholder: 'Busca' },
        { id: 3, placeholder: 'Perfis' }
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      gradient: '#C30F45 to #d41450'
    },
    {
      id: 4,
      title: 'App Fitness Tracker',
      description: 'Aplicativo de acompanhamento fitness com tracking de exercícios, metas personalizadas, integração com wearables e social features para motivação entre usuários.',
      mainImage: 0,
      images: [
        { id: 0, placeholder: 'Treinos' },
        { id: 1, placeholder: 'Estatísticas' },
        { id: 2, placeholder: 'Social' },
        { id: 3, placeholder: 'Metas' }
      ],
      technologies: ['React Native', 'HealthKit', 'GraphQL', 'AWS'],
      gradient: '#C30F45 to #d41450'
    }
  ];

  const [selectedImages, setSelectedImages] = useState(projects.map(() => 0));

  const handleImageChange = (projectIndex: number, imageIndex: number) => {
    setSelectedImages(prev => 
      prev.map((img, idx) => idx === projectIndex ? imageIndex : img)
    );
  };

  return (
    <div id="projects">
      {projects.map((project, projectIndex) => (
        <section 
          key={project.id}
          id={`project-${projectIndex}`}
          className="h-screen flex items-center relative overflow-hidden"
          style={{
            background: 'transparent'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(195, 15, 69, 0.2) 0%, rgba(212, 20, 80, 0.2) 100%)' }}></div>
          </div>

          {/* Número do Projeto - Posição otimizada */}
          <div className="absolute left-4 lg:left-12 top-1/2 transform -translate-y-1/2 z-10">
            <span className="text-6xl lg:text-9xl font-black" style={{ color: 'rgba(195, 15, 69, 0.2)' }}>
              {String(projectIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center px-8 relative z-10" style={{ padding: '10px' }}>
            <div className="max-w-7xl w-full grid lg:grid-cols-3 gap-12 items-center" style={{ padding: '10px' }}>
              
              {/* Área de Imagens - Expandida para ocupar mais espaço */}
              <div className="flex flex-col items-center justify-center space-y-6 order-2 lg:order-1 lg:col-span-2" style={{ padding: '10px' }}>
                {/* Container da Imagem Principal */}
                <div className="w-full max-w-2xl mx-auto">
                  <div className="relative overflow-hidden rounded-3xl aspect-video shadow-2xl border border-transparent transition-all duration-300 group cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.3)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(195, 15, 69, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'; }}>
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-500" style={{ background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(195, 15, 69, 0.1) 0%, rgba(212, 20, 80, 0.1) 100%)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <span className="text-3xl lg:text-4xl font-bold text-white image-transition content-change">
                        {project.images[selectedImages[projectIndex]].placeholder}
                      </span>
                    </div>
                    
                    {/* Seta Esquerda */}
                    <button 
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === 0 ? project.images.length - 1 : selectedImages[projectIndex] - 1)}
                      className="nav-arrow absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 z-10"
                      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195, 15, 69, 0.9)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Seta Direita */}
                    <button 
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === project.images.length - 1 ? 0 : selectedImages[projectIndex] + 1)}
                      className="nav-arrow absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 z-10"
                      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195, 15, 69, 0.9)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Galeria de Prévias - Centralizada */}
                <div className="w-full max-w-2xl mx-auto">
                  <div className="grid grid-cols-4 gap-4">
                    {project.images.map((image, imageIndex) => (
                      <button
                        key={image.id}
                        onClick={() => handleImageChange(projectIndex, imageIndex)}
                        className="aspect-video rounded-xl flex items-center justify-center transition-all duration-500 border-2 hover:scale-105"
                        style={{
                          background: selectedImages[projectIndex] === imageIndex 
                            ? 'linear-gradient(135deg, #C30F45 0%, #d41450 100%)' 
                            : 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)',
                          borderColor: selectedImages[projectIndex] === imageIndex 
                            ? '#C30F45' 
                            : 'transparent',
                          boxShadow: selectedImages[projectIndex] === imageIndex 
                            ? '0 10px 15px -3px rgba(195, 15, 69, 0.3)' 
                            : 'none',
                          transform: selectedImages[projectIndex] === imageIndex ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedImages[projectIndex] !== imageIndex) {
                            e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.5)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(195, 15, 69, 0.2) 0%, rgba(212, 20, 80, 0.2) 100%)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedImages[projectIndex] !== imageIndex) {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)';
                          }
                        }}
                      >
                        <span className="text-sm lg:text-base font-semibold text-white transition-all duration-300">
                          {imageIndex + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informações do Projeto - Compacto */}
              <div className="space-y-6 order-1 lg:order-2 px-4 flex flex-col justify-center" style={{ padding: '10px' }}>
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight px-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed px-2">
                    {project.description}
                  </p>
                </div>

                {/* Tecnologias */}
                <div className="space-y-3 px-2">
                  <h4 className="text-base font-semibold text-white">Tecnologias</h4>
                  <div className="flex flex-wrap gap-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="p-4 text-white border border-transparent rounded-lg text-xs font-medium transition-all duration-300 cursor-default"
                        style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(195, 15, 69, 0.2) 0%, rgba(212, 20, 80, 0.2) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link para repositório */}
                <div className="flex justify-center pt-4 px-2">
                  <button className="border border-transparent text-white text-sm px-8 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg flex items-center space-x-2" style={{ background: 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #C30F45 0%, #d41450 100%)'; e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.5)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(195, 15, 69, 0.25)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(35, 17, 35, 0.7) 0%, rgba(26, 13, 26, 0.7) 100%)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    <span>Ver repositório</span>
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

// Componente de Contato Centralizado
function ContactSection() {
  const contacts = [
    { 
      label: 'Email', 
      value: 'igor@exemplo.com',
      icon: '📧'
    },
    { 
      label: 'LinkedIn', 
      value: '/in/igor-vieira',
      icon: '💼'
    },
    { 
      label: 'GitHub', 
      value: '/igorgianeri',
      icon: '💻'
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center" style={{ padding: '10px', background: 'transparent' }}>
      <div className="max-w-4xl mx-auto px-6 text-center" style={{ padding: '10px' }}>
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Vamos Conversar</h2>
          <p className="text-white text-xl max-w-2xl mx-auto leading-relaxed">
            Estou sempre aberto a novas oportunidades e projetos interessantes. 
            Entre em contato e vamos criar algo incrível juntos!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12" style={{ padding: '10px' }}>
          {contacts.map((contact) => (
            <div 
              key={contact.label} 
              className="p-8 rounded-3xl border transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              style={{ padding: '10px', background: 'rgba(35, 17, 35, 0.5)', borderColor: 'rgba(195, 15, 69, 0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(195, 15, 69, 0.2)'; }}
            >
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #C30F45 0%, #d41450 100%)' }}>
                {contact.icon}
              </div>
              <h3 className="text-white font-semibold mb-3 text-lg">{contact.label}</h3>
              <p className="text-white text-base">{contact.value}</p>
            </div>
          ))}
        </div>

        <button className="btn-primary text-lg px-10 py-5 shadow-lg shadow-purple-primary/25">
          Entrar em Contato
        </button>
      </div>
    </section>
  );
}


