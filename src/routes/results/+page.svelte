<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { studyStore } from '$lib/stores/studyStore';

  let correctPicks = 0;
  let averageTime = 0;

  onMount(() => {
    studyStore.subscribe(store => {
      console.log('All rounds:', store.rounds);
      console.log('Rounds with isCorrect:', store.rounds.map(r => ({ selected: r.selectedItem, correct: r.correctItem, isCorrect: r.isCorrect })));
      correctPicks = store.rounds.filter(round => round.isCorrect).length;
      const totalTime = store.rounds.reduce((sum, round) => sum + (round.timeTaken || 0), 0);
      averageTime = totalTime / store.rounds.length / 1000; // Convert to seconds
    })();
  });

  function handleRestart() {
    goto('/instructions');
  }
</script>

<main class="container">
  <div class="results-card">
    <h1>Study Results</h1>
    
    <div class="results-content">
      <div class="result-item">
        <h2>Correct Selections</h2>
        <div class="result-value">{correctPicks} out of 6</div>
      </div>

      <div class="result-item">
        <h2>Average Time per Round</h2>
        <div class="result-value">{averageTime.toFixed(2)} seconds</div>
      </div>
    </div>

    <button class="restart-button" on:click={handleRestart}>
      Start New Study
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

  .results-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
  }

  .results-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .result-item {
    text-align: center;
  }

  h2 {
    color: #444;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .result-value {
    font-size: 1.5rem;
    color: #28a745;
    font-weight: 500;
  }

  .restart-button {
    display: block;
    width: 200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .restart-button:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .results-card {
      padding: 1.5rem;
    }
  }
</style> 