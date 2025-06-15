<script>
  import { goto } from '$app/navigation';
  import { startStudy } from '$lib/stores/studyStore';

  function handleStart() {
    startStudy();
    goto('/menu-demo');
  }
</script>

<main class="container">
  <div class="instructions-card">
    <h1>Instructions</h1>
    
    <div class="content">
      <section class="text-section">
        <h2>Welcome to the Study</h2>
        <p>
          In this study, you will be presented with a series of tasks that involve organizing and categorizing information.
          Please read the following instructions carefully before proceeding.
        </p>
      </section>

      <section class="text-section">
        <h2>What to Expect</h2>
        <p>
          You will see two different types of interfaces that you'll need to interact with.
          The images below show examples of what you'll encounter during the study.
        </p>
      </section>

      <div class="image-container">
        <div class="image-wrapper">
          <img src="/images/mouse_10064691.jpg" alt="Example interface 1" />
          <p class="image-caption">Example of the first interface type</p>
        </div>
        <div class="image-wrapper">
          <img src="/images/keyboard_10064691.jpg" alt="Example interface 2" />
          <p class="image-caption">Example of the second interface type</p>
        </div>
      </div>

      <section class="text-section">
        <h2>Getting Started</h2>
        <p>
          When you're ready to begin, click the "Start" button below.
          The study will take approximately 20-30 minutes to complete.
        </p>
      </section>
    </div>

    <button class="start-button" on:click={handleStart}>
      Start
    </button>
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #f5f5f5;
  }

  .instructions-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
  }

  h2 {
    color: #444;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .content {
    margin-bottom: 2rem;
  }

  .text-section {
    margin-bottom: 2rem;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .image-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .image-wrapper {
    text-align: center;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .image-caption {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }

  .start-button {
    display: block;
    width: 200px;
    margin: 2rem auto 0;
    padding: 1rem 2rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .start-button:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .instructions-card {
      padding: 1.5rem;
    }

    .image-container {
      grid-template-columns: 1fr;
    }
  }
</style> 