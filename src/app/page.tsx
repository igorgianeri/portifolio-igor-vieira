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
        {/* Título Principal com mais padding */}
        <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
          <div className="text-center py-12 px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-200 tracking-wide drop-shadow-lg">
              Portfólio Igor Vieira
            </h2>
            <div className="mt-4 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-primary to-transparent mx-auto opacity-60"></div>
          </div>
        </div>
        
        {/* Navbar ocupando 100vw */}
        <nav className="w-full bg-gray-900/90 backdrop-blur-md">
          <div className="navbar-full-width">
            {/* Logo lateral */}
            <div className={`flex items-center space-x-3 transition-all duration-700 ${
              scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-primary to-purple-accent rounded-xl flex items-center justify-center shadow-lg ring-2 ring-purple-primary/20">
                <span className="text-lg font-bold text-white">IG</span>
              </div>
            </div>

            {/* Menu Principal */}
            <div className="flex space-x-12">
              {[
                { id: 'hero', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="navbar-button"
                >
                  <span className="button-text">{item.label}</span>
                </button>
              ))}
              
              {/* Botão Projetos com dropdown */}
              <button
                onClick={handleProjectsClick}
                className={`navbar-button relative ${showProjectsMenu ? 'text-purple-primary' : ''}`}
              >
                <span className="button-text">Projetos</span>
                <span className={`ml-2 transition-transform duration-300 ${showProjectsMenu ? 'rotate-180' : 'rotate-0'}`}>
                  ▼
                </span>
              </button>
            </div>

            {/* Spacer para equilibrar */}
            <div className="flex-1"></div>
          </div>
        </nav>

        {/* Menu Dropdown dos Projetos - Simplificado */}
        <div className={`w-full bg-gray-900/95 backdrop-blur-md transition-all duration-500 overflow-hidden ${
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
                  className="flex items-center space-x-4 px-6 py-3 rounded-xl bg-transparent border border-transparent hover:bg-gradient-to-br hover:from-purple-600/15 hover:to-purple-700/15 hover:border-purple-primary/20 transition-all duration-300 group"
                >
                  <span className="text-sm font-bold text-purple-accent group-hover:text-purple-primary transition-colors">
                    P{project.index + 1}
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {project.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Seção Hero - Centralizada */}
      <section id="hero" className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Efeitos de fundo sutis */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-24 w-72 h-72 bg-purple-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-24 w-72 h-72 bg-purple-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-900/20 rounded-full blur-2xl"></div>
        </div>

        {/* Conteúdo centralizado */}
        <div className="hero-center relative z-10">
          {/* Imagem de Perfil Perfeitamente Centralizada */}
          <div className={`profile-image-centered transition-all duration-700 ${
            scrolled ? 'scale-50 -translate-x-96 -translate-y-32' : 'scale-100'
          }`}>
            <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-3xl flex items-center justify-center border-4 border-purple-primary/50 shadow-2xl shadow-purple-primary/30 hover:shadow-purple-primary/50 transition-all duration-500 hover:scale-105">
              <span className="text-4xl md:text-5xl font-bold text-purple-accent">Sua Foto</span>
            </div>
          </div>

          {/* Nome e Subtítulo */}
          <div className={`mt-12 transition-all duration-700 ${
            scrolled ? 'opacity-0 -translate-y-10' : 'opacity-100'
          }`}>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              Igor Gianeri Vieira
            </h1>
            <p className="text-2xl md:text-4xl text-purple-accent font-light tracking-wide max-w-4xl mx-auto">
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
    { name: 'React', icon: '⚛️', color: 'from-purple-500 to-purple-600' },
    { name: 'React Native', icon: '📱', color: 'from-purple-600 to-pink-500' },
    { name: 'TypeScript', icon: '🔷', color: 'from-purple-700 to-purple-800' },
    { name: 'Next.js', icon: '▲', color: 'from-purple-800 to-gray-900' }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sobre Mim</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-primary to-purple-accent mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-gray-300 text-xl leading-relaxed">
              Desenvolvedor apaixonado por tecnologia e inovação. Especializado em criar 
              experiências digitais excepcionais usando as mais modernas tecnologias do mercado.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              Focado em desenvolvimento mobile e front-end, sempre buscando aprender novas 
              tecnologias e implementar soluções criativas para problemas complexos.
            </p>
            
            <div className="pt-6">
              <button className="btn-primary text-lg px-8 py-4">
                Download CV
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {technologies.map((tech) => (
              <div 
                key={tech.name} 
                className="bg-gray-800/50 p-8 rounded-2xl text-center border border-purple-primary/20 hover:border-purple-primary/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg`}>
                  {tech.icon}
                </div>
                <h3 className="text-white font-semibold text-lg">{tech.name}</h3>
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
      gradient: 'from-purple-600 to-pink-600'
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
      gradient: 'from-purple-600 to-purple-700'
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
      gradient: 'from-purple-700 to-purple-800'
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
      gradient: 'from-purple-800 to-purple-900'
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
            background: `linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%), linear-gradient(135deg, ${project.gradient.split(' ')[1]} 0%, ${project.gradient.split(' ')[3]} 100%)`
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          </div>

          {/* Número do Projeto - Posição otimizada */}
          <div className="absolute left-4 lg:left-12 top-1/2 transform -translate-y-1/2 z-10">
            <span className="text-6xl lg:text-9xl font-black text-purple-500/20">
              {String(projectIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center px-8 relative z-10">
            <div className="max-w-7xl w-full grid lg:grid-cols-3 gap-12 items-center">
              
              {/* Área de Imagens - Expandida para ocupar mais espaço */}
              <div className="flex flex-col items-center justify-center space-y-6 order-2 lg:order-1 lg:col-span-2">
                {/* Container da Imagem Principal */}
                <div className="w-full max-w-2xl mx-auto">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-700 to-gray-800 aspect-video shadow-2xl border border-transparent hover:border-purple-primary/30 hover:shadow-purple-primary/20 transition-all duration-300 group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600/10 group-hover:to-purple-700/10 transition-all duration-500">
                      <span className="text-3xl lg:text-4xl font-bold text-purple-accent group-hover:text-purple-primary image-transition content-change">
                        {project.images[selectedImages[projectIndex]].placeholder}
                      </span>
                    </div>
                    
                    {/* Seta Esquerda */}
                    <button 
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === 0 ? project.images.length - 1 : selectedImages[projectIndex] - 1)}
                      className="nav-arrow absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-purple-600/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Seta Direita */}
                    <button 
                      onClick={() => handleImageChange(projectIndex, selectedImages[projectIndex] === project.images.length - 1 ? 0 : selectedImages[projectIndex] + 1)}
                      className="nav-arrow absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-purple-600/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 z-10"
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
                        className={`aspect-video rounded-xl flex items-center justify-center transition-all duration-500 border-2 hover:scale-105 ${
                          selectedImages[projectIndex] === imageIndex
                            ? 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-primary shadow-lg shadow-purple-primary/30 scale-105'
                            : 'bg-gradient-to-br from-gray-700 to-gray-800 border-transparent hover:border-purple-primary/50 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-purple-700/20'
                        }`}
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
              <div className="space-y-6 order-1 lg:order-2 px-4 flex flex-col justify-center">
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
                  <h4 className="text-base font-semibold text-purple-accent">Tecnologias</h4>
                  <div className="flex flex-wrap gap-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="p-4 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-purple-700/20 hover:text-white border border-transparent hover:border-purple-primary/30 rounded-lg text-xs font-medium transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link para repositório */}
                <div className="flex justify-center pt-4 px-2">
                  <button className="bg-gradient-to-br from-gray-700 to-gray-800 border border-transparent text-gray-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 hover:text-white hover:border-purple-primary/50 text-sm px-8 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-purple-primary/25 hover:scale-105 flex items-center space-x-2">
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
      icon: '📧',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'LinkedIn', 
      value: '/in/igor-vieira',
      icon: '💼',
      color: 'from-purple-600 to-purple-700'
    },
    { 
      label: 'GitHub', 
      value: '/igorgianeri',
      icon: '💻',
      color: 'from-purple-700 to-purple-800'
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Vamos Conversar</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-primary to-purple-accent mx-auto mb-8"></div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Estou sempre aberto a novas oportunidades e projetos interessantes. 
            Entre em contato e vamos criar algo incrível juntos!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contacts.map((contact) => (
            <div 
              key={contact.label} 
              className="bg-gray-800/50 p-8 rounded-3xl border border-purple-primary/20 hover:border-purple-primary/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {contact.icon}
              </div>
              <h3 className="text-purple-accent font-semibold mb-3 text-lg">{contact.label}</h3>
              <p className="text-gray-300 text-base">{contact.value}</p>
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


