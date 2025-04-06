<template>
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <!-- Logo / Title -->
      <div class="bg-white shadow-md">
        <h1 class="text-5xl md:text-6xl font-bold text-blue-950 m-12 text-left">
          LEONI
        </h1>
      </div>
  
      <!-- Navbar directly under the logo -->
      <navbar-component />
  
      <!-- Hero Section with Background Image -->
      <header
        class="relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://d3ga0yfowtcnef.cloudfront.net/fileadmin/_processed_/4/4/csm_PM_Leoni_PTD2024_Visual_Sustainability_02_c7e737bf5a.webp'); min-height: 80vh;"
      >
        <!-- Semi-transparent Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
  
        <!-- Hero Content -->
        <div class="z-10 px-4 text-center text-white">
          <!-- Title and Slogan -->
          
          <!-- ParkEase Section -->
          <h1 class="text-3xl md:text-4xl font-semibold mb-6">
            ParkEase By <span class="text-5xl ">IKHLASSE</span>
          </h1>
          <p class="text-lg md:text-xl mb-8">
            Your Ultimate Park Management Solution !
          </p>
          <p class="text-lg md:text-xl text-opacity-80 font-serif">
            Our Park Management System is designed to streamline the management of parks, ensuring a seamless experience for both visitors and administrators. With an intuitive interface and powerful features, our system helps park managers track visitor traffic, manage bookings, monitor park facilities, and maintain the overall safety and upkeep of the park. Whether you're running a small community park or a large recreational area, our platform empowers you to maintain smooth operations and deliver an exceptional experience to park-goers.
          </p>
        </div>
  
        <!-- Decorative SVG Divider -->
        <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            class="relative block w-full h-20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path d="M1200 0L0 0 892.25 114.72 1200 0z" class="fill-white"></path>
          </svg>
        </div>
      </header>
  
      <!-- Main Content Section -->
      <main class="flex-grow bg-white py-20">
        <section class="container mx-auto px-4 text-center">
          <div class="w-full md:w-8/12 mx-auto">
            <h2 class="text-3xl font-semibold text-blue-900 mb-6">Welcome to LEONI</h2>
            <p class="text-lg text-gray-600 mb-8">
              Discover how we innovate and collaborate to shape a better tomorrow.
            </p>
  
            <!-- Features Section -->
            <div class="flex flex-wrap justify-center gap-8">
              <div class="group bg-blue-100 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
                <h3 class="text-2xl font-semibold text-blue-900 mb-4">Seamless Booking</h3>
                <p class="text-gray-600">
                  Our system simplifies the booking process, allowing visitors to reserve spots with ease, ensuring a hassle-free experience.
                </p>
              </div>
              <div class="group bg-blue-100 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
                <h3 class="text-2xl font-semibold text-blue-900 mb-4">Real-Time Monitoring</h3>
                <p class="text-gray-600">
                  Stay updated with real-time monitoring of park facilities, visitor count, and available resources, ensuring smooth operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- Footer -->
      <footer-component />
    </div>
  </template>
  
  <script>
  import NavbarComponent from "./Navbar.vue"
  import FooterComponent from "./Footer.vue";
  
  export default {
    name: "LandingPage",
    components: {
      NavbarComponent,
      FooterComponent,
    },
  };
  </script>
  
  