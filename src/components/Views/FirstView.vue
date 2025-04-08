<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar with refined styling -->
    <div class="bg-white shadow-md fixed w-full z-50">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-4xl md:text-5xl font-bold text-blue-950">
          LEONI
        </h1>
        <!-- Mobile menu button -->
        <button class="md:hidden focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Space for fixed navbar -->
    <div class="h-20"></div>

    <!-- Navbar component (below logo) -->
    <navbar-component class="shadow-md" />

    <!-- Hero Section with Background Image -->
    <header
      class="relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://d3ga0yfowtcnef.cloudfront.net/fileadmin/_processed_/4/4/csm_PM_Leoni_PTD2024_Visual_Sustainability_02_c7e737bf5a.webp'); min-height: 90vh;"
    >
      <!-- Improved gradient overlay for better text visibility -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

      <!-- Hero Content with improved spacing and typography -->
      <div class="z-10 px-4 md:px-12 lg:px-24 text-center text-white max-w-5xl">
        <!-- ParkEase Section with animation -->
        <div class="transform transition duration-700 ease-in-out hover:scale-105">
          <h1 class="text-3xl md:text-5xl font-bold mb-6">
            ParkEase By <span class="text-5xl md:text-6xl font-extrabold text-blue-300">IKHLASSE</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 font-medium">
            Your Ultimate Park Management Solution!
          </p>
          <p class="text-lg md:text-xl text-opacity-90 font-serif leading-relaxed">
            Our Park Management System is designed to streamline the management of parks, ensuring a seamless experience for both visitors and administrators. With an intuitive interface and powerful features, our system helps park managers track visitor traffic, manage bookings, monitor park facilities, and maintain the overall safety and upkeep of the park. Whether you're running a small community park or a large recreational area, our platform empowers you to maintain smooth operations and deliver an exceptional experience to park-goers.
          </p>
        </div>
        
        <!-- Call to action button -->
        <div class="mt-10">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transform transition duration-300 hover:scale-105 hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      <!-- Improved SVG Divider with smoother curve -->
      <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          class="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" class="fill-white"></path>
        </svg>
      </div>
    </header>

    <!-- Main Content Section with enhanced features display -->
    <main class="flex-grow bg-white py-20">
      <section class="container mx-auto px-4 text-center">
        <div class="w-full md:w-10/12 lg:w-8/12 mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Welcome to LEONI</h2>
          <p class="text-lg text-gray-600 mb-12">
            Discover how we innovate and collaborate to shape a better tomorrow through our cutting-edge park management solutions.
          </p>

          <!-- Features Section with improved cards -->
          <div class="flex flex-wrap justify-center gap-8 mb-16">
            <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
              <div class="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-blue-900 mb-4">Seamless Booking</h3>
              <p class="text-gray-600">
                Our system simplifies the booking process, allowing visitors to reserve spots with ease, ensuring a hassle-free experience for everyone.
              </p>
            </div>
            <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
              <div class="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-blue-900 mb-4">Real-Time Monitoring</h3>
              <p class="text-gray-600">
                Stay updated with real-time monitoring of park facilities, visitor count, and available resources, ensuring smooth operations at all times.
              </p>
            </div>
          </div>
          
          <!-- Additional feature row -->
          <div class="flex flex-wrap justify-center gap-8">
            <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
              <div class="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-blue-900 mb-4">Enhanced Security</h3>
              <p class="text-gray-600">
                Protect your park with advanced security features, including access control, surveillance integration, and emergency response protocols.
              </p>
            </div>
            <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full md:w-5/12">
              <div class="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-blue-900 mb-4">Easy Maintenance</h3>
              <p class="text-gray-600">
                Simplify maintenance tasks with scheduled alerts, resource management, and maintenance history tracking for all park facilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials section -->
      <section class="bg-blue-50 py-16 mt-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-blue-900 mb-10 text-center">What Our Clients Say</h2>
          
          <div class="flex flex-wrap justify-center gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span class="text-blue-800 font-bold">JM</span>
                </div>
                <div>
                  <h4 class="font-semibold">John Mitchell</h4>
                  <p class="text-gray-500 text-sm">City Park Manager</p>
                </div>
              </div>
              <p class="text-gray-600 italic">"ParkEase has transformed how we manage our city parks. Visitor satisfaction is up by 45% since implementation!"</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span class="text-blue-800 font-bold">SL</span>
                </div>
                <div>
                  <h4 class="font-semibold">Sarah Lee</h4>
                  <p class="text-gray-500 text-sm">Recreation Director</p>
                </div>
              </div>
              <p class="text-gray-600 italic">"The real-time monitoring feature has helped us optimize staffing and resources across multiple park locations."</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span class="text-blue-800 font-bold">RM</span>
                </div>
                <div>
                  <h4 class="font-semibold">Robert Mendez</h4>
                  <p class="text-gray-500 text-sm">National Park Supervisor</p>
                </div>
              </div>
              <p class="text-gray-600 italic">"We've reduced maintenance costs by 30% while improving the overall visitor experience. ParkEase is a game-changer."</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Call to action section -->
      <section class="container mx-auto px-4 text-center py-16">
        <h2 class="text-3xl font-bold text-blue-900 mb-6">Ready to Transform Your Park Management?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join hundreds of parks worldwide that have already improved their operations with ParkEase.
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transform transition duration-300 hover:scale-105">
            Request a Demo
          </button>
          <button class="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transform transition duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </section>
    </main>

    <!-- Footer component -->
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Add a subtle animation for smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhance hover effects with transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>