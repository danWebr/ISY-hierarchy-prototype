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
        <h2>Welcome to the Experiment</h2>
        <p>
          In this experiment, you will be comparing two different ways of navigating through hierarchical menus:
          using a mouse and using a keyboard. You will be asked to find specific items in a menu system
          using both interaction methods.
        </p>
      </section>

      <section class="text-section">
        <h2>What to Expect</h2>
        <p>
          The experiment consists of multiple blocks, each containing rounds where you'll use both the mouse-based
          and keyboard-based interfaces. You'll be shown a target item to find, and your task is to navigate
          through the menu hierarchy to select it as quickly and accurately as possible.
        </p>
        <p>
          The images below show examples of what you'll encounter during the experiment. The first image shows
          the mouse-based interface where you can hover over menu items to reveal submenus. The second image
          shows the keyboard-based interface where you'll use number keys to navigate through the menu levels.
        </p>
        <p>
          There will be a total of 120 rounds in the experiment, split across 3 blocks. Each block will have 20 rounds for each of the two interaction methods.
        </p>
      </section>

      <div class="image-container">
        <div class="image-wrapper">
          <img src="/images/mouse_10064691.png" alt="Example interface 1" />
          <p class="image-caption">Example of the mouse-based menu</p>
        </div>
        <div class="image-wrapper">
          <img src="/images/keyboard_10064691.png" alt="Example interface 2" class="larger-image" />
          <p class="image-caption">Example of the keyboard-based menu</p>
        </div>
      </div>

      <section class="text-section">
        <h2>Getting Started</h2>
        <p>
          When you're ready to begin, click the "Start" button below. The experiment will take approximately
          20-30 minutes to complete. You'll be guided through each block and round, and your performance
          will be automatically recorded.
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
    background-color: white;
    padding: 1rem;
  }

  img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 4px;
  }

  .image-caption {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }

  .larger-image {
    transform: scale(1.2);
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